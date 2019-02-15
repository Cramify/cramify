import React, {Component} from 'react'
import Timer from './Timer'

export default class Question extends Component{
    constructor(props){
        super(props)
        this.state = {
            didAnswer: false,
            question: [],
            // dont think we need correct answer in this component. correctAnswer in the gameRoom component
            correctAnswer: '',
            answerArray: []
        }
    }

    componentDidMount = () => {
        console.log(this.props.questionData)
        const {answer_2, answer_3, answer_4, correct_answer} = this.props.questionData
        let answers = [];
        let newAnswers = [];
        answers.push(answer_2, answer_3, answer_4, correct_answer);
        for(let i = 0; i < answers.length; i++){
            let randomIndex = Math.floor(Math.random() * answers.length)
            while(newAnswers.includes(answers[randomIndex])){
                randomIndex = Math.floor(Math.random() * answers.length)
            }
            newAnswers[i] = answers[randomIndex]
        } 

        this.setState({
            answerArray: newAnswers,
            correctAnswer: correct_answer
        })


    }

    answerQuestion = (num) => {
        this.setState({
            didAnswer: true
        })
        if(this.state.answerArray[num-1] === this.state.correctAnswer){
            console.log('correct')
        } else {
            console.log('incorrect')
        }
    }

    render(){
        return(
            <div>
                <h1>Question:</h1>
                <Timer timerFn={this.props.toResFn} time={1}/>

                {/* this will be a prop from GameRoom.state.questions*/}
                <h1>{this.props.questionData.question}</h1>


                {/*<Timer />*/}

                {/* one of these will be a prop from GameRoom.state.correctAnswer*/}
                {/* The rest will be props from GameRoom.state.questions*/}
                {!this.state.didAnswer ? (
                    <div className='answers'>
                        <button onClick={() => this.answerQuestion(1)}>{this.state.answerArray[0]}</button>
                        <button onClick={() => this.answerQuestion(2)}>{this.state.answerArray[1]}</button>
                        <button onClick={() => this.answerQuestion(3)}>{this.state.answerArray[2]}</button>
                        <button onClick={() => this.answerQuestion(4)}>{this.state.answerArray[3]}</button>
                    </div>
                    ) :
                    <div>
                        <button disabled>{this.state.answerArray[0]}</button>
                        <button disabled>{this.state.answerArray[1]}</button>
                        <button disabled>{this.state.answerArray[2]}</button>
                        <button disabled>{this.state.answerArray[3]}</button>
                    </div>
                }
                
            </div>
        )
    }
}