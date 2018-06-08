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
import "../Stylesheets/ChildPage.css";
import { Image, List } from "semantic-ui-react";

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

  handleClickAddService = e => {
    e.preventDefault();
    const { id } = this.state;
    return (window.location.href = `http://localhost:3000/users/child/${id}/service/add`);
  };

  render() {
    const { user, admin_username, oneChild, id } = this.state;
    console.log("child in profile", oneChild);
    return (
      <div>
        <div className="blurb">
          <div className="img-container">
            {oneChild.pic ? (
              <img
                src={oneChild.pic}
                alt="child's photo"
                className="profile-pic"
              />
            ) : (
              <i class="far fa-5x fa-user-circle" />
            )}
          </div>
          <div className="general-info">
            <div className="my-name">{oneChild.first_name}</div>
            <div className="my-age">Age: {oneChild.age}</div>
          </div>
        </div>
        <Tabs className="tabs">
          <TabList className="tab-list">
            <Tab className="single-tab">About</Tab>
            <Tab className="single-tab">Services</Tab>
            <Tab className="single-tab">Next Steps</Tab>
            <Tab className="single-tab">Resources</Tab>
          </TabList>

          <TabPanel className="tab-panel">
            <List>
              <List.Item>
                <List.Content>
                  Date of Birth: {oneChild.date_of_birth}{" "}
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Content>Diagnosis: {oneChild.diagnosis}</List.Content>
              </List.Item>

              <List.Item>
                {" "}
                <List.Content>School: {oneChild.school}</List.Content>
              </List.Item>
              <List.Item>
                {" "}
                <List.Content>Grade Level: {oneChild.grade}</List.Content>
              </List.Item>
              <List.Item>
                {" "}
                <List.Content>Class Size: {oneChild.class_size}</List.Content>
              </List.Item>
              <List.Item>
                {" "}
                <List.Content>Likes: {oneChild.likes}</List.Content>
              </List.Item>
              <List.Item>
                {" "}
                <List.Content>Dislikes: {oneChild.dislikes}</List.Content>
              </List.Item>
            </List>
          </TabPanel>
          <TabPanel className="tab-panel">
            <Services
              admin_username={admin_username}
              oneChild={oneChild}
              id={id}
              handleClickAddService={this.handleClickAddService}
            />
          </TabPanel>
          <TabPanel className="tab-panel">
            <NextSteps
              admin_username={admin_username}
              oneChild={oneChild}
              id={id}
            />
          </TabPanel>
          <TabPanel className="tab-panel">
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
