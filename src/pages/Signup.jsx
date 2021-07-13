import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  pageTitle: {
    textAlign: "center",
    marginBottom: "80px",
  },
  formHeader: {
    textAlign: "left",
    marginBottom: "40px",
  },
  formInput: {
    width: "400px",
    marginBottom: "20px",
  },
  smallFormInput: {
    width: "190px",
    marginBottom: "20px",
  },
}));

export default function Signup() {
  const classes = useStyles();

  return (
    <div className="main-body flexbox-column">
      <h1 className={classes.pageTitle}>
        New To FreshStart, Sign-up Your Details
      </h1>
      <div className="login-box">
        <h3 className={classes.formHeader}>Sign up for a free account</h3>
        <form className="flexbox-column">
          <div>
            <TextField
              required
              id="outlined-required"
              label="First Name"
              defaultValue=""
              variant="outlined"
              size="small"
              style={{ marginRight: 20 }}
              className={classes.smallFormInput}
            />
            <TextField
              id="outlined-required"
              label="Last Name"
              defaultValue=""
              variant="outlined"
              size="small"
              className={classes.smallFormInput}
            />
          </div>

          <TextField
            required
            id="outlined-required"
            label="Email Address"
            defaultValue=""
            variant="outlined"
            size="small"
            className={classes.formInput}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            defaultValue=""
            variant="outlined"
            size="small"
            className={classes.formInput}
          />
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            defaultValue=""
            variant="outlined"
            size="small"
            className={classes.formInput}
          />
          <Button
            type="submit"
            className="margin-bottom"
            variant="contained"
            color="primary"
            style={{ margin: 20, width: 150 }}
          >
            Register
          </Button>
        </form>
      </div>
      <WordsAndLink url="/login-user" params="Existing user can login here" />
    </div>
  );
}

function WordsAndLink({ url, params }) {
  return (
    <Link to={url} style={{ marginBottom: 20, textDecoration: "none" }}>
      {params}
    </Link>
  );
}
