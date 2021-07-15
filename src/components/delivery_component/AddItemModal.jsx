import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
  modalStyling: {
    position: "absolute",
    width: 400,
    border: "2px solid #000",
    boxShadow: 5,
    padding: 10,
  },
}));

export default function AddItemModal({ open }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [{ open }, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.modalStyling}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <AddItemModal />
    </div>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
