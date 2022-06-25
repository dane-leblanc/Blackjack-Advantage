import { Routes, Route } from "react-router-dom";
import HomePage from "../homepage/Homepage";
import AboutPage from "../about/About";
import Game from "../game/Game";

function Components() {
  console.log("Components.js");
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default Components;
