import React from 'react';

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.projectName}
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