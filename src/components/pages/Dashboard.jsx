import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
// import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Button, Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { withCookies } from "react-cookie";

const useStyles = makeStyles({
  orderListBox: {
    border: "2px solid gray",
    minWidth: "600px",
    minHeight: "300px",
    backgroundColor: "#eaeaea",
    borderRadius: 4,
  },
  orderSheet: {
    minWidth: "250px",
    minHeight: "500px",
    padding: 10,
    marginLeft: 20,
    border: "2px solid gray",
    position: "relative",
    borderRadius: 4,
  },
  orderCard: {
    border: "1px solid grey",
    borderRadius: 4,
    minWidth: 275,
    maxHeight: 150,
    margin: 10,
    padding: 0,
  },
  title: {
    fontSize: 14,
  },
  subheader: {
    marginBottom: 12,
  },
  eachCardHeader: {
    // border: "1px solid grey",
    maxHeight: 30,
    padding: 5,
  },
  headerTitle: {
    maxHeight: 30,
    fontSize: 14,
    margin: 0,
  },
  eachCardBody: {
    // border: "1px solid grey",
    padding: 0,
    maxHeight: 50,
  },
  addressBox: {
    position: "absolute",
    bottom: "20px",
    margin: 5,
  },
});

function Dashboard(props) {
  const classes = useStyles();
  const [myToken, setMyToken] = useState("");
  let history = useHistory();

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    // validate and see if token exist
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Please login to create new Order");
    }
    setMyToken(token);
  };

  const createNewOrder = () => {
    console.log(props.cookies.get("auth_token"));
    axios
      .post(
        "http://localhost:4000/api/v1/orders",
        {},
        {
          headers: {
            token: props.cookies.get("auth_token"),
          },
        }
      )
      .then(response => {
        toast("2");
        console.log(response.data);
        const orderID = response.data.orderID;
        const addressID = response.data.addressID;
        toast(orderID);
        history.push("/new-delivery/" + orderID + "/" + addressID);
      })
      .catch(err => {
        toast(3);
        toast(err.response.data.message);
      });
  };

  return (
    <div className="main-body">
      <h1 align="center">Order list</h1>
      <div className="flexbox-row">
        <div className={classes.orderListBox}>
          <div>
            <OrderCard />
            <OrderCard />
            <p align="center">
              <Button
                onClick={() => createNewOrder()}
                type="button"
                variant="contained"
                color="primary"
              >
                Create new order
              </Button>
            </p>
          </div>
        </div>
        <div>
          <OrderIdWithDetail />
        </div>
      </div>
    </div>
  );
}

function OrderIdWithDetail() {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.orderSheet}>
        <h2 align="center">Order #1231431</h2>
        <Typography as="p" align="center">
          Jul 2021
        </Typography>
        <hr />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Item 1" secondary="weight: 500gr" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Item 2" secondary="weight: 500gr" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Item 3" secondary="weight: 500gr" />
        </ListItem>
        <hr style={{ position: "relative", top: 50 }} />
        <div className={classes.addressBox}>
          <Typography as="h4">Delivery to</Typography>
          <Typography as="p">
            3 bedok reservoir view #08-12, Singapore 456341
          </Typography>
        </div>
      </List>
    </div>
  );
}

function OrderCard() {
  const classes = useStyles();

  return (
    <Card className={classes.orderCard}>
      <CardHeader
        title="Date: Sat 17, July 2021"
        classes={{
          title: classes.headerTitle,
        }}
        className={classes.eachCardHeader}
      />
      <CardContent className={classes.eachCardBody}>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Order #1231431" secondary="Quantity: 4" />
        </ListItem>
      </CardContent>
    </Card>
  );
}

export default withCookies(Dashboard);
