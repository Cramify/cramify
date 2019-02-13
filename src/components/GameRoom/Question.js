import React, {Component} from 'react'
import Timer from './Timer'

export default class Question extends Component{
    constructor(props){
        super(props)
        this.state = {
            timer: 0,
            didAnswer: false,
            question: '',
            // dont think we need correct answer in this component. correctAnswer in the gameRoom component
            correctAnswer: '',
            answerTwo: '',
            answerThree: '',
            answerFour: ''
        }
    }

    render(){
        return(
            <div>
                Questions
                <Timer />
            </div>
        )
    }
}