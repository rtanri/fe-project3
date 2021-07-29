import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { TextField, Button } from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import WorkIcon from "@material-ui/icons/Work";

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

function Payment(props) {
  const classes = useStyles();
  let history = useHistory();
  let params = useParams();
  const [allItem, setAllItem] = useState([]);
  const [myToken, setMyToken] = useState("");
  const [price, setPrice] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState(""); //for styling and animation

  useEffect(() => {
    authenticateUser();
    fetchListOfItem();
  }, []);

  const fetchListOfItem = async () => {
    console.log(params.orderID);
    const result = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/v1/orders/${params.orderID}/products`,
      {
        headers: {
          token: props.cookies.get("auth_token"),
        },
      }
    );
    setAllItem(result.data);
    const totalPrice = result.data.length;
    setPrice(totalPrice * 20);
  };

  const authenticateUser = async () => {
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Please login to set new delivery");
    }
    setMyToken(token);
  };

  const handleBack = () => {
    history.goBack();
  };

  const handlePay = async () => {
    await axios.patch(
      `${process.env.REACT_APP_BACKEND}/api/v1/payment/${params.orderID}`
    );

    history.push("/successful-order");
  };

  return (
    <div className="main-body">
      <h1 className="pageTitle">Payment for Better FreshStart</h1>
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
            <div>
              <Button
                type="button"
                className="margin-bottom"
                variant="outlined"
                color="primary"
                style={{ margin: 5, width: 120 }}
                onClick={() => {
                  handleBack();
                }}
              >
                Back
              </Button>
              <Link to="/successful-order" className="menu-nav-link">
                <Button
                  type="button"
                  className="margin-bottom"
                  variant="contained"
                  color="primary"
                  style={{ margin: 5, width: 120 }}
                  onClick={handlePay}
                >
                  Pay
                </Button>
              </Link>
            </div>
          </form>
        </div>
        <OrderDetail allItem={allItem} price={price} />
      </div>
    </div>
  );
}

function OrderDetail({ allItem, price }) {
  const classes = useStyles();

  return (
    <div>
      <List className={classes.orderSheet}>
        <h2 align="center">Your Order</h2>
        {allItem.map(item => (
          <ListItem key={item._id}>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <div>
              <p className="order-title">{item.name}</p>
              <p className="order-subtitle">{item.weight} gram</p>
            </div>
          </ListItem>
        ))}

        <h2 className={classes.totalPay}>
          Total: <span>${price}</span>
        </h2>
      </List>
    </div>
  );
}

export default withCookies(Payment);
