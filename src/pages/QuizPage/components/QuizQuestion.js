import React from "react";
import "./QuizQuestion.css";

const QuizQuestion = ({ question, handleAnswer }) => {
  const allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="quiz-question">
      <h2>{question.question}</h2>
      <div className="answers">
        {allAnswers.map((answer, index) => (
          <button key={index} onClick={() => handleAnswer(answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
