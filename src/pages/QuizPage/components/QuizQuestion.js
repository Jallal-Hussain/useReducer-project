import React from "react";
import "./QuizQuestion.css";

const QuizQuestion = ({
  question,
  handleAnswer,
  timer,
  showFeedback,
  lastAnswerCorrect,
}) => {
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    setSelected(null);
  }, [question]);

  const handleClick = (answer) => {
    if (!showFeedback && timer > 0) {
      setSelected(answer);
      handleAnswer(answer);
    }
  };

  return (
    <div className="quiz-question">
      <h3>{question.question}</h3>
      <div className="answers">
        {question.allAnswers.map((answer, index) => {
          let btnClass = "";
          if (showFeedback && selected === answer) {
            btnClass =
              answer === question.correct_answer ? "correct" : "incorrect";
          } else if (showFeedback && answer === question.correct_answer) {
            btnClass = "correct";
          }
          return (
            <button
              key={index}
              className={btnClass}
              disabled={timer === 0 || showFeedback}
              onClick={() => handleClick(answer)}
            >
              {answer}
            </button>
          );
        })}
      </div>
      {showFeedback && selected && (
        <div
          className="feedback"
          style={{
            marginTop: 12,
            fontWeight: 600,
            color: lastAnswerCorrect ? "#28a745" : "#dc3545",
          }}
        >
          {lastAnswerCorrect
            ? "Correct!"
            : `Incorrect! Correct answer: ${question.correct_answer}`}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
