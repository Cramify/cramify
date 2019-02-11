import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import EditUser from './EditUser'

export default class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            imgURL: '',
            score: 0,
            edit: false
        }
    }

    logout = () => {
        axios.post('/auth/logout')
    }

    toggleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        return (
            <div>
                Dashboard
                <i className="fas fa-pen" onClick={this.toggleEdit} />
                <Link to='/'><button onClick={this.logout}>Logout</button></Link>
                {this.state.edit && <EditUser toggleFn={this.toggleEdit}/>}
            </div>
        )
    }
}