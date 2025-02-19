import React from "react";
import "./FormStep.css";

const FormStep1 = ({ formData, errors, dispatch }) => {
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  return (
    <div className="form-step">
      <h2>Step 1: Personal Information</h2>
      <div>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
    </div>
  );
};

export default FormStep1;
