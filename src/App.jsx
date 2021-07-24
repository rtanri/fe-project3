import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withCookies } from "react-cookie";

// import { Typography } from "@material-ui/core";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Forum from "./components/pages/Forum";
import Delivery from "./components/pages/Delivery";

import SelectSituation from "./components/delivery_component/firstSelectSituation";
import AddingItem from "./components/delivery_component/secondAddingItem";
import Payment from "./components/delivery_component/ThirdPayment";
import SubmitSuccess from "./components/delivery_component/ForthPaymentSuccess";
import OrderList from "./components/delivery_component/FiveOrderList";

const custom_theme = createTheme({
  palette: {
    primary: {
      main: "#111B47",
    },
    secondary: {
      main: "#55536C",
    },
  },
});

function App(props) {
  const [cookie, setCookie, removeCookie] = useState(false);
  // const [token, setToken] = useState("");

  useEffect(() => {
    console.log(props.cookies);
    const token = props.cookies.get("auth_token");
    console.log(token); // can show auth_token | undefined
    // setToken(authToken);
    if (!token) {
      return setCookie(false);
    } else {
      return setCookie(true);
    }
  }, [props.cookies]);

  const logout = () => {
    const token = props.cookies.get("auth_token");
    removeCookie(token);
    setCookie(false);
  };

  return (
    <Router>
      <ThemeProvider theme={custom_theme}>
        <div>
          {/* <NavBar cookie={cookie} handleSetCookie={setCookie} /> */}
          <NavBar logout={() => setCookie(false)} cookie={cookie} />
          <ToastContainer />
          <Switch>
            <Route path="/login-user" component={Login} />
            <Route path="/signup-new-user" component={Signup} />
            <Route path="/forum" component={Forum} />
            <Route path="/new-deliver" component={Delivery} cookie={cookie} />
            <Route path="/successful-order" component={SubmitSuccess} />
            <Route path="/order-list" component={OrderList} cookie={cookie} />
            <Route path="/" component={LandingPage} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default withCookies(App);
