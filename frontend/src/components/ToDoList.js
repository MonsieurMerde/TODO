import React from 'react';
import { Link } from 'react-router-dom';

const ToDoItem = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.userCreated}
            </td>
        </tr>
    );
};

const ToDoList = ({todos}) => {
    return (
        <div>
            <table>
                <th>
                    Project
                </th>
                <th>
                    Text
                </th>
                <th>
                    Creator
                </th>
                {todos.map((todo) => <ToDoItem todo={todo} />)}
            </table>
            <Link to='/todo/create'>Create ToDo</Link>
        </div>
    );
};

export default ToDoList;