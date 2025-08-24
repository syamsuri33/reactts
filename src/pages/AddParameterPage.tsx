import React from "react";
import BaseLayout from "../components/BaseLayout";
import ParameterForm from "../components/ParameterForm";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddParameterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: { param_code: string; param_name: string }) => {
    try {
      await api.post("/parameters", data);
      alert("Parameter added successfully");
      navigate("/parameters");
    } catch (err) {
      console.error(err);
      alert("Failed to add parameter");
    }
  };

  return (
    <BaseLayout>
      <h2>Add Parameter</h2>
      <ParameterForm onSubmit={handleSubmit} />
    </BaseLayout>
  );
};

export default AddParameterPage;
