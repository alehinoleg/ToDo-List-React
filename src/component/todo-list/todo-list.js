import React, { Component } from 'react'

import './todo-list.css';
import TodoListItem from '../todo-list-item'

export default class TodoList extends Component {

  state = {
    value: ''
  }

  onEditingTodo = (event) => {
    this.setState(() => ({
      value: event.target.value
    }));
  };

  onSubmit = (id) => {
    this.props.onItemEdit(this.state.value, id)
  };

  render() {

    const { todos, onDeleted, onToggleDone, isEditing, onPlay, onPause } = this.props;

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
              <form onSubmit={() => this.onSubmit(item.id)}>
                <input type="text" className="edit" placeholder="Editing task" 
                  onChange={this.onEditingTodo}/>
              </form>
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
            min={item.min}
            sec={item.sec}
            done={item.done}
            onDeleted={() => onDeleted(item.id)}
            onToggleDone={() => onToggleDone(item.id)}
            isEditing = {() => isEditing(item.id)}
            onPlay={() => onPlay(item.id)}
            onPause={() => onPause(item.id)}
          />
        </li>
      );
    })
    return <ul className="todo-list">{element}</ul>;
  }
};
