import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
   played: [],
   next: [],
};

export const playQueue = createSlice({
   name: "playqueue",
   initialState,
   reducers: {
      initQueue: (state, action) => {
         state.played = [action.payload.shift()];
         state.next = action.payload;
      },
      updateQueue: (state, action) => {
         const id = current(state.next).indexOf(action.payload);

         if (id != -1) {
            state.played.push(action.payload);
            state.next.splice(id, 1);
         } else {
            const playedId = current(state.played).indexOf(action.payload);
            
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
      },
      addToQueue: (state, action) => {
         state.next.splice(0, 0, action.payload);
      },
      // removeASongFromQueue: (state, action) => {
      //    const id = current(state.queue).indexOf(action.payload);
      //    console.log(id);
      //    state.queue.splice(id, 1);
      // },
      // addASongToPlayed: (state, action) => {
      //    state.played.push(action.payload);
      // },
      // removeASongFromPlayed: (state, action) => {
      //    state.played.splice(current(state.played).indexOf(action.payload), 1);
      // },
      // updatePlayed: (state, action) => {
      //    state.played = action.payload;
      // },
   },
});

// Action creators are generated for each case reducer function
export const {
   initQueue,
   addToQueue,
   removeASongFromQueue,
   updateQueue,
   addASongToPlayed,
   removeASongFromPlayed,
   updatePlayed,
} = playQueue.actions;

export default playQueue.reducer;
