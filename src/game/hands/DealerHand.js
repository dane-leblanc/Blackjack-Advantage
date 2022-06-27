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
}) {
  useEffect(() => {
    setDealerScore(getScore(dealerHand));
  }, [dealerHand]);

  useEffect(() => {
    if (dealerAction) {
      dealerHit();
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
