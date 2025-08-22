import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import api from "../services/api";

// Define tipe data untuk user (bisa disesuaikan dengan struktur dari API)
interface User {
  id: number;
  name: string;
  email: string;
  // Tambahkan field lain sesuai kebutuhan
}

// Define tipe untuk context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Buat context dengan default value undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tipe props untuk AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get<User>("/user");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      
      const res = await api.post<{ access_token: string }>("/login", {
        email,
        password,
      });

      const accessToken = res.data.access_token;

      localStorage.setItem("token", accessToken);
      setToken(accessToken);

      const userRes = await api.get<User>("/user");
      setUser(userRes.data);
    } catch (err) {
      console.log('err', err)
      throw new Error("Login gagal");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook dengan pengecekan context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};