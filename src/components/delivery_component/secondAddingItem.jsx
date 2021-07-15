import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/button";
import { Link } from "react-router-dom";
import ItemDetailDrawer from "./drawer";

const useStyles = makeStyles({
  subTitle: {
    whiteSpace: "nowrap",
    marginTop: 0,
    marginBottom: 80,
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
  },
  cardImage: {
    width: 150,
    height: 150,
    overflow: "hidden",
  },
});

export default function AddingItem() {
  const classes = useStyles();
  return (
    <div className="flexbox-column">
      <h1>Add Your Items</h1>
      <p className={classes.subTitle}>Max: 4 units</p>
      <div className="flexbox-row">
        <ItemCard itemName="sofa" source={imageUrlMapping.oneNightLove} />
        <ItemCard
          itemName="teddy bear"
          source={imageUrlMapping.shortTermDates}
        />
        <ItemCard itemName="working desk" source={imageUrlMapping.almostBTO} />
      </div>
      <ButtonList />
      <ItemDetailDrawer />
    </div>
  );
}

function ItemCard({ itemName, source }) {
  const classes = useStyles();

  return (
    <div className={classes.cardStyling}>
      <img className={classes.cardImage} src={source} alt="item_image" />
      <Typography variant="body2" color="textSecondary" component="p">
        {itemName}
      </Typography>
    </div>
  );
}

function ButtonList() {
  return (
    <div className="buttonList">
      <Link to="/add-one-item" className="menu-nav-link">
        <Button variant="contained" color="primary">
          Add Item
        </Button>
      </Link>
      <Link to="/payment-detail" className="menu-nav-link">
        <Button variant="outlined" color="primary">
          Check Out
        </Button>
      </Link>
    </div>
  );
}
