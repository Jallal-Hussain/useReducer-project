import React from "react";
import "./QuizTimer.css";

const QuizTimer = ({ timer }) => {
  return (
    <div className="quiz-timer">
      {timer > 0 ? <h3>Time Left: {timer}s</h3> : <h3 style={{color: ' #dc3545'}}>Your Time is Out</h3>}
    </div>
  );
};

export default QuizTimer;
