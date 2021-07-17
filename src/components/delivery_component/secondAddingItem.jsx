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
    width: 150,
    height: 150,
    overflow: "hidden",
    border: "1px solid #111B47",
  },
  modalPaper: {
    position: "absolute",
    top: "35%",
    left: "35%",
    width: 450,
    backgroundColor: "white",
    boxShadow: 3,
    padding: 10,
    border: "2px solid #111B47",
  },
});

export default function AddingItem() {
  const classes = useStyles();
  return (
    <div className="flexbox-column main-body">
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
        <Button variant="outlined" color="primary">
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

// function AddItemModal() {
//   const [open, setOpen] = React.useState(false);
//   const classes = useStyles();

//   const handleClose = () => {
//     setOpen(false);
//   };
//   return (
//     <Modal open={open} onClose={handleClose}>
//       <div className={classes.modalPaper}>
//         <h2>Simple React Modal</h2>
//         <p>Hello World</p>
//       </div>
//     </Modal>
//   );
// }
