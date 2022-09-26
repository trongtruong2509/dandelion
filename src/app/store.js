import { configureStore } from "@reduxjs/toolkit";
import playingReducer from "./../common/Reducers/playingSlice";
import playlistReducer from "./../common/Reducers/playlistSlice";
import playQueueReducer from "./../common/Reducers/playQueueSlice";
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
