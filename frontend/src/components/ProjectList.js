import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`/projects/${project.id}`}>{project.projectName}</Link>    
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {project.description}
            </td>
            <td>
                {project.projectTeam}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)} type='button'>Delete</button>
            </td>
        </tr>
    );
};

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table>
                <th>
                    Name of Project
                </th>
                <th>
                    Link
                </th>
                <th>
                    Description
                </th>
                <th>
                    Team of Project
                </th>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject} />)}
            </table>
            <Link to='/projects/create'>Create Project</Link>
        </div>
    );
};

export default ProjectList;