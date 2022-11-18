import { configureStore } from "@reduxjs/toolkit";
import playingReducer from "./../common/slices/playingSlice";
import playlistReducer from "./../common/slices/playlistSlice";
import playQueueReducer from "./../common/slices/playQueueSlice";
import userReducer from "./../common/slices/userSlice";
import queueReducer from "./../common/slices/queueSlice";
import playbarReducer from "./../common/slices/playbarSlice";
import dandelionReducer from "./../common/slices/dandelionSlice";
import uploadReducer from "./../admin/slices/uploadSlice";
import adminTrackReducer from "./../admin/slices/adminTrackSlice";

export const store = configureStore({
   reducer: {
      playing: playingReducer,
      playlist: playlistReducer,
      playqueue: playQueueReducer,
      user: userReducer,
      queue: queueReducer,
      playbar: playbarReducer,
      dandelion: dandelionReducer,
      upload: uploadReducer,
      adminTrack: adminTrackReducer,
   },
});
