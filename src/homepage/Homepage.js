import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="homepage-text">
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
          If you answered "yes" to any of the questions above, you're in the
          right place!
        </h3>
      </div>
      <Button
        className="button"
        variant="primary"
        size="lg"
        onClick={() => navigate("/about")}
      >
        Learn to Count
      </Button>
      <Button
        className="button"
        variant="danger"
        size="lg"
        onClick={() => navigate("/basicStrat")}
      >
        Basic Strategy Chart
      </Button>
      <Button
        className="button"
        variant="warning"
        size="lg"
        onClick={() => navigate("/game")}
      >
        Play the Game
      </Button>
    </>
  );
}
