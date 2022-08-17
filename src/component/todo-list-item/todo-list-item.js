import React, {Component} from "react";
import './todo-list-item.css';

export default class TodoListItem extends Component {

    render() {
        const {label, onDeleted, onToggleDone, done} = this.props;

        let className = 'description';
        if (done) {
            className += ' description-line'
        }

        return (
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className={className}
                    onClick={onToggleDone}>
                        {label}
                    </span>
                    <span className="created">created 5 minutes ago</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                        onClick={onDeleted}></button>
            </div>
        );
    };
};

