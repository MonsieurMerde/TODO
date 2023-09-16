import React from 'react';
import NavbarItem from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ToDoList from './components/ToDoList';
import UserList from './components/UserList';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        'users': [],
        'projects': [],
        'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )  
            }
            )
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )  
            }
            )
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/')
            .then(response => {
                const todos = response.data
                console.log(todos)
                this.setState(
                    {
                        'todos': todos
                    }
                )  
            }
            )
            .catch(error => console.log(error))
    }

    
    render() {
        return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/users' element={<UserList users={this.state.users} />} />
                    <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
                    <Route exact path='/todo' element={<ToDoList todos={this.state.todos} />} />
                    <Route exact path='/' element={<Navigate to='/users' />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
        )
    }
    }

export default App;
