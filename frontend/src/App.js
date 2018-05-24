import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import NewUser from "./MainUser/NewUser";
import LoginUser from "./MainUser/LoginUser";
import LogoutUser from "./MainUser/LogoutUser";
import NewUserBio from "./MainUser/NewUserBio";
import KidsBio from "./LoggedInUser/KidsBio";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
      username:null, 
    };
  }

  setUser = user => {
    this.setState({
      user: user,
      username: user.username
    });
    if (!user.username) {
      this.setState({
        username: user
      });
    }
  };

  logOutUser = () => {
    axios
      .get("/users/logout")
      .then(res => {
        this.setState({
          user: null,
          username: null,
          active: false
        });
      })
      .catch(err => {
        console.log(`you have a logout err`, err);
      });
  };

  isActive = () => {
    this.setState({
      active: !this.state.active
    });
  };

  componentWillMount() {
    const { user, active, username } = this.state;
    console.log("HIIIII");
    axios
      .get("/users/getMainUser")
      .then(res => {
        console.log("THIS IS A RESPONSE test", res);
        this.setState({
          user: res.data.user,
          username: res.data.user.username,
          active: true
        });
      })
      .catch(err => {
        console.log(`errrr`, err);
      });
  }

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} active={this.isActive} />;
  };

  renderLogoutUser = () => {
    console.log(`before`, this.state.user);
    return <LogoutUser logoutUser={this.logoutUser} active={this.isActive} />;
  };

  renderKidsBio = () => {
    const { user, active, username } = this.state
    return <KidsBio setUser={this.setUser} user={user} username={username} active={this.isActive} />
  }

  render() {
    const { user, active, username } = this.state;
    console.log("app", this.state)
    return (
      <div >
        puzzlebox
        <div>
          <Link to="/users">Register</Link>{"  "}{"  "}
          <Link to="/users/login">Login</Link>
          </div>
        <div>
          <Switch>
            <Route exact path="/users" component={NewUser} />
            <Route exact path="/users/login" render={this.renderLogin} />
            <Route path="/users/signup/newuserbio" component={NewUserBio} />
            <Route path="/users/kidsbio" render={this.renderKidsBio} />
            </Switch>
          </div>
      </div>
    );
  }
}

export default App;
