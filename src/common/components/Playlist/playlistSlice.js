import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   current: null,
   playing: null
};

export const playlistSlice = createSlice({
   name: "playlist",
   initialState,
   reducers: {
      updatePlaylist: (state, action) => {
         state.current = action.payload;
      },
      remove: (state, action) => {
         state.current += action.payload;
      },
      removeASong: (state, action) => {
         state.current += action.payload;
      },
      updateShuffle: (state, action) => {
         console.log(action.payload);
         state.current.shuffle = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { updatePlaylist, remove, removeASong, updateShuffle } =
   playlistSlice.actions;

export default playlistSlice.reducer;
