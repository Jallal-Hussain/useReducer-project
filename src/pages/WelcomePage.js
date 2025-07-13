import React from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <div className="welcome-page">
      <h1>Welcome to the useReducer Demo App!</h1>
      <p>Choose a feature to explore:</p>
      <div className="welcome-buttons">
        <button className="btn" onClick={() => navigate("/quiz")}>Quiz</button>
        <button className="btn" onClick={() => navigate("/form")}>Form</button>
        <button className="btn" onClick={() => navigate("/todo")}>Todo</button>
      </div>
    </div>
  );
}

export default WelcomePage; 