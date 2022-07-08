import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import CardsApi from "../api/CardsApi";
import CardFront from "../PlayingCard/CardFront";
import CardBack from "../PlayingCard/CardBack";
import { getScore, getCards } from "./GameHelpers";
import "./Game.css";

export default function Game() {
  const [deckId, setDeckId] = useState("");
  const [cardsRemain, setCardsRemain] = useState(312);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [userHand, setUserHand] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [dealerAction, setDealerAction] = useState(false);
  const [handComplete, setHandComplete] = useState(false);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    getNewDeck();
  }, []);

  useEffect(() => {
    // once deck is retrieved, assign cards to dealer/user
    if (deckId !== "") {
      dealCards();
    }
  }, [deckId]);

  useEffect(() => {
    setUserScore(getScore(userHand));
  }, [userHand]);

  useEffect(() => {
    if (userScore >= 21) {
      setDealerAction(true);
      setHandComplete(true);
    }
  }, [userScore]);

  async function getNewDeck() {
    let res = await CardsApi.getNewDeckId();
    setDeckId(res);
  }

  async function dealCards() {
    let res = await getCards(1, deckId);
    setDealerHand(res.cards);
    res = await getCards(2, deckId);
    setUserHand(res.cards);
    setCardsRemain(res.remaining);
    setDealerAction(false);
    setHandComplete(false);
  }

  useEffect(() => {
    let score = getScore(dealerHand);
    setDealerScore(score);
    if (dealerAction && score < 17 && !handComplete) {
      setTimeout(() => {
        dealerHit();
      }, 1000);
    } else if (dealerAction && score >= 17) {
      setHandComplete(true);
    }
  }, [dealerHand]);

  useEffect(() => {
    if (dealerAction) {
      setTimeout(() => {
        dealerHit();
      }, 1000);
    }
    if (userScore > 21) {
      setHandComplete(true);
    }
  }, [dealerAction]);

  async function dealerHit() {
    let res = await getCards(1, deckId);
    setDealerHand(dealerHand.concat(res.cards));
    setCardsRemain(res.remaining);
  }

  async function userHit() {
    let res = await getCards(1, deckId);
    setUserHand(userHand.concat(res.cards));
    setCardsRemain(res.remaining);
  }

  async function double() {
    let res = await getCards(1, deckId);
    setUserHand(userHand.concat(res.cards));
    setCardsRemain(res.remaining);
    setDealerAction(true);
  }

  function stand() {
    setDealerAction(true);
  }

  let result;

  if (handComplete) {
    if (userScore > 21) {
      result = "Bust";
    } else if (userScore === 21 && userHand.length === 2) {
      result = "Blackjack";
    } else if (userScore <= 21 && dealerScore > 21) {
      result = "You Win";
    } else if (userScore <= 21 && userScore > dealerScore) {
      result = "You Win";
    } else if (userScore <= 21 && userScore === dealerScore) {
      result = "Push";
    } else if (userScore < 21 && userScore < dealerScore) {
      result = "Dealer Wins";
    }
  }

  let buttonArea;

  handComplete
    ? (buttonArea = (
        <h2>
          {result}{" "}
          <Button variant="primary" onClick={() => dealCards()}>
            Next Hand
          </Button>
        </h2>
      ))
    : (buttonArea = (
        <div className="user-buttons">
          <Button
            onClick={() => userHit()}
            disabled={dealerAction ? true : false}
          >
            Hit
          </Button>
          <Button
            variant="danger"
            onClick={() => stand()}
            disabled={dealerAction ? true : false}
          >
            Stand
          </Button>
          <Button
            variant="success"
            onClick={() => double()}
            disabled={
              dealerAction || userHand.length !== 2 || userScore > 11
                ? true
                : false
            }
          >
            Double
          </Button>
          <Button variant="warning" disabled={dealerAction ? true : false}>
            Split
          </Button>
        </div>
      ));

  if (deckId === "" || dealerHand.length === 0 || userHand.length === 0) {
    return (
      <>
        <h1 className="mt-4">Dealing...</h1>
        <Spinner className="mt-4" animation="border"></Spinner>;
      </>
    );
  }

  return (
    <>
      <h1>Game - {cardsRemain} Cards Remaining</h1>
      <p>This will be where all of the fun will happen.</p>
      <div className="dealer-hand">
        {dealerHand.map((card) => (
          <CardFront key={uuidv4()} imgSrc={card.image} />
        ))}
        {!dealerAction && <CardBack />}
      </div>
      <div className="user-buttons">
        <span>User Score: {userScore}</span>
        <span>Dealer Score: {dealerScore}</span>
      </div>
      {buttonArea}
      <div className="user-hand">
        {userHand.map((card) => (
          <CardFront key={uuidv4()} imgSrc={card.image} />
        ))}
      </div>
    </>
  );
}
