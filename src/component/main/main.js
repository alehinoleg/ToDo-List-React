import React from 'react'

import TodoList from '../todo-list'
import './main.css';

const Main = ({ todos, onDeleted, onToggleDone, isEditing, onItemEdit }) => {
  return (
    <section className="main">
      <TodoList todos={todos} onDeleted={onDeleted} onToggleDone={onToggleDone} isEditing={isEditing} onItemEdit = {onItemEdit}/>
    </section>
  );
};

export default Main;
