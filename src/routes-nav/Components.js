import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Homepage/Homepage";
import Counting from "../Counting/Counting";
import Game from "../Game/Game";
import BasicStrat from "../BasicStrat/BasicStrat";

export default function Components() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counting" element={<Counting />} />
        <Route path="/game" element={<Game />} />
        <Route path="/basicstrat" element={<BasicStrat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}
