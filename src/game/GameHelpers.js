import CardsApi from "../api/CardsApi";
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

export async function getCards(count, deckId) {
  let res = await CardsApi.drawCards(deckId, count);
  return res;
}

export function runningCountChange(count, cards) {
  cards.forEach((card) => {
    if (+card.value < 7) {
      count--;
      console.log("decrement: " + count);
    } else if (+card.value <= 9 && +card.value >= 7) {
    } else {
      count++;
    }
  });
  return count;
}
