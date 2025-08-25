import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashboardPage";
import PrivateRoute from "./components/PrivateRoute";
import React from "react";

import ParameterPage from "./pages/ParameterPage";
import AddParameterPage from "./pages/AddParameterPage";
import EditParameterPage from "./pages/EditParameterPage";

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
      <Route path="/parameter/add" element={<AddParameterPage />} />
      <Route path="/parameter/edit/:code" element={<EditParameterPage />} />
    </Routes>
  );
};

export default App;
