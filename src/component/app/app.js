import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';

import './app.css'


let couter
const App = () => {

  const [data, setData] = useState({
    todoDate : [],
    filter: 'all',
  });

  const createTodoItem = (label, min, sec, endTimer = false)  => {
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

  useEffect(() => {
    if (localStorage.getItem('state')) {
      setData(JSON.parse(localStorage.getItem('state')))
    }
  }, [])

  useEffect(() => {
    if (data.todoDate.length !== 0 ) {
      localStorage.setItem('state', JSON.stringify(data))
    }
  }, [data])

  const deleteItem = (id) => {
    setData((data) => {
      const idx = data.todoDate.findIndex((el) => el.id === id);
      const newArr = [...data.todoDate.slice(0, idx), ...data.todoDate.slice(idx + 1)];
      return {...data, todoDate: newArr}
    });
  };

  const addItem = (text, min, sec, endTimer ) => {
    const newItem = createTodoItem(text, min , sec, endTimer);
    setData((data) => {
      const newArr = [ newItem, ...data.todoDate ];
      return {...data, todoDate: newArr}
    });
  };

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {...oldItem, [propName]: !oldItem[propName]};
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  const onToggleDone = (id) => {
    setData((data) => {
      return {...data, todoDate: toggleProperty(data.todoDate, id, 'done')}
    });
  };

  const onFilterChange = (filter) => {
    setData((data) => {
      return {...data, filter}
    });
  }

  const deleteItems = () => {
    setData((data) => {
      const doneCount = data.todoDate.filter((el) => !el.done);
      return {...data, todoDate: doneCount}
    });
  };

  const isEditing = (id) => {
    setData((data) => {
      return {...data, todoDate: data.todoDate.map((el) => {
        if (el.id === id) {
          el.edit = !el.edit;
          return el;
        }
        return el;
      })}
    });
  };

  const onItemEdit = (text, id) => {
    event.preventDefault();
    if (text !== '') {
      setData((data) => {
        return {...data, todoDate: data.todoDate.map((el) => {
          if (el.id === id ) {
            el.label = text
            el.edit = false
            return {...el}
          }
          return el;
        })}
      }) 
    } else {
      alert('введите текст редактирования')
    }
  }
  
  const onPlayButton = (id) => {
    couter = setInterval(() => {
      setData((data) => {
        return {...data, todoDate: data.todoDate.map((el) => {
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
                onPauseButton();
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
        })}
      })
    }, 1000)
  }

  const onPauseButton = () => {
    clearInterval(couter);
  }

  const ACTIONS = {
    ALL: 'all',
    ACTIVE: 'active',
    DONE: 'done',
  };

  const filter = (items, filter) => {
    switch(filter) {
    case ACTIONS.ALL :
      return items;
    case ACTIONS.ACTIVE :
      return items.filter(item => !item.done);
    case ACTIONS.DONE :
      return items.filter(item => item.done);
    default:
      return items;
    }
  };

  /*static defaultProps = {
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
  };*/

  
  const visibleItems = filter(data.todoDate, data.filter);
  const doneCount = data.todoDate.filter((el) => el.done).length;
  const todoCount = data.todoDate.length - doneCount;
  return (
    <section className='todoapp'>
      <Header onItemAdded = {addItem}/>
      <Main todos = {visibleItems}
        onDeleted = {deleteItem}
        onToggleDone = {onToggleDone}
        isEditing = {isEditing}
        onItemEdit = {onItemEdit}
        onPlay = {onPlayButton}
        onPause = {onPauseButton}
      />
      <Footer todo = {todoCount}
        deleteItems = {deleteItems}
        filter = {filter}
        onFilterChange = {onFilterChange}
      />
    </section>
  );

};

export default App;

