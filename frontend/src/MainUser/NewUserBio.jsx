import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class NewUserBio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      first_name: "",
      last_name: "",
      relationship: "",
      pic: "",
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
      username,
      first_name,
      last_name,
      relationship,
      pic,
      notes,
      submitted
    } = this.state;
    console.log("new user bio", this.state)

    if (submitted) {
        return <Redirect to="/users/childbio" />;
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
