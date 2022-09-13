import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDocInList } from "../utils/firebaseApi";


export const fetchPlayingPlaylist = createAsyncThunk("/playlist/fetchPlayingPlaylistStatus", async (playlist) => {
   const songDetails = await getDocInList("Songs", playlist.songs);

   return {...playlist, songs: songDetails}
})


const initialState = {
   current: null,
   playing: {
      value: null,
      pending: false,
      success: false
   }
};

export const playlistSlice = createSlice({
   name: "playlist",
   initialState,
   reducers: {
      updateCurrentPlaylist: (state, action) => {
         state.current = action.payload;
      },
      updatePlayingPlaylist: (state, action) => {
         state.playing.value = action.payload;
      },
      updatePlayingTracks: (state, action) => {
         state.playing.value.songs = action.payload;
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
export const { updateCurrentPlaylist, updatePlayingPlaylist, updatePlayingTracks, remove, removeASong, updateShuffle } =
   playlistSlice.actions;

export default playlistSlice.reducer;
