import React from "react";
import "./Filters.css";

const Filters = ({ dispatch, currentFilter }) => {
  const filters = ["all", "completed", "incomplete"];

  return (
    <div className="filters">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => dispatch({ type: "SET_FILTER", payload: filter })}
          className={currentFilter === filter ? "active" : ""}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filters;
