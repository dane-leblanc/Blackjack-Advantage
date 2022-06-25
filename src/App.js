import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import "./App.css";
import Components from "./routes-nav/Components";

function App() {
  console.log("App.js");
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Components />
      </div>
    </BrowserRouter>
  );
}

export default App;
