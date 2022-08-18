import { configureStore } from "@reduxjs/toolkit";
import playingReducer from "./../common/components/Playbar/playingSlice";
import playlistReducer from "./../common/components/Playlist/playlistSlice";

export const store = configureStore({
   reducer: {
      playing: playingReducer,
      playlist: playlistReducer,
   },
});
