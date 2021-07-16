import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField, Button } from "@material-ui/core";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default class Payment extends React.Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleInputFocus = e => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = e => {
    const { id, value } = e.target;

    this.setState({ [id]: value });
  };

  render() {
    return (
      <div id="PaymentForm" className="flexbox-row">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
          style={{ marginLeft: 0 }}
        />
        <form className="flexbox-column credit-card-form">
          <TextField
            required
            type="tel"
            label="Card Number"
            variant="outlined"
            size="small"
            id="number"
            style={{ width: "300px", marginBottom: "20px" }}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <TextField
            required
            type="text"
            label="Name"
            variant="outlined"
            size="small"
            id="name"
            style={{ width: "300px", marginBottom: "20px" }}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          <div>
            <TextField
              required
              type="tel"
              label="Expiry Date"
              variant="outlined"
              size="small"
              id="expiry"
              style={{
                width: "200px",
                marginBottom: "20px",
                marginRight: "20px",
              }}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <TextField
              required
              type="tel"
              label="CVC"
              variant="outlined"
              size="small"
              id="cvc"
              style={{ width: "80px", marginBottom: "10px" }}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </div>
          <Button
            type="submit"
            className="margin-bottom"
            variant="contained"
            color="primary"
            style={{ margin: 20, width: 150 }}
          >
            Pay
          </Button>
        </form>
      </div>
    );
  }
}
