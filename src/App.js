import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes-nav/NavBar";
import "./App.css";
import Components from "./routes-nav/Components";

export default function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Components />
        </div>
      </BrowserRouter>
  );
}
