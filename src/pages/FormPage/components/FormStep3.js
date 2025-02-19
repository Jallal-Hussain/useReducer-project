import React from "react";
import "./FormStep.css";

const FormStep3 = ({ formData, errors, dispatch }) => {
  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { field: e.target.name, value: e.target.value },
    });
  };

  return (
    <div className="form-step">
      <h2>Step 3: Location Information</h2>
      <div>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && <span className="error">{errors.city}</span>}
      </div>
      <div>
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && <span className="error">{errors.country}</span>}
      </div>
    </div>
  );
};

export default FormStep3;
