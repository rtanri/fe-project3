import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function postUserData() {
    toast(1);
    axios
      .post(`${process.env.REACT_APP_BACKEND}/api/v1/user/signup`, {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      })
      .then(response => {
        toast(2);
        console.log("sign-up successful");
        history.push("/login-user");
      })
      .catch(err => {
        toast(3);
        toast(err);
        console.log(err);
      });
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submit");
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
        <form
          className="flexbox-column"
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
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
            <TextField
              required
              id="username"
              label="Username"
              variant="outlined"
              size="small"
              className={classes.formInput}
              value={username}
              onChange={e => {
                setUsername(e.target.value);
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
            id="password"
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
