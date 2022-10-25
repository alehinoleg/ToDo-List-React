import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import './app.css'



export default class App extends Component{

  state = {
    todoDate : [],
    filter: 'all',
  };

  createTodoItem(label, min, sec, endTimer = false) {
    return {
      label,
      min,
      sec,
      endTimer,
      edit: false,
      done: false,
      id: uuidv4(),
      onPlay: false,
    };
  };

  componentDidMount() {
    this.setState(() => JSON.parse(localStorage.getItem('state')))
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state))
  }

  deleteItem = (id) => {
    this.setState(({todoDate}) => {
      const idx = todoDate.findIndex((el) => el.id === id);
      const newArr = [...todoDate.slice(0, idx), ...todoDate.slice(idx + 1)];

      return {todoDate: newArr};
    });
  };

  addItem = (text, min, sec, endTimer ) => {
    const newItem = this.createTodoItem(text, min , sec, endTimer)
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

  isEditing = (id) => {
    this.setState({
      todoDate: [...this.state.todoDate].map((el) => {
        if (el.id === id) {
          el.edit = !el.edit;
          return el;
        }
        return el;
      })
    })  
  };

  onItemEdit = (text, id) => {
    event.preventDefault();
    //const newItem = this.createTodoItem(text)
    if (text !== '') {
      this.setState({
        todoDate: this.state.todoDate.map((el) => {
          if (el.id === id ) {
            el.label = text
            el.edit = false
            return {...el}
          }
          return el;
        })
      })
    } else {
      alert('введите текст редактирования')
    }
    
  }

  /*onPlay = (id) => {
    this.setState(({todoDate}) => {
      const newArr = todoDate.map((task) => {
        if (task.id === id) {
          if(!task.timerOn) {
            task.timerID = setInterval(() => this.startTimer(task.min, task.sec, task.id, task.endTimer), 1000);
          }
        }
        return task;
      });
      return {
        todoDate: newArr
      };
    });
  };

  onPause = (id) => {
    console.log('нажал паузу')
    this.setState(({todoDate}) => {
      const newArr = todoDate.map((task) => {
        if (task.id === id) {
          clearInterval(task.timerID);
          task.timerOn = false;
        }
        return task;
      });
      return {
        todoDate: newArr
      }
    })
  }*/

  onPlay = (id) => {
    this.couter = setInterval(() => {
      this.setState({
        todoDate: [...this.state.todoDate].map((el) => {
          if (el.id === id) {
            if (el.endTimer) {
              if (el.sec >= 0) {
                el.sec--;
              }

              if (el.sec < 0) {
                el.min--;
                el.sec = 59;
              }

              if (el.min === 0 && el.sec === 0) {
                this.onPause();
                alert('Время вышло!');
              }
            } else {
              if (el.sec < 59) {
                el.sec++
              }
              if (el.sec === 59) {
                el.sec = 0
                el.min++
              }
            }  
          }
          return el;
        })
      });
    }, 1000)
  };
  

  onPause = () => {
    clearInterval(this.couter);
  }

  

  ACTIONS = {
    ALL: 'all',
    ACTIVE: 'active',
    DONE: 'done',
  };

  filter(items, filter) {
    switch(filter) {
    case this.ACTIONS.ALL :
      return items;
    case this.ACTIONS.ACTIVE :
      return items.filter(item => !item.done);
    case this.ACTIONS.DONE :
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
  };

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
          isEditing = {this.isEditing}
          onItemEdit = {this.onItemEdit}
          onPlay = {this.onPlay}
          onPause = {this.onPause}
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

