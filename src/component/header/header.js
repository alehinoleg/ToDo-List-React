import React, { Component } from 'react';

import './header.css'

export default class Header extends Component {

  state = {
    label: ''
  };

  onLabelChange = (event) => {
    this.setState(() => ({
      label: event.target.value
    }))
  };
 
  onSubmit = (event) => {
    event.preventDefault();
    const {onItemAdded} = this.props;
    onItemAdded(this.state.label);
    this.setState({
      label: ''
    });
  };



  render() {
    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          type='text'
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    );
  };
};

