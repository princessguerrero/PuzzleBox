import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class NewUserBio extends React.Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      relationship: "",
      pic: "",
      current_goals: "",
      next_steps: "",
      notes: "",
      submitted: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderBio = e => {
    console.log("submitting bio");
    e.preventDefault();
    axios
      .post("/users/mainUserBio", {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        relationship: this.state.relationship,
        pic: this.state.pic,
        current_goals: this.state.current_goals,
        next_steps: this.state.next_steps,
        notes: this.state.notes
      })
      .then(res => {
        console.log(res);
        this.setState({
          submitted: true
        });
      })
      .catch(err => {
        console.log("err sending post req in NewUserBio", err);
      });
  };

  render() {
    const {
      first_name,
      last_name,
      relationship,
      pic,
      current_goals,
      next_steps,
      notes,
      submitted
    } = this.state;
    console.log("new user bio", this.state)
    if (submitted) {
        return <Redirect to="/users/kids" />;
      }
    return (
      <div>
        <p>New User Bio</p>
        <form>
          First Name:{"  "}
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={this.handleInput}
          />
          <br />
          Last Name:{"  "}
          <input
            type="text"
            name="last_name"
            value={last_name}
            onChange={this.handleInput}
          />
          <br />
          Relationship:{"  "}
          <input
            type="text"
            name="relationship"
            value={relationship}
            onChange={this.handleInput}
          />
          <br />
          Photo:{"  "}
          <input
            type="text"
            name="pic"
            value={pic}
            onChange={this.handleInput}
            placeholder="URL"
          />
          <br />
          What skills is the child currently working on?{"  "}
          <textarea
            type="text"
            name="current_goals"
            value={current_goals}
            onChange={this.handleInput}
          />
          <br />
          What are the next steps or goals for the child?:{"  "}
          <textarea
            type="text"
            name="next_steps"
            value={next_steps}
            onChange={this.handleInput}
          />
          <br />
          Notes:{"  "}
          <textarea
            type="text"
            name="notes"
            value={notes}
            onChange={this.handleInput}
          />
          <input type="submit" value="Submit" onClick={this.renderBio} />
        </form>
      </div>
    );
  }
}

export default NewUserBio;
