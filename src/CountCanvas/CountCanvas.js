import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { selectCardsRemain, selectRunningCount } from "../Game/gameSlice";
import {
  getNumHalfDecksRemaining,
  getExactTrueCount,
  getApproxTrueCount,
} from "../helpers/helpers";
import "./CountCanvas.css";

export default function CountCanvas() {
  const [show, setShow] = useState(false);
  const cardsRemain = useSelector(selectCardsRemain);
  const runningCount = useSelector(selectRunningCount);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function Suggestion() {
    if (getApproxTrueCount(cardsRemain, runningCount) <= 0) {
      return <b>You should be making the minimum bet</b>;
    } else {
      let trueCount = getApproxTrueCount(cardsRemain, runningCount);
      return <b>Your bets should be {trueCount + 1} times the minimum bet.</b>;
    }
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Show Counts
      </Button>
      <Offcanvas show={show} onHide={handleClose} className="CountCanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Counts</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <p>Cards Played: {312 - cardsRemain}</p>
            <p>Cards Remaining: {cardsRemain}</p>
            <p>
              Number of Decks in Shoe: {getNumHalfDecksRemaining(cardsRemain)}{" "}
            </p>
            <p>Running Count: {runningCount}</p>
            <p>
              True Count (Exact): {getExactTrueCount(cardsRemain, runningCount)}
            </p>
            <p>
              True Count (Deck Approximation):{" "}
              {getApproxTrueCount(cardsRemain, runningCount)}
            </p>
          </div>
          <Suggestion />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
