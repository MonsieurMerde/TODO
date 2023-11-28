import React from 'react';
import { Link } from 'react-router-dom';

const ToDoItem = ({todo, deleteToDo}) => {
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
            <td>
                <button onClick={() => deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    );
};

const ToDoList = ({todos, deleteToDo}) => {
    let filteredTodos = todos.filter((todo) => todo.isActive === true)
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
                {filteredTodos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
            </table>
            <Link to='/todo/create'>Create ToDo</Link>
        </div>
    );
};

export default ToDoList;