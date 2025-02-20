import React from "react";
import "./QuizQuestion.css";

const QuizQuestion = ({ question, handleAnswer, timer }) => {
  const allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ];

  return (
    <div className="quiz-question">
      <h3>{question.question}</h3>
      <div className="answers">
        {allAnswers.map((answer, index) => (
          <button
            key={index}
            disabled={timer === 0 ? true : false}
            onClick={() => handleAnswer(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
