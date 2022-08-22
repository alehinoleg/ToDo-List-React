import React from "react";

import './todo-list.css';
import TodoListItem from "../todo-list-item";

const TodoList = ({ todos, onDeleted, onToggleDone }) => {
  const element = todos.map((item) => {
    if (item.edit) {
      return (
        <div key={item.id}>
          <li className="editing">
            <input type="text" className="edit" value="Editing task" />
          </li>
          <li>
            <TodoListItem
              label={item.label}
              done={item.done}
              onDeleted={() => onDeleted(item.id)}
              onToggleDone={() => onToggleDone(item.id)}
            />
          </li>
        </div>
      );
    }
    return (
      <li key={item.id}>
        <TodoListItem
          label={item.label}
          done={item.done}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
        />
      </li>
    );
  })
  return <ul className="todo-list">{element}</ul>;
};

export default TodoList;
