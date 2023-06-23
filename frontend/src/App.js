import React from 'react';
import UserList from './components/UserList';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        'users': []
        }
    }

    componentDidMount() {
        const users = [
        {
            "username": "admin",
            "first_name": "",
            "last_name": "",
            "email": "admin@todo.com"
        },
        {
            "username": "user1",
            "first_name": "",
            "last_name": "",
            "email": "user1@todo.com"
        },
        {
            "username": "user2",
            "first_name": "",
            "last_name": "",
            "email": "user2@todo.com"
        },
        {
            "username": "moderator1",
            "first_name": "",
            "last_name": "",
            "email": "moderator1@todo.com"
        }
    ]
    this.setState(
        {
            'users': users
        }
    )  
    }

    render() {
        return (
        <div>
            <UserList users={this.state.users} />
        </div>
        )
    }
    }

export default App;
