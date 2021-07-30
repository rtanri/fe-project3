import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, TextField, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams, useHistory } from "react-router-dom";
import { withCookies } from "react-cookie";

function EditItem(props) {
  let history = useHistory();

  const [product, setProduct] = useState({});
  const [itemName, setItemName] = useState("");
  const [itemWeight, setItemWeight] = useState("");
  const [itemDesc, setItemDesc] = useState("");

  let params = useParams();

  useEffect(() => {
    if (!params.itemID) {
      toast("product id route params is not available");
      return;
    }
    getItemDetail();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const getItemDetail = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/api/v1/products/${params.itemID}`,
        {},
        {
          headers: {
            token: props.cookies.get("auth_token"),
          },
        }
      )
      .then(response => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editItemDetail = () => {
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND}/api/v1/products/${params.itemID}`,
        {
          name: itemName,
          weight: itemWeight,
          desc: itemDesc,
        },
        {
          headers: {
            token: props.cookies.get("auth_token"),
          },
        }
      )
      .then(response => {
        history.goBack();
      })
      .catch(err => {
        toast(err.response.data.message);
      });
  };

  const deleteProduct = e => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND}/api/v1/products/${params.itemID}`
      )
      .then(response => {
        console.log("delete product");
        console.log(response.data);
        history.goBack();
      })
      .catch(err => {
        toast(err.response.data.message);
      });
  };

  const handleEditFormSubmit = () => {
    editItemDetail();
  };

  const handleDelete = () => {
    deleteProduct();
  };

  return (
    <div className="main-body ">
      <div className="flexbox-column">
        <h1 align="center">Item Detail</h1>
        <p>Name: {product.name}</p>
        <p>Weight: {product.weight} </p>
        <p>Description: {product.desc}</p>
      </div>

      <h1 align="center">Edit Item Detail</h1>

      {/* Form */}
      <form>
        <div className="flexbox-column-start" style={{ paddingLeft: "25%" }}>
          {/* item name input form */}
          <div className="form-line-input">
            <label className="formLabelSize">Name: </label>
            <TextField
              required
              id="name"
              label="Blue Pillow"
              size="small"
              variant="outlined"
              className="formInput"
              value={itemName}
              onChange={e => {
                setItemName(e.target.value);
              }}
            />
          </div>

          {/* item weight input form */}
          <div className="form-line-input">
            <label className="formLabelSize">Weight: </label>
            <TextField
              required
              id="weight"
              label="Input unit in gram (e.g. 500)"
              size="small"
              variant="outlined"
              className="formInput"
              value={itemWeight}
              onChange={e => {
                setItemWeight(e.target.value);
              }}
            />
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
              value={itemDesc}
              onChange={e => {
                setItemDesc(e.target.value);
              }}
            />
          </div>

          <div className="buttonList" style={{ paddingLeft: "10%" }}>
            {/* Button: Modal Submit */}

            <IconButton className="icon-button" onClick={() => handleBack()}>
              <ArrowBackIcon />
            </IconButton>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => handleEditFormSubmit()}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              onClick={() => handleDelete()}
            >
              Delete Item
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default withCookies(EditItem);
