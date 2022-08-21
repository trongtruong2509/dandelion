import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: { info: null, playing: false },
};

export const playingSlice = createSlice({
   name: "playing",
   initialState,
   reducers: {
      update: (state, action) => {
         state.value = action.payload;
      },

      play: (state) => {
         console.log("dispatch play");
         state.value.playing = true;
         console.log(state.value.playing);
      },
      pause: (state) => {
         console.log("dispatch pause");
         state.value.playing = false;
         // state.value = { info: state.value.info, playing: false };
         console.log(state.value.playing);
      },
      remove: (state, action) => {
         state.value += action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { update, play, pause, remove } = playingSlice.actions;

export default playingSlice.reducer;
