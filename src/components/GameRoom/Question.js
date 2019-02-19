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
            answerArray: [],
            startTime: null
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
            correctAnswer: this.props.questionData.correct_answer,
            startTime: Date.now()
        })


    }

    answerQuestion = (num) => {
        const answerTime = Date.now();
        const scoreToAdd = Math.floor((1175 - ((answerTime - this.state.startTime)) / 10))
        // score to add is currently set for the logic of a 5 second timer (adds 175 points for correct answer + time left)
        console.log(scoreToAdd)
        this.setState({
            didAnswer: true,
            startTime: null
        })
        if(this.state.answerArray[num-1] === this.state.correctAnswer){
            this.props.updatePts(this.props.playerID, scoreToAdd)
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
                <Timer timerFn={this.props.toResFn} time={10} size={100}/>
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