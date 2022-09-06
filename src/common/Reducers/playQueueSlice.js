import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
   played: [],
   queue: [],
};

export const playQueue = createSlice({
   name: "playqueue",
   initialState,
   reducers: {
      addToQueue: (state, action) => {
         state.queue.splice(0, 0, action.payload);
      },
      removeASongFromQueue: (state, action) => {
         const id = current(state.queue).indexOf(action.payload);
         console.log(id);
         state.queue.splice(id, 1);
      },
      updateQueue: (state, action) => {
         state.queue = action.payload;
      },
      addASongToPlayed: (state, action) => {
         state.played.push(action.payload);
      },
      removeASongFromPlayed: (state, action) => {
         state.played.splice(current(state.played).indexOf(action.payload), 1);
      },
      updatePlayed: (state, action) => {
         state.played = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   addToQueue,
   removeASongFromQueue,
   updateQueue,
   addASongToPlayed,
   removeASongFromPlayed,
   updatePlayed,
} = playQueue.actions;

export default playQueue.reducer;
