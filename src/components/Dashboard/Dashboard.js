import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            imgURL: '',
            score: 0
        }
    }

    logout = () => {
        axios.post('/auth/logout')
    }

    render() {
        return (
            <div>
                Dashboard
                <Link to='/'><button onClick={this.logout}>Logout</button></Link>
            </div>
        )
    }
}