import React from "react";
import "./App.scss";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import LandingPage from "./pages/LandingPage";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
    <ThemeProvider theme={custom_theme}>
      <div>
        <NavBar />
        <LandingPage />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
