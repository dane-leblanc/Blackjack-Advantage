import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./game/gameSlice";
import dealerHandReducer from "./game/hands/dealerHandSlice";
import userHandReducer from "./game/hands/userHandSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    dealerHand: dealerHandReducer,
    userHand: userHandReducer,
  },
});
