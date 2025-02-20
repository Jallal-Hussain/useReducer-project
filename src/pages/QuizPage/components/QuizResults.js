import React from "react";
import "./QuizResults.css";

const QuizResults = ({ score, totalQuestions, handleReset }) => {
  return (
    <div className="quiz-results">
      <h4>Quiz Over!</h4>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <button onClick={handleReset}>Restart Quiz</button>
    </div>
  );
};

export default QuizResults;
