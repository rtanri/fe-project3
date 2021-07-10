import React from "react";
import "./App.css";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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
      <div className="App">
        <h1>Hello</h1>
      </div>
    </ThemeProvider>
  );
}

function topHeader() {
  return <div className="headerBackground"></div>;
}

export default App;
