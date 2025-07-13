import React, { useReducer, useEffect } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizTimer from "./components/QuizTimer";
import QuizResults from "./components/QuizResults";
import QuizHint from "./components/QuizHint";
import { questions } from "./QuizData";
import "./quizpage.css";

const initialState = {
  questions: questions,
  currentQuestionIndex: 0,
  score: 0,
  timer: 10,
  isStart: false,
  showHint: false,
  isQuizOver: false,
  difficulty: "easy",
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
      };
    case "SET_DIFFICULTY":
      return {
        ...state,
        difficulty: action.payload,
      };
    case "ANSWER_QUESTION":
      const isCorrect = action.payload === state.questions[state.currentQuestionIndex].correct_answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timer: 10,
        showHint: false,
        isQuizOver: state.currentQuestionIndex + 1 >= state.questions.length,
      };
    case "UPDATE_TIMER":
      const timeout = state.timer === 0;
      return {
        ...state,
        timer: state.timer - 1,
        isQuizOver: timeout || state.isQuizOver,
      };
    case "SHOW_HINT":
      return {
        ...state,
        showHint: true,
      };
    case "START_QUIZ":
      return {
        ...state,
        isStart: true,
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showHint: false,
        timer: 10,
      };
    case "RESET_QUIZ":
      return initialState;
    default:
      return state;
  }
};

const QuizPage = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    if (state.timer > 0 && !state.isQuizOver && state.isStart) {
      const timerId = setTimeout(() => {
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);
      return () => clearTimeout(timerId);
    }
    if(state.timer === 0){
      dispatch({ type: "NEXT_QUESTION" });
    }
  }, [state.timer, state.isQuizOver, state.isStart]);

  const handleAnswer = (answer) => {
    dispatch({ type: "ANSWER_QUESTION", payload: answer });
  };

  const handleShowHint = () => {
    dispatch({ type: "SHOW_HINT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_QUIZ" });
  };
  const handleStart = () => {
    dispatch({ type: "START_QUIZ" });
  };

  const handleDifficultyChange = (e) => {
    dispatch({ type: "SET_DIFFICULTY", payload: e.target.value });
  };

  return (
    <div className="quiz-page">
      <h3>Quiz App</h3>
      {state.isStart && state.timer <= 0 ? (
        <button className="btn" onClick={handleReset}>
          Reset Quiz
        </button>
      ) : null}
      {!state.isStart && (
        <>
          <button className="btn" onClick={handleStart}>
            Start
          </button>
          <div className="difficulty-selector">
            <label>Difficulty:</label>
            <select
              value={state.difficulty}
              onChange={handleDifficultyChange}
              disabled={state.isStart}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </>
      )}
      {!state.isQuizOver && state.questions.length > 0 && state.isStart ? (
        <>
          <QuizTimer timer={state.timer} />
          <QuizQuestion
            question={state.questions[state.currentQuestionIndex]}
            handleAnswer={handleAnswer}
            timer={state.timer}
          />
          <QuizHint
            showHint={state.showHint}
            handleShowHint={handleShowHint}
            hint={
              state.questions[state.currentQuestionIndex]?.incorrect_answers
            }
          />
        </>
      ) : state.isStart ? (
        <QuizResults
          score={state.score}
          totalQuestions={state.questions.length}
          handleReset={handleReset}
        />
      ) : null}
    </div>
  );
};

export default QuizPage;
