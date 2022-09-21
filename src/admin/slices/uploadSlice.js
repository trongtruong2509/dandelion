import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { zing_getTracks } from "../components/Upload/uploadZing";
import { toast } from "react-toastify";

export const getTracks = createAsyncThunk(
   "upload/getTracksStatus",
   async ({ category, id }) => {
      // try {
      const response = await zing_getTracks(category, id);
      const filtered = response.filter((t) => t.streamingStatus != 2);

      return {
         category,
         id,
         tracks: filtered.map((t) => ({ ...t, rank: "S" })),
      };
      // } catch (error) {
      //    return [];
      // }
   }
);

const initialState = {
   current: {
      category: "",
      id: "",
   },
   tracks: [],
};

export const upload = createSlice({
   name: "upload",
   initialState,
   reducers: {
      updateRank: (state, action) => {
         const index = current(state.tracks).findIndex(
            (t) => t.encodeId === action.payload.id
         );
         state.tracks[index].rank = action.payload.rank;
      },
      deleteTrack: (state, action) => {
         const index = current(state.tracks).findIndex(
            (t) => t.encodeId === action.payload
         );
         state.tracks.splice(index, 1);
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getTracks.pending, (state) => {
            console.log("[getTracks]", "loading");
            toast.info("Querying");
         })
         .addCase(getTracks.fulfilled, (state, action) => {
            console.log("[getTracks] success", action.payload);
            state.tracks = action.payload.tracks;
            state.current.category = action.payload.category;
            state.current.id = action.payload.id;
            toast.info("Query sucessful");
         })
         .addCase(getTracks.rejected, (state, action) => {
            console.log("[getTracks] success", action.payload);
            state.tracks = null;
            state.current.category = "";
            state.current.id = "";
            toast.error("Query failed");
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateRank,
   deleteTrack,
   // updateQueue,
   // addASongToPlayed,
   // removeASongFromPlayed,
   // updatePlayed,
} = upload.actions;

export default upload.reducer;
