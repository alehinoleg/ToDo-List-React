import React from "react";

import './footer.css';
import TaskFilter from "../task-filter";

const Footer = ({ todo, deleteItems, filter, onFilterChange }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{`${todo} items left`}</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={() => deleteItems()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
