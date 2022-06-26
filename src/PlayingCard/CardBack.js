import cardBack from "./card-back-blue.png";
import "./PlayingCard.css";

export default function CardBack() {
  return (
    <div>
      <img className="PlayingCard" src={cardBack} alt="playing card back" />
    </div>
  );
}
