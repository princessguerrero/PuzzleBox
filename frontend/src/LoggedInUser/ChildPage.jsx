import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";
import Services from "./Services";
import Contacts from "./Contacts";
import NextSteps from "./NextSteps";
import Resources from "./Resources";

class ChildPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_username: this.props.username,
      oneChild: {},
      id: this.props.id
    };
  }

  getOneChild = () => {
    const { admin_username, id, oneChild } = this.state;
    axios
      .get(`/users/getUserChild/${id}`)
      .then(response => {
        console.log("onechild response, ", response.data);
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

  componentDidMount() {
    this.getOneChild();
  }

  handleClickAddService
  render() {
    const { user, admin_username, oneChild, id } = this.state;
    console.log("child in profile", oneChild);
    return (
      <div>
        this is child's profile
        <div>
          <i class="far fa-5x fa-user-circle" />
        </div>
        <div>{oneChild.first_name}</div>
        <div>Age: {oneChild.age}</div>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Services</Tab>
            <Tab>Next Steps</Tab>
            <Tab>Resources</Tab>
          </TabList>

          <TabPanel>
            <div>
              Date of Birth: {oneChild.date_of_birth} <br />
              Diagnosis: {oneChild.diagnosis}
              <br />
              School: {oneChild.school}
              <br />
              Grade Level: {oneChild.grade}
              <br />
              Class Size: {oneChild.class_size}
              <br />
              Likes: {oneChild.likes}
              <br />
              Dislikes: {oneChild.dislikes}
              <br />
            </div>
          </TabPanel>
          <TabPanel>
            <Services
              admin_username={admin_username}
              oneChild={oneChild}
              id={id}
              handleClickAddService={this.handleClickAddService}
            />
          </TabPanel>
          <TabPanel>
            <NextSteps
              admin_username={admin_username}
              oneChild={oneChild}
              id={id}
            />
          </TabPanel>
          <TabPanel>
            <Resources
              admin_username={admin_username}
              oneChild={oneChild}
              id={id}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default ChildPage;
