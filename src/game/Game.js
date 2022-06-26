import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import CardsApi from "../api/CardsApi";

export default function Game() {
  const [deckId, setDeckId] = useState("");
  const [cardCount, setCardCount] = useState(312);
  const [dealerHand, setDealerHand] = useState([]);
  const [userHand, setUserHand] = useState([]);

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
    let res = await getCards(2);
    setDealerHand(res.cards);
    res = await getCards(2);
    setUserHand(res.cards);
    setCardCount(res.remaining);
  }

  if (deckId === "") return <h1>Shuffling Deck...</h1>;
  if (dealerHand.length === 0 || userHand.length === 0)
    return <h1>Dealing Cards...</h1>;

  return (
    <>
      <h1>Game</h1>
      <p>This will be where all of the fun will happen.</p>
      <Button onClick={() => dealCards()}>Deal</Button>
      <div>
        <img src={dealerHand[0].image} alt="dealer" />
        <img src={dealerHand[1].image} alt="dealer" />
      </div>
      <div>
        <img src={userHand[0].image} alt="user" />
        <img src={userHand[1].image} alt="user" />
      </div>
    </>
  );
}
