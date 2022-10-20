import React from 'react'

import TodoList from '../todo-list'
import './main.css';

const Main = ({ todos, onDeleted, onToggleDone, isEditing, onItemEdit, onPlay, onPause }) => {
  return (
    <section className="main">
      <TodoList todos={todos} onDeleted={onDeleted} onToggleDone={onToggleDone} 
        isEditing={isEditing} onItemEdit = {onItemEdit} onPlay = {onPlay} onPause = {onPause}/>
    </section>
  );
};

export default Main;
