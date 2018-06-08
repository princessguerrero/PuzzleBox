import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Form, Input, Button } from "semantic-ui-react";
import { Icon, Label, Menu, Table } from "semantic-ui-react";

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      oneChild: this.props.oneChild,
      allServices: []
    };
  }

  getAllServices = () => {
    const { id, oneChild } = this.state;
    axios
      .get(`/users/getAllServices/${oneChild.id}`)
      .then(response => {
        console.log("onechild response, ", response.data);
        this.setState({
          allServices: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with services."
        });
      });
  };

  componentDidMount() {
    // this.getUserPics();
    this.getAllServices();
  }

  render() {
    const { admin_username, id, oneChild, allServices } = this.state;
    console.log("this is services", this.state);
    return (
      <div>
        <div>View or add service providers.</div>
        <Button
          onClick={this.props.handleClickAddService}
          content="Add a Service"
        />
        <Table celled padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Fullname</Table.HeaderCell>
              <Table.HeaderCell>Job Title</Table.HeaderCell>
              <Table.HeaderCell>Frequency</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Organization</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Website</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allServices.map(service => {
              return (
                <Table.Row>
                  <Table.Cell>{service.fullname}</Table.Cell>
                  <Table.Cell>{service.job_title} </Table.Cell>
                  <Table.Cell>{service.frequency} </Table.Cell>
                  <Table.Cell>{service.service_category} </Table.Cell>
                  <Table.Cell>{service.organization}</Table.Cell>
                  <Table.Cell>{service.org_address} </Table.Cell>
                  <Table.Cell>{service.phone} </Table.Cell>
                  <Table.Cell>
                    <a href={service.website} />
                    {service.website}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default Services;
