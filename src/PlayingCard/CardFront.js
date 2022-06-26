import "./PlayingCard.css";
export default function CardFront({ imgSrc }) {
  return (
    <div>
      <img className="PlayingCard"src={imgSrc} alt="playing card" />
    </div>
  );
}
