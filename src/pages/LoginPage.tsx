import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Container, Box, TextField, Button, Typography, IconButton, InputAdornment, Paper, CircularProgress } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");
 const [showPassword, setShowPassword] = useState<boolean>(false);
 const [loading, setLoading] = useState<boolean>(false);
 const { login } = useAuth();
 const navigate = useNavigate();

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  try {
   await login(email, password);
   Swal.fire({
    icon: "success",
    title: "Login berhasil!",
    showConfirmButton: false,
    timer: 1500,
   });
   navigate("/dashboard");
  } catch (err: any) {
   Swal.fire({
    icon: "error",
    title: "Login gagal",
    text: err.message || "Terjadi kesalahan",
   });
  } finally {
   setLoading(false);
  }
 };

 const togglePasswordVisibility = () => {
  setShowPassword(prev => !prev);
 };

 return (
  <Box
   sx={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #4facfe, #00f2fe)",
   }}
  >
   <Container maxWidth="sm">
    <Paper elevation={6} sx={{ padding: 4}}>
     <Typography variant="h5" align="center" gutterBottom>
      Login
     </Typography>
     <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} fullWidth required />
      <TextField
       label="Password"
       type={showPassword ? "text" : "password"}
       value={password}
       onChange={e => setPassword(e.target.value)}
       fullWidth
       required
       InputProps={{
        endAdornment: (
         <InputAdornment position="end">
          <IconButton onClick={togglePasswordVisibility} edge="end">
           {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
         </InputAdornment>
        ),
       }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ height: 48 }}>
       {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
     </Box>
    </Paper>
   </Container>
  </Box>
 );
}
