import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="flexbox-column main-body">
      <h1 className="pageTitle-less-margin">Payment Successful</h1>
      <p className="subTitle-success-page">
        We will process your order, visit your order dashboard to check the
        status
      </p>
      <Link to="/dashboard" className="menu-nav-link">
        <Button
          type="button"
          className="margin-bottom"
          variant="contained"
          color="secondary"
          style={{ margin: 20, width: 150 }}
        >
          Your Order
        </Button>
      </Link>
      <img
        src={imageUrlMapping.orderSubmittedGirl}
        alt="couple-having-different-roads"
        className="order-submitted-image"
      />
    </div>
  );
}
