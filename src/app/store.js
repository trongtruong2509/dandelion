import { configureStore } from "@reduxjs/toolkit";
import playingReducer from "./../common/components/Playbar/playingSlice";
import playlistReducer from "./../common/components/Playlist/playlistSlice";
import playQueueReducer from "./../common/components/playQueueSlice";
import userReducer from "./../common/Reducers/userSlice";
import queueReducer from "./../common/Reducers/queueSlice";

export const store = configureStore({
   reducer: {
      playing: playingReducer,
      playlist: playlistReducer,
      playqueue: playQueueReducer,
      user: userReducer,
      queue: queueReducer,
   },
});
