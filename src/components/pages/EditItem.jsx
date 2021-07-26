import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
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

  const getItemDetail = () => {
    toast(1);
    axios
      .get(
        "http://localhost:4000/api/v1/products/" + params.itemID,
        {},
        {
          headers: {
            token: props.cookies.get("auth_token"),
          },
        }
      )
      .then(response => {
        toast(2);
        console.log(response.data);
        setProduct(response.data);
      })
      .catch(err => {
        toast(3);
        console.log(err);
      });
  };

  const editItemDetail = () => {
    toast(1);
    toast(params.itemID);
    axios
      .patch(
        "http://localhost:4000/api/v1/products/" + params.itemID,
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
        toast("Item is edited");
        history.goBack();
      })
      .catch(err => {
        toast(err.response.data.message);
      });
  };

  const deleteProduct = e => {
    axios
      .delete("http://localhost:4000/api/v1/products/" + params.itemID)
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
    toast("Edit Button Clicked");
    editItemDetail();
  };

  const handleDelete = () => {
    toast("Delete Button Clicked");
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
