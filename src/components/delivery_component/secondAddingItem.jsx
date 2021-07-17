import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { imageUrlMapping } from "../../constants/imageUrlMapping";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/button";
import { Link } from "react-router-dom";
import ItemDetailDrawer from "./LeftDrawer";
// import AddItemModal from "./AddItemModal";
import Modal from "@material-ui/core/Modal";

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
    width: 90,
    height: 90,
    overflow: "hidden",
    padding: 20,
  },
  addedProductName: {
    fontWeight: 500,
    fontSize: "1.2rem",
  },
});

export default function AddingItem(props) {
  const classes = useStyles();
  return (
    <div className="flexbox-column">
      <h1>Add Your Items</h1>
      <p className={classes.subTitle}>Max: 4 units</p>
      <div className="flexbox-row">
        <ItemCard itemName="sofa" source={imageUrlMapping.addedItem} />
        <ItemCard itemName="teddy bear" source={imageUrlMapping.addedItem} />
        <ItemCard itemName="working desk" source={imageUrlMapping.addedItem} />
      </div>
      <ButtonList {...props} />
      <ItemDetailDrawer />
    </div>
  );
}

function ItemCard({ itemName, source }) {
  const classes = useStyles();

  return (
    <div className={classes.cardStyling}>
      <img className={classes.cardImage} src={source} alt="item_image" />
      <Typography component="p" className={classes.addedProductName}>
        {itemName}
      </Typography>
    </div>
  );
}

function ButtonList(props) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="buttonList">
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Item
      </Button>
      <Link to="/payment" className="menu-nav-link">
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.handleNext()}
        >
          Check Out
        </Button>
      </Link>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modalPaper}>
          <h2>Simple React Modal</h2>
          <p>Hello World</p>
        </div>
      </Modal>
    </div>
  );
}
