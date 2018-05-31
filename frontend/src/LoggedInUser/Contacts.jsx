import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

class Contacts extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
        }
    }
    render() {
        return (
            <div>
                this is contact list for this child
                </div>
        )
    }
}

export default Contacts;

