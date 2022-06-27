import { useState, useEffect } from "react";
import CardFront from "../../PlayingCard/CardFront";
import { v4 as uuidv4 } from "uuid";
import Button from "react-bootstrap/Button";
import { getScore } from "../GameHelpers";

export default function UserHand({
  userHand,
  setUserHand,
  userScore,
  setUserScore,
  getCards,
  setCardsRemain,
  dealerAction,
  setDealerAction,
}) {
  useEffect(() => {
    setUserScore(getScore(userHand));
  }, [userHand]);

  useEffect(() => {
    if (userScore > 21) {
      setDealerAction(true);
    }
  }, [userScore]);

  async function userHit() {
    let res = await getCards(1);
    setUserHand(userHand.concat(res.cards));
    setCardsRemain(res.remaining);
  }

  return (
    <>
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
