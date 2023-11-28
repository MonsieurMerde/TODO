import React from 'react';


class ToDoCreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: this.props.projects[0].id,
            text: '',
            userCreated: this.props.users[0].id,
            isActive: true
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.createToDo(
            this.state.project, 
            this.state.text, 
            this.state.userCreated, 
            this.state.isActive
        )
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select name='project' placeholder='Project'
                    onChange={(event) => this.handleChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}>{project.projectName}</option>)}
                </select>
                <input type='text' name='text' placeholder='Text of ToDo' 
                    value={this.state.text} onChange={(event) => this.handleChange(event)} />
                <select name='userCreated' placeholder='User created' 
                    onChange={(event) => this.handleChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}>{user.username}</option>)}
                </select>
                <input type='submit' value='Create ToDo' />
            </form>
        )
    }
}

export default ToDoCreateForm;