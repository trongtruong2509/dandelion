import { createSlice, current } from "@reduxjs/toolkit";
import { getUserLocal, updateUserLocal, updateUserDb } from "../utils/user";

const initialState = {
   value: getUserLocal(),
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateUser: (state, action) => {
         state.value = action.payload;
         updateUserLocal(action.payload);
         updateUserDb(action.payload);
      },
      removeUser: (state) => {
         state.value = null;
         updateUserLocal(null);
      },
      updateRecentPlay: (state, action) => {
         const idx = current(state.value.recentPlayed.indexOf(action.payload));
         if (idx > -1) {
            state.value.recentPlayed.splice(idx, 1); // delete in recentplay
            state.value.recentPlayed.splice(0, 0, action.payload); // add to first position again
         } else {
            state.value.recentPlayed.splice(0, 0, action.payload);
         }
      },
   },
});

// Action creators are generated for each case reducer function
export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
