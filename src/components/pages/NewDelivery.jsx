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
  Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";

// importing sub-component
// import AddingItem from "../delivery_component/secondAddingItem";
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
  cardStyling: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 20,
    paddingTop: 0,
    border: "none",
    boxShadow: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  itemImage: {
    width: 90,
    height: 90,
    overflow: "hidden",
    //border: "1px solid lightGray",
    padding: 20,
  },
  addedProductName: {
    fontWeight: 400,
    fontSize: "1.1rem",
    textAlign: "center",
  },
  modalStyling: {
    position: "absolute",
    minWidth: "600px",
    minHeight: "300px",
    border: "2px solid lightGrey",
    boxShadow: 5,
    padding: 30,
    top: "15%",
    left: "25%",
    backgroundColor: "white",
  },
  uploadMenu: {
    fontSize: 15,
  },
  modalButton: {
    marginTop: 20,
    marginLeft: 150,
    marginBottom: 20,
    width: 150,
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
  const [allItem, setAllItem] = useState([]);

  useEffect(() => {
    authenticateUser();
    fetchListOfItem();
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

  const fetchListOfItem = async () => {
    toast("fetch item func");

    const result = await axios.get("http://localhost:4000/api/v1/products", {
      headers: {
        token: props.cookies.get("auth_token"),
      },
    });

    setAllItem(result.data);
  };

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
      {/* adding item */}
      <div className="flexbox-column">
        <h1>Add Your Items</h1>
        <h2 className={classes.subTitle}> Limit: {itemLimit} items</h2>
        <div className="flexbox-row-forum">
          {/* data from itemCard will be received the axios product pull */}
          {allItem.map(itemCard => (
            <ItemCard
              key={itemCard._id}
              itemID={itemCard._id}
              itemName={itemCard.name}
              imageSrc={imageUrlMapping.pushItem}
              item={itemCard}
            />
          ))}
        </div>
        <ModalAndButtonList
          fetchListOfItem={() => fetchListOfItem()}
          {...props}
        />
      </div>
      <Divider className={classes.divider} />
      <Payment />;
    </div>
  );
}

function ModalAndButtonList({ fetchListOfItem, ...props }) {
  const classes = useStyles();
  // this states will submit into mongodb database
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = e => {
    setImage(e.target.files[0]);
    toast("file is uploaded, remember to submit");
  };

  const handleFormSubmit = e => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("desc", description);
    formData.append("weight", weight);
    if (image) {
      formData.append("file", image);
    }

    // checking the inside of formData
    for (var pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    axios
      .post("http://localhost:4000/api/v1/products", formData, {
        headers: {
          token: props.myToken,
        },
      })
      .then(response => {
        toast("New item is successfully added");
        setName("");
        setWeight("");
        setImage("");
        setDescription("");
        setOpen(false);
        fetchListOfItem();
      })
      .catch(err => {
        toast("error adding item");
        console.log(err);
      });
  };

  return (
    <div className="buttonList">
      {/* Button: Add Item */}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Item
      </Button>

      {/* Button: Check Out */}
      <Button
        variant="contained"
        color="secondary"
        onClick={e => props.handleOrderFormSubmit(e)}
      >
        Save Progress
      </Button>

      {/* Modal with add-item form, can open and close with setOpen */}
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modalStyling}>
          <h2 align="center">Add Item Details</h2>

          {/* Form */}
          <form>
            <div className="flexbox-column-start">
              {/* item name input form */}
              <div className="form-line-input">
                <label className="formLabelSize">Name: </label>
                <TextField
                  required
                  id="name"
                  label="Teddy Bear"
                  size="small"
                  variant="outlined"
                  className="smallFormInput"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </div>

              {/* item weight input form */}
              <div className="form-line-input">
                <label className="formLabelSize">Weight: </label>
                <TextField
                  required
                  id="weight"
                  label="500gr, 2kg"
                  size="small"
                  variant="outlined"
                  className="smallFormInput"
                  value={weight}
                  onChange={e => {
                    setWeight(e.target.value);
                  }}
                />
              </div>

              {/* upload image input form */}
              <div className="form-line-input">
                <label className="formLabelSize">Upload Image: </label>
                <Button>
                  <input
                    type="file"
                    name="file"
                    className={classes.uploadMenu}
                    onChange={e => handleFileChange(e)}
                  />
                </Button>
              </div>

              {/* description input form */}
              <div className="form-line-input">
                <label className="formLabelSize">Description: </label>

                <TextField
                  id="description"
                  label="fragile, have a black remark on the left"
                  size="small"
                  variant="outlined"
                  className="formInput"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              {/* Button: Modal Submit */}
              <Button
                className={classes.modalButton}
                variant="contained"
                color="primary"
                type="button"
                onClick={handleFormSubmit}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

function ItemCard({ itemID, itemName, imageSrc, item }) {
  const classes = useStyles();

  return (
    <Link to={"/item/" + itemID}>
      <div className={classes.cardStyling}>
        <img className={classes.itemImage} src={imageSrc} alt="item_image" />
        <Typography component="p" className={classes.addedProductName}>
          {itemName}
        </Typography>
      </div>
    </Link>
  );
}

export default withCookies(NewDelivery);
