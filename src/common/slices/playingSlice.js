import { createSlice } from "@reduxjs/toolkit";
import * as local from "../utils/localStorage";

const initialState = {
   value: {
      info: local.getPlaying() ?? null,
      playing: false,
   },
};

export const playingSlice = createSlice({
   name: "playing",
   initialState,
   reducers: {
      updateTrack: (state, action) => {
         state.value = action.payload;
         local.updatePlaying(action.payload.info);
      },

      updateAndPlay: (state, action) => {
         state.value = { info: action.payload, playing: true };
         local.updatePlaying(action.payload);
      },

      play: (state) => {
         state.value.playing = true;
      },
      pause: (state) => {
         state.value.playing = false;
      },
      emptyPlayingTrack: (state) => {
         state.value = {
            info: null,
            playing: false,
         };

         local.updatePlaying(null);
      },
   },
});

// Action creators are generated for each case reducer function
export const { updateTrack, updateAndPlay, play, pause, emptyPlayingTrack } = playingSlice.actions;

export default playingSlice.reducer;
