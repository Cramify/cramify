import React, {Component} from 'react'
import Timer from './Timer'

export default class Question extends Component{
    constructor(props){
        super(props)
        this.state = {
            didAnswer: false,
            question: 'Watermelon?',
            // dont think we need correct answer in this component. correctAnswer in the gameRoom component
            correctAnswer: '1 yeet my dood!',
            answerTwo: '2 Ew! Whats wrong with you?!',
            answerThree: '3 Whats watermelon?',
            answerFour: '4 No',
            answerArray: [],
            userAnswer: []
        }
    }

    componentDidMount(){
        let {correctAnswer, answerTwo, answerThree, answerFour} = this.state
        let answers = [correctAnswer, answerTwo, answerThree, answerFour]
        let newAnswers = []
        for(let i in answers){
            let randomIndex = Math.floor(Math.random() * answers.length)
            while(newAnswers.includes(answers[randomIndex])){
                randomIndex = Math.floor(Math.random() * answers.length)
            }
            newAnswers[i] = answers[randomIndex]
        }
        this.setState({
            answerArray: newAnswers
        })

    }

    answerQuestion1 = () => {
        this.setState({
            didAnswer: true
        })
        if(this.state.answerArray[0] === this.state.correctAnswer){
            console.log('correct')
        } else {
            console.log('incorrect')
        }
    }

    answerQuestion2 = () => {
        this.setState({
            didAnswer: true
        }) 
        if(this.state.answerArray[1] === this.state.correctAnswer){
            console.log('correct')
        } else {
            console.log('incorrect')
        }
    }

    answerQuestion3 = () => {
        this.setState({
            didAnswer: true
        })
        if(this.state.answerArray[2] === this.state.correctAnswer){
            console.log('correct')
        } else {
            console.log('incorrect')
        }
    }

    answerQuestion4 = () => {
        this.setState({
            didAnswer: true
        })
        if(this.state.answerArray[3] === this.state.correctAnswer){
            console.log('correct')
        } else {
            console.log('incorrect')
        }
    }

    render(){
        return(
            <div>
                <h1>Questions</h1>

                {/* this will be a prop from GameRoom.state.questions*/}
                <h1>{this.state.question}</h1>

                {/*<Timer />*/}

                {/* one of these will be a prop from GameRoom.state.correctAnswer*/}
                {/* The rest will be props from GameRoom.state.questions*/}
                {!this.state.didAnswer ? (
                    <div className='answers'>
                        <button onClick={this.answerQuestion1}>{this.state.answerArray[0]}</button>
                        <button onClick={this.answerQuestion2}>{this.state.answerArray[1]}</button>
                        <button onClick={this.answerQuestion3}>{this.state.answerArray[2]}</button>
                        <button onClick={this.answerQuestion4}>{this.state.answerArray[3]}</button>
                    </div>
                    ) :
                    <div>
                        <h2>{this.state.answerArray[0]}</h2>
                        <h2>{this.state.answerArray[1]}</h2>
                        <h2>{this.state.answerArray[2]}</h2>
                        <h2>{this.state.answerArray[3]}</h2>
                    </div>
                }
                
            </div>
        )
    }
}