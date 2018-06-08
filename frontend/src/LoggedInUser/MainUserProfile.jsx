import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import "../Stylesheets/MainUserProfile.css";

class MainUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      mainUserBio: {}
    };
  }

  getMainUserBio = () => {
    const { user, mainUserBio } = this.state;
    axios
      .get(`/users/getMainUserBio/${user.username}`)
      .then(response => {
        console.log("getMainUser response, ", response.data);
        this.setState({
          mainUserBio: response.data.user
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with your entry."
        });
      });
  };

  componentDidMount() {
    this.getMainUserBio();
  }

  render() {
    const { user, mainUserBio, id } = this.state;
    console.log("this is mainuserbio", this.state);
    console.log("user in bio", user);
    return (
      <div className="userprofilecard">
        <Card>
          <Image
            className="imagesize"
            src={mainUserBio.pic}
            alt="main user pic"
          />
          <Card.Content>
            <Card.Header>
              {mainUserBio.first_name} {mainUserBio.last_name}
            </Card.Header>
            <Card.Meta>Relationship: {mainUserBio.relationship}</Card.Meta>
            <Card.Description>
              Message/Notes: {mainUserBio.notes}{" "}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default MainUserProfile;
