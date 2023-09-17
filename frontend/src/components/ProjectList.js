import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({project}) => {
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
        </tr>
    );
};

const ProjectList = ({projects}) => {
    return (
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
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    );
};

export default ProjectList;