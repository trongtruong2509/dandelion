import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
   animate: false,
   hidden: true,
};

export const queueSlice = createSlice({
   name: "queue",
   initialState,
   reducers: {
      toggleQueuebar: (state, action) => {
         state.animate = action.payload;
      },
      toggleQueuebarHidden: (state, action) => {
         state.hidden = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { toggleQueuebar, toggleQueuebarHidden } = queueSlice.actions;

export default queueSlice.reducer;
