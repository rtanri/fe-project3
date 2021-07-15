import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import SelectSituation from "../delivery_component/firstSelectSituation";
import AddingItem from "../delivery_component/secondAddingItem";

const useStyles = makeStyles({});

export default function Delivery() {
  return (
    <div className="main-body ">
      {/* <SelectSituation />; */}
      <AddingItem />
    </div>
  );
}
