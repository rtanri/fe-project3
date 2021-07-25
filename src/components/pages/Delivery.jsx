import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SelectSituation from "../delivery_component/firstSelectSituation";
import AddingItem from "../delivery_component/secondAddingItem";
import Payment from "../delivery_component/ThirdPayment";
import SubmitSuccess from "../delivery_component/ForthPaymentSuccess";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: 80,
  },
  backButton: {
    marginRight: 20,
  },
  instructions: {
    marginTop: 40,
    marginBottom: 40,
  },
});

class Delivery extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    // this.handleItemLimit = this.handleItemLimit.bind(this);
    this.handleDeliveryCallback = this.handleDeliveryCallback.bind(this);
    this.handleAddressCallback = this.handleAddressCallback.bind(this);

    this.state = {
      myToken: "",
      activeStep: 0,
      itemLimit: 0,
      address: "",
      postalCode: "",
      city: "",
      country: "",
      deliveryType: "",
    };
  }

  componentDidMount() {
    const { cookies } = this.props;
    let token = cookies.get("auth_token");
    if (!token) {
      this.props.history.push("/login-user");
      toast("Please login to set item delivery");
    }
    // record the token inside the state
    this.setState({
      myToken: token,
    });
  }

  getSteps() {
    return ["Relationship", "Add Item", "Payment", "Finish"];
  }

  handleNext(e) {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  }

  handleBack(e) {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  }

  // child update parents by onClick
  handleItemLimitCallback = childData => {
    this.setState({
      itemLimit: childData,
    });
  };

  // child update parents by onChange & form-submit
  handleAddressCallback(inputString, fieldName) {
    let newState = {};
    newState[fieldName] = inputString;
    this.setState(newState);
  }

  handleDeliveryCallback(inputString) {
    this.setState({ deliveryType: inputString });
  }

  handleOrderFormSubmit() {
    axios
      .post(
        "http://localhost:4000/api/v1/orders",
        {
          addressType: this.state.address,
          postalCode: this.state.postalCode,
          city: this.state.city,
          country: this.state.country,
        },
        {
          headers: {
            token: this.state.myToken,
          },
        }
      )
      .then(response => {
        toast(2);
        toast("Order is successfully loaded");
        this.handleNext();
      })
      .catch(err => {
        toast(3);
        toast(err.response.data.message);
        console.log(err.response);
      });
  }

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();

    return (
      <div className={classes.root}>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(
                  this.state.activeStep,
                  this.handleNext,
                  this.handleBack,
                  this.handleItemLimitCallback,
                  this.handleDeliveryCallback.bind(this),
                  this.handleAddressCallback.bind(this),
                  this.state.itemLimit,
                  this.handleOrderFormSubmit
                )}
              </Typography>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function getStepContent(
  stepIndex,
  nextPageFunction,
  backPageFunction,
  itemLimitFunction,
  deliveryTypeFunction,
  addressFunction,
  addItemLimit,
  handleOrderFormSubmit
) {
  switch (stepIndex) {
    case 0:
      return (
        <SelectSituation
          handleNext={() => nextPageFunction()}
          parentCallback={itemLimitFunction}
          deliveryCallback={deliveryTypeFunction}
          addressCallback={addressFunction}
        />
      );
    case 1:
      return (
        <AddingItem
          handleOrderFormSubmit={() => handleOrderFormSubmit()}
          handleBack={() => backPageFunction()}
          addItemLimit={addItemLimit}
        />
      );
    case 2:
      return <Payment />;
    case 3:
      return <SubmitSuccess />;
    default:
      return "Unknown stepIndex";
  }
}

export default withCookies(withStyles(styles)(Delivery));
