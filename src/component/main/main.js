import React from 'react'

import TodoList from '../todo-list'
import './main.css';

const Main = ({ todos, onDeleted, onToggleDone }) => {
  return (
    <section className="main">
      <TodoList todos={todos} onDeleted={onDeleted} onToggleDone={onToggleDone} />
    </section>
  );
};

export default Main;
