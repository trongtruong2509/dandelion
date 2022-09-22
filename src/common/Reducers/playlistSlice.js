import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDocById, getDocInList } from "../utils/firebaseApi";

import * as local from "../utils/localStorage"

export const fetchPlayingPlaylist = createAsyncThunk("/playlist/fetchPlayingPlaylistStatus", async (playlist) => {
   const songDetails = await getDocInList("songs", playlist.songs);

   return {...playlist, songs: songDetails}
})

export const fetchCurrentPlaylistInfo = createAsyncThunk("/playlist/fetchCurrentPlaylistInfo", async (id) => {
   const playlist = await getDocById("playlists", id);
   return playlist;
})

// export const fetchCurrentTracks = createAsyncThunk("/playlist/fetchCurrentTracks", async (playlist) => {
//    const tracks = await getDocInList("Songs", playlist?.songs);
//    return tracks;
// })

const initialState = {
   current: {
      value: null,
      tracks: null,
      pending: false,
      success: false
   },
   playing:  {
      value: local.getPlaylist() ?? null,
      chosenTrack: null,
      pending: false,
      success: false
   }
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
      updatePlayingTracks: (state, action) => {
         state.playing.value.songs = action.payload;
         local.updatePlaylist(current(state.playing)?.value);
      },
      updateCurrentToPlaying: (state, action) => {
         state.playing.value = {...current(state.current.value), songs: current(state.current.tracks) }
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
      .addCase(fetchPlayingPlaylist.pending, (state, action) => {
         console.log("[fetchPlayingPlaylist]", "loading");
         state.playing.pending = true;
      }).addCase(fetchPlayingPlaylist.fulfilled, (state, action) => {
         console.log("[fetchPlayingPlaylist]", action.payload);
         state.playing.value = action.payload;
         local.updatePlaylist(current(state.playing)?.value);
      }).addCase(fetchPlayingPlaylist.rejected, (state, action) => {
         console.log("[fetchPlayingPlaylist]", "rejected");
         state.playing.value = null;
         local.updatePlaylist(current(state.playing)?.value);
      }).addCase(fetchCurrentPlaylistInfo.pending, (state, action) => {
         console.log("[fetchCurrentPlaylistInfo]", "loading");
         state.current.pending = true;
      }).addCase(fetchCurrentPlaylistInfo.fulfilled, (state, action) => {
         console.log("[fetchCurrentPlaylistInfo]", action.payload);
         state.current.value = action.payload;
         state.current.pending = false;
         state.current.success = true;
      }).addCase(fetchCurrentPlaylistInfo.rejected, (state, action) => {
         console.log("[fetchCurrentPlaylistInfo]", "rejected");
         state.current.value = null;
         state.current.success = false;
      })
   }
});

// Action creators are generated for each case reducer function
export const { 
   updateCurrentPlaylist, 
   setCurrentTracks, 
   updateCurrentToPlaying, 
   updatePlayingPlaylist, 
   updatePlayingTracks, 
   emtpyPlayingPlaylist, 
   remove, 
   removeASong, 
   updateShuffle 
} = playlistSlice.actions;

export default playlistSlice.reducer;
