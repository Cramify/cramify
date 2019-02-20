import React, { Component } from "react";
import axios from "axios";
import "./CreateSet.scss";
import Swal from "sweetalert2";

export default class CreateSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      set: [],
      setName: "",
      questions: [],
      setID: {},
      limitReached: false,
      category: ""
    };
  }

  componentDidMount = async () => {
    // check if logged in, send unlogged in users to landing
    const user = await axios.get("/auth/user");
    if (!user.data) return this.props.history.push("/");
    const res = await axios.get("/question/all");
    this.setState({
      questions: res.data
    });
  };

  sortByCategory = async () => {
    const { category } = this.state;
    const res = await axios.get(`/question/${category}`);
    await this.setState({
      questions: res.data
    });
  };

  handleInput = async (prop, e) => {
    await this.setState({
      [prop]: e.target.value
    });
  };

  handleKeyDown = evt => {
    if (evt.keyCode === 13) {
      this.createNewSet();
    }
  };

  addToSet = i => {
    const newSet = this.state.set.slice();
    newSet.push(this.state.questions.splice(i, 1)[0]);

    if (this.state.set.length >= 19) {
      this.setState({
        limitReached: true
      });
    }

    this.setState({
      set: newSet
    });
  };

  createNewSet = async () => {
    //Creates empty set to add to
    const { setName } = this.state;
    if (!this.state.set[1]) {
      return Swal.fire({
        title: `Not Enough Questions!`,
        text: `Please Add More Questions!`,
        type: `error`,
        showConfirmButton: false,
        timer: 1500
      });
    }
    const res = await axios.post("/set/user/create", { setName });
    this.setState({
      setID: res.data[0].set_id,
      setName: ""
    });
    //sends questions to add to new set
    const { setID } = this.state;
    // eslint-disable-next-line
    this.state.set.map(question => {
      if (!this.state.set[1]) {
        // eslint-disable-next-line
        return;
      } else if (this.state.set.length >= 1) {
        return axios.post("/set/user/question", {
          setID,
          questionID: question.question_id
        });
      }
    });
    this.props.history.push("./dashboard");
  };

  deleteQuestionFromSet = i => {
    let backToQuestions = [];
    let deleteFromSet = this.state.set.splice(i, 1);
    backToQuestions.push(deleteFromSet);
    this.setState({
      questions: [...this.state.questions, backToQuestions[0][0]]
    });
  };

  handleChange = async event => {
    await this.setState({ category: event.target.value });
    await this.sortByCategory();
  };

  render() {
    let questions = this.state.questions.map((question, i) => {
      return (
        <div
          className="question-to-display"
          key={i}
          onClick={() => this.addToSet(i)}
        >
          <div className="question-category">{question.category}</div>
          <br />
          <div className="question-item">{question.question}</div>
        </div>
      );
    });
    let set = this.state.set.map((question, i) => {
      return (
        <div
          className="question-to-display"
          key={i}
          onClick={() => this.deleteQuestionFromSet(i)}
        >
          <div className="question-category">{question.category}</div>
          <br />
          <div className="question-item">{question.question}</div>
        </div>
      );
    });
    return (
      <div className="create-set-page">
        <div className="question-list">
          {this.state.limitReached === false && (
            <div>
              <div
                onClick={() => this.props.history.push("/dashboard")}
                className="back-button"
              >
                Back
              </div>
              <h1 className="title">Questions To Add:</h1>
              <div className="select">
                <select
                  onChange={e => this.handleChange(e)}
                  value={this.state.category}
                >
                  <option value="Javascript">Javascript</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
                <div className="select_arrow" />
              </div>
              {<h1>{questions}</h1>}
              {/* Use a ternary to conditionally show based on category */}
            </div>
          )}
        </div>

        <div className="question-list">
          <h2 className="title">Your Questions:</h2>{" "}
          {/*Change 'your questions' to the actual name of set created in Dashboard */}
          <div className="user-input">
            <input
              onKeyDown={e => this.handleKeyDown(e)}
              onChange={e => this.handleInput("setName", e)}
              value={this.state.setName}
              type="text"
              placeholder="Your Set's Name"
            />
            <i className="fas fa-plus" onClick={this.createNewSet} />
          </div>
          <h1>{set}</h1>
        </div>
      </div>
    );
  }
}
