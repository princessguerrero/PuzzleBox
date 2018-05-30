import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// this is the default style sheet for react-tabs
import "react-tabs/style/react-tabs.css";

class ChildPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
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

  render() {
    const { user, allChildren, oneChild, id } = this.state;
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
            <Tab>Contacts</Tab>
            <Tab>Next Steps</Tab>
            <Tab>Resources</Tab>
          </TabList>
        </Tabs>
      </div>
    );
  }
}

export default ChildPage;
