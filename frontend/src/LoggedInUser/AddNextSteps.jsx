import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class AddNextSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      child_next_steps: "",
      addedNextSteps: false
    };
  }

  renderAddNextSteps = e => {
    console.log("adding a next step");
    e.preventDefault();
    console.log("id", this.state.id);
    axios
      .post(`/users/addNextSteps/${this.state.id}`, {
        id: this.state.id,
        child_next_steps: this.state.child_next_steps,        
      })
      .then(res => {
        console.log(res);
        this.setState({
          addedNextSteps: true
        });
      })
      .catch(err => {
        console.log("err sending post req in services", err);
      });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
      const { id, child_next_steps, addedNextSteps } =  this.state
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
        <textarea
          type="text"
          name="child_next_steps"
          value={child_next_steps}
          onChange={this.handleInput}
        />
        <button onClick={this.renderAddNextSteps}>Submit</button>
      </div>
    );
  }
}
export default AddNextSteps;
