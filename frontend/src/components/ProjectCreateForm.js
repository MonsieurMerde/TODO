import React from 'react';


class ProjectCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            link: '',
            description: '',
            projectTeam: []
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleProjectTeamSelect(event) {
        let projectTeam = []
        for (let option of event.target.selectedOptions) {
            projectTeam.push(option.value)
        }
        this.setState(
            {
                'projectTeam': projectTeam
            }
        )
    }

    handleSubmit(event) {
        this.props.createProject(
            this.state.projectName, 
            this.state.link, 
            this.state.description, 
            this.state.projectTeam
        )
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type='text' name='projectName' placeholder='Name of Project' 
                    value={this.state.projectName} onChange={(event) => this.handleChange(event)} />
                <input type='text' name='link' placeholder='Link' 
                    value={this.state.link} onChange={(event) => this.handleChange(event)} />
                <input type='text' name='description' placeholder='Description' 
                    value={this.state.description} onChange={(event) => this.handleChange(event)} />
                <select multiple name='projectTeam' placeholder='Team of Project' 
                    onChange={(event) => this.handleProjectTeamSelect(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>
                <input type='submit' value='Create Project' />
            </form>
        )
    }
}

export default ProjectCreateForm;