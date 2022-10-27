import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// export const getTracks = createAsyncThunk(
//    "upload/getTracksStatus",
//    async ({ category, id }) => {
//       // try {
//       const response = await zing_getTracks(category, id);
//       const filtered = response.filter((t) => t.streamingStatus != 2);

//       return {
//          category,
//          id,
//          tracks: filtered.map((t) => ({ ...t, rank: "S" })),
//       };
//       // } catch (error) {
//       //    return [];
//       // }
//    }
// );

const initialState = {
   tracks: [],
   allTracks: [],
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
      // builder
      //  .addCase(getTracks.pending, (state) => {
      //     console.log("[getTracks]", "loading");
      //     toast.info("Querying");
      //  })
      //  .addCase(getTracks.fulfilled, (state, action) => {
      //     console.log("[getTracks] success", action.payload);
      //     state.tracks = action.payload.tracks;
      //     state.current.category = action.payload.category;
      //     state.current.id = action.payload.id;
      //     toast.info("Query sucessful");
      //  })
      //  .addCase(getTracks.rejected, (state, action) => {
      //     console.log("[getTracks] success", action.payload);
      //     state.tracks = null;
      //     state.current.category = "";
      //     state.current.id = "";
      //     toast.error("Query failed");
      //  });
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
