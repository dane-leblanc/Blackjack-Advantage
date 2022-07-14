import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Homepage/Homepage";
import AboutPage from "../About/About";
import Game from "../Game/Game";
import BasicStrat from "../BasicStrat/BasicStrat";

export default function Components() {
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
