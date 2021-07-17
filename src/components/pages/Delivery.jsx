import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import SelectSituation from "../delivery_component/FirstSelectSituation";
// import AddingItem from "../delivery_component/SecondAddingItem";
// import Payment from "../delivery_component/ThirdPayment";
// import SubmitSuccess from "../delivery_component/ForthPaymentSuccess";
import OrderList from "../delivery_component/FiveOrderList";

const useStyles = makeStyles({});

export default function Delivery() {
  // const [items, setitems] = useState([]);
  // const setItems = items => {
  //   setItems(items);
  // };
  return (
    //stepper
    // context provider is to pass many layers (grandparents to child, skip parents)
    <div className="main-body ">
      {/* <SelectSituation />; */}
      {/* <AddingItem setItems={setItems} /> */}
      {/* <Payment /> */}
      {/* <SubmitSuccess /> */}
      <OrderList />
    </div>
  );
}
