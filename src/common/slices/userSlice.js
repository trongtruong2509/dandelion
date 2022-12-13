import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDocInList } from "../utils/firebaseApi";
import { localKeys } from "../utils/localStorage";
import { getUserLocal, updateUserLocal, updateUserDb, getNoLoggedUser, updateUserRecentPlayed } from "../utils/user";

export const fetchUserPlaylist = createAsyncThunk("/user/fetchUserPlaylistStatus", async (user) => {
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
});

export const fetchUserRecentPlaylist = createAsyncThunk("/user/fetchUserRecentPlaylist", async (user) => {
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
});

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
         updateUserLocal(localKeys.user, action.payload);
         updateUserDb(action.payload); //TODO: only update if difference with db
      },
      removeUser: (state) => {
         state.user = null;
         updateUserLocal(localKeys.user, null);
      },
      updateRecentPlay: (state, action) => {
         const user = state.user ?? state.noLogged;

         // remove first
         user.recentPlayed = current(user.recentPlayed).filter((t) => t.id !== action.payload.id);

         user.recentPlayed.unshift(action.payload); // add to the beginning of array
         user.recentPlayed = user.recentPlayed.slice(0, 30);

         if (state.user) {
            updateUserLocal(localKeys.user, current(user));
            updateUserRecentPlayed(current(state.user)); //TODO: only update RecentPlay field
         } else {
            updateUserLocal(localKeys.nonUser, current(user));
         }
      },
      updateRecentPlaylist: (state, action) => {
         const user = state.user ?? state.noLogged;

         // remove first
         user.recentPlaylist = current(user.recentPlaylist).filter((t) => t !== action.payload);
         user.recentPlaylist.unshift(action.payload); // add to first position of array

         if (state.user) {
            updateUserLocal(current(state.user));
            updateUserDb(current(state.user));
         }
      },
      removeFromRecentPlaylist: (state, action) => {
         const user = state.user ?? state.noLogged;

         user.recentPlaylist = current(user.recentPlaylist).filter((t) => t !== action.payload);
         if (state.user) {
            updateUserLocal(current(state.user));
            updateUserDb(current(state.user));
         }
      },
      updateLikeSong: (state, action) => {
         const idx = current(state.user.likedSongs).findIndex((t) => t.id === action.payload.id);
         if (idx === -1) {
            state.user.likedSongs.push(action.payload);
         } else {
            state.user.likedSongs.splice(idx, 1); // delete that song in likedSongs
         }

         updateUserLocal(localKeys.user, current(state.user));
         updateUserDb(current(state.user));
      },
      updatePlaylists: (state, action) => {
         const id = action.payload.id;
         const idx = current(state.user.playlists).indexOf(id);

         if (idx === -1) {
            state.user.playlists.unshift(id);
         } else {
            state.user.playlists.splice(idx, 1); // delete it in list
         }

         updateUserLocal(localKeys.user, current(state.user));
         updateUserDb(current(state.user));
      },

      initPlaylist: (state, action) => {
         state.playlist = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUserPlaylist.pending, (state) => {
            console.log("[fetchUserPlaylist] pending...");
            state.pending = true;
         })
         .addCase(fetchUserPlaylist.fulfilled, (state, action) => {
            state.playlist = action.payload;
            state.pending = false;
         })
         .addCase(fetchUserPlaylist.rejected, (state) => {
            state.playlist = [];
            state.pending = false;
         })
         .addCase(fetchUserRecentPlaylist.pending, (state) => {
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
   removeFromRecentPlaylist,
   initPlaylist,
} = userSlice.actions;

export default userSlice.reducer;
