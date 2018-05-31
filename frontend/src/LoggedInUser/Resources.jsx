import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

class Resources extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
        }
    }
    render() {
        return (
            <div>
                these are the resources for this child
                </div>
        )
    }
}

export default Resources;
