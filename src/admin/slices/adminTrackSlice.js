import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllDocs } from "../../common/utils/firebaseApi";

export const fetchAllTracks = createAsyncThunk(
   "adminTrack/fetchAllTracks",
   async () => {
      try {
         return await getAllDocs("songs");
      } catch (error) {
         toast.error(error);
      }
   }
);

const initialState = {
   tracks: [],
   allTracks: [],
   fetching: false,
};

export const adminTrackSlice = createSlice({
   name: "adminTrack",
   initialState,
   reducers: {
      initTracks: (state, action) => {
         state.allTracks = action.payload;
      },
      updateTracks: (state, action) => {
         state.tracks = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchAllTracks.pending, (state) => {
            console.log("[fetchAllTracks]", "loading");
            // toast.info("Querying");
            state.fetching = true;
         })
         .addCase(fetchAllTracks.fulfilled, (state, action) => {
            console.log("[fetchAllTracks] success", action.payload);
            state.allTracks = action.payload;
            state.tracks = action.payload;
            // toast.info("Query tracks sucessful");
            state.fetching = false;
         })
         .addCase(fetchAllTracks.rejected, (state, action) => {
            console.log("[fetchAllTracks] success", action.payload);
            state.allTracks = [];
            state.tracks = [];
            // toast.error("Query tracks failed");
            state.fetching = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateTracks,
   initTracks,
   //    deleteTrack,
   // updateQueue,
   // addASongToPlayed,
   // removeASongFromPlayed,
   // updatePlayed,
} = adminTrackSlice.actions;

export default adminTrackSlice.reducer;
