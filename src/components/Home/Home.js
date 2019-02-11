import React, { Component } from 'react'

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
                Home
            </div>
        )
    }
}