import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../slices/playingSlice";
import { updatePlayingPlaylist } from "../slices/playlistSlice";
import { initQueue } from "../slices/playQueueSlice";
import { updateRecentPlay, updateRecentPlaylist } from "../slices/userSlice";
import { shuffleArray } from "../utils/common";

const useTriggerPlaylist = (initTrigger = { playlist: null, chosen: null }) => {
   const dispatch = useDispatch();

   // const playingPlaylist = useSelector((state) => state.playlist.playing);
   // const playingTrack = useSelector((state) => state.playing.value);
   const user = useSelector((state) => state.user.user);
   // const queue = useSelector((state) => state.queue);
   const shuffle = useSelector((state) => state.playbar.shuffle);

   const [trigger, setTrigger] = useState(initTrigger);
   const { playlist, chosen } = trigger;

   useEffect(() => {
      console.log("[useTriggerPlaylist]", trigger);

      if (playlist) {
         let shuffledSongs = [...playlist?.songs];

         if (shuffle) {
            shuffleArray(shuffledSongs, chosen);
         }

         dispatch(updatePlayingPlaylist(playlist));
         dispatch(update({ info: shuffledSongs[0], playing: true }));
         dispatch(initQueue(shuffledSongs));

         dispatch(updateRecentPlay(shuffledSongs[0]));
         dispatch(updateRecentPlaylist(playlist?.id));
      }
   }, [trigger]);

   return {
      trigger,
      setTrigger,
   };
};

export default useTriggerPlaylist;
