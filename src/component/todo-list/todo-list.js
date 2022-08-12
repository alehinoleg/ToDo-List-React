import React from "react";

import './todo-list.css'
import TodoListItem from "../todo-list-item";

const TodoList = ({todos}) => {
    const element = todos.map((item) => {
        console.log(item.completed)
        if (item.edit) {
            return (
                <div key={item.id}>
                    <li className='editing'>
                        <input type="text" className="edit" value="Editing task"/>
                    </li>
                    <li>
                        <TodoListItem label = {item.label} сompleted = {item.completed}/>
                    </li>
                </div>
            )
        }
        return (
            <li key={item.id}><TodoListItem label = {item.label} сompleted = {item.completed}/></li>
        )
    })
    return (
        <ul className="todo-list">
            {element}
        </ul>
    );
};

export default TodoList;