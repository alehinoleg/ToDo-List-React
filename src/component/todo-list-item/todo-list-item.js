import React from "react";
import './todo-list-item.css'

const TodoListItem = ({label, сompleted}) => {
    return (
        <div className="view">
            <input className="toggle" type="checkbox"/>
            <label>
                <span className={`description ${сompleted?'description-line':''}`}>{label}</span>
                <span className="created">created 5 minutes ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy"></button>
        </div>
    );
};

export default TodoListItem;

