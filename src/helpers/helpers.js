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

export async function getCards(numCards, deckId) {
  let res = await CardsApi.drawCards(deckId, numCards);
  return res;
}

export function runningCountChange(count, cards) {
  cards.forEach((card) => {
    if (+card.value < 7) {
      count++;
    } else if (+card.value <= 9 && +card.value >= 7) {
    } else {
      count--;
    }
  });
  return count;
}

export function getNumHalfDecksRemaining(cardsRemain) {
  return Math.round((cardsRemain / 52) * 2) / 2;
}

export function getExactTrueCount(cardsRemain, runningCount) {
  return Math.round((runningCount / (cardsRemain / 52)) * 100) / 100;
}

export function getApproxTrueCount(cardsRemain, runningCount) {
  let decks = getNumHalfDecksRemaining(cardsRemain);
  return Math.round(runningCount / decks);
}
