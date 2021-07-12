import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  footerBody: {
    backgroundColor: "#E7ECFF",
  },
  topContent: {
    minHeight: 50,
    alignItems: "flex-start",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginLeft: 30,
    marginTop: 30,
  },
  bottomContent: {
    flexGrow: 1,
    alignSelf: "flex-end",
    marginBottom: theme.spacing(1),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.footerBody}>
        <Container maxWidth="md">
          <Typography color="primary" className={classes.topContent}>
            @2021 Created by FreshStart team
          </Typography>
          <hr />
          <Toolbar color="primary" className={classes.bottomContent}>
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
        </Container>
      </AppBar>
    </div>
  );
}
