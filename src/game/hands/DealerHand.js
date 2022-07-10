import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardFront from "../../PlayingCard/CardFront";
import CardBack from "../../PlayingCard/CardBack";
import { v4 as uuidv4 } from "uuid";
import { getScore, getCards } from "../gameHelpers";
import { selectUserScore } from "./userHandSlice";
import {
  setDealerHand,
  setDealerScore,
  selectDealerHand,
  selectDealerAction,
} from "./dealerHandSlice";
import {
  setHandComplete,
  selectHandComplete,
  setCardsRemain,
  selectDeckId,
} from "../gameSlice";

export default function DealerHand() {
  const userScore = useSelector(selectUserScore);
  const dealerAction = useSelector(selectDealerAction);
  const dealerHand = useSelector(selectDealerHand);
  const handComplete = useSelector(selectHandComplete);
  const deckId = useSelector(selectDeckId);
  const dispatch = useDispatch();
  useEffect(() => {
    let score = getScore(dealerHand);
    dispatch(setDealerScore(score));
    if (dealerAction && score < 17 && !handComplete) {
      setTimeout(() => {
        dealerHit();
      }, 700);
    } else if (dealerAction && score >= 17) {
      dispatch(setHandComplete(true));
    }
  }, [dealerHand]);

  useEffect(() => {
    if (dealerAction) {
      setTimeout(() => {
        dealerHit();
      }, 300);
    }
    if (userScore > 21) {
      dispatch(setHandComplete(true));
    }
  }, [dealerAction]);

  async function dealerHit() {
    let res = await getCards(1, deckId);
    dispatch(setDealerHand(dealerHand.concat(res.cards)));
    dispatch(setCardsRemain(res.remaining));
  }

  return (
    <div className="dealer-hand">
      {dealerHand.map((card) => (
        <CardFront key={uuidv4()} imgSrc={card.image} />
      ))}
      {!dealerAction && <CardBack />}
    </div>
  );
}
