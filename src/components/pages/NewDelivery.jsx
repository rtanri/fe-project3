import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import {
  Button,
  Typography,
  Divider,
  TextField,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";

// importing sub-component
import AddingItem from "../delivery_component/secondAddingItem";
import Payment from "../delivery_component/ThirdPayment";
import SubmitSuccess from "../delivery_component/ForthPaymentSuccess";

import { withCookies } from "react-cookie";
import { toast } from "react-toastify";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontSize: "50px",
  },
  divider: {
    marginTop: 20,
    marginBottom: 20,
  },
  instructions: {
    marginTop: 40,
    marginBottom: 40,
  },
  subTitle: {
    whiteSpace: "nowrap",
    marginTop: 0,
    marginBottom: 80,
  },
  cardImage: {
    height: 250,
  },
  selectMenu: {
    width: 200,
    height: 30,
    fontSize: 14,
    paddingLeft: 10,
    border: "1px solid lightgrey",
    borderRadius: 4,
  },
  formLabel: {
    marginTop: 30,
    marginBottom: 30,
  },
});

function NewDelivery(props) {
  const classes = useStyles();
  let history = useHistory();
  const [myToken, setMyToken] = useState("");
  const [itemLimit, setItemLimit] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    authenticateUser();
  }, [props.cookies]);

  function authenticateUser() {
    // validate and see if token exist
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Please login to set new delivery");
    }
    setMyToken(token);
  }

  function handleOrderFormSubmit() {
    axios
      .post(
        "http://localhost:4000/api/v1/orders",
        {
          addressType: address,
          postalCode: postalCode,
          city: city,
          country: country,
        },
        {
          headers: {
            token: myToken,
          },
        }
      )
      .then(response => {
        toast(2);
        toast("Order is successfully loaded");
      })
      .catch(err => {
        toast(3);
        toast(err.response.data.message);
        console.log(err.response);
      });
  }

  return (
    <div className="main-body">
      <h1 className={classes.title}>Set a New Delivery</h1>
      {/* Relationship type = item limit */}
      <div className="flexbox-column">
        <h1 className="">What kind of relationship do you have?</h1>
        <p className={classes.subTitle}>
          Let us handle the sentimental items collection or delivery for you
        </p>
        <div className="flexbox-row">
          <Card className="relationshipCardStyling">
            <CardActionArea onClick={() => setItemLimit(2)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.oneNightLove}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  One Night Love
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 2 items - you feel too shy to give or ask for return in
                  person
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className="relationshipCardStyling">
            <CardActionArea onClick={() => setItemLimit(5)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.shortTermDates}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  1 or 2 Year Dates
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 5 Items - couple spent at least Valentine or Christmas
                  together 1 time
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          <Card className="relationshipCardStyling">
            <CardActionArea onClick={() => setItemLimit(10)}>
              <CardMedia
                className={classes.cardImage}
                image={imageUrlMapping.almostBTO}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Almost BTO
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Max 10 items - Life must goes on... some couples used to live
                  together
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        {/* Address */}
        <form>
          <div className="flexbox-column-start" style={{ width: "700px" }}>
            <div className="form-line-input">
              <label className="formLabelSize">Delivery Type: </label>
              <select
                required
                onChange={e => setDeliveryType(e.target.value)}
                className={classes.selectMenu}
              >
                <option value="">Select type</option>
                <option value="collect">Collecting item</option>
                <option value="return">Returning item</option>
              </select>
            </div>
            <div className="form-line-input">
              <label className="formLabelSize">Address: </label>
              <div className="flexbox-column address-field">
                <TextField
                  required
                  label="Address"
                  size="small"
                  variant="outlined"
                  className="formInput"
                  onChange={e => setAddress(e.target.value)}
                />
                <TextField
                  required
                  label="Postal Code"
                  size="small"
                  variant="outlined"
                  className="formInput"
                  onChange={e => setPostalCode(e.target.value)}
                />
                <TextField
                  required
                  label="City"
                  size="small"
                  variant="outlined"
                  className="formInput"
                  onChange={e => setCity(e.target.value)}
                />
                <TextField
                  required
                  label="Country"
                  size="small"
                  variant="outlined"
                  className="formInput"
                  onChange={e => setCountry(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Divider className={classes.divider} />
      <AddingItem myToken={myToken} />
      <Divider className={classes.divider} />
      <Payment />;
    </div>
  );
}

export default withCookies(NewDelivery);
