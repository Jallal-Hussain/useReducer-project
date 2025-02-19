import React from "react";
import "./FormNavigation.css";

const FormNavigation = ({ step, formData, dispatch, validateForm }) => {
  const handleNext = () => {
    const errors = validateForm(step, formData);
    if (Object.keys(errors).length === 0) {
      if (step === 3) {
        dispatch({ type: "SET_STEP", payload: 4 }); // Go to summary page
      } else {
        dispatch({ type: "SET_STEP", payload: step + 1 });
      }
    } else {
      dispatch({ type: "SET_ERRORS", payload: errors });
    }
  };

  const handlePrevious = () => {
    dispatch({ type: "SET_STEP", payload: step - 1 });
  };

  return (
    <div className="form-navigation">
      {step > 1 && <button onClick={handlePrevious}>Previous</button>}
      {step < 4 && <button onClick={handleNext}>Next</button>}
    </div>
  );
};

export default FormNavigation;
