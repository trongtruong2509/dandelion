import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: null,
};

export const playlistSlice = createSlice({
   name: "playlist",
   initialState,
   reducers: {
      update: (state) => {
         state.value += 1;
      },
      remove: (state, action) => {
         state.value += action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { update, remove } = playlistSlice.actions;

export default playlistSlice.reducer;
