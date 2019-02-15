import React, { Component } from 'react';
import axios from 'axios';
import './CreateSet.scss';
import {Link} from 'react-router-dom';


export default class CreateSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: [],
            setName: '',
            questions: [],
            setID: {},
            limitReached: false
        }
    }

    componentDidMount = async () => {
        const res = await axios.get('/question/all')
        this.setState({
            questions: res.data
        })
    }

    handleInput = async (prop, e) => {
        this.setState({
            [prop]: e.target.value
        })
    }

    // addQuestionToSet = () => {
    //     const {setID} = this.state
    //     console.log(setID)
    //     this.state.set.map((question) => {
    //         return axios.post('/set/user/question', { setID, questionID: question.question_id })
    //     })
    // }

    addToSet = (i) => {
        const newSet = this.state.set.slice();
        newSet.push(this.state.questions.splice(i, 1)[0]);
        if (this.state.set.length >= 19) {
            this.setState({
                limitReached: true
            })
        }

        this.setState({
            set: newSet
        })
    }

    createNewSet = async () => {
        //Creates empty set to add to
        const { setName } = this.state;
        const res = await axios.post('/set/user/create', { setName })
        this.setState({
            setID: res.data[0].set_id,
            setName: ''
        })
        //sends questions to add to new set
        const { setID } = this.state
        console.log(setID)
        this.state.set.map((question) => {
            return axios.post('/set/user/question', { setID, questionID: question.question_id })
        })

    }

    deleteQuestionFromSet = (i) => {
        console.log(i)
        let backToQuestions = [];
        let deleteFromSet = this.state.set.splice(i, 1);
        backToQuestions.push(deleteFromSet);
        console.log(backToQuestions[0][0])
        this.setState({
            questions: [...this.state.questions, backToQuestions[0][0]]
        })

    }

    render() {
        let questions = this.state.questions.map((question, i) => {
            return (
                <div className='question-to-display' key={i} onClick={() => this.addToSet(i)} >
                    <div className='question-category'>{question.category}</div>
                     <br />
                    {question.question}
                </div>
            )
        })
        let set = this.state.set.map((question, i) => {
            return (
                <div className='question-to-display' key={i} onClick={() => this.deleteQuestionFromSet(i)}>
                     <div className='question-category'>{question.category}</div>
                      <br/>
                    {question.question} 
                </div>
            )
        })
        return (
            <div className='create-set-page'>
                <Link to='/dashboard'><div></div></Link>
                
                <div className='question-list'>
                    {this.state.limitReached === false && 
                    <div>
                        <h1 className='title'>Questions To Add:</h1> 
                        <h1 >{questions}</h1>
                    </div>}
                </div>

                <div className='question-list'>
                    <h2 className='title'>Your Questions:</h2> {/*Change 'your questions' to the actual name of set created in Dashboard */}
                    <div className='user-input' >
                        <input onChange={(e) => this.handleInput('setName', e)} value={this.state.setName} type="text" placeholder="Your Set's Name" />
                        <i class="fas fa-plus" onClick={this.createNewSet}></i>
                      <div>{set}</div>
                    </div>
                </div>

            </div>
        )
    }
}