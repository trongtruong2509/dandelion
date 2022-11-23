import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { firebaseCollections } from "../../dataTemplate";
import { getDocById, getDocInList } from "../utils/firebaseApi";

import * as local from "../utils/localStorage";

export const fetchCurrentPlaylistInfo = createAsyncThunk(
   "/playlist/fetchCurrentPlaylistInfo",
   async (id) => {
      const playlist = await getDocById("playlists", id);
      return playlist;
   }
);

const initialState = {
   current: {
      value: null,
      pending: false,
      success: false,
   },
   playing: {
      value: local.getPlaylist() ?? null,
      chosenTrack: null,
      pending: false,
      success: false,
   },
};

export const playlistSlice = createSlice({
   name: "playlist",
   initialState,
   reducers: {
      updateCurrentPlaylist: (state, action) => {
         state.current.value = action.payload;
      },
      setCurrentTracks: (state, action) => {
         state.current.tracks = action.payload;
      },
      updatePlayingPlaylist: (state, action) => {
         state.playing.value = action.payload;
         local.updatePlaylist(current(state.playing)?.value);
      },
      updateCurrentToPlaying: (state, action) => {
         state.playing.value = state.current.value;
         state.playing.chosenTrack = action.payload;
         local.updatePlaylist(current(state.playing)?.value);
      },
      emtpyPlayingPlaylist: (state) => {
         state.playing.value = null;
         state.playing.pending = false;
         state.playing.success = true;
         local.updatePlaylist(current(state.playing)?.value);
      },
      remove: (state, action) => {
         state.current += action.payload;
      },
      removeASong: (state, action) => {
         state.current += action.payload;
      },
      updateShuffle: (state, action) => {
         console.log(action.payload);
         state.playing.value.shuffle = action.payload;
         local.updatePlaylist(current(state.playing)?.value);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchCurrentPlaylistInfo.pending, (state, action) => {
            console.log("[fetchCurrentPlaylistInfo]", "loading");
            state.current.pending = true;
         })
         .addCase(fetchCurrentPlaylistInfo.fulfilled, (state, action) => {
            console.log("[fetchCurrentPlaylistInfo]", action.payload);
            state.current.value = action.payload;
            state.current.pending = false;
            state.current.success = true;
         })
         .addCase(fetchCurrentPlaylistInfo.rejected, (state, action) => {
            console.log("[fetchCurrentPlaylistInfo]", "rejected");
            state.current.value = null;
            state.current.success = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateCurrentPlaylist,
   setCurrentTracks,
   updateCurrentToPlaying,
   updatePlayingPlaylist,
   // updatePlayingTracks,
   emtpyPlayingPlaylist,
   remove,
   removeASong,
   updateShuffle,
} = playlistSlice.actions;

export default playlistSlice.reducer;
