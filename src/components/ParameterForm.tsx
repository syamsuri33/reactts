import React, { useState, FormEvent } from "react";

interface ParamFormData {
  param_code: string;
  param_name: string;
}

interface ParameterFormProps {
  initialData?: ParamFormData;
  onSubmit: (data: ParamFormData) => void;
  isEdit?: boolean;
}

const ParameterForm: React.FC<ParameterFormProps> = ({
  initialData = { param_code: "", param_name: "" },
  onSubmit,
  isEdit = false,
}) => {
  const [formData, setFormData] = useState<ParamFormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div style={{ marginBottom: 12 }}>
        <label>Param Code</label>
        <input
          type="text"
          name="param_code"
          value={formData.param_code}
          onChange={handleChange}
          disabled={isEdit} // biasanya kode tidak bisa diubah saat edit
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Param Name</label>
        <input
          type="text"
          name="param_name"
          value={formData.param_name}
          onChange={handleChange}
          style={{ width: "100%", padding: 8 }}
        />
      </div>

      <button type="submit">{isEdit ? "Update" : "Save"}</button>
    </form>
  );
};

export default ParameterForm;
