import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
   value: true,
};

export const queueSlice = createSlice({
   name: "queue",
   initialState,
   reducers: {
      toggleQueuebar: (state, action) => {
         state.value = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { toggleQueuebar } = queueSlice.actions;

export default queueSlice.reducer;
