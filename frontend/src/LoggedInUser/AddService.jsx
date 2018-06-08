import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import "../Stylesheets/AddService.css";

class AddService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      organization: "",
      fullname: "",
      job_title: "",
      frequency: "",
      org_address: "",
      phone: "",
      website: "",
      service_category: "",
      addedService: false
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = (e, { service_category }) => {
    this.setState({
      service_category
    });
  };

  renderAddService = e => {
    console.log("adding a service");
    e.preventDefault();
    console.log("id", this.state.id);
    axios
      .post(`/users/addService/${this.state.id}`, {
        id: this.state.id,
        organization: this.state.organization,
        fullname: this.state.fullname,
        job_title: this.state.job_title,
        frequency: this.state.frequency,
        org_address: this.state.org_address,
        phone: this.state.phone,
        website: this.state.website,
        service_category: this.state.service_category
      })
      .then(res => {
        console.log(res);
        this.setState({
          addedService: true
        });
      })
      .catch(err => {
        console.log("err sending post req in services", err);
      });
  };

  render() {
    const {
      id,
      organization,
      fullname,
      job_title,
      frequency,
      org_address,
      phone,
      website,
      service_category,
      addedService
    } = this.state;

    if (addedService)
      return (
        <Redirect
          to={{
            pathname: `/users/child/${id}/profile`,
            state: { referrer: this.state.username }
          }}
        />
      );
    return (
      <div className="addservice-box">
       
        <Form className="formbox">
        <div className="addservice-text">Please fill-out the form to add a service provider.</div>
          <Form.Input
            label="Full Name:"
            type="text"
            name="fullname"
            value={fullname}
            onChange={this.handleInput}
          />
          <Form.Input
            label="Job Title:"
            type="text"
            name="job_title"
            value={job_title}
            onChange={this.handleInput}
          />
          <Form.Input
            label="Frequency"
            type="text"
            name="frequency"
            value={frequency}
            onChange={this.handleInput}
          />
          <Form.Input
            label="Organization"
            type="text"
            name="organization"
            value={organization}
            onChange={this.handleInput}
          />
          <Form.Input
            label="Organization Address:"
            type="text"
            name="org_address"
            value={org_address}
            onChange={this.handleInput}
          />
          <Form.Input
            label="Phone:"
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleInput}
          />
          <Form.Input
            label="Website:"
            type="text"
            name="website"
            value={website}
            onChange={this.handleInput}
          />
          <label>Service Type:</label>
          <Form.Group inline>
            <Form.Radio
              label="in-home"
              service_category="in-home"
              value="in-home"
              checked={this.state.service_category === "in-home"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="in-school"
              value="in-school"
              service_category="in-school"
              checked={this.state.service_category === "in-school"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group inline>
            <Form.Radio
              label="medical"
              service_category="medical"
              value="medical"
              checked={this.state.service_category === "medical"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Medicaid/Insurance"
              value="medicaid/insurance"
              service_category="medicaid/insurance"
              checked={this.state.service_category === "medicaid/insurance"}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button
          fluid
            type="submit"
            value="Add Service"
            content="Add Service"
            onClick={this.renderAddService}
          />
        </Form>
      </div>
    );
  }
}

export default AddService;
