import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

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
        <p>Here you can view and add service providers.</p>
       {allServices.map(service => {
           return <div>{service.fullname}, {service.job_title} Frequency: {service.frequency}
           </div>
       })}
       <button onClick={this.props.handleClickAddService}>Add Service</button>
      </div>
    );
  }
}

export default Services;
