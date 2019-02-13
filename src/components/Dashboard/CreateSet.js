import React, { Component } from 'react';
import axios from 'axios';


export default class CreateSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: [],
            setName: '',
            questions: [],
            setID: {}
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

    addQuestionToSet = () => {
        const {setID} = this.state
        console.log(setID)
        this.state.set.map((question) => {
            return axios.post('/set/user/question', { setID, questionID: question.question_id })
        })
    }

    addToSet = (i) => {
        const newSet = this.state.set.slice();
        newSet.push(this.state.questions.splice(i, 1)[0]);

        this.setState({
            set: newSet
        })
    }

    createNewSet = async() => {
       const {setName} = this.state;
       const res = await axios.post('/set/user/create', {setName})
       this.setState({
           setID: res.data[0].set_id,
           setName: ''
       })
       console.log(this.state.setID)
    }

    render() {
        let questions = this.state.questions.map((question, i) => {
            return (
                <div key={i}>
                    {question.category}
                    <br />
                    <button onClick={()=>this.addToSet(i)}>Add</button>
                    {question.question}
                </div>
            )
        })
        let set = this.state.set.map((question) => {
            return (
                <div>{question.question}</div>
            )
        })
        return (
            <div>
                Create New Set
                <input onChange={(e)=>this.handleInput('setName', e)} value={this.state.setName} type="text" placeholder="Your Set's Name"/>
                <button onClick={this.createNewSet}>Create New Set</button>
                <h2>Questions to Add: {questions}</h2>
                <hr/>
                <h2>Your Questions: {set}</h2> {/*Change 'your questions' to the actual name of set created in Dashboard */}
                <button onClick={this.addQuestionToSet}>Add New Set</button>
            </div>
        )
    }
}