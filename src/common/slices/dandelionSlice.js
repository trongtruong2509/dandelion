import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

import { getUserLocal, updateUserLocal, updateUserDb } from "../utils/user";
import * as local from "../utils/localStorage";
import baseTheme from "../../themes/base";

const initialState = {
   searchHistory: local.getSearchHistory() ?? [],
   theme: local.getTheme() ?? { theme: "baseTheme" },
   homePage: {
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
