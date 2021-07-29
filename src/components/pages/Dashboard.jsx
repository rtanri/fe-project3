import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import DeleteIcon from "@material-ui/icons/Delete";
// import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { Button, Divider, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { withCookies } from "react-cookie";
import { lightGreen } from "@material-ui/core/colors";

const useStyles = makeStyles({
  orderListBox: {
    border: "2px solid gray",
    minWidth: "600px",
    minHeight: "300px",
    backgroundColor: "#eaeaea",
    borderRadius: 4,
  },
  orderSheet: {
    minWidth: "250px",
    minHeight: "500px",
    padding: 10,
    marginLeft: 20,
    border: "2px solid gray",
    position: "relative",
    borderRadius: 4,
  },
  orderCard: {
    border: "1px solid grey",
    borderRadius: 4,
    minWidth: 275,
    maxHeight: 150,
    margin: 10,
    padding: 0,
  },
  title: {
    fontSize: 14,
  },
  subheader: {
    marginBottom: 12,
  },
  eachCardHeader: {
    // border: "1px solid grey",
    maxHeight: 30,
    padding: 5,
  },
  headerTitle: {
    maxHeight: 30,
    fontSize: 14,
    margin: 0,
  },
  eachCardBody: {
    // border: "1px solid grey",
    padding: 0,
    maxHeight: 50,
  },
  addressBox: {
    position: "absolute",
    bottom: "20px",
    margin: 5,
  },
  cardTitle: {
    padding: "5px 0 2px 10px",
    marginTop: 0,
    marginBottom: 0,
    position: "relative",
  },
  cardPaid: {
    border: "5px solid green",
    backgroundColor: lightGreen,
    borderRadius: 4,
    minWidth: 275,
    maxHeight: 150,
    margin: 10,
    padding: 0,
  },
  deleteButton: {
    position: "absolute",
    right: "10px",
    maxHeight: "20px",
  },
});

function Dashboard(props) {
  const classes = useStyles();
  const [myToken, setMyToken] = useState("");
  const [allOrder, setAllOrder] = useState([]);
  let history = useHistory();

  useEffect(() => {
    authenticateUser();
    fetchListOfOrder();
  }, []);

  const authenticateUser = () => {
    // validate and see if token exist
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");

    if (!token) {
      history.push("/login-user");
      toast("Please login to create new Order");
    }
    setMyToken(token);
  };

  const createNewOrder = () => {
    console.log(props.cookies.get("auth_token"));
    axios
      .post(
        "http://localhost:4000/api/v1/orders",
        {},
        {
          headers: {
            token: props.cookies.get("auth_token"),
          },
        }
      )
      .then(response => {
        toast("2");
        console.log(response.data);
        const orderID = response.data.orderID;
        const addressID = response.data.addressID;
        // toast(orderID);
        history.push("/new-delivery/" + orderID + "/" + addressID);
      })
      .catch(err => {
        toast(3);
        toast(err.response.data.message);
      });
  };

  const fetchListOfOrder = async () => {
    // toast("fetch order func");
    const result = await axios.get("http://localhost:4000/api/v1/allOrders/", {
      headers: {
        token: props.cookies.get("auth_token"),
      },
    });
    console.log(result.data);
    setAllOrder(result.data);
  };

  return (
    <div className="main-body">
      <h1 align="center">Order list</h1>
      <div className="flexbox-row">
        <div className={classes.orderListBox}>
          <div>
            {allOrder.map(order => (
              <OrderCard
                key={order._id}
                item={order}
                fetchListOfOrder={() => fetchListOfOrder()}
              />
            ))}
            <p align="center">
              <Button
                onClick={() => createNewOrder()}
                type="button"
                variant="contained"
                color="primary"
              >
                Create new order
              </Button>
            </p>
          </div>
        </div>
        {/* <div>
          <OrderIdWithDetail />
        </div> */}
      </div>
    </div>
  );
}

function OrderCard({ item, fetchListOfOrder }) {
  const classes = useStyles();
  let history = useHistory();
  const [postDate, setPostDate] = useState("");
  const [orderId, setOrderId] = useState("");
  const [addressId, setAddressId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setInitialData();
  }, []);

  const setInitialData = async () => {
    console.log(item);

    const orderCode = item._id;
    setOrderId(orderCode);

    setIsPaid(item.isPaid);

    const addressCode = item.address;
    setAddressId(addressCode);

    const dateRaw = item.createdAt.slice(0, 10);
    const postDate = new Date(dateRaw).toString().slice(0, 15);
    setPostDate(postDate);

    const productAmount = item.products.length;
    setQuantity(productAmount);

    const hashedOrder = item._id;
    console.log(typeof hashedOrder);
  };

  const handleDeleteOrder = async () => {
    await axios.delete("http://localhost:4000/api/v1/orders/" + orderId);
    fetchListOfOrder();
    history.push("/dashboard");
  };

  let selectedCard;
  if (isPaid) {
    selectedCard = (
      <Card className={classes.cardPaid}>
        <p id={orderId} align="left" className={classes.cardTitle}>
          <strong>::Paid:: Created Date: </strong>
          {postDate}
        </p>

        <CardContent className={classes.eachCardBody}>
          <Divider />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            {/* <ListItemText primary={orderId} secondary={quantity} /> */}
            <ListItemText>
              <strong>Tracking ID :</strong> {orderId}
            </ListItemText>
            <ListItemText align="right">{quantity} item(s)</ListItemText>
          </ListItem>
        </CardContent>
      </Card>
    );
  } else {
    selectedCard = (
      <Card className={classes.orderCard}>
        <p id={orderId} align="left" className={classes.cardTitle}>
          <strong>Created Date: </strong>
          {postDate}
          <span>
            <IconButton
              onClick={() => handleDeleteOrder()}
              className={classes.deleteButton}
            >
              <DeleteIcon />
            </IconButton>
            {/* <button onClick={() => handleDeleteOrder()}>Delete</button> */}
          </span>
        </p>
        <Link
          to={"/new-delivery/" + orderId + "/" + addressId}
          style={{ textDecoration: "none" }}
        >
          <CardContent className={classes.eachCardBody}>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              {/* <ListItemText primary={orderId} secondary={quantity} /> */}
              <ListItemText>
                <strong>Tracking ID :</strong> {orderId}
              </ListItemText>
              <ListItemText align="right">{quantity} item(s)</ListItemText>
            </ListItem>
          </CardContent>
        </Link>
      </Card>
    );
  }

  return <div>{selectedCard}</div>;
}

export default withCookies(Dashboard);

// function OrderIdWithDetail() {
//   const classes = useStyles();
//   return (
//     <div>
//       <List className={classes.orderSheet}>
//         <h2 align="center">Order #1231431</h2>
//         <Typography as="p" align="center">
//           Jul 2021
//         </Typography>
//         <hr />
//         <ListItem>
//           <ListItemAvatar>
//             <Avatar>
//               <ImageIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Item 1" secondary="weight: 500gr" />
//         </ListItem>
//         <ListItem>
//           <ListItemAvatar>
//             <Avatar>
//               <WorkIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Item 2" secondary="weight: 500gr" />
//         </ListItem>
//         <ListItem>
//           <ListItemAvatar>
//             <Avatar>
//               <BeachAccessIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Item 3" secondary="weight: 500gr" />
//         </ListItem>
//         <hr style={{ position: "relative", top: 50 }} />
//         <div className={classes.addressBox}>
//           <Typography as="h4">Delivery to</Typography>
//           <Typography as="p">
//             3 bedok reservoir view #08-12, Singapore 456341
//           </Typography>
//         </div>
//       </List>
//     </div>
//   );
// }
