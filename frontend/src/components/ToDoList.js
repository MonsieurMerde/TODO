import React from 'react';

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
    );
};

export default ToDoList;