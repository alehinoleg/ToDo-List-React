import React from "react";
import TodoList from "../todo-list";
import './main.css'

const Main = ({todos, onDeleted}) => {
    return (
        <section className='main'>
            <TodoList todos = {todos} onDeleted = {onDeleted}/>
        </section>
    );
};

export default Main;