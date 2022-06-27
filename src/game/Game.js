import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import CardsApi from "../api/CardsApi";
import UserHand from "./hands/UserHand";
import DealerHand from "./hands/DealerHand";
import "./Game.css";

export default function Game() {
  const [deckId, setDeckId] = useState("");
  const [cardsRemain, setCardsRemain] = useState(312);
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [userHand, setUserHand] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [dealerAction, setDealerAction] = useState(false);
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
      <h1>Game</h1>
      <p>This will be where all of the fun will happen.</p>
      <DealerHand
        dealerHand={dealerHand}
        setDealerHand={setDealerHand}
        setDealerScore={setDealerScore}
        getCards={getCards}
        setCardsRemain={setCardsRemain}
        dealerAction={dealerAction}
      />
      <div className="user-buttons">
        <span>User Score: {userScore}</span>
        <span>Dealer Score: {dealerScore}</span>
      </div>
      <UserHand
        userHand={userHand}
        setUserHand={setUserHand}
        userScore={userScore}
        setUserScore={setUserScore}
        getCards={getCards}
        setCardsRemain={setCardsRemain}
        dealerAction={dealerAction}
        setDealerAction={setDealerAction}
      />
    </>
  );
}
