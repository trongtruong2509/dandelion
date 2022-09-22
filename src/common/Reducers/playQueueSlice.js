import { createSlice, current } from "@reduxjs/toolkit";

import * as local from "../utils/localStorage"

const initialState = local.getQueue() ?? {
   played: [],
   next: [],
};

export const playQueue = createSlice({
   name: "playqueue",
   initialState,
   reducers: {
      initQueue: (state, action) => {
         state.played = [action.payload.shift()];
         state.next = action.payload; // already shift first element;
         local.updateQueue(current(state))
      },
      updateQueue: (state, action) => {
         const id = current(state.next).findIndex(s => s.id === action.payload.id);

         if (id != -1) {
            state.played.push(action.payload);
            state.next.splice(id, 1);
         } else {
            const playedId = current(state.played).findIndex(s => s.id === action.payload.id);
            
            //add last element to next and remove last element of played 
            // if id is last latest play
            if (playedId === current(state.played).length - 2) {
               state.next.unshift(state.played.at(-1)); 
               state.played.splice(-1);
            } else {
               state.played.splice(playedId, 1);
               state.played.push(action.payload);
            }
         }
         
         local.updateQueue(current(state))
      },
      addToQueue: (state, action) => {
         state.next.splice(0, 0, action.payload);

         local.updateQueue(current(state))
      },
   },
});

// Action creators are generated for each case reducer function
export const {
   initQueue,
   addToQueue,
   updateQueue,
   // removeASongFromQueue,
   // addASongToPlayed,
   // removeASongFromPlayed,
   // updatePlayed,
} = playQueue.actions;

export default playQueue.reducer;
