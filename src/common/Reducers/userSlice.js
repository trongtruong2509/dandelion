import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getUserLocal, updateUserLocal, updateUserDb } from "../utils/user";

const initialState = {
   value: getUserLocal(),
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateUser: (state, action) => {
         state.value = action.payload;
         updateUserLocal(action.payload);
         updateUserDb(action.payload);
      },
      removeUser: (state) => {
         state.value = null;
         updateUserLocal(null);
      },
      updateRecentPlay: (state, action) => {
         const idx = current(state.value.recentPlayed).findIndex(
            (s) => s.id === action.payload.id
         );

         if (idx > -1) {
            state.value.recentPlayed.splice(idx, 1); // delete in recentplay
         }

         state.value.recentPlayed.push(action.payload); // add to array

         updateUserLocal(current(state.value));
         updateUserDb(current(state.value));
      },
      updateLikeSong: (state, action) => {
         console.log(action.payload);
         const idx = current(state.value.likedSongs).indexOf(action.payload);
         if (idx === -1) {
            state.value.likedSongs.push(action.payload);
         } else {
            state.value.likedSongs.splice(idx, 1); // delete that song in likedSongs
         }

         updateUserLocal(current(state.value));
         updateUserDb(current(state.value));
      },
      updateCreatedPlaylist: (state, action) => {
         console.log(action.payload);
         const idx = current(state.value.createdPlaylist).indexOf(action.payload);

         if (idx === -1) {
            state.value.createdPlaylist.push(action.payload);
         } else {
            state.value.createdPlaylist.splice(idx, 1); // delete it in list
         }
      updateRecentPlaylist: (state, action) => {
         console.log(action.payload);
         const idx = current(state.value.recentPlaylist).indexOf(
            action.payload
         );
         if (idx > -1) {
            state.value.recentPlaylist.splice(idx, 1); // delete in recentplay
         }

         state.value.recentPlaylist.splice(0, 0, action.payload); // add to first position of array
         updateUserLocal(current(state.value));
         updateUserDb(current(state.value));
      },
   },
});

// Action creators are generated for each case reducer function
export const { updateUser, removeUser, updateLikeSong, updateRecentPlay, updateCreatedPlaylist, updateRecentPlaylist } =
   userSlice.actions;

export default userSlice.reducer;

// export const updateRecentPlaylist = createAsyncThunk("user/updateRecentPlaylist", async (playlistId) => {

// })
