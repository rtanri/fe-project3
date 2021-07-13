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
}));

export default function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  function findUserData() {
    axios
      .post("http://localhost:8000/api/v1/users/login", {
        email,
        password,
      })
      .then(response => {
        // after successful login, store the token as cookie
        const { cookies } = this.props;

        cookies.set("auth_token", response.data.token, {
          path: "/",
        });
        console.log("login successful");
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    findUserData();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    findUserData();
  };

  return (
    <div className="main-body flexbox-column">
      <h1 className={classes.pageTitle}>Login FreshStart Account Today</h1>
      <div className="login-box">
        <h3 className={classes.formHeader}>Login</h3>
        <form className="flexbox-column">
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
            Submit
          </Button>
        </form>
      </div>
      <WordsAndLink url="/" params="Forgot Password?" />
      <WordsAndLink
        url="/signup-new-user"
        params="Don't have an account? click here to sign-up"
      />
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
