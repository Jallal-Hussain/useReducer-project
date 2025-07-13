import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuizPage from "./pages/QuizPage/QuizPage";
import FormPage from "./pages/FormPage/FormPage";
import TodoPage from "./pages/TodoPage/TodoPage";
import WelcomePage from "./pages/WelcomePage";
import "./App.css";

function App() {
  return (
    <Router>
      {/* <div className="app-nav">
        <nav>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/form">Form</Link></li>
            <li><Link to="/todo">Todo</Link></li>
          </ul>
        </nav>
      </div> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/todo" element={<TodoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
