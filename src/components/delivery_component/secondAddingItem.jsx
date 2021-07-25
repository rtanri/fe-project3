import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import Typography from "@material-ui/core/Typography";
import { Button, TextField } from "@material-ui/core";
import { toast } from "react-toastify";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import { withCookies } from "react-cookie";

const useStyles = makeStyles({
  subTitle: {
    whiteSpace: "nowrap",
    marginTop: 0,
    marginBottom: 50,
    fontWeight: 500,
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
  cardImage: {
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

function AddingItem(props) {
  const classes = useStyles();
  const [allItem, setAllItem] = useState([]);

  // depends on the value change in 'allItem' array state
  useEffect(() => {
    fetchListOfItem();
  }, []);

  const fetchListOfItem = async () => {
    toast("fetch item func");

    const result = await axios.get("http://localhost:4000/api/v1/products", {
      headers: {
        token: props.cookies.get("auth_token"),
      },
    });

    setAllItem(result.data);
  };

  return (
    <div className="flexbox-column">
      <h1>Add Your Items</h1>
      <h2 className={classes.subTitle}> Limit: {props.addItemLimit} items</h2>
      <div className="flexbox-row-forum">
        {/* data from itemCard will be received the axios product pull */}
        {allItem.map(itemCard => (
          <ItemCard
            key={itemCard._id}
            itemName={itemCard.name}
            imageSrc={imageUrlMapping.pushItem}
          />
        ))}
      </div>
      <ModalAndButtonList
        fetchListOfItem={() => fetchListOfItem()}
        {...props}
      />
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
        props.fetchListOfItem;
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

function ItemCard({ itemName, imageSrc }) {
  const classes = useStyles();

  return (
    <div className={classes.cardStyling}>
      <img className={classes.cardImage} src={imageSrc} alt="item_image" />
      <Typography component="p" className={classes.addedProductName}>
        {itemName}
      </Typography>
    </div>
  );
}

export default withCookies(AddingItem);
