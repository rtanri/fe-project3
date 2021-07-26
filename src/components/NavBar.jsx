import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

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

function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBarStyling}>
        <Toolbar variant="dense">
          <Link to="/" exact className="menu-nav-link">
            <Button color="primary" className={classes.buttonStyling}>
              Home
            </Button>
          </Link>
          <Link to="/forum" className="menu-nav-link">
            <Button color="primary" className={classes.buttonStyling}>
              Forum
            </Button>
          </Link>
          {/* <Link to="/new-deliver" className="menu-nav-link">
            <Button color="primary" className={classes.buttonStyling}>
              New Delivery
            </Button>
          </Link> */}
          <Link to="/dashboard" className="menu-nav-link">
            <Button color="primary" className={classes.buttonStyling}>
              Dashboard
            </Button>
          </Link>
          {props.cookie ? (
            <Button
              color="secondary"
              className={classes.buttonStyling}
              onClick={props.logout}
            >
              Logout
            </Button>
          ) : (
            <Link to="/login-user" className="menu-nav-link">
              <Button color="primary" className={classes.buttonStyling}>
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
