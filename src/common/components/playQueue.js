import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: [],
};

export const playQueue = createSlice({
   name: "playqueue",
   initialState,
   reducers: {
      addSongToQueue: (state, action) => {
         state.value = state.value.push(action.payload);
      },
      removeSongFromQueue: (state, action) => {
         state.value += action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { update, remove } = playQueue.actions;

export default playQueue.reducer;
