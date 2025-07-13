import React from "react";
import "./QuizResults.css";

const QuizResults = ({ score, totalQuestions, handleReset, questions }) => {
  return (
    <div className="quiz-results">
      <h4>Quiz Over!</h4>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
      <button onClick={handleReset}>Restart Quiz</button>
      {questions && questions.length > 0 && (
        <div className="results-summary">
          <h5>Review Your Answers</h5>
          <div className="results-table">
            {questions.map((q, idx) => (
              <div className="results-row" key={idx}>
                <div className="results-question">{q.question}</div>
                <div className={`results-answer ${q.userSelected === q.correct_answer ? "correct" : "incorrect"}`}>
                  Your answer: {q.userSelected ? q.userSelected : <span style={{color:'#aaa'}}>No answer</span>}
                </div>
                <div className="results-correct">Correct: {q.correct_answer}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResults;
