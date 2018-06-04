import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";

class ChildrenList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_username: this.props.username,
      allChildren: [],
    };
  }

  getAllChildren = () => {
      const { allChildren } = this.state
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
      console.log("state for childrenlist", this.state)
      return(
          <div>
              this is a list of children.
              make a profile route to view each child
              <div>
                <Button> <Link to="/users/childbio">Add a Child</Link> </Button>
        {allChildren.map(child => {
            console.log("child id", child.id)
            return <div><Link to={`/users/child/${child.id}/profile`} ><img src={child.pic} alt="profile pic"/> <span>{child.first_name} {child.last_name}</span></Link></div>
        })}
        </div>
              </div>
      )
  }
}

export default ChildrenList;