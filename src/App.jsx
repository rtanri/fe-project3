import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.scss";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { withCookies } from "react-cookie";
// import AuthApi from "./AuthApi";

// import { Typography } from "@material-ui/core";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Forum from "./components/pages/Forum";
import NewDelivery from "./components/pages/NewDelivery";
import EditItem from "./components/pages/EditItem";
import PaymentSuccess from "./components/pages/PaymentSuccess";
import Payment from "./components/pages/Payment";
import Dashboard from "./components/pages/Dashboard";

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
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = props.cookies.get("auth_token");
    // can show auth_token | undefined

    if (!token) {
      return setAuth(false);
    } else {
      return setAuth(true);
    }
  }, [props.cookies]);

  return (
    <Router>
      <ThemeProvider theme={custom_theme}>
        <div>
          {/* <NavBar cookie={cookie} handleSetCookie={setCookie} /> */}
          <NavBar auth={auth} setAuth={setAuth} />
          <ToastContainer />
          <Switch>
            <ProtectedLogin
              path="/login-user"
              auth={auth}
              setAuth={setAuth}
              component={Login}
            />
            {/* <Route path="/login-user" component={Login} auth={auth} /> */}
            <ProtectedRoute
              path="/dashboard"
              auth={auth}
              setAuth={() => setAuth(true)}
              component={Dashboard}
            />
            <Route path="/signup-new-user" component={Signup} auth={auth} />
            <Route path="/forum" component={Forum} cookie={auth} />
            <Route
              path="/new-delivery/:orderID/:addressID"
              component={NewDelivery}
              cookie={auth}
            />

            <Route path="/payment/:orderID" component={Payment} cookie={auth} />
            <Route path="/successful-order" component={PaymentSuccess} />
            <Route path="/item/:itemID" component={EditItem} />
            <Route path="/" component={LandingPage} cookie={auth} />
            {/* <Route path="/dashboard" component={Dashboard} cookie={cookie} /> */}
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

const ProtectedRoute = ({ auth, setAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login-user" />)}
    />
  );
};

const ProtectedLogin = ({ auth, setAuth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Redirect to="/dashboard" /> : <Component />)}
    />
  );
};

export default withCookies(App);
