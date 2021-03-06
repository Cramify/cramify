import React, { Component } from "react";
import axios from "axios";
import "./EditSet.scss";
import Header from '../Header/Header'
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
      limitReached: false,
      setToggle: false
    };
  }

  //delete and add to the current user question set.

  componentDidMount = async () => {
    // check if logged in, send unlogged in users to landing
    const user = await axios.get("/auth/user");
    if (!user.data) return this.props.history.push("/");

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

  handleToggle = () => {
    this.setState({
      setToggle: !this.state.setToggle
    })
  }

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
          <div
            className="edit-item"
            onClick={() => {
              this.deleteQuestion(question.junction_id);
            }}
          >
            {question.question}
          </div>
        </div>
      );
    });
    let allQuestions = this.state.questions.map((question, index) => {
      return (
        <div className="question-to-display">
          {/* <div className='question-item' onClick={()=>this.addQuestionToSet(question.question_id)}>{question.question}</div> */}
          <div className="edit-item" onClick={() => {
              this.addQuestionToSet(question.question_id);
            }}>{question.question}
          </div>
        </div>
      );
    });
    return (
        <>
      <Header />
      <div className="edit-set-page">
          <>
             <div className={this.state.setToggle ? 'question-list' : 'question-list hidden'} id='user-set'>
              <>
              <button className='set-toggle' onClick={this.handleToggle}>All Questions</button>
                <h2>User Set</h2>
                <div className="confirm-btn-holder">
                  <button className="confirm-btn" onClick={this.checkQuestions}>
                    Confirm
                  </button>
                </div>
                <div className="user-questions">{userQuestions}</div>
              </>
            </div> 
          </>
            <>
              <div className={!this.state.setToggle ? 'question-list' : 'question-list hidden'} id='all-question-set'>
              <button className='set-toggle' onClick={this.handleToggle}>Your Set</button>
                {this.state.limitReached === false && (
                  <>
                    <h2>All Questions</h2>
                    <div className="all-questions">{allQuestions}</div>
                  </>
                )}
              </div>
          </>
      </div>
      </>
    );
  }
}
