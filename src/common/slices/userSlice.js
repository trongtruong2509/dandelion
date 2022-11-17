import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDocInList } from "../utils/firebaseApi";
import { getUserLocal, updateUserLocal, updateUserDb } from "../utils/user";

export const fetchUserPlaylist = createAsyncThunk(
   "/user/fetchUserPlaylistStatus",
   async (user) => {
      try {
         const playlist = await getDocInList("playlists", user.playlists);
         const ordered = [];

         // correct order for playlist
         user.playlists?.forEach((id) => {
            ordered.push(playlist.find((s) => s.id === id));
         });

         return ordered;
      } catch (error) {
         console.log(error);
         return [];
      }
   }
);

const initialState = {
   value: getUserLocal(),
   playlist: [],
   pending: false,
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

         state.value.recentPlayed.unshift(action.payload); // add to the beginning of array

         updateUserLocal(current(state.value));
         updateUserDb(current(state.value));
      },
      updateLikeSong: (state, action) => {
         console.log(action.payload);
         const idx = current(state.value.likedSongs).findIndex(
            (t) => t.id === action.payload.id
         );
         if (idx === -1) {
            state.value.likedSongs.push(action.payload);
         } else {
            state.value.likedSongs.splice(idx, 1); // delete that song in likedSongs
         }

         updateUserLocal(current(state.value));
         updateUserDb(current(state.value));
      },
      updatePlaylists: (state, action) => {
         const id = action.payload.id;
         const idx = current(state.value.playlists).indexOf(id);

         if (idx === -1) {
            state.value.playlists.push(id);
         } else {
            state.value.playlists.splice(idx, 1); // delete it in list
         }

         updateUserLocal(current(state.value));
         updateUserDb(current(state.value));
      },
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
      initPlaylist: (state, action) => {
         console.log("[initPlaylist]", action.payload);
         state.playlist = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUserPlaylist.pending, (state, action) => {
            console.log("[fetchUserPlaylist]", "loading");
            state.pending = true;
         })
         .addCase(fetchUserPlaylist.fulfilled, (state, action) => {
            // console.log("[fetchUserPlaylist]", action.payload);
            state.playlist = action.payload;
            state.pending = false;
         })
         .addCase(fetchUserPlaylist.rejected, (state) => {
            // console.log("[fetchUserPlaylist]", "rejected");
            state.playlist = [];
            state.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateUser,
   removeUser,
   updateLikeSong,
   updateRecentPlay,
   updatePlaylists,
   updateRecentPlaylist,
   initPlaylist,
} = userSlice.actions;

export default userSlice.reducer;
