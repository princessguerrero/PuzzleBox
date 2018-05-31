import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

class NextSteps extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
        }
    }
    render() {
        return (
            <div>
                these are the next steps for this child (todo's)
                </div>
        )
    }
}

export default NextSteps;

