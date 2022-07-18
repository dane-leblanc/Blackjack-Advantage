import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome to Blackjack Advantage!</h1>
      <p>
        Have you ever wondered what it means to be a blackjack "card counter"?
      </p>
      <p>
        Have you ever wondered if you have what it takes to beat the game of
        blackjack?
      </p>
      <p>Are you ready to hit the floors and "bring down the house"?</p>
      <h3>
        If you answered "yes" to any of the questions above, you're in the right
        place!
      </h3>

      <Button className="button" variant="primary" onClick={() => navigate("/about")}>
        About
      </Button>
      <Button className="button" variant="danger" onClick={() => navigate("/basicStrat")}>
        Strategy
      </Button>
      <Button className="button" variant="warning" onClick={() => navigate("/game")}>
        Play the Game
      </Button>
    </>
  );
}
