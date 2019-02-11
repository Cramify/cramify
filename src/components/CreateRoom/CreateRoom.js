import React, { Component } from 'react'

export default class CreateRoom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            roomName: '',
            roomId: 0,
            sets: []
        }
    }

    render() {
        return (
            <div>
                CreateRoom
            </div>
        )
    }
}