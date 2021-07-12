import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { spacing } from "@material-ui/system";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBarTransparent: {
    backgroundColor: "rgba(67, 129, 168,0)",
    marginBottom: "-50px",
    alignItems: "center",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        elevation={0}
        className={classes.appBarTransparent}
      >
        <Toolbar variant="dense">
          <Button color="primary" style={{ marginRight: 15 }}>
            Home
          </Button>
          <Button color="primary" style={{ marginRight: 15 }}>
            Forum
          </Button>
          <Button color="primary" style={{ marginRight: 15 }}>
            Delivery
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
