import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import {
  setDeckId,
  setCardsRemain,
  setHandComplete,
  setCardCount,
  selectDeckId,
  selectHandComplete,
} from "./gameSlice";
import {
  setDealerHand,
  setDealerScore,
  setDealerAction,
  selectDealerHand,
  selectDealerScore,
  selectDealerAction,
} from "./hands/dealerHandSlice";
import {
  setUserHand,
  setUserScore,
  selectUserScore,
  selectUserHand,
} from "./hands/userHandSlice";
import DealerHand from "./hands/DealerHand";
import UserHand from "./hands/UserHand";
import CardsApi from "../api/CardsApi";
import CardFront from "../PlayingCard/CardFront";
import { getScore, getCards } from "./gameHelpers";
import "./Game.css";

export default function Game() {
  // const [deckId, setDeckId] = useState("");
  const [cardsRemain, setCardsRemain] = useState(312);
  // const [dealerHand, setDealerHand] = useState([]);
  // const [dealerScore, setDealerScore] = useState(0);
  // const [userHand, setUserHand] = useState([]);
  // const [userScore, setUserScore] = useState(0);
  // const [dealerAction, setDealerAction] = useState(false);
  // const [handComplete, setHandComplete] = useState(false);
  const [cardCount, setCardCount] = useState(0);

  const dealerScore = useSelector(selectDealerScore);
  const dealerHand = useSelector(selectDealerHand);
  const dealerAction = useSelector(selectDealerAction);
  const userHand = useSelector(selectUserHand);
  const userScore = useSelector(selectUserScore);
  const deckId = useSelector(selectDeckId);
  const handComplete = useSelector(selectHandComplete);
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

  useEffect(() => {
    // dispatch(setUserScore(getScore(userHand)));
    setUserScore(getScore(userHand));
  }, [userHand]);

  useEffect(() => {
    if (userScore >= 21) {
      dispatch(setDealerAction(true));
      setHandComplete(true);
    }
  }, [userScore]);

  async function getNewDeck() {
    let res = await CardsApi.getNewDeckId();
    dispatch(setDeckId(res));
  }

  async function dealCards() {
    let res = await getCards(1, deckId);
    dispatch(setDealerHand(res.cards));
    res = await getCards(2, deckId);
    dispatch(setUserHand(res.cards));
    setCardsRemain(res.remaining);
    dispatch(setDealerAction(false));
    dispatch(setHandComplete(false));
  }

  // useEffect(() => {
  //   let score = getScore(dealerHand);
  //   setDealerScore(score);
  //   if (dealerAction && score < 17 && !handComplete) {
  //     setTimeout(() => {
  //       dealerHit();
  //     }, 1000);
  //   } else if (dealerAction && score >= 17) {
  //     setHandComplete(true);
  //   }
  // }, [dealerHand]);

  // useEffect(() => {
  //   if (dealerAction) {
  //     setTimeout(() => {
  //       dealerHit();
  //     }, 1000);
  //   }
  //   if (userScore > 21) {
  //     setHandComplete(true);
  //   }
  // }, [dealerAction]);

  // async function dealerHit() {
  //   let res = await getCards(1, deckId);
  //   setDealerHand(dealerHand.concat(res.cards));
  //   setCardsRemain(res.remaining);
  // }

  // async function userHit() {
  //   let res = await getCards(1, deckId);
  //   setUserHand(userHand.concat(res.cards));
  //   setCardsRemain(res.remaining);
  // }

  // async function double() {
  //   let res = await getCards(1, deckId);
  //   setUserHand(userHand.concat(res.cards));
  //   setCardsRemain(res.remaining);
  //   dispatch(setDealerAction(true));
  // }

  // function stand() {
  //   // setDealerAction(true);
  //   dispatch(setDealerAction(true));
  // }

  // let result;

  // if (handComplete) {
  //   if (userScore > 21) {
  //     result = "Bust";
  //   } else if (userScore === 21 && userHand.length === 2) {
  //     result = "Blackjack";
  //   } else if (userScore <= 21 && dealerScore > 21) {
  //     result = "You Win";
  //   } else if (userScore <= 21 && userScore > dealerScore) {
  //     result = "You Win";
  //   } else if (userScore <= 21 && userScore === dealerScore) {
  //     result = "Push";
  //   } else if (userScore < 21 && userScore < dealerScore) {
  //     result = "Dealer Wins";
  //   }
  // }

  // let buttonArea;

  // handComplete
  //   ? (buttonArea = (
  //       <h2>
  //         {result}{" "}
  //         <Button variant="primary" onClick={() => dealCards()}>
  //           Next Hand
  //         </Button>
  //       </h2>
  //     ))
  //   : (buttonArea = (
  //       <div className="user-buttons">
  //         <Button
  //           onClick={() => userHit()}
  //           disabled={dealerAction ? true : false}
  //         >
  //           Hit
  //         </Button>
  //         <Button
  //           variant="danger"
  //           onClick={() => stand()}
  //           disabled={dealerAction ? true : false}
  //         >
  //           Stand
  //         </Button>
  //         <Button
  //           variant="success"
  //           onClick={() => double()}
  //           disabled={
  //             dealerAction || userHand.length !== 2 || userScore > 11
  //               ? true
  //               : false
  //           }
  //         >
  //           Double
  //         </Button>
  //         <Button variant="warning" disabled={dealerAction ? true : false}>
  //           Split
  //         </Button>
  //       </div>
  //     ));

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
      <UserHand />
    </>
  );
}
