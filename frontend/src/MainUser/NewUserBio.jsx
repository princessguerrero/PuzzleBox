import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Header, Message, TextArea } from "semantic-ui-react";
import "../Stylesheets/NewUser.css";

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
    console.log("new user bio", this.state);

    if (submitted) {
      return <Redirect to="/users/childbio" />;
    }
    return (
      <div className="newuserbio-container">
      <div className="newuserbio-box">
        <div className="newuserbio-text">New User Bio</div>
        <Form>
          <div>First Name:</div>
          <Form.Input
            type="text"
            name="first_name"
            value={first_name}
            onChange={this.handleInput}
          />
          <div>Last Name:</div>
          <Form.Input
            type="text"
            name="last_name"
            value={last_name}
            onChange={this.handleInput}
          />
          <div>Relationship:</div>
          <Form.Input
            type="text"
            name="relationship"
            value={relationship}
            onChange={this.handleInput}
          />
          <div>Photo:</div>
          <Form.Input
            type="text"
            name="pic"
            value={pic}
            onChange={this.handleInput}
            placeholder="URL"
          />
          <div>Notes:</div>
          <Form.TextArea
            type="text"
            name="notes"
            value={notes}
            onChange={this.handleInput}
          />
          <Button fluid content="Submit" type="submit" value="Submit" onClick={this.renderBio} />
        </Form>
      </div>
      </div>
    );
  }
}

export default NewUserBio;
