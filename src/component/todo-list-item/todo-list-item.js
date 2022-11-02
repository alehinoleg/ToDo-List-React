import React, {useState, useEffect} from 'react';
import './todo-list-item.css';
import {formatDistanceToNow} from 'date-fns';
import classNames from 'classnames';

const TodoListItem = (props) => {
  
  const [date, useDate] = useState(new Date());
  const [createDate] = useState(new Date());
  let timerID

  useEffect(() => {
    timerID = setInterval(
      () => useDate(new Date()), 1000
    );
  }, [date])

  useEffect(() => {
    return () => clearInterval(timerID);
  })

  /*const tick = () => {
    useDate(new Date())
  };*/

  let minuta = props.min
  let secunda = props.sec
  if (minuta === '') { minuta = 0}
  if (secunda === '') { secunda = 0}
  return (
    <div className="view">
      <input className="toggle" type="checkbox" tabIndex={-1}/>
      <label>
        <span className={classNames('description', {'description-line': props.done})}
          onClick={props.onToggleDone} >
          {props.label}
        </span>
        <span className='timer'>
          <button className='iconT icon-play' onClick={() => props.onPlay()}></button>
          <button className='iconT icon-pause' onClick={() => props.onPause()}></button>
          <span className='timer-text'>{minuta}:{secunda}</span>
        </span>
        <span className="created" tabIndex={-1}>
          {formatDistanceToNow(createDate, date,
            {includeSeconds: true})}
        </span>
      </label>
      <button className="icon icon-edit" tabIndex={-1}
        onClick={props.isEditing}
      ></button>
      <button className="icon icon-destroy"
        onClick={props.onDeleted} tabIndex={-1}></button>
    </div>
  )
};

export default TodoListItem;

