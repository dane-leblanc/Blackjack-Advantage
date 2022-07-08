import { useEffect } from "react";
import CardFront from "../../PlayingCard/CardFront";
import CardBack from "../../PlayingCard/CardBack";
import { v4 as uuidv4 } from "uuid";
import { getScore } from "../GameHelpers";

export default function DealerHand({
  dealerHand,
  setDealerHand,
  setDealerScore,
  getCards,
  setCardsRemain,
  dealerAction,
  setHandComplete,
  userScore,
  handComplete
}) {
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
    let res = await getCards(1);
    setDealerHand(dealerHand.concat(res.cards));
    setCardsRemain(res.remaining);
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
