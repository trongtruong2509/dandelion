import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: null,
};

export const playlistSlice = createSlice({
   name: "playlist",
   initialState,
   reducers: {
      updatePlaylist: (state, action) => {
         state.value = action.payload;
      },
      remove: (state, action) => {
         state.value += action.payload;
      },
      removeASong: (state, action) => {
         state.value += action.payload;
      },
      updateShuffle: (state, action) => {
         console.log(action.payload);
         state.value.shuffle = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { updatePlaylist, remove, removeASong, updateShuffle } =
   playlistSlice.actions;

export default playlistSlice.reducer;
