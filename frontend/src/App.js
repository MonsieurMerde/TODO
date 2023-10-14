import React from 'react';
import NotFound404 from './components/NotFound404';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ProjectToDoList from './components/ProjectToDoList';
import ToDoList from './components/ToDoList';
import UserList from './components/UserList';
import LoginForm from './components/Auth';
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
            <Menu />
            <BrowserRouter>
                <Routes>
                    <Route exact path='/users' element={<UserList users={this.state.users} />} />
                    <Route exact path='/projects'>
                        <Route index element={<ProjectList projects={this.state.projects} />} />
                        <Route path=':projectID' element={<ProjectToDoList todos={this.state.todos} />} />
                    </Route>
                    <Route exact path='/todo' element={<ToDoList todos={this.state.todos} />} />
                    <Route exact path='/login' element={<LoginForm />} />
                    <Route exact path='/' element={<Navigate to='/users' />} />
                    <Route path='*' element={<NotFound404 />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </div>
        )
    }
    }

export default App;
