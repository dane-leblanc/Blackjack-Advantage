import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import {
  setDeckId,
  setCardsRemain,
  setHandComplete,
  setRunningCount,
  selectDeckId,
  selectRunningCount,
  selectCardsRemain,
  selectHandComplete,
} from "./gameSlice";
import {
  setDealerHand,
  setDealerAction,
  selectDealerHand,
} from "../DealerHand/dealerHandSlice";
import { setUserHand, selectUserHand } from "../UserHand/userHandSlice";
import DealerHand from "../DealerHand/DealerHand";
import UserHand from "../UserHand/UserHand";
import CountCanvas from "../CountCanvas/CountCanvas";
import CardsApi from "../api/CardsApi";
import { getCards, runningCountChange } from "../helpers/helpers";
import "./Game.css";

export default function Game() {
  const [show, setShow] = useState(false);
  const dealerHand = useSelector(selectDealerHand);
  const userHand = useSelector(selectUserHand);
  const deckId = useSelector(selectDeckId);
  const cardsRemain = useSelector(selectCardsRemain);
  const handComplete = useSelector(selectHandComplete);
  const runningCount = useSelector(selectRunningCount);
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
    if (cardsRemain < 300 && handComplete) {
      setShow(true);
      getNewDeck();
    }
  }, [handComplete]);

  async function getNewDeck() {
    let res = await CardsApi.getNewDeckId();
    dispatch(setDeckId(res));
  }

  async function dealCards() {
    dispatch(setDealerAction(false));
    dispatch(setHandComplete(false));
    let dealerRes = await getCards(1, deckId);
    dispatch(setDealerHand(dealerRes.cards));
    let userRes = await getCards(2, deckId);
    dispatch(setUserHand(userRes.cards));
    dispatch(setCardsRemain(userRes.remaining));
    dispatch(
      setRunningCount(
        runningCountChange(runningCount, userRes.cards.concat(dealerRes.cards))
      )
    );
  }

  let newDealAlert = null;

  if (show) {
    newDealAlert = (
      <Alert
        variant="danger"
        className="Game-Alert"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>We have begun dealing from a new shoe.</Alert.Heading>
        <p>All counts should be reset.</p>
      </Alert>
    );
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
      <h1>Dealer</h1>
      <DealerHand />
      {newDealAlert}
      <UserHand dealCards={dealCards} />
      <h1>
        Player <CountCanvas />
      </h1>
    </>
  );
}
