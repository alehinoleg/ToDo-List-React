import React, { useState } from 'react'

import './todo-list.css';
import TodoListItem from '../todo-list-item'

const TodoList = (props) => {

  const [value, useValue] = useState(props.todos.label);
  
  const onEditingTodo = (event) => {
    useValue(event.target.value)
  };

  const onSubmit = (id) => {
    props.onItemEdit(value, id)
  };


  if (props.todos.length === 0) {
    return (
      <span className='description-span'>No tasks</span>
    );
  };
  
  const element = props.todos.map((item) => {
    if (item.edit) {
      return (
        <div key={item.id}>
          <li className="editing">
            <form onSubmit={() => onSubmit(item.id)}>
              <input type="text" className="edit" placeholder="Editing task" 
                onChange={onEditingTodo} autoFocus />
            </form>
          </li>
          <li>
            <TodoListItem
              label={item.label}
              min={item.min }
              sec={item.sec }
              done={item.done}
              onDeleted={() => props.onDeleted(item.id)}
              onToggleDone={() => props.onToggleDone(item.id)}
              isEditing = {() => props.isEditing(item.id)}
              onPlay={() => props.onPlay(item.id)}
              onPause={() => props.onPause(item.id)}
            />
          </li>
        </div>
      );
    };
  
    return (
      <li key={item.id} tabIndex={0}>
        <TodoListItem
          label={item.label}
          min={item.min}
          sec={item.sec}
          done={item.done}
          onDeleted={() => props.onDeleted(item.id)}
          onToggleDone={() => props.onToggleDone(item.id)}
          isEditing = {() => props.isEditing(item.id)}
          onPlay={() => props.onPlay(item.id)}
          onPause={() => props.onPause(item.id)}
        />
      </li>
    );
  })
  return <ul className="todo-list">{element}</ul>;
  
};

export default TodoList;
