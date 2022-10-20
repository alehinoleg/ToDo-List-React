import React, { Component } from 'react';

import './header.css'

export default class Header extends Component {

  state = {
    label: '',
    min: '',
    sec: '',
    endTimer: false,
  };

  onLabelChange = (event) => {
    this.setState(() => ({
      label: event.target.value
    }))
  };

  onChangeMin = (event) => {
    if (event.target.value !== '') {
      this.setState(() => ({
        endTimer: true,
        min: Number(event.target.value) 
      }))
    } else
    {
      this.setState(() => ({
        min: 0
      }))
    } 
  }

  onChangeSec = (event) => {
    if (event.target.value !== '') {
      this.setState(() => ({
        endTimer: true,
        sec: Number(event.target.value) 
      }))
    }
    if (event.target.value === null){
      this.setState(() => ({
        sec: 0
      }))
    } 
  }

  onKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const {onItemAdded} = this.props;
      console.log(this.state.min, this.state.sec)
      onItemAdded(this.state.label, this.state.min, this.state.sec, this.state.endTimer );
      this.setState({
        label: '',
        min: '',
        sec: ''
      });
    }
  }

  render() {
    return (
      <form className="header" onKeyDown={this.onKeyDown}>
        <h1>todos</h1>
        <input className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          type='text'
          onChange={this.onLabelChange}
          value={this.state.label}
        />
        <input className='new-todo new-todo-time' 
          placeholder='Min'
          onChange={this.onChangeMin}
          type='text'
          value={this.state.min}/>
        <input className='new-todo new-todo-time' 
          placeholder='Sec'
          onChange={this.onChangeSec}
          value={this.state.sec}
        />
      </form>
    );
  };
};

