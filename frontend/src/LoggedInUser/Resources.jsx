import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

const generateId = () =>
  Math.random()
    .toString(34)
    .slice(2);

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      oneChild: this.props.oneChild,
      allResources: [],
      resource_link: "",
      resource_name: "",
      resource_description: "",
      addedResource: false
    };
  }

  getAllResources = () => {
    const { id, oneChild } = this.state;
    axios
      .get(`/users/getAllResources/${oneChild.id}`)
      .then(response => {
        console.log("resources response, ", response.data);
        this.setState({
          allResources: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with resources."
        });
      });
  };

  componentDidMount() {
    // this.getUserPics();
    this.getAllResources();
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClickAddResource = e => {
    console.log("adding a resource link");
    e.preventDefault();
    console.log("id", this.state.id);
    axios
      .post(`/users/addResource/${this.state.id}`, {
        id: this.state.id,
        resource_link: this.state.resource_link,
        resource_name: this.state.resource_name,
        resource_description: this.state.resource_description
      })
      .then(res => {
        console.log(res);
        const { resource_link, resource_name, resource_description, allResources, id } = this.state;
        const newResourceLink = {
          id: generateId(),
          user_child_id: id,
          resource_link: resource_link,
          resource_name: resource_name,
          resource_description: resource_description
        };
        const holdAllResourcesLink = [...allResources, newResourceLink];
        this.setState({
          addedResource: true,
          allResources: holdAllResourcesLink,
          resource_link: ""
        });
      })
      .catch(err => {
        console.log("err sending post req in resources", err);
      });
  };

  render() {
    const { id, resource_link, resource_name, resource_description, addedResource, allResources } = this.state;

    return (
      <div>
        these are the resources for this child
        <form>
        Enter Link:
        <input
          type="text"
          name="resource_link"
          value={resource_link}
          onChange={this.handleInput}
        />
        Enter Name:
        <input
          type="text"
          name="resource_name"
          value={resource_name}
          onChange={this.handleInput}
        />
        Enter Description:
        <input
          type="text"
          name="resource_description"
          value={resource_description}
          onChange={this.handleInput}
        />
        <input type="button" onClick={this.handleClickAddResource} value="Add Resource"/>
        </form>
        <div>
          {allResources.map(obj => {
            return <li><a href={obj.resource_link}>{obj.resource_link}</a>
            Name: {obj.resource_name}
            Description: {obj.resource_description}</li>
          })}
        </div>
      </div>
    );
  }
}

export default Resources;
