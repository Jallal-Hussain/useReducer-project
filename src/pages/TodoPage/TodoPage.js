import React, { useReducer } from "react";
import TodoForm from "./components/to-do-list/TodoForm";
import TodoList from "./components/to-do-list/TodoList";
import Filters from "./components/to-do-list/Filters";
import "./todopage.css";

const initialState = {
  todos: [],
  filter: "all",
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.payload, completed: false },
        ],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "SET_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

const TodoPage = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todos, filter } = state;

  return (
    <div className="todo-page">
      <h1>Todo List</h1>
      <TodoForm dispatch={dispatch} />
      <Filters dispatch={dispatch} currentFilter={filter} />
      <TodoList todos={todos} dispatch={dispatch} filter={filter} />
    </div>
  );
};

export default TodoPage;
