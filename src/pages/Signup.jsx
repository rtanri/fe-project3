import React from "react";
import { TextField, Button } from "@material-ui/core";

class Signup extends React.Component {
  render() {
    return (
      <div className="main-body">
        <h1 align="center">Signup Page</h1>

        <form className="flexbox-pricing">
          <TextField label="Name" className="margin-bottom-top" />
          <TextField label="Email Address" className="margin-bottom-top" />
          <TextField label="Password" className="margin-bottom-top" />
          <TextField label="Confirm Password" className="margin-bottom-top" />
          <Button
            type="submit"
            className="margin-bottom"
            variant="contained"
            color="primary"
            style={{ margin: 20 }}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Signup;
