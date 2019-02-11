import React, {Component} from 'react'

export default class Results extends Component{
    constructor(props){
        super(props)
        this.state = {
            // dont think we need this. users in gameRoom array
            users: [],
            // dont think we need this. correctAnswer is GameRoom
            correctAnswer: ''
        }
    }

    render(){
        return(
            <div>
                Results
            </div>
        )
    }
}