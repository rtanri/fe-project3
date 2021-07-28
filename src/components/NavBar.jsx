import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { withCookies } from "react-cookie";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBarStyling: {
    backgroundColor: "rgba(67, 129, 168,0)",
    marginBottom: "-50px",
    alignItems: "center",
  },
  buttonStyling: {
    marginRight: 15,
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
  },
}));

function NavBar({ auth, setAuth, ...props }) {
  // const Auth = React.useContext(AuthApi);
  const classes = useStyles();
  let history = useHistory();
  const [token, setToken] = useState(false);

  useEffect(() => {
    const token = props.cookies.get("auth_token");

    if (!token) {
      return setToken(false);
    } else {
      return setToken(true);
    }
  }, [props.cookies]);

  const handleLogout = () => {
    setAuth(false);
    props.cookies.remove("auth_token");
    setToken(false);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBarStyling}>
        <Toolbar variant="dense">
          {auth && (
            <Link to="/forum" className="menu-nav-link">
              <Button color="primary" className={classes.buttonStyling}>
                Forum
              </Button>
            </Link>
          )}

          {auth && (
            <Link to="/dashboard" className="menu-nav-link">
              <Button color="primary" className={classes.buttonStyling}>
                Delivery
              </Button>
            </Link>
          )}

          {auth ? (
            <Button
              color="secondary"
              className={classes.buttonStyling}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/" className="menu-nav-link">
              <Button
                disabled
                color="primary"
                className={classes.buttonStyling}
              ></Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withCookies(NavBar);
