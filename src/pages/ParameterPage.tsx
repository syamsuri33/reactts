import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import api from "../services/api";

interface ParamDetail {
  [key: string]: any;
}

interface Param {
  param_code: string;
  param_name: string;
  details?: ParamDetail[];
}

interface ApiResponse {
  data: Param[];
  pageCount: number;
  pageNo: number;
  rowCount: number;
  status: string;
}

const ParameterPage: React.FC = () => {
  const [params, setParams] = useState<Param[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(1);
  const navigate = useNavigate();

  const fetchParams = async (q: string = "", pageNo: number = 1) => {
    setLoading(true);
    try {
      const res = await api.get<ApiResponse>("/parameters", {
        params: { search: q, page: pageNo, per_page: 10 },
      });
      const response = res.data;
      setParams(response.data ?? []);
      setPageCount(response.pageCount ?? 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParams(search, page);
  }, [search, page]);

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAdd = () => {
    navigate("/parameter/add");
  };

  const handleUpdate = (param: Param) => {
    navigate(`/parameter/edit/${param.param_code}`);
  };

  const handleDelete = (param: Param) => {
    if (window.confirm(`Are you sure to delete ${param.param_name}?`)) {
      alert("TODO: Call API delete for " + param.param_code);
    }
  };

  return (
    <BaseLayout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Header + Add Button */}
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" fontWeight="bold">
            Parameters
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            sx={{ borderRadius: 2 }}
          >
            Add Parameter
          </Button>
        </Toolbar>

        {/* Search */}
        <Box
          component="form"
          onSubmit={onSearch}
          sx={{ display: "flex", gap: 1 }}
        >
          <TextField
            placeholder="Search by code or name..."
            value={search}
            onChange={handleInputChange}
            size="small"
            sx={{ flex: 1 }}
          />
          <Button type="submit" variant="outlined">
            Search
          </Button>
        </Box>

        {/* Table */}
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Param Code</TableCell>
                    <TableCell>Param Name</TableCell>
                    <TableCell align="center">Details Count</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {params.length > 0 ? (
                    params.map((p) => (
                      <TableRow key={p.param_code} hover>
                        <TableCell>{p.param_code}</TableCell>
                        <TableCell>{p.param_name}</TableCell>
                        <TableCell align="center">
                          {p.details?.length ?? 0}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="primary"
                            onClick={() => handleUpdate(p)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(p)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No data found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Pagination */}
        {pageCount > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
            />
          </Box>
        )}
      </Box>
    </BaseLayout>
  );
};

export default ParameterPage;
