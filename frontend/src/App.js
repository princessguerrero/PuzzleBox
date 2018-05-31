import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import axios from "axios";
import NewUser from "./MainUser/NewUser";
import LoginUser from "./MainUser/LoginUser";
import LogoutUser from "./MainUser/LogoutUser";
import NewUserBio from "./MainUser/NewUserBio";
import ChildBio from "./LoggedInUser/ChildBio";
import ChildrenList from "./LoggedInUser/ChildrenList";
import ChildPage from "./LoggedInUser/ChildPage";
import MainUserProfile from "./LoggedInUser/MainUserProfile";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
      username: null
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

  logoutUser = () => {
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

  renderLogin = () => {
    return <LoginUser setUser={this.setUser} active={this.isActive} />;
  };

  renderLogoutUser = () => {
    console.log(`before`, this.state.user);
    return <LogoutUser logoutUser={this.logoutUser} active={this.isActive} />;
  };

  renderChildBio = () => {
    const { user, active, username } = this.state;
    return (
      <ChildBio
        // setUser={this.setUser}
        user={user}
        username={username}
        active={this.isActive}
      />
    );
  };

  componentWillMount() {
    const { user, active, username } = this.state;
    console.log("Component will mount app.js");
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

  renderChildrenList = () => {
    const { user, active, username } = this.state;
    console.log("renderchildrenlist", this.state);
    return (
      <ChildrenList
        // setUser={this.setUser}
        user={user}
        username={username}
        active={this.isActive}
      />
    );
  };

  renderChildPage = routeProps => {
    const { user, active, username } = this.state;
    console.log(routeProps);
    return (
      <ChildPage
        // setUser={this.setUser}
        user={user}
        username={username}
        active={this.isActive}
        id={routeProps.match.params.id}
      />
    );
  };

  renderMainUserProfile = () => {
    const { user, active, username } = this.state;
    console.log("mainuserprof", this.state)
    return (
      <MainUserProfile user={user} username={username} active={this.isActive}/>
    )
  }

  render() {
    const { user, active, username } = this.state;
    console.log("app", this.state);
    return (
      <div>
        {user ? (
          <Link to="/users/childrenlist">puzzlebox</Link>
        ) : (
          <Link to="/users">puzzlebox</Link>
        )}
        <div>
          {/* {user ? "" : <Link to="/users">Register</Link>}
          {"  "}
          {"  "}
          {user ? "" : <Link to="/users/login">Login</Link>}{"  "}{"  "} */}
          {user ? (
            <Link to="/users/mainuserprofile">
              <span>
                <i class="far fa-lg fa-user" />
              </span>
            </Link>
          ) : (
            ""
          )}
        {"  "}
          {user ? <Link to="/users/logout">Logout</Link> : ""}
         
        </div>
        <div>
          <Switch>
            <Route exact path="/users" component={NewUser} />
            <Route exact path="/users/login" render={this.renderLogin} />
            <Route path="/users/logout" render={this.renderLogoutUser} />
            <Route path="/users/signup/newuserbio" component={NewUserBio} />
            <Route path="/users/childbio" render={this.renderChildBio} />
            <Route path="/users/mainuserprofile" render={this.renderMainUserProfile} />
            <Route
              path="/users/childrenlist"
              render={this.renderChildrenList}
            />
            <Route
              path="/users/child/:id/profile"
              render={this.renderChildPage}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
