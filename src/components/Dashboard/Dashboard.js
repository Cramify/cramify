import React, { Component } from 'react'

export default class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: '',
            imgURL: '',
            score: 0
        }
    }

    render() {
        return (
            <div>
                DashBoard
            </div>
        )
    }
}