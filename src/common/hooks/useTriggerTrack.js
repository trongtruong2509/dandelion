import { useDispatch, useSelector } from "react-redux";
import { updateTrack } from "../slices/playingSlice";
import { emtpyPlayingPlaylist } from "../slices/playlistSlice";
import { addToPlay, initQueue, triggerFromSuggested, updateQueue } from "../slices/playQueueSlice";
import { updateRecentPlay } from "../slices/userSlice";
import useTriggerPlaylist from "./useTriggerPlaylist";

const useTriggerTrack = () => {
   const dispatch = useDispatch();
   const triggerPlaylist = useTriggerPlaylist();

   const playingPlaylist = useSelector((state) => state.playlist.playing.value);
   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const playqueue = useSelector((state) => state.playqueue);

   return (track, inPlaylist) => {
      if (track) {
         dispatch(updateTrack({ info: track, playing: true }));
         dispatch(updateRecentPlay(track));
         if (playqueue?.suggestion.find((t) => t.id === track.id) && !inPlaylist) {
            dispatch(addToPlay(track));
            dispatch(triggerFromSuggested(track));
         } else {
            if (playingPlaylist) {
               const inPlaying = playingPlaylist.songs?.find((t) => t.id === track.id);
               const inCurrent = currentPlaylist?.songs?.find((t) => t.id === track.id);
               if (!inPlaying && !inCurrent) {
                  // trigger not from the playlist. treat as a single track
                  dispatch(emtpyPlayingPlaylist());
                  dispatch(initQueue([track]));
               } else if (inPlaylist && playingPlaylist.id !== currentPlaylist.id) {
                  // incase current playlist is not playing playlist even tho trigger song is in both current and playing => trigger new playlist
                  triggerPlaylist(currentPlaylist, track);
               } else if (inPlaying) {
                  // track is in queue. simply update it to playing.
                  dispatch(updateQueue(track));
               }
            } else if (
               playqueue?.next?.find((t) => t.id === track.id) ||
               playqueue?.played?.find((t) => t.id === track.id)
            ) {
               // in queue
               dispatch(updateQueue(track));
            } else {
               if (inPlaylist) {
                  // trigger new playlist
                  triggerPlaylist(currentPlaylist, track);
               } else {
                  // trigger not from the playlist. treat as a single track
                  dispatch(emtpyPlayingPlaylist());
                  dispatch(initQueue([track]));
               }
            }
         }
      }
   };
};

export default useTriggerTrack;
