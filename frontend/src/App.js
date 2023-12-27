import React from 'react';
import NotFound404 from './components/NotFound404';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ProjectToDoList from './components/ProjectToDoList';
import ToDoList from './components/ToDoList';
import UserList from './components/UserList';
import LoginForm from './components/Auth';
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
        'users': [],
        'projects': [],
        'todos': [],
        'tokenAccess': '',
        'tokenRefresh': '',
        }
    }

    setToken(tokenAccess, tokenRefresh) {
        localStorage.setItem('tokenAccess', tokenAccess)
        localStorage.setItem('tokenRefresh', tokenRefresh)
        this.setState(
            {
                'tokenAccess': tokenAccess,
                'tokenRefresh': tokenRefresh
            },
            () => this.getData()
        )
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-jwt/', {username: username, password: password})
            .then(response => {
                this.setToken(response.data.access, response.data.refresh)
            }
            )
            .catch(error => {
                console.log(error)
                // if (error.response.status === 401) {
                //     alert('Неверный логин или пароль')
                // }
                // else {
                //     console.log(error)
                // }

            }
            )
    }

    isAuth() {
        return !!this.state.tokenAccess
    }

    logout() {
        this.setToken('', '')
    }

    getHeaders() {
        let headers = {}
        if(this.isAuth()) {
            headers['Authorization'] = `Bearer ${this.state.tokenAccess}`
        }
        return headers
    }
    
    getData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data
                this.setState(
                    {
                        'users': users
                    }
                )  
            }
            )
            .catch(error => {
                console.log(error)
                this.setState(
                    {
                        'users': []
                    }
                )
            }
            )

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data
                this.setState(
                    {
                        'projects': projects
                    }
                )  
            }
            )
            .catch(error => {
                console.log(error)
                this.setState(
                    {
                        'projects': []
                    }
                )
            }
            )

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data
                this.setState(
                    {
                        'todos': todos
                    }
                )  
            }
            )
            .catch(error => {
                console.log(error)
                this.setState(
                    {
                        'todos': []
                    }
                )
            }
            )
    }

    getTokenFromStorage() {
        const tokenAccess = localStorage.getItem('tokenAccess')
        const tokenRefresh = localStorage.getItem('tokenRefresh')
        this.setState(
            {
                'tokenAccess': tokenAccess,
                'tokenRefresh': tokenRefresh
            },
            () => this.getData()
        )
    }

    componentDidMount() {
        this.getTokenFromStorage()
    }
    
    render() {
        return (
        <div>
            <Menu />
            <BrowserRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/projects'>Projects</Link>
                        </li>
                        <li>
                            {
                                this.isAuth() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>
                            }
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path='/users' element={<UserList users={this.state.users} />} />
                    <Route exact path='/projects'>
                        <Route index element={<ProjectList projects={this.state.projects} />} />
                        <Route path=':projectID' element={<ProjectToDoList todos={this.state.todos} />} />
                    </Route>
                    <Route exact path='/todo' element={<ToDoList todos={this.state.todos} />} />
                    <Route exact path='/login' element={<LoginForm getToken={(username, password) => this.getToken(username, password)} />} />
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
