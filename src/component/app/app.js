import React, { Component } from "react";

import Header from "../header";
import Main from "../main";
import Footer from "../footer";
import './app.css'


export default class App extends Component{

    state = {
        todoDate : [
            {label:'Completed task', edit: false, completed:true, id:1},
            {label:'Active task', edit: true, completed:false, id:2},
        ]
    };

    deleteItem = (id) => {
        this.setState(({todoDate}) => {
            const idx = todoDate.findIndex((el) => el.id === id);
            const newArr = [...todoDate.slice(0, idx), ...todoDate.slice(idx + 1)];

            return {todoDate: newArr};
        });
    };



    render() {
        return (
            <section className='todoapp'>
                <Header/>
                <Main todos = {this.state.todoDate} onDeleted = {this.deleteItem}/>
                <Footer/>
            </section>
        );
    };
};

