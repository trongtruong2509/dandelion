import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { zing_getTracks } from "../components/Upload/uploadZing";
import { toast } from "react-toastify";
import { addNewDoc, getDocById } from "../../common/utils/firebaseApi";
import { firebaseKeys } from "../../dataTemplate";

export const getTracks = createAsyncThunk(
   "upload/getTracksStatus",
   async ({ category, id }) => {
      // try {
      const response = await zing_getTracks(category, id);
      const filtered = response.filter((t) => t.streamingStatus !== 2);

      return {
         category,
         id,
         tracks: filtered.map((t) => ({ ...t, rank: "Undefined" })),
      };
      // } catch (error) {
      //    return [];
      // }
   }
);

export const uploadPlaylist = createAsyncThunk(
   "upload/uploadPlaylist",
   async (playlist) => {
      // try {
      console.log("[uploadPlaylist]", playlist);
      const response = await addNewDoc(
         firebaseKeys.playlists,
         playlist,
         playlist.id
      );

      return response;
      // } catch (error) {
      //    toast.error(error);
      //    return Promise.reject("Upload playlist fail");
      // }
   }
);

export const getPlaylistById = createAsyncThunk(
   "upload/getPlaylistById",
   async (id) => {
      // try {
      return await getDocById(firebaseKeys.playlists, id);
   }
);

const initialState = {
   current: {
      category: "",
      id: "",
   },
   tracks: [],
   playlist: null,
   uploadStatus: false,
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
      resetUploadStatus: (state) => {
         state.uploadStatus = false;
      },
      initPlaylist: (state, action) => {
         state.playlist = action.payload;
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
         })
         .addCase(uploadPlaylist.pending, (state) => {
            console.log("[uploadPlaylist]", "loading");
            toast.info("Uploading playlist");
         })
         .addCase(uploadPlaylist.fulfilled, (state, action) => {
            console.log("[uploadPlaylist] success", action.payload);
            state.uploadStatus = true;
            toast.info("Upload playlist sucessful");
         })
         .addCase(uploadPlaylist.rejected, (state, action) => {
            console.log("[uploadPlaylist] fail", action.payload);
            state.uploadStatus = false;
            toast.error("Query failed " + action.payload);
         })
         .addCase(getPlaylistById.pending, (state) => {
            console.log("[getPlaylistById]", "loading");
            // toast.info("Uploading playlist");
         })
         .addCase(getPlaylistById.fulfilled, (state, action) => {
            console.log("[getPlaylistById] success", action.payload);
            state.playlist = action.payload;
            // toast.info("Upload playlist sucessful");
         })
         .addCase(getPlaylistById.rejected, (state, action) => {
            console.log("[getPlaylistById] fail", action.payload);
            state.playlist = action.null;
            // toast.error("Query failed " + action.payload);
         });
   },
});

// Action creators are generated for each case reducer function
export const { updateRank, deleteTrack, resetUploadStatus, initPlaylist } =
   upload.actions;

export default upload.reducer;
