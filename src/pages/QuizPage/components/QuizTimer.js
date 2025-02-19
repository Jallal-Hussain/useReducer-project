import React from "react";
import "./QuizTimer.css";

const QuizTimer = ({ timer }) => {
  return (
    <div className="quiz-timer">
      <p>Time Left: {timer}s</p>
    </div>
  );
};

export default QuizTimer;
