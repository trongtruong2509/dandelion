import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";
import { toast } from "react-toastify";
import { getSuggestedArtists } from "../utils/artists";

import * as local from "../utils/localStorage";
import { getLatestPlaylists } from "../utils/playlist";
import { getLatestSongs } from "../utils/songs";

export const fetchHomepage = createAsyncThunk(
   "/dandelion/fetchHomepage",
   async () => {
      try {
         console.log("[fetchHomepage] enter", Date.now());
         const songs = await getLatestSongs();
         const playlists = await getLatestPlaylists();
         const artists = await getSuggestedArtists();
         console.log("[fetchHomepage] exit", Date.now());

         return {
            newReleases: songs,
            newPlaylists: playlists,
            artists: artists,
         };
      } catch (error) {
         toast.error("Get latest songs fail!");
         return [];
      }
   }
);

const initialState = {
   searchHistory: local.getSearchHistory() ?? [],
   theme: local.getTheme() ?? { theme: "baseTheme" },
   homePage: {
      pending: false,
      recentPlaylistPending: false,
      newReleases: [],
      newPlaylists: [],
      recentPlaylist: [],
      artists: [],
   },
};

export const dandelionSlice = createSlice({
   name: "dandelion",
   initialState,
   reducers: {
      updateSearchHistory: (state, action) => {
         if (!state.searchHistory.some((s) => _.isEqual(s, action.payload))) {
            state.searchHistory.unshift(action.payload);

            local.writeSearchHistory(state.searchHistory);
         }
      },
      clearSearchHistory: (state) => {
         state.searchHistory = [];
         local.writeSearchHistory([]);
      },
      updateTheme: (state, action) => {
         const updatedTheme = { theme: action.payload };
         state.theme = updatedTheme;
         local.writeTheme(updatedTheme);
      },
      updateNewReleases: (state, action) => {
         state.homePage.newReleases = action.payload;
      },
      updateNewPlaylists: (state, action) => {
         state.homePage.newPlaylists = action.payload;
      },
      updateRecentPlaylist: (state, action) => {
         state.homePage.recentPlaylist = action.payload;
      },
      updateArtists: (state, action) => {
         state.homePage.artists = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchHomepage.pending, (state) => {
            state.homePage.pending = true;
         })
         .addCase(fetchHomepage.fulfilled, (state, action) => {
            state.homePage = {
               ...current(state.homePage),
               ...action.payload,
            };
            state.homePage.pending = false;
         })
         .addCase(fetchHomepage.rejected, (state) => {
            state.homePage.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   updateSearchHistory,
   clearSearchHistory,
   updateTheme,
   updateNewReleases,
   updateNewPlaylists,
   updateRecentPlaylist,
   updateArtists,
} = dandelionSlice.actions;

export default dandelionSlice.reducer;
