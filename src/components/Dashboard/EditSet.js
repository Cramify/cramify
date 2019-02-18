import React, { Component } from 'react';
import axios from 'axios';


export default class EditSet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            set: [],
            setName: '',
            questions: [],
            setID: {},
            junctionID: {},
        }
    }

    //delete and add to the current user question set.

    componentDidMount = async () => {
        const res = await axios.get(`/set/getedit/${this.props.match.params.setID}`);
 //junction id breaks down as res.data.junction_id
        this.setState({
            set: res.data,
        })
        this.getAllQuestions()
    }

    getAllQuestions = async () => {
        const res = await axios.get('/question/all')
 
        this.setState({
            questions: res.data
        })
    }

    handleInput = (prop, e) => {
        this.setState({
            [prop]: e.target.value
        })
    }

    addQuestionToSet = async (id) => {
        const {setID} = this.props.match.params
        console.log(setID)
        await axios.post('/set/user/question', { setID, questionID: id});
        const res = await axios.get(`/set/getedit/${this.props.match.params.setID}`);
        this.setState({
            set: res.data
        })
    }

    deleteQuestion = async (id) => {
        const {setID} = this.props.match.params;

        const res = await axios.delete(`/set/user/edit/delete/?setID=${setID}&junctionID=${id}`)
        this.setState({
            set: res.data
        })

    }

    render() {
        let userQuestions = this.state.set.map((question, index) => {
            return (
                <div>
                    {question.question}
                    <button onClick={()=>this.deleteQuestion(question.junction_id)}>Delete</button>
                </div>
            )
        })
        let allQuestions = this.state.questions.map((question, index) => {
            return (
                <div>
                    {question.question}
                    <button onClick={()=>this.addQuestionToSet(question.question_id)}>Add</button>
                </div>
            )
        })
        return (
            <div>
                <div>
                    <h2>User Set</h2>
                    <h3>{userQuestions}</h3>
                </div>
                    <hr/>
                <div>
                    <h2>All Questions</h2>
                    <h3>{allQuestions}</h3>
                </div>
            </div>
        )
    }
}