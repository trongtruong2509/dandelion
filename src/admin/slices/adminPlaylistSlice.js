import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllDocs } from "../../common/utils/firebaseApi";
import { firebaseCollections } from "../../dataTemplate";

export const fetchAllPlaylist = createAsyncThunk(
   "adminTrack/fetchAllPlaylist",
   async () => {
      try {
         return await getAllDocs(firebaseCollections.playlists);
      } catch (error) {
         toast.error(error);
      }
   }
);

const initialState = {
   tracks: [],
   allPlaylist: [],
   fetching: false,
};

export const adminPlaylistSlice = createSlice({
   name: "adminPlaylist",
   initialState,
   reducers: {
      // initTracks: (state, action) => {
      //    state.allTracks = action.payload;
      // },
      // updateTracks: (state, action) => {
      //    state.tracks = action.payload;
      // },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllPlaylist.pending, (state) => {
            console.log("[fetchAllPlaylist]", "loading");
            // toast.info("Querying");
            state.fetching = true;
         })
         .addCase(fetchAllPlaylist.fulfilled, (state, action) => {
            console.log("[fetchAllPlaylist] success", action.payload);
            state.allPlaylist = action.payload;
            // toast.info("Query tracks sucessful");
            state.fetching = false;
         })
         .addCase(fetchAllPlaylist.rejected, (state, action) => {
            console.log("[fetchAllPlaylist] success", action.payload);
            state.allPlaylist = [];
            // toast.error("Query tracks failed");
            state.fetching = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   // updateTracks,
   // initTracks,
   //    deleteTrack,
   // updateQueue,
   // addASongToPlayed,
   // removeASongFromPlayed,
   // updatePlayed,
} = adminPlaylistSlice.actions;

export default adminPlaylistSlice.reducer;
