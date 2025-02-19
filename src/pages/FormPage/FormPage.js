import React, { useReducer } from "react";
import "./formpage.css";
import FormStep1 from "./components/FormStep1";
import FormStep2 from "./components/FormStep2";
import FormStep3 from "./components/FormStep3";
import FormSummary from "./components/FormSummary";
import FormNavigation from "./components/FormNavigation";

const initialState = {
  step: 1,
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    country: "",
  },
  errors: {},
};

const validateForm = (step, formData) => {
  const errors = {};

  if (step === 1) {
    if (!formData.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
  }

  if (step === 2) {
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required";
    }
  }

  if (step === 3) {
    if (!formData.city.trim()) {
      errors.city = "City is required";
    }
    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }
  }

  return errors;
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
        errors: {
          ...state.errors,
          [action.payload.field]: "",
        },
      };
    case "SET_STEP":
      return {
        ...state,
        step: action.payload,
      };
    case "RESET_FORM":
      return initialState;
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return state;
  }
};

const FormPage = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { step, formData, errors } = state;

  return (
    <div className="form-page">
      {!step === 4 && <h1>Multi-Step Form</h1>}
      {step === 1 && (
        <FormStep1 formData={formData} errors={errors} dispatch={dispatch} />
      )}
      {step === 2 && (
        <FormStep2 formData={formData} errors={errors} dispatch={dispatch} />
      )}
      {step === 3 && (
        <FormStep3 formData={formData} errors={errors} dispatch={dispatch} />
      )}
      {step === 4 && <FormSummary formData={formData} dispatch={dispatch} step={step} validateForm={validateForm} />}
      {step < 4 && (
        <FormNavigation
          step={step}
          formData={formData}
          dispatch={dispatch}
          validateForm={validateForm}
        />
      )}
    </div>
  );
};

export default FormPage;
