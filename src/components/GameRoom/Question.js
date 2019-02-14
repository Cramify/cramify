import React, {Component} from 'react'
// import Timer from './Timer'

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

    // componentDidMount(){
    //     let {correctAnswer, answerTwo, answerThree, answerFour} = this.state
    //     let answers = [correctAnswer, answerTwo, answerThree, answerFour]
    //     let newAnswers = []
    //     for(let i = 0; i<answers.length; i++){
    //         let randomIndex = Math.floor(Math.random() * answers.length)
    //         while(newAnswers.includes(answers[randomIndex])){
    //             randomIndex = Math.floor(Math.random() * answers.length)
    //         }
    //         newAnswers[i] = answers[randomIndex]
    //     }
    //     this.setState({
    //         answerArray: newAnswers
    //     })
    // }

    componentDidMount = () => {
        console.log(this.props.questionData)
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
                <h1>Questions</h1>

                {/* this will be a prop from GameRoom.state.questions*/}
                <h1>{this.state.question}</h1>

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