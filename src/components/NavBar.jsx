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

export default function NavBar() {
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
          <Link to="/deliver-collect-item" className="menu-nav-link">
            <Button color="primary" className={classes.buttonStyling}>
              New Delivery
            </Button>
          </Link>
          <Link to="/order-list" className="menu-nav-link">
            <Button color="primary" className={classes.buttonStyling}>
              Your Order
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
