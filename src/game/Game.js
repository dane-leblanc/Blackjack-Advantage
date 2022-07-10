import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import {
  setDeckId,
  setCardsRemain,
  setHandComplete,
  setCardCount,
  selectDeckId,
  selectCardCount,
  selectCardsRemain,
} from "./gameSlice";
import {
  setDealerHand,
  setDealerAction,
  selectDealerHand,
  selectDealerScore,
} from "./hands/dealerHandSlice";
import {
  setUserHand,
  selectUserHand,
  selectUserScore,
} from "./hands/userHandSlice";
import DealerHand from "./hands/DealerHand";
import UserHand from "./hands/UserHand";
import CardsApi from "../api/CardsApi";
import { getCards } from "./gameHelpers";
import "./Game.css";

export default function Game() {
  const dealerHand = useSelector(selectDealerHand);
  const dealerScore = useSelector(selectDealerScore);
  const userHand = useSelector(selectUserHand);
  const userScore = useSelector(selectUserScore);
  const deckId = useSelector(selectDeckId);
  const cardsRemain = useSelector(selectCardsRemain);
  const dispatch = useDispatch();

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
    dispatch(setDeckId(res));
  }

  async function dealCards() {
    let res = await getCards(1, deckId);
    dispatch(setDealerHand(res.cards));
    res = await getCards(2, deckId);
    dispatch(setUserHand(res.cards));
    dispatch(setCardsRemain(res.remaining));
    dispatch(setDealerAction(false));
    dispatch(setHandComplete(false));
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
      <h1>Game - {cardsRemain} Cards Remaining</h1>
      <p>This will be where all of the fun will happen.</p>
      <DealerHand />
      <div className="user-buttons">
        <span>Player Score: {userScore} </span>
        <span>Dealer Score: {dealerScore} </span>
      </div>
      <UserHand dealCards={dealCards} />
    </>
  );
}
