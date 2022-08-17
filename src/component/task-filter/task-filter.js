import React, {Component} from "react";
import './task-filter.css'

export default class TaskFilter extends Component {

    buttons = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'done', label: 'Completed'},
    ];

    render() {
        const { filter, onFilterChange } = this.props;
        const buttons = this.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive?'selected':'';
            return(
                <li key={name}>
                    <button className={clazz}
                            onClick={()=>onFilterChange(name)}
                    >{label}</button>
                </li>
            );
        });

        return (
            <ul className="filters">
                {buttons}
            </ul>
        );
    };
};
