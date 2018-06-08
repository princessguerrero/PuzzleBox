import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Header, Message, TextArea } from "semantic-ui-react";
import "../Stylesheets/ChildBio.css";

class ChildBio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      admin_username: this.props.username,
      first_name: "",
      last_name: "",
      date_of_birth: "",
      age: "",
      pic: "",
      school: "",
      grade: "",
      class_size: "",
      diagnosis: "",
      likes: "",
      dislikes: "",
      addedChild: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderAddChild = e => {
    console.log("adding a child");
    e.preventDefault();
    console.log("admin user", this.state.admin_username);
    axios
      .post("/users/addChildInfo", {
        admin_username: this.state.admin_username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        date_of_birth: this.state.date_of_birth,
        age: this.state.age,
        pic: this.state.pic,
        school: this.state.school,
        grade: this.state.grade,
        class_size: this.state.class_size,
        diagnosis: this.state.diagnosis,
        likes: this.state.likes,
        dislikes: this.state.dislikes
      })
      .then(res => {
        console.log(res);
        this.setState({
          addedChild: true
        });
      })
      .catch(err => {
        console.log("err sending post req in Kids", err);
      });
  };

  render() {
    const {
      admin_username,
      first_name,
      last_name,
      date_of_birth,
      age,
      pic,
      school,
      grade,
      class_size,
      diagnosis,
      likes,
      dislikes,
      addedChild
    } = this.state;
    console.log("children", this.state);

    if (addedChild)
      return (
        <Redirect
          to={{
            pathname: "/users/childrenlist",
            state: { referrer: this.state.username }
          }}
        />
      );

    return (
      <div className="childbio-container">
        <div className="childbio-box">
          <div className="childbio-text"> Hello {admin_username} </div>
          <div className="childbio-subtext">
            Please fill-out the form below to add a child.
          </div>
          <Form size="small" className="formspecs">
            <Form.Group widths="equal">
              <Form.Field>
              <Form.Input
              label="First Name:"
                type="text"
                name="first_name"
                value={first_name}
                onChange={this.handleInput}
              />
              </Form.Field>
              <Form.Input
              label="Last Name:"
                type="text"
                name="last_name"
                value={last_name}
                onChange={this.handleInput}
              />
              <Form.Input
              label="Date of Birth:"
                type="text"
                name="date_of_birth"
                value={date_of_birth}
                onChange={this.handleInput}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
              label="Age:"
                type="text"
                name="age"
                value={age}
                onChange={this.handleInput}
              />
              <Form.Input
              label="Photo:"
                type="text"
                name="pic"
                value={pic}
                onChange={this.handleInput}
                placeholder="URL"
              />
              <Form.Input
              label="School:"
                type="text"
                name="school"
                value={school}
                onChange={this.handleInput}
              />
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Input
              label="Grade:"
                type="text"
                name="grade"
                value={grade}
                onChange={this.handleInput}
              />
              <Form.Input
              label="Class size:"
                type="text"
                name="class_size"
                value={class_size}
                onChange={this.handleInput}
              />
              <Form.Input
              label="Medical Condition/Diagnosis:"
                type="text"
                name="diagnosis"
                value={diagnosis}
                onChange={this.handleInput}
              />
            </Form.Group>

            <Form.TextArea
            label="Likes:"
              type="text"
              name="likes"
              value={likes}
              onChange={this.handleInput}
            />
            <Form.TextArea
            label="Dislikes:"
              type="text"
              name="dislikes"
              value={dislikes}
              onChange={this.handleInput}
            />
            <Button
              fluid
              inverted color="yellow"
              type="submit"
              value="Add Child"
              content="Add Child"
              onClick={this.renderAddChild}
            />
          </Form>
        </div>
      </div>
    );
  }
}
export default ChildBio;
