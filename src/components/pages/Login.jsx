import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
// import { userLoginService } from "../../services/usersService";
import { withCookies } from "react-cookie";
import axios from "axios";

import { toast } from "react-toastify";

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

function Login({ auth, setAuth, ...props }) {
  const classes = useStyles();
  let history = useHistory();

  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log(props);
    console.log(auth);
    axios
      .post("http://localhost:4000/api/v1/user/login", {
        username,
        password,
      })
      .then(response => {
        toast("2");
        console.log(response);
        props.cookies.set("auth_token", response.data.token, { path: "/" });

        toast("login successful, user is found");
        window.location.reload();
      })
      .catch(err => {
        console.log("3");
        console.log(err);
      })
      .finally(async () => {
        await history.push("/dashboard");
      });
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
            label="Username"
            variant="outlined"
            size="small"
            className={classes.formInput}
            value={username}
            onChange={e => {
              setUsername(e.target.value);
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
            type="button"
            className="margin-bottom"
            variant="contained"
            color="primary"
            style={{ margin: 20, width: 150 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
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

export default withCookies(Login);
