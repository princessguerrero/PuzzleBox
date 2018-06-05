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
import AddService from "./LoggedInUser/AddService";
import "./Stylesheets/Login.css";
import "./Stylesheets/Navbar.css";
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      active: false,
      username: null,
      loggedIn: false
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

  renderNewUser = () => {
    const { user, active } = this.state;
    console.log(this.state);
    if (active === false) {
      return <NewUser setUser={this.setUser} active={this.isActive} />;
    } else {
      return <Redirect to="/users/signup/newuserbio" />;
    }
  };

  renderNewUserBio = () => {
    const { user, active } = this.state;
    return <NewUserBio setUser={this.setUser}
    user={user}
    active={this.isActive} />
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

  renderAddService = routeProps => {
    const { user, active, username } = this.state;
    return (
      <AddService user={user} username={username} active={this.isActive} id={routeProps.match.params.id} />
    )
  }

  render() {
    const { user, active, username, loggedIn } = this.state;
    console.log("app", this.state);
    return (
      <div>
        <div className="top-nav-bar">
        <div>
        {user ? (<div>
          <Link to="/users/childrenlist" >puzzlebox</Link></div>
        ) : (
          <Link to="/users">puzzlebox</Link>
        )}
        </div>
        <div className="top-navbar-right">
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
          {user ? <Link to="/users/logout"><span><i class="fas fa-sign-out-alt"></i></span></Link> : ""}
         </div>
        </div>
        <div>
          <Switch>
            <Route exact path="/users" render={this.renderNewUser} />
            <Route exact path="/users/login" render={this.renderLogin} />
            <Route path="/users/logout" render={this.renderLogoutUser} />
            <Route path="/users/signup/newuserbio" render={this.renderNewUserBio} />
            <Route path="/users/childbio" render={this.renderChildBio} />
            <Route path="/users/mainuserprofile" render={this.renderMainUserProfile} />
            <Route path="/users/child/:id/service/add" render={this.renderAddService} />
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
