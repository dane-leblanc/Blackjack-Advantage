import { useEffect } from "react";
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
  handComplete,
  dealerScore,
  dealCards,
  setHandComplete,
}) {
  useEffect(() => {
    setUserScore(getScore(userHand));
  }, [userHand]);

  useEffect(() => {
    if (userScore >= 21) {
      setDealerAction(true);
      setHandComplete(true);
    }
  }, [userScore]);

  async function userHit() {
    let res = await getCards(1);
    setUserHand(userHand.concat(res.cards));
    setCardsRemain(res.remaining);
  }

  async function double() {
    let res = await getCards(1);
    setUserHand(userHand.concat(res.cards));
    setCardsRemain(res.remaining);
    setDealerAction(true);
  }

  function stand() {
    setDealerAction(true);
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
          <Button variant="primary" onClick={() => dealCards()}>
            Next Hand
          </Button>
        </h2>
      ))
    : (buttonArea = (
        <div className="user-buttons">
          <Button
            onClick={() => userHit()}
            disabled={dealerAction ? true : false}
          >
            Hit
          </Button>
          <Button
            variant="danger"
            onClick={() => stand()}
            disabled={dealerAction ? true : false}
          >
            Stand
          </Button>
          <Button
            variant="success"
            onClick={() => double()}
            disabled={
              dealerAction || userHand.length !== 2 || userScore > 11
                ? true
                : false
            }
          >
            Double
          </Button>
          <Button
            variant="warning"
            disabled={
              dealerAction || userHand[0].value !== userHand[1].value
                ? true
                : false
            }
          >
            Split
          </Button>
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
