import React, { useReducer, useEffect } from "react";
import QuizQuestion from "./components/QuizQuestion";
import QuizTimer from "./components/QuizTimer";
import QuizResults from "./components/QuizResults";
import QuizHint from "./components/QuizHint";
import "./quizpage.css";

const CATEGORIES = [
  { id: 9, name: "General Knowledge" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 25, name: "Art" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
];

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  timer: 30,
  isStart: false,
  showHint: false,
  isQuizOver: false,
  difficulty: "easy",
  category: 9,
  loading: false,
  error: null,
  showFeedback: false,
  lastAnswerCorrect: null,
};

// function decodeHtml(html) {
//   const txt = document.createElement("textarea");
//   txt.innerHTML = html;
//   return txt.value;
// }

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const quizReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_QUESTIONS_START":
      return { ...state, loading: true, error: null, questions: [] };
    case "FETCH_QUESTIONS_SUCCESS":
      return {
        ...state,
        questions: action.payload.map((q) => ({ ...q, userSelected: null })),
        loading: false,
        error: null,
        currentQuestionIndex: 0,
        score: 0,
        timer: 30,
        isStart: true,
        isQuizOver: false,
        showHint: false,
        showFeedback: false,
        lastAnswerCorrect: null,
      };
    case "FETCH_QUESTIONS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "ANSWER_QUESTION":
      const isCorrect =
        action.payload ===
        state.questions[state.currentQuestionIndex].correct_answer;
      // Update userSelected for the current question
      const updatedQuestions = state.questions.map((q, idx) =>
        idx === state.currentQuestionIndex
          ? { ...q, userSelected: action.payload }
          : q
      );
      return {
        ...state,
        questions: updatedQuestions,
        score: isCorrect ? state.score + 1 : state.score,
        showFeedback: true,
        lastAnswerCorrect: isCorrect,
      };
    case "NEXT_QUESTION":
      const isQuizOver =
        state.currentQuestionIndex + 1 >= state.questions.length;
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        showHint: false,
        timer: 30,
        showFeedback: false,
        lastAnswerCorrect: null,
        isQuizOver,
      };
    case "UPDATE_TIMER":
      const timeout = state.timer === 0;
      return {
        ...state,
        timer: state.timer - 1,
        isQuizOver: timeout || state.isQuizOver,
      };
    case "SHOW_HINT":
      return { ...state, showHint: true };
    case "RESET_QUIZ":
      return {
        ...initialState,
        category: state.category,
        difficulty: state.difficulty,
      };
    default:
      return state;
  }
};

const QuizPage = () => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    if (
      state.timer > 0 &&
      !state.isQuizOver &&
      state.isStart &&
      !state.showFeedback
    ) {
      const timerId = setTimeout(() => {
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);
      return () => clearTimeout(timerId);
    }
    if (state.timer === 0 && !state.isQuizOver) {
      setTimeout(() => dispatch({ type: "NEXT_QUESTION" }), 1000);
    }
  }, [state.timer, state.isQuizOver, state.isStart, state.showFeedback]);

  const fetchQuestions = async () => {
    dispatch({ type: "FETCH_QUESTIONS_START" });
    try {
      const url = `https://opentdb.com/api.php?amount=10&category=${state.category}&difficulty=${state.difficulty}&type=multiple&encode=url3986`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.response_code !== 0 || !data.results.length) {
        throw new Error("No questions found for this category/difficulty.");
      }
      const questions = data.results.map((q) => {
        const allAnswers = shuffleArray([
          decodeURIComponent(q.correct_answer),
          ...q.incorrect_answers.map((a) => decodeURIComponent(a)),
        ]);
        return {
          ...q,
          question: decodeURIComponent(q.question),
          correct_answer: decodeURIComponent(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((a) =>
            decodeURIComponent(a)
          ),
          allAnswers,
        };
      });
      dispatch({ type: "FETCH_QUESTIONS_SUCCESS", payload: questions });
    } catch (err) {
      dispatch({ type: "FETCH_QUESTIONS_ERROR", payload: err.message });
    }
  };

  const handleAnswer = (answer) => {
    if (!state.showFeedback) {
      dispatch({ type: "ANSWER_QUESTION", payload: answer });
      setTimeout(() => {
        if (state.currentQuestionIndex + 1 < state.questions.length) {
          dispatch({ type: "NEXT_QUESTION" });
        } else {
          dispatch({ type: "NEXT_QUESTION" });
        }
      }, 1200);
    }
  };

  const handleShowHint = () => {
    dispatch({ type: "SHOW_HINT" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  const handleStart = () => {
    fetchQuestions();
  };

  const handleDifficultyChange = (e) => {
    dispatch({ type: "SET_DIFFICULTY", payload: e.target.value });
  };

  const handleCategoryChange = (e) => {
    dispatch({ type: "SET_CATEGORY", payload: Number(e.target.value) });
  };

  return (
    <div className="quiz-page">
      <h3>Quiz App</h3>
      {!state.isStart && (
        <>
          <button
            className="btn"
            onClick={handleStart}
            disabled={state.loading}
          >
            {state.loading ? "Loading..." : "Start"}
          </button>
          <div style={{ width: "50%" }}>
            <div className="selector">
              <label>Difficulty:</label>
              <select
                value={state.difficulty}
                onChange={handleDifficultyChange}
                disabled={state.isStart || state.loading}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="selector">
              <label>Category:</label>
              <select
                value={state.category}
                onChange={handleCategoryChange}
                disabled={state.isStart || state.loading}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            {state.error && (
              <div style={{ color: "#dc3545", marginTop: 8 }}>
                {state.error}
              </div>
            )}
          </div>
        </>
      )}
      {state.isStart && !state.isQuizOver && state.questions.length > 0 && (
        <>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginBottom: 12,
              fontWeight: 500,
              color: "#444",
            }}
          >
            Question {state.currentQuestionIndex + 1} / {state.questions.length}
          </div>
          <QuizTimer timer={state.timer} />
          <QuizQuestion
            question={state.questions[state.currentQuestionIndex]}
            handleAnswer={handleAnswer}
            timer={state.timer}
            showFeedback={state.showFeedback}
            lastAnswerCorrect={state.lastAnswerCorrect}
          />
          <QuizHint
            showHint={state.showHint}
            handleShowHint={handleShowHint}
            hint={
              state.questions[state.currentQuestionIndex]?.incorrect_answers
            }
          />
        </>
      )}
      {state.isQuizOver && (
        <QuizResults
          score={state.score}
          totalQuestions={state.questions.length}
          handleReset={handleReset}
          questions={state.questions}
        />
      )}
    </div>
  );
};

export default QuizPage;
