import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import './app.css'


export default class App extends Component{

  maxid = 0;
  state = {
    todoDate : [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      edit: false,
      done: false,
      id: this.maxid ++
    };
  };

  deleteItem = (id) => {
    this.setState(({todoDate}) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const newArr = [...todoDate.slice(0, idx), ...todoDate.slice(idx + 1)];

      return {todoDate: newArr};
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({todoDate}) => {
      const newArr = [ newItem, ...todoDate ];
      return {
        todoDate: newArr
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  onToggleDone = (id) => {
    this.setState(({todoDate}) => {
      return {
        todoDate: this.toggleProperty(todoDate, id, 'done')
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({filter})
  }

  deleteItems = () => {
    this.setState(({todoDate}) => {
      const doneCount = todoDate.filter((el) => !el.done);
      return {
        todoDate: doneCount
      }
    });
  };

  filter(items, filter) {
    switch(filter) {
    case 'all' :
      return items;
    case 'active' :
      return items.filter(item => !item.done);
    case 'done' :
      return items.filter(item => item.done);
    default:
      return items;
    }
  };

  static defaultProps = {
    addItem: () => {},
    deleteItem: () => {},
    onToggleDone: () => {},
    deleteItems: () => {},
    onFilterChange: () => {}
  }

  static propTypes = {
    maxid: PropTypes.number,
    filter: PropTypes.func,
    addItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
  };

  
  render() {
    const { todoDate, filter } = this.state;
    const visibleItems = this.filter(todoDate, filter);
    const doneCount = todoDate.filter((el) => el.done).length;
    const todoCount = todoDate.length - doneCount;

    return (
      <section className='todoapp'>
        <Header onItemAdded = {this.addItem}/>
        <Main todos = {visibleItems}
          onDeleted = {this.deleteItem}
          onToggleDone = {this.onToggleDone}
        />
        <Footer todo = {todoCount}
          deleteItems = {this.deleteItems}
          filter = {filter}
          onFilterChange = {this.onFilterChange}
        />
      </section>
    );
  };
};

