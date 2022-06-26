import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../homepage/Homepage";
import AboutPage from "../about/About";
import Game from "../game/Game";
import BasicStrat from "../basicstrat/BasicStrat";

export default function Components() {
  console.log("Components.js");
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/basicstrat" element={<BasicStrat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
