import React, { Component } from 'react'
import Register from './Register'

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailInput: '',
            userInput: '',
            passInput: ''
        }
    }

    render() {
        return (
            <div>
                <Register />
                Home
            </div>
        )
    }
}