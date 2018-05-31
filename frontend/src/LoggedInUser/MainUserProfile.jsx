import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

class MainUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            username: this.props.username,
        }
    }

    getMainUserBio = () => {
        const { user, username } = this.state;
        axios
          .get(`/users/getMainUser`)
          .then(response => {
            console.log("getMainUser response, ", response.data);
            this.setState({
              oneChild: response.data
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({
              errorMsg: "Sorry, there's something wrong with your entry."
            });
          });
      };

    render () {
        return(
            <div>
                this is your profile you main user you!
                </div>
        )
    }
}

export default MainUserProfile;