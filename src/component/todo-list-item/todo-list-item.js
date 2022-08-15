import React, {Component} from "react";
import './todo-list-item.css';

export default class TodoListItem extends Component {

    state = {
        descriptionLine: false
    };

    onLabelClick = () => {
        this.setState((state) => {
            return {
                descriptionLine: !this.state.descriptionLine
            };
        });
    };

    render() {
        const {label, onDeleted} = this.props;
        const {descriptionLine} = this.state;

        let className = 'description';
        if (descriptionLine) {
            className += ' description-line'
        }

        return (
            <div className="view">
                <input className="toggle" type="checkbox"/>
                <label>
                    <span className={className}
                    onClick={this.onLabelClick}>
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

