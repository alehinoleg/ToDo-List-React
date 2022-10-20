import React, {Component} from 'react';
import './todo-list-item.css';
import {formatDistanceToNow} from 'date-fns';
import classNames from 'classnames';

export default class TodoListItem extends Component {

  state = {
    date: new Date(),
  };

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
    });
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }


  render() {
    const {label, min, sec, onDeleted, onToggleDone, done, isEditing, onPlay, onPause } = this.props;
    const { date } = this.state;
    return (
      <div className="view">
        <input className="toggle" type="checkbox" tabIndex={-1}/>
        <label>
          <span className={classNames('description', {'description-line': done})}
            onClick={onToggleDone} onSubmit = {onToggleDone}>
            {label}
          </span>
          <span className='timer'>
            <button className='iconT icon-play' onClick={onPlay}></button>
            <button className='iconT icon-pause' onClick={onPause}></button>
            <span className='timer-text'>{min}:{sec}</span>
          </span>
          <span className="created" tabIndex={-1}>
            {formatDistanceToNow(date,
              {includeSeconds: true})}
          </span>
        </label>
        <button className="icon icon-edit" tabIndex={-1}
          onClick={isEditing}
        ></button>
        <button className="icon icon-destroy"
          onClick={onDeleted} tabIndex={-1}></button>
      </div>
    );
  };
};

