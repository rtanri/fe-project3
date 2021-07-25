import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
// import { userLoginService } from "../../services/usersService";
import { withCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-toastify";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    toast("1");
    axios
      .post("http://localhost:4000/api/v1/user/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        toast("2");
        toast(response.message);
        // after successful login, store the token as cookie
        const { cookies } = this.props;

        // set auth_token as name of token get from backend response.data
        cookies.set("auth_token", response.data.token, {
          path: "/",
        });

        console.log(cookies);
        toast("login successful, user is found");
        this.props.history.push("/"); //success
      })
      .catch(err => {
        toast("3");
        toast(err.response.data.message);
      });
  }
  handleFormChange(e, fieldName) {
    let newState = {};
    newState[fieldName] = e.target.value;

    this.setState(newState);
  }
  render() {
    return (
      <div className="main-body flexbox-column">
        <h1 className="pageTitle">Login FreshStart Account Today</h1>
        <div className="login-box">
          <h3 className="formHeader">Login</h3>
          <form
            className="flexbox-column"
            onSubmit={e => {
              this.handleSubmit(e);
            }}
          >
            <TextField
              required
              id="email"
              label="username"
              variant="outlined"
              size="small"
              className="formInput"
              value={this.state.username}
              onChange={e => {
                this.handleFormChange(e, "username");
              }}
            />
            <TextField
              required
              id="password"
              label="Password"
              variant="outlined"
              size="small"
              className="formInput"
              value={this.state.password}
              onChange={e => {
                this.handleFormChange(e, "password");
              }}
            />
            <Button
              type="submit"
              className="margin-bottom"
              variant="contained"
              color="primary"
              style={{ margin: 20, width: 150 }}
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
}

function WordsAndLink({ url, params }) {
  return (
    <Link to={url} style={{ marginBottom: 20, textDecoration: "none" }}>
      {params}
    </Link>
  );
}

export default withCookies(Login);
