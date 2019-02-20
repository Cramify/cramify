import React, { Component } from "react";
import axios from "axios";
import "./EditSet.scss";
import Swal from "sweetalert2";


export default class EditSet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      set: [],
      setName: "",
      questions: [],
      setID: {},
      junctionID: {},
      limitReached: false
    };
  }

  //delete and add to the current user question set.

  componentDidMount = async () => {
    // check if logged in, send unlogged in users to landing
    const user = await axios.get('/auth/user')
    if (!user.data) return this.props.history.push('/')
    
    const res = await axios.get(
      `/set/getedit/${this.props.match.params.setID}`
    );
    //junction id breaks down as res.data.junction_id
    this.setState({
      set: res.data
    });
    this.getAllQuestions();
  };

  getAllQuestions = async () => {
    const res = await axios.get("/question/all");

    this.setState({
      questions: res.data
    });
  };

  handleInput = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  checkQuestions = () => {
    if (!this.state.set[0] || !this.state.set[1]) {
      return Swal.fire({
        title: `Not Enough Questions!`,
        text: `Please Add More Questions!`,
        type: `error`
      });
    } else {
      this.props.history.push("/dashboard");
    }
  };

  addQuestionToSet = async id => {
    const { setID } = this.props.match.params;
    await axios.post("/set/user/question", { setID, questionID: id });
    const res = await axios.get(
      `/set/getedit/${this.props.match.params.setID}`
    );
    this.setState({
      set: res.data
    });
    if (this.state.set.length >= 19) {
      this.setState({
        limitReached: true
      });
    }
  };

  deleteQuestion = async id => {
    const { setID } = this.props.match.params;

    const res = await axios.delete(
      `/set/user/edit/delete/?setID=${setID}&junctionID=${id}`
    );
    this.setState({
      set: res.data
    });
  };

  render() {
    let userQuestions = this.state.set.map((question, index) => {
      return (
        <div className="question-to-display">
          {/* <div className='question-item' onClick={()=>this.deleteQuestion(question.junction_id)}> {question.question} </div> */}
          <div className="edit-item">{question.question}</div>
          {/* <button onClick={()=>this.deleteQuestion(question.junction_id)}>Delete</button> */}
          <i
            className="fas fa-minus"
            onClick={() => {
              this.deleteQuestion(question.junction_id);
            }}
          />
        </div>
      );
    });
    let allQuestions = this.state.questions.map((question, index) => {
      return (
        <div className="question-to-display">
          {/* <div className='question-item' onClick={()=>this.addQuestionToSet(question.question_id)}>{question.question}</div> */}
          <div className="edit-item">{question.question}</div>
          <i
            className="fas fa-plus"
            onClick={() => {
              this.addQuestionToSet(question.question_id);
            }}
          />
        </div>
      );
    });
    return (
      <div className="edit-set-page">
        <div className="question-list">
          <>
            <h2>User Set</h2>
            <div className="confirm-btn-holder">
              <button className="confirm-btn" onClick={this.checkQuestions}>
                Confirm
              </button>
            </div>
            <div>{userQuestions}</div>
          </>
        </div>
        <hr />
        <div className="question-list">
          {this.state.limitReached === false && (
            <>
              <h2>All Questions</h2>
              <div>{allQuestions}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}
