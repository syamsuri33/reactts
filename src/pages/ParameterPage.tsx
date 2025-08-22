import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import BaseLayout from '../components/BaseLayout';
import api from '../services/api';

interface ParamDetail {
  // Define the shape of each detail if known
  [key: string]: any;
}

interface Param {
  param_code: string;
  param_name: string;
  details?: ParamDetail[];
}

const Dashboard: React.FC = () => {
  const [params, setParams] = useState<Param[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const fetchParams = async (q: string = ''): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get('/parameters', {
        params: { search: q, per_page: 100 },
      });
      const data: Param[] = res.data.data ?? res.data;
      setParams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParams();
  }, []);

  const onSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchParams(search);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <BaseLayout>
      <h2>Dashboard</h2>

      <form onSubmit={onSearch} style={{ marginBottom: 12 }}>
        <input
          placeholder="search param_code or name"
          value={search}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table
          border={1}
          cellPadding={8}
          style={{ width: '100%', borderCollapse: 'collapse' }}
        >
          <thead>
            <tr>
              <th>Param Code</th>
              <th>Param Name</th>
              <th>Details count</th>
            </tr>
          </thead>
          <tbody>
            {params.map((p) => (
              <tr key={p.param_code}>
                <td>{p.param_code}</td>
                <td>{p.param_name}</td>
                <td>{p.details?.length ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </BaseLayout>
  );
}

export default Dashboard;
