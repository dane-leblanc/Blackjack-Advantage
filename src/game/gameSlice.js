import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deckId: "",
  cardsRemain: 312,
  userHand: [],
  userScore: 0,
  handComplete: false,
  cardCount: 0,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDeckId: (state, action) => {
      state.deckId = action.payload;
    },
    setCardsRemain: (state, action) => {
      state.cardsRemain = action.payload;
    },
    setUserHand: (state, action) => {
      state.userHand = action.payload;
    },
    setUserScore: (state, action) => {
      state.userScore = action.payload;
    },
    setHandComplete: (state, action) => {
      state.handComplete = action.payload;
    },
    setCardCount: (state, action) => {
      state.cardCount = action.payload;
    },
  },
});

export const {
  setDeckId,
  setCardsRemain,
  setUserHand,
  setUserScore,
  setHandComplete,
  setCardCount,
} = gameSlice.actions;

export const selectHandComplete = (state) => state.game.handComplete;
export const selectDeckId = (state) => state.game.deckId;

export default gameSlice.reducer;
