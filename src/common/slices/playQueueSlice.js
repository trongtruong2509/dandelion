import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import * as local from "../utils/localStorage";
import { shuffleArray } from "../utils/common";
import { getSuggestedSongs } from "../utils/songs";

export const fetchSuggested = createAsyncThunk(
   "/playqueue/fetchSuggested",
   async (playing) => {
      return await getSuggestedSongs(playing);
   }
);

const initialState = local.getQueue() ?? {
   played: [],
   next: [],
   suggestion: [],
   autoplay: true, // autoplay suggestion
   pending: false,
};

export const playQueue = createSlice({
   name: "playqueue",
   initialState,
   reducers: {
      initQueue: (state, action) => {
         state.played = [action.payload.shift()];
         state.next = action.payload; // already shift first element;
         local.updateQueue(current(state));
      },
      updateQueue: (state, action) => {
         const id = current(state.next).findIndex(
            (s) => s.id === action.payload.id
         );

         if (id !== -1) {
            state.played.push(action.payload);
            state.next.splice(id, 1);
         } else {
            console.log("[updateQueue] enter here");
            const playedId = current(state.played).findIndex(
               (s) => s.id === action.payload.id
            );

            //add last element to next and remove last element of played if id is last latest play
            if (playedId === current(state.played).length - 2) {
               state.next.unshift(state.played.at(-1));
               state.played.splice(-1);
            } else {
               state.played.splice(playedId, 1);
               state.played.push(action.payload);
            }
         }

         local.updateQueue(current(state));
      },
      addToQueue: (state, action) => {
         state.next.unshift(action.payload);

         local.updateQueue(current(state));
      },
      addToPlay: (state, action) => {
         state.played.push(action.payload);

         local.updateQueue(current(state));
      },
      triggerFromSuggested: (state, action) => {
         state.suggestion = current(state.suggestion).filter(
            (t) => t.id !== action.payload.id
         );
         local.updateQueue(current(state));
      },
      getSuggestionToPlay: (state) => {
         state.played.push(state.suggestion[0]);
         state.next = current(state.suggestion).slice(1, 10);
         local.updateQueue(current(state));
      },
      addSuggestionToQueue: (state, action) => {
         state.next.push(action.payload);
         state.suggestion = current(state.suggestion).filter(
            (t) => t.id !== action.payload.id
         );
         local.updateQueue(current(state));
      },

      updateNoShuffle: (state, action) => {
         const tracks = action.payload.tracks;
         const chosen = action.payload.chosen;

         const idx = tracks.findIndex((t) => t.id === chosen.id);

         state.played = tracks.slice(0, idx + 1);
         state.next = tracks.slice(idx + 1);

         local.updateQueue(current(state));
      },
      updateShuffle: (state, action) => {
         if (action.payload.tracks) {
            const tracks = [...action.payload.tracks];
            shuffleArray(tracks, action.payload.chosen);

            state.played = [tracks[0]];
            state.next = tracks.slice(1);

            local.updateQueue(current(state));
         }
      },
      updateAutoplay: (state, action) => {
         state.autoplay = action.payload;
         local.updateQueue(current(state));
      },
      emptyQueue: (state) => {
         state.played = [];
         state.next = [];
         state.suggestion = [];

         local.updateQueue(current(state));
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchSuggested.pending, (state, action) => {
            state.pending = true;
         })
         .addCase(fetchSuggested.fulfilled, (state, action) => {
            let suggested = action.payload;
            current(state.played).forEach((p) => {
               suggested = suggested.filter((t) => t.id !== p.id);
            });

            current(state.next).forEach((p) => {
               suggested = suggested.filter((t) => t.id !== p.id);
            });

            state.suggestion = suggested;
            state.pending = false;
         })
         .addCase(fetchSuggested.rejected, (state) => {
            state.suggestion = [];
            state.pending = false;
         });
   },
});

// Action creators are generated for each case reducer function
export const {
   initQueue,
   emptyQueue,
   addToQueue,
   addToPlay,
   triggerFromSuggested,
   getSuggestionToPlay,
   addSuggestionToQueue,
   updateQueue,
   updateNoShuffle,
   updateShuffle,
   updateAutoplay,
} = playQueue.actions;

export default playQueue.reducer;
