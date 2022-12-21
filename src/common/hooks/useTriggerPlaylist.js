import { useDispatch, useSelector } from "react-redux";
import { updateTrack } from "../slices/playingSlice";
import { updatePlayingPlaylist } from "../slices/playlistSlice";
import { initQueue } from "../slices/playQueueSlice";
import { updateRecentPlay, updateRecentPlaylist } from "../slices/userSlice";
import { shuffleArray } from "../utils/common";

const useTriggerPlaylist = () => {
   const dispatch = useDispatch();

   const shuffle = useSelector((state) => state.playbar.shuffle);

   return (playlist, chosen) => {
      if (playlist) {
         let shuffledSongs = [...playlist?.songs];
         if (shuffle) {
            shuffleArray(shuffledSongs, chosen);
         }

         dispatch(updatePlayingPlaylist(playlist));
         dispatch(updateTrack({ info: shuffledSongs[0], playing: true }));
         dispatch(initQueue(shuffledSongs));

         dispatch(updateRecentPlay(shuffledSongs[0]));
         dispatch(updateRecentPlaylist(playlist?.id));
      }
   };
};

export default useTriggerPlaylist;
