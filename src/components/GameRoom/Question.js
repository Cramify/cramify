import React, {Component} from 'react'
import Timer from './Timer'
import './Question.scss'

export default class Question extends Component{
    constructor(props){
        super(props)
        this.state = {
            didAnswer: false,
            question: [],
            correctAnswer: '',
            answerArray: []
        }
    }

    componentDidMount = () => {
        let answers = [];
        let newAnswers = [];
        if (this.props.questionData.answer_4) {
            const {answer_2, answer_3, answer_4, correct_answer} = this.props.questionData
            answers.push(answer_2, answer_3, answer_4, correct_answer);
        }
        else if (!this.props.questionData.answer_4) {
            const {answer_2, correct_answer} = this.props.questionData
            answers.push(answer_2, correct_answer)
        }
        for(let i = 0; i < answers.length; i++){
            let randomIndex = Math.floor(Math.random() * answers.length)
            while(newAnswers.includes(answers[randomIndex])){
                randomIndex = Math.floor(Math.random() * answers.length)
            }
            newAnswers[i] = answers[randomIndex]
        } 

        this.setState({
            answerArray: newAnswers,
            correctAnswer: this.props.questionData.correct_answer
        })


    }

    answerQuestion = (num) => {
        this.setState({
            didAnswer: true
        })
        if(this.state.answerArray[num-1] === this.state.correctAnswer){
            this.props.updatePts(this.props.playerID, 1)
        } else {
            this.props.updatePts(this.props.playerID, 0)
        }
    }

    render(){
        const answers = this.state.answerArray.map((answer, i) => (
            <button onClick={() => this.answerQuestion(i+1)}>{this.state.answerArray[i]}</button>
        ))
        const disabledAnswers = this.state.answerArray.map((answer, i) => (
            <button disabled>{this.state.answerArray[i]}</button>
        ))
        return(
            <div className='question'>
                <h1>Question:</h1>
                <h2>{this.props.questionData.question}</h2>
                {/* Timer Display */}
                <Timer timerFn={this.props.toResFn} time={120}/>
                {/* Display Answers. If user has answered, disable buttons */}
                {!this.state.didAnswer ? (
                    <div className='answers'>
                        {answers}
                    </div>
                    ) :
                    <div className='answers'>
                        {disabledAnswers}
                    </div>
                }
                
            </div>
        )
    }
}