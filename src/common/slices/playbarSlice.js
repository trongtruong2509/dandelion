import { createSlice, current } from "@reduxjs/toolkit";
import * as local from "../utils/localStorage";

const initialState = local.getPlaybar() ?? {
   shuffle: true,
   repeat: 0,
   volume: 1,
};

export const playbarSlice = createSlice({
   name: "playbar",
   initialState,
   reducers: {
      updateShuffle: (state, action) => {
         state.shuffle = action.payload;
         local.updatePlaybar(current(state));
      },

      updateRepeat: (state, action) => {
         state.repeat = action.payload;
         local.updatePlaybar(current(state));
      },
      updateVolume: (state, action) => {
         state.volume = action.payload;
         local.updatePlaybar(current(state));
      },
   },
});

export const { updateShuffle, updateRepeat, updateVolume } =
   playbarSlice.actions;

export default playbarSlice.reducer;
