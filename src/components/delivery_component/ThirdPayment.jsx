import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  orderSheet: {
    width: "100%",
    maxWidth: 300,
    minHeight: "500px",
    padding: 10,
    marginLeft: 70,
    border: "2px solid gray",
    position: "relative",
  },
  totalPay: {
    position: "absolute",
    bottom: 10,
    left: 70,
  },
});

export default function Payment() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState(""); //for styling and animation

  return (
    <div className="flexbox-row" style={{ minHeight: 550 }}>
      <div id="PaymentForm" className="flexbox-column">
        <h2>Enter Credit Card Detail</h2>
        <div className="credit-card">
          <Cards
            cvc={cvc}
            expiry={expiry}
            focused={focus}
            name={name}
            number={number}
          />
        </div>

        <form className="flexbox-column" style={{ marginTop: 30 }}>
          <TextField
            required
            type="tel"
            label="Card Number"
            variant="outlined"
            size="small"
            id="number"
            style={{ width: "300px", marginBottom: "20px" }}
            onChange={e => setNumber(e.target.value)}
            onFocus={e => setFocus(e.target.id)}
          />
          <TextField
            required
            type="text"
            label="Name"
            variant="outlined"
            size="small"
            id="name"
            style={{ width: "300px", marginBottom: "20px" }}
            onChange={e => setName(e.target.value)}
            onFocus={e => setFocus(e.target.id)}
          />
          <div>
            <TextField
              required
              type="text"
              label="MM/YY Expiry"
              variant="outlined"
              size="small"
              id="expiry"
              style={{
                width: "200px",
                marginBottom: "20px",
                marginRight: "20px",
              }}
              onChange={e => setExpiry(e.target.value)}
              onFocus={e => setFocus(e.target.id)}
            />
            <TextField
              required
              type="tel"
              label="CVC"
              variant="outlined"
              size="small"
              id="cvc"
              style={{ width: "80px", marginBottom: "10px" }}
              onChange={e => setCvc(e.target.value)}
              onFocus={e => setFocus(e.target.id)}
            />
          </div>
          <Link to="/successful-order" className="menu-nav-link">
            <Button
              type="submit"
              className="margin-bottom"
              variant="contained"
              color="primary"
              style={{ margin: 20, width: 150 }}
            >
              Pay
            </Button>
          </Link>
        </form>
      </div>
      <OrderDetail />
    </div>
  );
}

function OrderDetail() {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.orderSheet}>
        <h2 align="center">Your Order</h2>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Work" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
        <hr style={{ position: "relative", top: 130 }} />
        <h2 className={classes.totalPay}>
          Total: <span>$45</span>
        </h2>
      </List>
    </div>
  );
}
