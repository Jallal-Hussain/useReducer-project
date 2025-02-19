import React, { useReducer, useEffect } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizTimer from "./components/QuizTimer";
import QuizResults from "./components/QuizResults";
import QuizHint from "./components/QuizHint";
import "./quizpage.css";
import axios from "axios";

const initialState = {
  questions: [], // Array of questions fetched from the API
  currentQuestionIndex: 0, // Index of the current question
  score: 0, // User's score
  timer: 30, // Timer for each question
  showHint: false, // Whether to show a hint
  isQuizOver: false, // Whether the quiz is over
  difficulty: "easy", // Difficulty level
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
      const isCorrect =
        action.payload ===
        state.questions[state.currentQuestionIndex].correct_answer;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        timer: 30, // Reset timer for the next question
        showHint: false, // Hide hint for the next question
        isQuizOver: state.currentQuestionIndex + 1 >= state.questions.length,
      };
    case "UPDATE_TIMER":
      return {
        ...state,
        timer: state.timer - 1,
        isQuizOver: state.timer === 0 || state.isQuizOver,
      };
    case "SHOW_HINT":
      return {
        ...state,
        showHint: true,
      };
    case "RESET_QUIZ":
      return initialState;
    default:
      return state;
  }
};

const QuizPage = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  const fetchQuestions = async (difficulty, dispatch) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`
      );
      dispatch({ type: "FETCH_QUESTIONS", payload: response.data.results });
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions(state.difficulty, dispatch);
  }, [state.difficulty]);

  useEffect(() => {
    if (state.timer > 0 && !state.isQuizOver) {
      const timerId = setTimeout(() => {
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [state.timer, state.isQuizOver]);

  const handleAnswer = (answer) => {
    dispatch({ type: "ANSWER_QUESTION", payload: answer });
  };

  const handleShowHint = () => {
    dispatch({ type: "SHOW_HINT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  const handleDifficultyChange = (e) => {
    dispatch({ type: "SET_DIFFICULTY", payload: e.target.value });
  };

  return (
    <div className="quiz-page">
      <h1>Quiz App</h1>
      {!state.isQuizOver && state.questions.length > 0 ? (
        <>
          <QuizTimer timer={state.timer} />
          <QuizQuestion
            question={state.questions[state.currentQuestionIndex]}
            handleAnswer={handleAnswer}
          />
          <QuizHint
            showHint={state.showHint}
            handleShowHint={handleShowHint}
            hint={
              state.questions[state.currentQuestionIndex]?.incorrect_answers
            }
          />
        </>
      ) : (
        <QuizResults
          score={state.score}
          totalQuestions={state.questions.length}
          handleReset={handleReset}
        />
      )}
      <div className="difficulty-selector">
        <label>Difficulty:</label>
        <select
          value={state.difficulty}
          onChange={handleDifficultyChange}
          disabled={state.questions.length > 0}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default QuizPage;
