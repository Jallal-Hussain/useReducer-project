import React from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, dispatch }) => {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo.id })}>
        {todo.text}
      </span>
      <button
        onClick={() => dispatch({ type: "DELETE_TODO", payload: todo.id })}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
