import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./Game/gameSlice";
import dealerHandReducer from "./DealerHand/dealerHandSlice";
import userHandReducer from "./UserHand/userHandSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    dealerHand: dealerHandReducer,
    userHand: userHandReducer,
  },
});
