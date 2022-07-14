import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dealerHand: [],
  dealerScore: 0,
  dealerAction: false,
};

export const dealerHandSlice = createSlice({
  name: "dealerHand",
  initialState,
  reducers: {
    setDealerHand: (state, action) => {
      state.dealerHand = action.payload;
    },
    setDealerScore: (state, action) => {
      state.dealerScore = action.payload;
    },
    setDealerAction: (state, action) => {
      state.dealerAction = action.payload;
    },
  },
});

export const { setDealerHand, setDealerScore, setDealerAction } =
  dealerHandSlice.actions;

export const selectDealerHand = (state) => state.dealerHand.dealerHand;
export const selectDealerScore = (state) => state.dealerHand.dealerScore;
export const selectDealerAction = (state) => state.dealerHand.dealerAction;
export default dealerHandSlice.reducer;
