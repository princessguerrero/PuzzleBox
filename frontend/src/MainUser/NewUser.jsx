import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../Stylesheets/NewUser.css";
import { Form, Button, Header, Message } from "semantic-ui-react";

class NewUser extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      validEmail: false,
      message: "",
      registered: false,
      loggedIn: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    //on submit we have to check if the username is taken
    // and if the email is already in use
    e.preventDefault();
    const { username, email, password } = this.state;
    if (email) {
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        console.log(email);

        if (!response.data.data.find(n => n.email === email)) {
          this.setState({
            validEmail: true
          });
        } else {
          this.setState({
            validEmail: false,
            message: "email already in use"
          });
        }
      });
    }
    if (username && password) {
      if (username.length < 6) {
        return this.setState({
          message: "Username must be at least 6 characters"
        });
      }
      if (password.length < 6) {
        return this.setState({
          message: "Password must be at least 6 characters"
        });
      }
      axios.get("/users").then(response => {
        console.log("RESPONSE FOR GET REQUEST", response.data.data);
        if (!response.data.data.find(n => n.username === username)) {
          axios
            .post("/users/register", {
              username: username,
              email: email,
              password: password
            })
            .then(res => {
              console.log(res.data);
              //   this.props.setUser(res.data);
              //   this.props.active();
              this.setState({
                message: "Registered user",
                registered: true,
                loggedIn: true
              });
            })
            .then(() => {
              axios
                .post("/users/login", {
                  username: username,
                  password: password
                })
                .then(res => {
                  console.log(res.data);
                  this.props.setUser(res.data);
                  //   this.props.active();
                  this.setState({
                    username: "",
                    password: "",
                    loggedIn: true
                  });
                });
            })
            .catch(err => {
              console.log(err);
              this.setState({
                email: "",
                // fullname: "",
                username: "",
                password: "",
                message: "Error registering user"
              });
            });
        } else {
          this.setState({
            message: "Username already exists"
          });
        }
      });
    } else {
      this.setState({
        message: "Please fill out all forms"
      });
    }
  };

  render() {
    const { username, email, password, message, registered } = this.state;
    console.log(this.state);

    if (registered)
      return (
        <Redirect
          to={{
            pathname: "/users/signup/newuserbio",
            state: { referrer: this.state.username }
          }}
        />
      );

    return (
      <div>
        {/* nav bar goes here  */}

        <div className="register-box">
          <Form onSubmit={this.submitForm}>
            <div className="signuptext">Sign up</div>
           <div> Username </div>
            <Form.Input
              className="usernameBox"
              placeholder="Username"
              type="text"
              icon="user"
              iconPosition="left"
              name="username"
              value={username}
              onChange={this.handleInput}
            />
            <div>Email</div>
            <Form.Input
              className="emailBox"
              placeholder="Email"
              type="email"
              name="email"
              icon="mail"
              iconPosition="left"
              value={email}
              onChange={this.handleInput}
            />
            <div>Password</div>
            <Form.Input
              className="passwordBox"
              placeholder="Password"
              type="password"
              name="password"
              icon="lock"
              iconPosition="left"
              value={password}
              onChange={this.handleInput}
            />
            <div>
            <Button
              fluid
              className="loginBtn"
              type="submit"
              content="Sign Up"
              inverted
              color="violet"
              onClick={this.renderNewUserBio}
            /> </div>
            <Message className="smaller-box">
            <div className="errormessage">{message}</div>
            
              Already have an account?<Link to="/users/login"> Login</Link>
            </Message>{" "}
            {/* End smaller-box */}
          </Form>
        </div>
      </div>
    );
  }
}

export default NewUser;
