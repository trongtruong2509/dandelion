import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: null,
};

export const playingSlice = createSlice({
   name: "playing",
   initialState,
   reducers: {
      update: (state, action) => {
         state.value = action.payload;
      },

      play: (state) => {
         // state.value.play = true;
      },
      pause: (state) => {
         // state.value.play = false;
      },
      remove: (state, action) => {
         state.value += action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { update, play, pause, remove } = playingSlice.actions;

export default playingSlice.reducer;
