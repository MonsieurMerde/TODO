import React from 'react';
import { useParams } from 'react-router-dom';

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

const ProjectToDoList = ({todos, deleteToDo}) => {
    let {projectID} = useParams()
    let filteredTodos = todos.filter((todo) => todo.project === parseInt(projectID) && todo.isActive === true)
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
            {filteredTodos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo} />)}
        </table>
    );
};

export default ProjectToDoList;