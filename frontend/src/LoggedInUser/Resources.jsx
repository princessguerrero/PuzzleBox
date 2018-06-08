import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Form, Input, Button } from "semantic-ui-react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

const generateId = () =>
  Math.random()
    .toString(34)
    .slice(2);

const is_url = str => {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str)) {
    return true;
  } else {
    return false;
  }
};

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
      addedResource: false,
      message: ""
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

    if (!is_url(this.state.resource_link)) {
      this.setState({
        message: "please enter a valid url"
      });
    } else {
      axios
        .post(`/users/addResource/${this.state.id}`, {
          id: this.state.id,
          resource_link: this.state.resource_link,
          resource_name: this.state.resource_name,
          resource_description: this.state.resource_description
        })
        .then(res => {
          console.log(res);
          const {
            resource_link,
            resource_name,
            resource_description,
            allResources,
            id
          } = this.state;
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
            resource_link: "",
            resource_name: "",
            resource_description: ""
          });
        })
        .catch(err => {
          console.log("err sending post req in resources", err);
        });
    }
  };
  render() {
    const {
      id,
      resource_link,
      resource_name,
      resource_description,
      addedResource,
      allResources,
      message,
      oneChild
    } = this.state;

    return (
      <div>
        <div>Please enter resources for {oneChild.first_name}.</div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              label="Enter Link:"
              type="text"
              name="resource_link"
              target="_blank"
              value={resource_link}
              onChange={this.handleInput}
            />

            <Form.Input
              label="Enter Name:"
              type="text"
              name="resource_name"
              value={resource_name}
              onChange={this.handleInput}
            />

            <Form.Input
              label="Enter Description:"
              type="text"
              name="resource_description"
              value={resource_description}
              onChange={this.handleInput}
            />
            <Button
              inverted
              color="purple"
              type="button"
              onClick={this.handleClickAddResource}
              value="Add Resource"
              content="Add Resource"
            />
          </Form.Group>
        </Form>
        {message}
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Link</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allResources.map(obj => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <a href={obj.resource_link}>{obj.resource_link}</a>
                  </Table.Cell>
                  <Table.Cell>{obj.resource_name}</Table.Cell>
                  <Table.Cell>{obj.resource_description}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Resources;
