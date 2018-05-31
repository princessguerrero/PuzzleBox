import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

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
    console.log("admin user", this.state.admin_username)
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
    console.log("kids", this.state);

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
      <div>
        <div> Hello {admin_username} </div>
        this is kids.jsx
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
          Date of Birth:{"  "}
          <input
            type="text"
            name="date_of_birth"
            value={date_of_birth}
            onChange={this.handleInput}
          />
          <br />
          Age: {"  "}
          <input
            type="text"
            name="age"
            value={age}
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
          School:{"  "}
          <input
            type="text"
            name="school"
            value={school}
            onChange={this.handleInput}
          />
          <br />
          Grade:{"  "}
          <input
            type="text"
            name="grade"
            value={grade}
            onChange={this.handleInput}
          />
          <br />
          Class size:{"  "}
          <input
            type="text"
            name="class_size"
            value={class_size}
            onChange={this.handleInput}
          />
          <br />
          Diagnosis:{"  "}
          <input
            type="text"
            name="diagnosis"
            value={diagnosis}
            onChange={this.handleInput}
          />
          <br />
          Likes:{"  "}
          <textarea
            type="text"
            name="likes"
            value={likes}
            onChange={this.handleInput}
          />
          <br />
          Dislikes:{"  "}
          <textarea
            type="text"
            name="dislikes"
            value={dislikes}
            onChange={this.handleInput}
          />
          <input
            type="submit"
            value="Add Child"
            onClick={this.renderAddChild}
          />
        </form>
      </div>
    );
  }
}
export default ChildBio;
