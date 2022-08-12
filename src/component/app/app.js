import React from "react";

import Header from "../header";
import Main from "../main";
import Footer from "../footer";
import './app.css'

const App = () => {

    const todoDate = [
        {label:'Completed task', edit: false, completed:true, id:1},
        {label:'Active task', edit: true, completed:false, id:2},
    ]

    return (

            <section className='todoapp'>
                <Header/>
                <Main todos = {todoDate}/>
                <Footer/>
            </section>

    );
}

export default App;