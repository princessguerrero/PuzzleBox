import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

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

  handleChange = e => {
    this.setState({
      service_category: e.target.value
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
      <div>
        This is where you add a service. So make a form.
        <form>
          Full Name:
          <input
            type="text"
            name="fullname"
            value={fullname}
            onChange={this.handleInput}
          />
          <br />
          Job Title:
          <input
            type="text"
            name="job_title"
            value={job_title}
            onChange={this.handleInput}
          />
          <br />
          Frequency
          <input
            type="text"
            name="frequency"
            value={frequency}
            onChange={this.handleInput}
          />
          <br />
          Organization:
          <input
            type="text"
            name="organization"
            value={organization}
            onChange={this.handleInput}
          />
          <br />
          Organization Address:
          <input
            type="text"
            name="org_address"
            value={org_address}
            onChange={this.handleInput}
          />
          <br />
          Phone:
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={this.handleInput}
          />
          <br />
          Website:
          <input
            type="text"
            name="website"
            value={website}
            onChange={this.handleInput}
          />
          <br />
          Service Type:
          <div>
          <label>
            in-home
            <input
              type="radio"
              name="service_category"
              value="in-home"
              checked={this.state.service_category === "in-home"}
              onChange={this.handleChange}
            />
          </label>
          <label>
            in-school
            <input
              type="radio"
              name="service_category"
              value="in-school"
              checked={this.state.service_category === "in-school"}
              onChange={this.handleChange}
            />
          </label>
          </div>
          <label>
            medical
            <input
              type="radio"
              name="service_category"
              value="medical"
              checked={this.state.service_category === "medical"}
              onChange={this.handleChange}
            />
          </label>
          <label>
            medicaid/insurance
            <input
              type="radio"
              name="service_category"
              value="medicaid/insurance"
              checked={this.state.service_category === "medicaid/insurance"}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <input
            type="submit"
            value="Add Service"
            onClick={this.renderAddService}
          />
        </form>
      </div>
    );
  }
}

export default AddService;
