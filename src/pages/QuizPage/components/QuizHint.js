import React from "react";
import "./QuizHint.css";

const QuizHint = ({ showHint, handleShowHint, hint }) => {
  return (
    <div className="quiz-hint">
      {!showHint ? (
        <button onClick={handleShowHint}>Show Hint</button>
      ) : (
        <p>Hint: The answer is not {hint.join(", ")}.</p>
      )}
    </div>
  );
};

export default QuizHint;
