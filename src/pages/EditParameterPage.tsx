import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseLayout from "../components/BaseLayout";
import ParameterForm from "../components/ParameterForm";
import api from "../services/api";

interface Param {
  param_code: string;
  param_name: string;
}

const EditParameterPage: React.FC = () => {
  const { code } = useParams<{ code: string }>(); // pastikan route: /parameters/edit/:code
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Param | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/parameters/${code}`);
        setInitialData(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load parameter");
      }
    };
    fetchData();
  }, [code]);

  const handleSubmit = async (data: Param) => {
    try {
      await api.put(`/parameters/${code}`, data);
      alert("Parameter updated successfully");
      navigate("/parameter");
    } catch (err) {
      console.error(err);
      alert("Failed to update parameter");
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <BaseLayout>
      <h2>Edit Parameter</h2>
      <ParameterForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isEdit
      />
    </BaseLayout>
  );
};

export default EditParameterPage;
