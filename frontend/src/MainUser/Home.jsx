import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../Stylesheets/Home.css";
import TeamWorkPic from "../Images/teamworkpic.jpg";

class Home extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <img src={TeamWorkPic} alt="teamworkpic" className="homeimage" />
        <div className="centered">
          <div className="first-text">
            <p>
              Caring for a loved one with special needs requires organization.
            </p>
            <p>Sometimes, it can get overwhelming.</p>
          </div>

          <div className="second-text">
            <p>Finally, here's an app that can help.</p>
            <p> Designed having caregivers in mind.</p>
            <p>
              It's time to get organized!  <Link to="/users/">Sign up</Link> for{" "}
              <span className="puzzlebox-font">PuzzleBox</span>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
