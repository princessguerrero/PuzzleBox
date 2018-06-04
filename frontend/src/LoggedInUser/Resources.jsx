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
      resources_link: "",
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
      resources_link: e.target.value
    });
  };

  handleClickAddResource = e => {
    console.log("adding a resource link");
    e.preventDefault();
    console.log("id", this.state.id);
    axios
      .post(`/users/addResource/${this.state.id}`, {
        id: this.state.id,
        resources_link: this.state.resources_link
      })
      .then(res => {
        console.log(res);
        const { resources_link, allResources, id } = this.state;
        const newResourceLink = {
          id: generateId(),
          user_child_id: id,
          resources_link: resources_link
        };
        const holdAllResourcesLink = [...allResources, newResourceLink];
        this.setState({
          addedResource: true,
          allResources: holdAllResourcesLink,
          resources_link: ""
        });
      })
      .catch(err => {
        console.log("err sending post req in resources", err);
      });
  };

  render() {
    const { id, resources_link, addedResource, allResources } = this.state;

    return (
      <div>
        these are the resources for this child
        <textarea
          type="text"
          name="resources_link"
          value={resources_link}
          onChange={this.handleInput}
        />
        <button onClick={this.handleClickAddResource}>Add a Resource Link</button>
        <div>
          {allResources.map(resource => {
            return <li><a href={resource.resources_link}>{resource.resources_link}</a></li>
          })}
        </div>
      </div>
    );
  }
}

export default Resources;
