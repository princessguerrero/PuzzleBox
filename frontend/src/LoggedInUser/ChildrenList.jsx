import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { Card, Icon, Image } from "semantic-ui-react";
import "../Stylesheets/ChildrenList.css";

class ChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_username: this.props.username,
      allChildren: []
    };
  }

  getAllChildren = () => {
    const { allChildren } = this.state;
    axios
      .get("/users/getAllChildren")
      .then(response => {
        console.log("allchildren response, ", response.data);
        this.setState({
          allChildren: response.data.data
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          errorMsg: "Sorry, there's something wrong with your list."
        });
      });
  };

  componentDidMount() {
    // this.getUserPics();
    this.getAllChildren();
  }

  render() {
    const { admin_username, allChildren } = this.state;
    console.log("state for childrenlist", this.state);
    return (
      <div>
        <div className="buttontitlediv">
        <h1 className="pagetitle">List of Children</h1>
        <Button inverted color="teal">
          {" "}
          <Link to="/users/childbio">Add a Child</Link>{" "}
        </Button>
        </div>
        {allChildren.map(child => {
          console.log("child id", child.id);
          return (
            <Link to={`/users/child/${child.id}/profile`}>
              <Card>
                {child.pic ? (
                  <Image
                    src={child.pic}
                    alt="profile pic"
                    className="imagesize"
                  />
                ) : (
                  <i class="far fa-5x fa-user-circle" />
                )}{" "}
                <Card.Content>
                  <Card.Header className="imagetext">
                    {child.first_name} {child.last_name}
                  </Card.Header>
                </Card.Content>
              </Card>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default ChildrenList;
