import React, { Component } from "react";
import { Redirect } from "react-router";
import axios from "axios";

class LogoutUser extends Component {
  constructor() {
    super();
    this.state = {
      loggedOut: false,
    };
  }

  //onClick on the link we are automatically logging out
  componentDidMount() {
    this.props.logoutUser();
    this.setState({
      loggedOut: true
    });
  }

  render() {
    console.log(this.state);
    const { loggedOut } = this.state;
    // return loggedOut ? <div> you are logged out </div> : "";
    return(
      <div>
      {loggedOut ? <Redirect to='/users/login' />  :''}
    </div>)
  }
}

export default LogoutUser;
