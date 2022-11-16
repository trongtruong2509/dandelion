import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

import { getUserLocal, updateUserLocal, updateUserDb } from "../utils/user";
import * as local from "../utils/localStorage";

const initialState = {
   searchHistory: local.getSearchHistory() ?? [],
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
   },
});

// Action creators are generated for each case reducer function
export const { updateSearchHistory, clearSearchHistory } =
   dandelionSlice.actions;

export default dandelionSlice.reducer;
