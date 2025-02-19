import React from "react";
import "./formSummary.css";

const FormSummary = ({ formData, dispatch, validateForm, step }) => {
  const handleEdit = () => {
    dispatch({ type: "SET_STEP", payload: 1 });
  };

  const handleSubmit = () => {
    const errors = validateForm(step, formData);
    if (Object.keys(errors).length === 0) {
      alert(`Welcome ${formData.firstName} ${formData.lastName}!`);
      console.table("Form Data:", formData);
      dispatch({ type: "RESET_FORM" });
    } else {
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  };

  return (
    <div className="form-summary">
      <h2>Summary</h2>
      <div className="summary-content">
        <p>
          <strong>Name:</strong> {`${formData.firstName} ${formData.lastName}`}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>Password:</strong> {"********"}
        </p>
        <p>
          <strong>Address:</strong> {formData.address}
        </p>
        <p>
          <strong>City:</strong> {formData.city}
        </p>
        <p>
          <strong>Country:</strong> {formData.country}
        </p>
      </div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FormSummary;
