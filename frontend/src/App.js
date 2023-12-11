import React from 'react';
import NotFound404 from './components/NotFound404';
import Menu from './components/Menu';
import Footer from './components/Footer';
import ProjectCreateForm from './components/ProjectCreateForm';
import ToDoCreateForm from './components/ToDoCreateForm ';
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
        'tokenRefresh': ''
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
                if (error.response.status === 401) {
                    alert('Неверный логин или пароль')
                }
                else {
                    console.log(error)
                }

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
        console.log(headers)
        return headers
    }
    //     let headers = {}
    //     if(this.isAuth()) {
    //         headers['Authorization'] = `Bearer ${localStorage.getItem('tokenAccess')}`
    //     }
    //     console.log(headers)
    //     return headers
    // }
        // let headers = {}
        // if(this.isAuth()) {
        //     axios.post('http://127.0.0.1:8000/api-jwt/verify/', {token: localStorage.getItem('tokenAccess')})
        //     .then(response => {
        //         console.log('Токен валидный')
        //     }
        //     )
        //     .catch(error => {
        //         if (error.response.data.code === 'token_not_valid') {
        //             axios.post('http://127.0.0.1:8000/api-jwt/refresh/', {refresh: localStorage.getItem('tokenRefresh')})
        //             .then(response => {
        //                 console.log(response.data.access)
        //                 localStorage.setItem('tokenAccess', response.data.access)
        //             }
        //             )
        //         }
        //         else {
        //             console.log(error)
        //         }
        //     }
        //     )
        //     console.log(localStorage.getItem('tokenAccess'))
        //     headers['Authorization'] = `Bearer ${localStorage.getItem('tokenAccess')}`
        // }
        // return headers
    // }
        // if(this.isAuth()) {
        //     axios.post('http://127.0.0.1:8000/api-jwt/verify/', {token: this.state.tokenAccess})
        //     .then(response => {
        //         console.log('Токен валидный')
        //     }
        //     )
        //     .catch(error => {
        //         if (error.response.data.code === 'token_not_valid') {
        //             axios.post('http://127.0.0.1:8000/api-jwt/refresh/', {refresh: this.state.tokenRefresh})
        //             .then(response => {
        //                 this.setState(
        //                     {
        //                         'tokenAccess': response.data.access
        //                     }
        //                 )
        //             }
        //             )
        //             .catch(error => {
        //                 console.log(error)
        //             }
        //             )
        //         }
        //     }
        //     )
        //     console.log('test')
        //     headers['Authorization'] = `Bearer ${this.state.tokenAccess}`
        // }
        // return headers
        // if(this.isAuth()) {
        //     // if (!this.state.isValidTokenAccess) {
        //     //     this.refreshTokenAccess(this.state.tokenRefresh)
        //     // }
        //     let tokenAccess = localStorage.getItem('tokenAccess')
        //     let tokenRefresh = localStorage.getItem('tokenRefresh')
        //     axios.post('http://127.0.0.1:8000/api-jwt/verify/', {token: tokenAccess})
        //         .then(response => {
        //             // this.setState(
        //             //     {
        //             //         'tokenAccess': tokenAccess,
        //             //         'tokenRefresh': tokenRefresh
        //             //     }
        //             // )
        //             console.log('Токен валидный')
        //             console.log(this.state.tokenAccess)
        //             console.log(tokenAccess)
        //         }
        //         )
        //         .catch(error => {
        //             if (error.response.data.code === 'token_not_valid') {
        //                 axios.post('http://127.0.0.1:8000/api-jwt/refresh/', {refresh: tokenRefresh})
        //                     .then(response => {
        //                         console.log('Токен обновлён')
        //                         console.log(response.data.access)
        //                         localStorage.setItem('tokenAccess', response.data.access)
        //                         // this.setState(
        //                         //     {
        //                         //         'tokenAccess': response.data.access
        //                         //     }
        //                         // )
        //                         console.log('Обновлённый токен из localStorage')
        //                         console.log(localStorage.getItem('tokenAccess'))
        //                         headers['Authorization'] = `Bearer ${localStorage.getItem('tokenAccess')}`
        //                     }
        //                     )
        //                     .catch(error => {
        //                         console.log(error)
        //                     }
        //                     )
        //             }
        //             else {
        //                 console.log(error)
        //             }
        //         }
        //         )
        //     // tokenAccess = localStorage.getItem('tokenAccess')
        //     console.log('Обновлённый токен из localStorage после пост-запроса на verify')
        //     console.log(tokenAccess = localStorage.getItem('tokenAccess'))
        //     headers['Authorization'] = `Bearer ${localStorage.getItem('tokenAccess')}`
        // }
        // axios.post('http://127.0.0.1:8000/api-jwt/verify/', {token: tokenAccess})
        //     .then(response => {
        //         this.setState(
        //             {
        //                 'isValidTokenAccess': true
        //             }
        //         )
        //         console.log('Токен валидный в verifyValidTokenAccess', this.state.isValidTokenAccess)
        //     }
        //     )
        //     .catch(error => {
        //         if (error.response.data.code === 'token_not_valid') {
        //             this.setState(
        //                 {
        //                     'isValidTokenAccess': false
        //                 }
        //             )
        //             console.log('Токен невалидный в verifyValidTokenAccess', this.state.isValidTokenAccess)
        //         }
        //         else {
        //             console.log(error)
        //         }
        //     }
        //     )
    
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
        // const tokenAccess = localStorage.getItem('tokenAccess')
        // const tokenRefresh = localStorage.getItem('tokenRefresh')
        // this.setState(
        //     {
        //         'tokenAccess': tokenAccess,
        //         'tokenRefresh': tokenRefresh
        //     },
        //     () => this.getData()
        // )
        const tokenAccess = localStorage.getItem('tokenAccess')
        const tokenRefresh = localStorage.getItem('tokenRefresh')
        axios.post('http://127.0.0.1:8000/api-jwt/verify/', {token: tokenAccess})
            .then(response => {
                this.setState(
                    {
                        'tokenAccess': tokenAccess,
                        'tokenRefresh': tokenRefresh
                    },
                    () => this.getData()
                    )
                console.log('Токен валидный')
            }
            )
            .catch(error => {
                if (error.response.data.code === 'token_not_valid') {
                    axios.post('http://127.0.0.1:8000/api-jwt/refresh/', {refresh: tokenRefresh})
                        .then(response => {
                            localStorage.setItem('tokenAccess', response.data.access)
                            this.setState(
                                {
                                    'tokenAccess': response.data.access
                                },
                                () => this.getData(),
                                console.log('Токен обновлён')
                            )
                        }
                        )
                        .catch(error => {
                            console.log(error)
                        }
                        )
                }
                else {
                    console.log(error)
                }
            }
            )
    }
    
    createProject(projectName, link, description, users) {
        const headers = this.getHeaders()
        axios.post(
            'http://127.0.0.1:8000/api/projects/', 
            {'project_name': projectName, 'link': link, 'description': description, 'project_team': users}, 
            {headers}
        )
            .then(response => {
                this.getData()
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    deleteProject(projectID) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${projectID}`, {headers})
            .then(response => {
                this.getData()
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    createToDo(project, text, userCreated, isActive) {
        const headers = this.getHeaders()
        axios.post(
            'http://127.0.0.1:8000/api/todo/', 
            {'project': project, 'text': text, 'user_created': userCreated, 'is_active': isActive}, 
            {headers}
        )
            .then(response => {
                this.getData()
            }
            )
            .catch(error => {
                console.log(error)
            }
            )
    }

    deleteToDo(todoID) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/todo/${todoID}`, {headers})
            .then(response => {
                this.getData()
            }
            )
            .catch(error => {
                console.log(error)
            }
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
                            <Link to='/todo'>ToDo</Link>
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
                        <Route index element={<ProjectList projects={this.state.projects} 
                            deleteProject={(projectID) => this.deleteProject(projectID)} />} />
                        <Route path=':projectID' element={<ProjectToDoList todos={this.state.todos} 
                            deleteToDo={(todoID) => this.deleteToDo(todoID)} />} />
                    </Route>
                    <Route exact path='/projects/create' element={<ProjectCreateForm users={this.state.users} 
                        createProject={(projectName, link, description, users) => 
                        this.createProject(projectName, link, description, users)} />} />
                    <Route exact path='/todo/create' element={<ToDoCreateForm projects={this.state.projects}
                        users={this.state.users} createToDo={(project, text, userCreated, isActive) =>
                        this.createToDo(project, text, userCreated, isActive)} />} />
                    <Route exact path='/todo' element={<ToDoList todos={this.state.todos} 
                        deleteToDo={(todoID) => this.deleteToDo(todoID)} />} />
                    <Route exact path='/login' 
                        element={<LoginForm getToken={(username, password) => 
                        this.getToken(username, password)} />} />
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
