import React, { Component } from 'react';
import axios from 'axios';
import './CreateSet.scss';


export default class CreateSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            set: [],
            setName: '',
            questions: [],
            setID: {},
            limitReached: false,
            category: ''
        }
    }

    componentDidMount = async () => {
        const res = await axios.get('/question/all')
        this.setState({
            questions: res.data
        })
    }

    sortByCategory = async () => {
        const {category} = this.state
        console.log(category)

        const res = await axios.get(`/question/${category}`)
        this.setState({
            questions: res.data
        })
    }

    handleInput = async (prop, e) => {
        this.setState({
            [prop]: e.target.value
        })
    }

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
        this.props.history.push('./dashboard')
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

    handleChange = async (event) => {
       await this.setState({category: event.target.value})
       await this.sortByCategory()
    }

    render() {
        let questions = this.state.questions.map((question, i) => {
            return (
                <div className='question-to-display' key={i} onClick={() => this.addToSet(i)} >
                    <div className='question-category'>{question.category}</div>
                     <br />
                     <div className='question-item'>{question.question}</div> 
                </div>
            )
        })
        let set = this.state.set.map((question, i) => {
            return (
                <div className='question-to-display' key={i} onClick={() => this.deleteQuestionFromSet(i)}>
                    <div className='question-category'>{question.category}</div>
                      <br/>
                    <div className='question-item'>{question.question}</div> 
                </div>
            )
        })
        return (
            <div className='create-set-page'>                
                <div className='question-list'>


                    {this.state.limitReached === false && 
                    <div>
                        <div onClick={() => this.props.history.push('/dashboard')} className='back-button'>Back</div>
                        <h1 className='title'>Questions To Add:</h1> 
                        <div className='select'>
                                    <select onChange={(e)=>this.handleChange(e)}  value={this.state.category}>
                                        <option value="Javascript">Javascript</option>
                                        <option value="HTML">HTML</option>
                                        <option value="CSS">CSS</option>
                                        <option value="Computer Science">Computer Science</option>
                                    </select>
                                    <div className='select_arrow'></div>
                                </div>
                        {<h1 >{questions}</h1>}
                        {/* Use a ternary to conditionally show based on category */}
                    </div>}
                </div>

                <div className='question-list'>
                    <h2 className='title'>Your Questions:</h2> {/*Change 'your questions' to the actual name of set created in Dashboard */}
                    <div className='user-input' >
                        <input onChange={(e) => this.handleInput('setName', e)} value={this.state.setName} type="text" placeholder="Your Set's Name" />
                        <i className="fas fa-plus" onClick={this.createNewSet}></i>
                    </div>
                    <h1>{set}</h1>
                </div>

            </div>
        )
    }
}