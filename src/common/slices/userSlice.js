import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDocInList } from "../utils/firebaseApi";
import {
   getUserLocal,
   updateUserLocal,
   updateUserDb,
   getNoLoggedUser,
   updateUserRecentPlayed,
} from "../utils/user";

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

export const fetchUserRecentPlaylist = createAsyncThunk(
   "/user/fetchUserRecentPlaylist",
   async (user) => {
      try {
         const playlist = await getDocInList("playlists", user.recentPlaylist);
         const ordered = [];

         // correct order for playlist
         user.recentPlaylist?.forEach((id) => {
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
   user: getUserLocal(),
   noLogged: getNoLoggedUser(),
   playlist: [],
   recentPlaylists: [],
   pending: false,
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateUser: (state, action) => {
         state.user = action.payload;
         updateUserLocal(action.payload);
         updateUserDb(action.payload);
      },
      removeUser: (state) => {
         state.user = null;
         updateUserLocal(null);
      },
      updateRecentPlay: (state, action) => {
         const idx = current(state.user.recentPlayed).findIndex(
            (s) => s.id === action.payload.id
         );

         if (idx > -1) {
            state.user.recentPlayed.splice(idx, 1); // delete in recentplay
         }

         state.user.recentPlayed.unshift(action.payload); // add to the beginning of array
         state.user.recentPlayed = state.user.recentPlayed.slice(0, 30);

         updateUserLocal(current(state.user));
         updateUserRecentPlayed(current(state.user)); //TODO: only update RecentPlay field
      },
      updateLikeSong: (state, action) => {
         console.log(action.payload);
         const idx = current(state.user.likedSongs).findIndex(
            (t) => t.id === action.payload.id
         );
         if (idx === -1) {
            state.user.likedSongs.push(action.payload);
         } else {
            state.user.likedSongs.splice(idx, 1); // delete that song in likedSongs
         }

         updateUserLocal(current(state.user));
         updateUserDb(current(state.user));
      },
      updatePlaylists: (state, action) => {
         const id = action.payload.id;
         const idx = current(state.user.playlists).indexOf(id);

         if (idx === -1) {
            state.user.playlists.push(id);
         } else {
            state.user.playlists.splice(idx, 1); // delete it in list
         }

         updateUserLocal(current(state.user));
         updateUserDb(current(state.user));
      },
      updateRecentPlaylist: (state, action) => {
         console.log(action.payload);
         const idx = current(state.user.recentPlaylist).indexOf(action.payload);
         if (idx > -1) {
            state.user.recentPlaylist.splice(idx, 1); // delete in recentplay
         }

         state.user.recentPlaylist.splice(0, 0, action.payload); // add to first position of array
         updateUserLocal(current(state.user));
         updateUserDb(current(state.user));
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
            state.playlist = [];
            state.pending = false;
         })
         .addCase(fetchUserRecentPlaylist.pending, (state, action) => {
            state.pending = true;
         })
         .addCase(fetchUserRecentPlaylist.fulfilled, (state, action) => {
            state.recentPlaylists = action.payload;
            state.pending = false;
         })
         .addCase(fetchUserRecentPlaylist.rejected, (state) => {
            state.recentPlaylists = [];
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
