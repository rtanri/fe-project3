import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SelectSituation from "../delivery_component/FirstSelectSituation";
import AddingItem from "../delivery_component/SecondAddingItem";
import Payment from "../delivery_component/ThirdPayment";
import SubmitSuccess from "../delivery_component/ForthPaymentSuccess";
import OrderList from "../delivery_component/FiveOrderList";
import DeliveryStepper from "../delivery_component/Stepper";

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

class DeliveryWithStepper extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    // this.handleItemLimit = this.handleItemLimit.bind(this);
    this.handleDeliveryCallback = this.handleDeliveryCallback.bind(this);
    this.handleAddressCallback = this.handleAddressCallback.bind(this);

    this.state = {
      activeStep: 0,
      itemLimit: 0,
      address: "",
      deliveryType: "",
    };
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
  handleAddressCallback(inputString) {
    this.setState({ address: inputString });
  }

  handleDeliveryCallback(inputString) {
    this.setState({ deliveryType: inputString });
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
                  this.handleAddressCallback.bind(this)
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
  addressFunction
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
          handleNext={() => nextPageFunction()}
          handleBack={() => backPageFunction()}
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

export default withStyles(styles)(DeliveryWithStepper);
