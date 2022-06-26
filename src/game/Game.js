import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import CardsApi from "../api/CardsApi";
import CardFront from "../PlayingCard/CardFront";
import CardBack from "../PlayingCard/CardBack";
import "./Game.css";

export default function Game() {
  const [deckId, setDeckId] = useState("");
  const [cardsRemain, setCardsRemain] = useState(312);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [userHand, setUserHand] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [dealerAction, toggleDealerAction] = useState(false);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    getNewDeck();
  }, []);

  useEffect(() => {
    if (deckId !== "") {
      dealCards();
    }
  }, [deckId]);

  async function getNewDeck() {
    let res = await CardsApi.getNewDeckId();
    setDeckId(res);
  }
  async function getCards(count) {
    let res = await CardsApi.drawCards(deckId, count);
    return res;
  }
  async function dealCards() {
    let res = await getCards(1);
    setDealerHand(res.cards);
    res = await getCards(2);
    setUserHand(res.cards);
    setCardsRemain(res.remaining);
  }

  async function userHit() {
    let res = await getCards(1);
    setUserHand(userHand.concat(res.cards));
    setCardsRemain(res.remaining);
  }

  if (deckId === "") return <h1>Shuffling Deck...</h1>;
  if (dealerHand.length === 0 || userHand.length === 0)
    return <h1>Dealing Cards...</h1>;

  return (
    <>
      <h1>Game</h1>
      <p>This will be where all of the fun will happen.</p>

      <div className="dealer-hand">
        {dealerHand.map((card) => (
          <CardFront key={uuidv4()} imgSrc={card.image} />
        ))}
        {dealerAction ? (
          <CardFront imgSrc={dealerHand[1].image} />
        ) : (
          <CardBack />
        )}
      </div>
      <div className="user-buttons">
        <Button onClick={() => userHit()}>Hit</Button>
        <Button variant="danger">Stand</Button>
        <Button variant="success">Double</Button>
        <Button variant="warning">Split</Button>
      </div>
      <div className="user-hand">
        {userHand.map((card) => (
          <CardFront key={uuidv4()} imgSrc={card.image} />
        ))}
      </div>
    </>
  );
}
