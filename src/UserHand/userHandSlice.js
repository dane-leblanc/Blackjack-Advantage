import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userHand: [],
  userScore: 0,
};

export const userHandSlice = createSlice({
  name: "userHand",
  initialState,
  reducers: {
    setUserHand: (state, action) => {
      state.userHand = action.payload;
    },
    setUserScore: (state, action) => {
      state.userScore = action.payload;
    },
  },
});

export const { setUserHand, setUserScore } = userHandSlice.actions;

export const selectUserScore = (state) => state.userHand.userScore;
export const selectUserHand = (state) => state.userHand.userHand;

export default userHandSlice.reducer;
