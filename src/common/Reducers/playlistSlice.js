import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDocInList } from "../utils/firebaseApi";


export const fetchPlayingPlaylist = createAsyncThunk("/playlist/fetchPlayingPlaylistStatus", async (playlist) => {
   const songDetails = await getDocInList("Songs", playlist.songs);

   return {...playlist, songs: songDetails}
})


const initialState = {
   current: {
      value: null,
      tracks: null
   },
   playing: {
      value: null,
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
      },
      updatePlayingTracks: (state, action) => {
         state.playing.value.songs = action.payload;
      },
      updateCurrentToPlaying: (state, action) => {
         state.playing.value = {...current(state.current.value), songs: current(state.current.tracks) }
         state.playing.chosenTrack = action.payload;
      },
      emtpyPlayingPlaylist: (state) => {
         state.playing.value = null;
         state.playing.pending = false;
         state.playing.success = true;
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
      }).addCase(fetchPlayingPlaylist.rejected, (state, action) => {
         console.log("[fetchPlayingPlaylist]", "rejected");
         state.playing.value = null;
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
