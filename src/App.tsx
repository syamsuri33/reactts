import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import ParameterPage from "./pages/ParameterPage";
import PrivateRoute from "./components/PrivateRoute";
import React from "react";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/parameter" element={<ParameterPage />} />
    </Routes>
  );
};

export default App;