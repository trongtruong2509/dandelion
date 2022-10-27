import { configureStore } from "@reduxjs/toolkit";
import playingReducer from "./../common/components/Playbar/playingSlice";
import playlistReducer from "./../common/components/Playlist/playlistSlice";
import playQueueReducer from "./../common/Reducers/playQueueSlice";
import userReducer from "./../common/Reducers/userSlice";
import queueReducer from "./../common/Reducers/queueSlice";
import uploadReducer from "./../admin/slices/uploadSlice";
import adminTrackReducer from "./../admin/slices/adminTrackSlice";

export const store = configureStore({
   reducer: {
      playing: playingReducer,
      playlist: playlistReducer,
      playqueue: playQueueReducer,
      user: userReducer,
      queue: queueReducer,
      upload: uploadReducer,
      adminTrack: adminTrackReducer,
   },
});
