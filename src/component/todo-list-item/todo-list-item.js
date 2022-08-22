import React, {Component} from "react";
import './todo-list-item.css';
import {formatDistanceToNow} from "date-fns";

export default class TodoListItem extends Component {

    state = {
        date: new Date(),
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({

        });
    }

    render() {
        const {label, onDeleted, onToggleDone, done} = this.props;
        const { date } = this.state

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
                    <span className="created">
                        {formatDistanceToNow(date,
                            {includeSeconds: true})}
                    </span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"
                        onClick={onDeleted}></button>
            </div>
        );
    };
};

