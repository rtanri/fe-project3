import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import { Typography } from "@material-ui/core";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Forum from "./components/pages/Forum";
import Delivery from "./components/pages/Delivery";

const custom_theme = createTheme({
  palette: {
    primary: {
      main: "#111B47",
    },
    secondary: {
      main: "#0044ff",
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={custom_theme}>
        <div>
          <NavBar />
          <Switch>
            <Route path="/login-user" component={Login} />
            <Route path="/signup-new-user" component={Signup} />
            <Route path="/forum" component={Forum} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/" exact component={LandingPage} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
