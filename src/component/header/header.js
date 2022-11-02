import React, { useState } from 'react';

import './header.css'

const Header = (props) => {

  const [task, setTask] = useState({
    label: '',
    min: '',
    sec: '',
    endTimer: false
  });

  const onLabelChange = (event) => {
    setTask((task) => {
      return {...task, label: event.target.value}
    });
  };

  const onChangeMin = (event) => {
    setTask((task) => {
      return {...task, min: event.target.value, endTimer: true}
    });
  }

  const onChangeSec = (event) => {
    setTask((task) => {
      return {...task, sec: event.target.value, endTimer: true}
    });
  }
  
  const onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const {onItemAdded} = props;
      if (task.label !== '') {
        onItemAdded(task.label, task.min, task.sec, task.endTimer );
      } else {
        alert('Введите задачу');
      }
      setTask((task) => {
        return {...task, min: '', sec: '', label: ''}
      });
    }
  }

  return (
    <form className="header" onKeyDown={onKeyDown}>
      <h1>todos</h1>
      <input className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        type='text'
        onChange={onLabelChange}
        value={task.label}
      />
      <input className='new-todo new-todo-time' 
        placeholder='Min'
        onChange={onChangeMin}
        type='number'
        value={task.min}/>
      <input className='new-todo new-todo-time' 
        placeholder='Sec'
        onChange={onChangeSec}
        value={task.sec}
        type='number'
      />
    </form>
  );
};

export default Header;

