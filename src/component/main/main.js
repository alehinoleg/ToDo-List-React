import React from "react";
import TodoList from "../todo-list";
import './main.css'

const Main = ({todos}) => {
    return (
        <section className='main'>
            <TodoList todos = {todos}/>
        </section>
    );
};

export default Main;