import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../Stylesheets/Login.css";
import { Form, Button, Header, Message } from "semantic-ui-react";

class LoginUser extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameInput: "",
      passwordInput: "",
      message: "",
      loggedIn: false
    };
  }

  // Handle input change
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitForm = e => {
    e.preventDefault();
    const { usernameInput, passwordInput, loggedIn } = this.state;

    if (usernameInput.length < 6) {
      this.setState({
        message: "Username length must be at least 6 characters"
      });
    } else {
      axios
        .post("/users/login", {
          username: usernameInput,
          password: passwordInput
        })
        .then(res => {
          console.log(res.data);
          this.props.setUser(res.data);
        //   this.props.active();
          this.setState({
            usernameInput: "",
            passwordInput: "",
            loggedIn: true
          });
        })
        .catch(err => {
          this.setState({
            usernameInput: "",
            passwordInput: "",
            message: "Username/password not found"
          });
        });
    }
  };

  //when the loggedIn we want to go straight to the feed;

  render() {
    const { usernameInput, passwordInput, message, loggedIn } = this.state;
    console.log(this.state);

    if (loggedIn) {
      return <Redirect to="/users/childrenlist" />;
    }

    return (
      <div className="login-user-container">
        <div className="login-box">
          <Form onSubmit={this.submitForm}>
          <div>Username</div>
            <Form.Input
              className="usernameBox"
              placeholder="Username"
              type="text"
              name="usernameInput"
              value={usernameInput}
              onChange={this.handleInput}
              required
            />
            <br/>
            <div>Password</div>
            <Form.Input
              className="passwordBox"
              placeholder="Password"
              type="password"
              name="passwordInput"
              value={passwordInput}
              onChange={this.handleInput}
              required
            />
            <div>
            <Button className="loginBtn" type="submit" value="Log in" content="Login"/></div>
            <Message className='smaller-box'>
            Don't have an account?<Link to="/users"> Sign up!</Link>
        </Message> {/* End smaller-box */}
          </Form>


        </div> {/* End login-box */}

       

        { message
          ? <div className="message-size">{message}</div>
          : <span></span>
        }
      </div>
    );
  }
}

export default LoginUser;


