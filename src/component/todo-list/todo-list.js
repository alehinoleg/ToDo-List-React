import React from 'react'

import './todo-list.css';
import TodoListItem from '../todo-list-item'

const TodoList = ({ todos, onDeleted, onToggleDone, isEditing }) => {

  if (todos.length === 0) {
    return (
      <span className='description-span'>No tasks</span>
    );
  };

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
              isEditing = {() => isEditing(item.id)}
            />
          </li>
        </div>
      );
    };

    return (
      <li key={item.id} tabIndex={0}>
        <TodoListItem
          label={item.label}
          done={item.done}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          isEditing = {() => isEditing(item.id)}
        />
      </li>
    );
  })
  return <ul className="todo-list">{element}</ul>;
};

export default TodoList;
