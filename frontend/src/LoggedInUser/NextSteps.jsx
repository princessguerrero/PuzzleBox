import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react';
import "../Stylesheets/NextSteps.css";

const generateId = () =>
  Math.random()
    .toString(34)
    .slice(2);

class NextSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      oneChild: this.props.oneChild,
      allNextSteps: [],
      child_next_steps: "",
      addedNextSteps: false
    };
  }

  getAllNextSteps = () => {
    const { id, oneChild } = this.state;
    axios
      .get(`/users/getAllNextSteps/${oneChild.id}`)
      .then(response => {
        console.log("next steps response, ", response.data);
        this.setState({
          allNextSteps: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with next steps."
        });
      });
  };

  componentDidMount() {
    // this.getUserPics();
    this.getAllNextSteps();
  }

  handleInput = e => {
    this.setState({
      child_next_steps: e.target.value,
    });
  };

  handleClickAddNextSteps = e => {
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
        const { child_next_steps, allNextSteps, id } = this.state
        const newChildNextStep = {id: generateId(), user_child_id: id, child_next_steps: child_next_steps}
        const holdAllNextSteps = [...allNextSteps, newChildNextStep]
        this.setState({
          addedNextSteps: true,
          allNextSteps: holdAllNextSteps,
          child_next_steps: ""
        });
      })
      .catch(err => {
        console.log("err sending post req in next steps", err);
      });
  };

  render() {
    const { id, child_next_steps, addedNextSteps, allNextSteps, oneChild } = this.state;
    console.log("child next steps", this.state)
    return (
      <div>
        <div className="next-steps-inst">Please type the next steps for {oneChild.first_name}</div>
        <Form>
        <Form.Input
        className="inputfield-box"
          type="text"
          name="child_next_steps"
          value={child_next_steps}
          onChange={this.handleInput}
        />
        <Button inverted color="violet" onClick={this.handleClickAddNextSteps} content="Add a Next Step"></Button>
        </Form>
        <div>
            {allNextSteps.map(step => {
                return <li className="list-items">{step.child_next_steps}</li>
            })}
        </div>
      </div>
    );
  }
}

export default NextSteps;
