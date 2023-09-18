import React from 'react';
import { useParams } from 'react-router-dom';

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

const ProjectToDoList = ({todos}) => {
    let {projectID} = useParams()
    let filtered_todos = todos.filter((todo) => todo.project == projectID)
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
            {filtered_todos.map((todo) => <ToDoItem todo={todo} />)}
        </table>
    );
};

export default ProjectToDoList;