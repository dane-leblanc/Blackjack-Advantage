export function getScore(hand) {
  let score = 0;
  let softScore = false;
  hand.forEach((card) => {
    if (+card.value) {
      score += +card.value;
    } else if (card.value === "ACE") {
      if (score < 11) {
        score += 11;
        softScore = true;
      } else {
        score += 1;
      }
    } else {
      score += 10;
    }
  });
  if (score > 21 && softScore) {
    score -= 10;
    softScore = false;
  }
  return score;
}
