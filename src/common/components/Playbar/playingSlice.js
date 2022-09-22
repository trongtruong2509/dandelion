import { createSlice } from "@reduxjs/toolkit";
import * as local from "../../utils/localStorage"

const initialState = {
   value: { 
      info: local.getPlaying() ?? null, 
      playing: false 
   },
};

export const playingSlice = createSlice({
   name: "playing",
   initialState,
   reducers: {
      update: (state, action) => {
         state.value = action.payload;
         local.updatePlaying(action.payload.info)
      },

      updateAndPlay: (state, action) => {
         state.value = { info: action.payload, playing: true };
         local.updatePlaying(action.payload)
      },

      play: (state) => {
         console.log("dispatch play");
         state.value.playing = true;
         // console.log(state.value.playing);
      },
      pause: (state) => {
         console.log("dispatch pause");
         state.value.playing = false;
         // state.value = { info: state.value.info, playing: false };
         // console.log(state.value.playing);
      },
      // remove: (state, action) => {
      //    state.value += action.payload;
      // },
   },
});

// Action creators are generated for each case reducer function
export const { update, updateAndPlay, play, pause } =
   playingSlice.actions;

export default playingSlice.reducer;
