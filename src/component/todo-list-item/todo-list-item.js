import React, {Component} from 'react';
import './todo-list-item.css';
import {formatDistanceToNow} from 'date-fns';

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

  render() {
    const {label, onDeleted, onToggleDone, done, isEditing} = this.props;
    const { date } = this.state

    let className = 'description';
    if (done) {
      className += ' description-line'
    }

    return (
      <div className="view">
        <input className="toggle" type="checkbox" tabIndex={-1}/>
        <label>
          <span className={className}
            onClick={onToggleDone}>
            {label}
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

