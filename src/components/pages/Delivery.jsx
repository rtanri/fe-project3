import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import SelectSituation from "../delivery_component/FirstSelectSituation";
// import AddingItem from "../delivery_component/SecondAddingItem";
import Payment from "../delivery_component/ThirdPayment";

const useStyles = makeStyles({});

export default function Delivery() {
  return (
    <div className="main-body ">
      {/* <SelectSituation />; */}
      {/* <AddingItem /> */}
      <Payment />
    </div>
  );
}
