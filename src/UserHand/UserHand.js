import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardFront from "../PlayingCard/CardFront";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { getScore, getCards } from "../helpers/helpers";
import {
  setUserHand,
  setUserScore,
  selectUserScore,
  selectUserHand,
} from "./userHandSlice";
import {
  setDealerAction,
  selectDealerScore,
  selectDealerAction,
} from "../DealerHand/dealerHandSlice";
import {
  setHandComplete,
  setCardsRemain,
  setRunningCount,
  selectDeckId,
  selectHandComplete,
  selectRunningCount,
} from "../Game/gameSlice";
import { runningCountChange } from "../helpers/helpers";
import "./UserHand.css";

export default function UserHand({ dealCards }) {
  const userScore = useSelector(selectUserScore);
  const userHand = useSelector(selectUserHand);
  const deckId = useSelector(selectDeckId);
  const handComplete = useSelector(selectHandComplete);
  const dealerScore = useSelector(selectDealerScore);
  const dealerAction = useSelector(selectDealerAction);
  const runningCount = useSelector(selectRunningCount);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserScore(getScore(userHand)));
  }, [userHand]);

  useEffect(() => {
    if (userScore >= 21) {
      dispatch(setDealerAction(true));
      if (userHand.length === 2) {
        dispatch(setHandComplete(true));
      }
    }
  }, [userScore]);
  async function userHit() {
    let res = await getCards(1, deckId);
    dispatch(setUserHand(userHand.concat(res.cards)));
    dispatch(setCardsRemain(res.remaining));
    dispatch(setRunningCount(runningCountChange(runningCount, res.cards)));
  }
  async function double() {
    let res = await getCards(1, deckId);
    dispatch(setUserHand(userHand.concat(res.cards)));
    dispatch(setCardsRemain(res.remaining));
    dispatch(setDealerAction(true));
    dispatch(setRunningCount(runningCountChange(runningCount, res.cards)));
  }
  function stand() {
    dispatch(setDealerAction(true));
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
          <Button
            variant="primary"
            size="lg"
            classname="UserHand-button"
            onClick={() => dealCards()}
          >
            Next Hand
          </Button>
        </h2>
      ))
    : (buttonArea = (
        <div className="user-buttons">
          <Button
            className="user-button"
            size="lg"
            onClick={() => userHit()}
            disabled={dealerAction ? true : false}
          >
            Hit
          </Button>
          <Button
            variant="danger"
            className="user-button"
            size="lg"
            onClick={() => stand()}
            disabled={dealerAction ? true : false}
          >
            Stand
          </Button>
          <Button
            variant="secondary"
            className="user-button"
            size="lg"
            onClick={() => double()}
            disabled={
              dealerAction || userHand.length !== 2 || userScore > 11
                ? true
                : false
            }
          >
            Double
          </Button>
          {/* <Button
            variant="warning"
            className="user-button"
            size="lg"
            disabled={
              dealerAction || userHand[0].value !== userHand[1].value
                ? true
                : false
            }
          >
            Split
          </Button> */}
        </div>
      ));

  return (
    <>
      {buttonArea}
      <div className="user-hand">
        {userHand.map((card) => (
          <CardFront key={uuidv4()} imgSrc={card.image} />
        ))}
      </div>
    </>
  );
}
