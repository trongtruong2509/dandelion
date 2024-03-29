import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { firebaseKeys } from "../../dataTemplate";
import { getDocById, getDocInList, updateDocField } from "../utils/firebaseApi";

import * as local from "../utils/localStorage";

export const fetchCurrentPlaylistInfo = createAsyncThunk("/playlist/fetchCurrentPlaylistInfo", async (id) => {
   const playlist = await getDocById(firebaseKeys.playlists, id);
   return playlist;
});

export const addTrackToPlaylist = createAsyncThunk("/playlist/addTrackToPlaylist", async ({ playlist, track }) => {
   const result = await updateDocField(firebaseKeys.playlists, playlist.id, {
      songs: [...playlist.songs, track],
   });

   if (result) {
      toast.info(`Added ${track.title} to playlist successfully`);
   } else {
      toast.error(`Added ${track.title} to playlist fail`);
   }

   return result;
});

export const removeTrackFromPlaylist = createAsyncThunk(
   "/playlist/removeTrackFromPlaylist",
   async ({ playlist, track }) => {
      const result = await updateDocField(firebaseKeys.playlists, playlist.id, {
         songs: playlist.songs.filter((t) => t.id !== track.id),
      });

      if (result) {
         toast.info(`Deleted ${track.title} from playlist`);
      } else {
         toast.error(`Deleted ${track.title} to playlist fail`);
      }

      return result;
   }
);

const initialState = {
   current: {
      value: null,
      loading: false,
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
      addTrackToCurrent: (state, action) => {
         state.current.value.songs.push(action.payload);

         // TODO: update to DB
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
            state.current.loading = true;
         })
         .addCase(fetchCurrentPlaylistInfo.fulfilled, (state, action) => {
            console.log("[fetchCurrentPlaylistInfo]", action.payload);
            state.current.value = action.payload;
            state.current.loading = false;
            state.current.success = true;
         })
         .addCase(fetchCurrentPlaylistInfo.rejected, (state, action) => {
            console.log("[fetchCurrentPlaylistInfo]", "rejected");
            state.current.value = null;
            state.current.loading = false;
            state.current.success = false;
         })
         .addCase(addTrackToPlaylist.pending, (state, action) => {
            console.log("[addTrackToPlaylist]", "loading");
            state.current.pending = true;
         })
         .addCase(addTrackToPlaylist.fulfilled, (state, action) => {
            state.current.value = action.payload;
            state.current.pending = false;
            state.current.success = true;
         })
         .addCase(addTrackToPlaylist.rejected, (state, action) => {
            console.log("[addTrackToPlaylist]", "rejected");
            // state.current.value = null;
            state.current.success = false;
         })
         .addCase(removeTrackFromPlaylist.pending, (state, action) => {
            console.log("[removeTrackFromPlaylist]", "loading");
            state.current.pending = true;
         })
         .addCase(removeTrackFromPlaylist.fulfilled, (state, action) => {
            state.current.value = action.payload;
            state.current.pending = false;
            state.current.success = true;
         })
         .addCase(removeTrackFromPlaylist.rejected, (state, action) => {
            console.log("[removeTrackFromPlaylist]", "rejected");
            // state.current.value = null;
            state.current.success = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateCurrentPlaylist,
   addTrackToCurrent,
   updateCurrentToPlaying,
   updatePlayingPlaylist,
   emtpyPlayingPlaylist,
   remove,
   removeASong,
   updateShuffle,
} = playlistSlice.actions;

export default playlistSlice.reducer;
