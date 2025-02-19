import React from "react";
import "./FormStep.css";

const FormStep2 = ({ formData, errors, dispatch }) => {
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  return (
    <div className="form-step">
      <h2>Step 2: Account Information</h2>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
    </div>
  );
};

export default FormStep2;
