import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";

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

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  function postUserData() {
    axios
      .post("http://localhost:8000/api/v1/users/register", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      })
      .then(response => {
        console.log("sign-up successful");

        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    postUserData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    postUserData();
  };

  // componentDidMount, depends on inside the array (nothing, firstName, etc)

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
              id="firstName"
              label="First Name"
              variant="outlined"
              size="small"
              style={{ marginRight: 20 }}
              className={classes.smallFormInput}
              value={firstName}
              onChange={e => {
                setFirstName(e.target.value);
              }}
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="outlined"
              size="small"
              className={classes.smallFormInput}
              value={lastName}
              onChange={e => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <TextField
            required
            id="email"
            label="Email Address"
            variant="outlined"
            size="small"
            className={classes.formInput}
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            required
            id="outlined-required"
            label="Password"
            variant="outlined"
            size="small"
            className={classes.formInput}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <TextField
            required
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            size="small"
            className={classes.formInput}
            value={confirmPassword}
            onChange={e => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button
            type="submit"
            className="margin-bottom"
            variant="contained"
            color="primary"
            style={{ margin: 20, width: 150 }}
            onSubmit={e => {
              handleSubmit(e);
            }}
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
