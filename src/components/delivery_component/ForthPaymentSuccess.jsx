import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  subTitle: {
    whiteSpace: "nowrap",
    marginTop: 0,
    marginBottom: 10,
  },
});

export default function SelectSituation() {
  const classes = useStyles();
  return (
    <div className="flexbox-column">
      <h1 className="">Payment Successful</h1>
      <p className={classes.subTitle}>
        We will process your order, visit your order dashboard to check the
        status
      </p>
      <Link to="/order-list" className="menu-nav-link">
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
