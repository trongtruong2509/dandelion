import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import SongInfo from "../Song/SongInfo";
import SongOptions from "../Song/SongOptions";

import { play, pause, update } from "../../slices/playingSlice";
import { updateRecentPlay, updateRecentPlaylist } from "../../slices/userSlice";
import {
   addSuggestionToQueue,
   addToPlay,
   initQueue,
   triggerFromSuggested,
   updateQueue,
} from "../../slices/playQueueSlice";
import { emtpyPlayingPlaylist, updateCurrentToPlaying } from "../../slices/playlistSlice";
import { convertTimeToStr } from "../../utils/common";

const playingMixIcon = "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif";

const SongItem = ({
   info,
   size = "10",
   options = true,
   like = true,
   playlistMode = false,
   inPlaylistPage = false,
   addPlaylist = false,
   onAdd,
   addPlayQueue = false,
   fade = false,
   canDetele = false,
   onDelete,
   badges = false,
   activeLike = false,
   activeDots = false,
}) => {
   const dispatch = useDispatch();

   const playingSong = useSelector((state) => state.playing.value);
   const playingPlaylist = useSelector((state) => state.playlist.playing.value);
   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const playqueue = useSelector((state) => state.playqueue);

   const [current, setCurrent] = useState(false);

   useEffect(() => {
      if (playingSong?.info?.id === info.id) {
         setCurrent(true);
      } else {
         setCurrent(false);
      }
   }, [playingSong, info]);

   const playSong = () => {
      if (current) {
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      } else {
         dispatch(update({ info, playing: true }));
         dispatch(updateRecentPlay(info));

         if (playqueue?.suggestion.find((t) => t.id === info.id)) {
            console.log("[playSong] is in suggestion");
            dispatch(addToPlay(info));
            dispatch(triggerFromSuggested(info));
         } else {
            if (playingPlaylist) {
               const inPlaying = playingPlaylist.songs?.find((t) => t.id === info.id);
               const inCurrent = currentPlaylist?.songs?.find((t) => t.id === info.id);

               if (!(inPlaying && inCurrent)) {
                  // trigger not from the playlist. treat as a single track
                  console.log("[playSong] triggered track not from the playlist. treat as a single track");

                  dispatch(emtpyPlayingPlaylist());
                  dispatch(initQueue([info]));
               } else if (inCurrent && playingPlaylist.id !== currentPlaylist.id) {
                  // incase current playlist is not playing playlist even tho trigger song is in both current and playing => trigger new playlist
                  dispatch(updateRecentPlaylist(currentPlaylist.id));
                  dispatch(updateCurrentToPlaying(info));
                  console.log(
                     "[playSong] incase current playlist is not playing playlist even tho trigger song is in both current and playing => trigger new playlist"
                  );
               } else if (inPlaying) {
                  // track is in queue. simply update it to playing.
                  console.log("[playSong] track is in queue. simply update it to playing.");

                  dispatch(updateQueue(info));
               }
            } else if (
               playqueue?.next?.find((t) => t.id === info.id) ||
               playqueue?.played?.find((t) => t.id === info.id)
            ) {
               // in queue
               dispatch(updateQueue(info));
            } else {
               if (currentPlaylist?.songs.includes(info.id)) {
                  // trigger new playlist
                  console.log("[playSong] trigger new playlist");
                  dispatch(updateRecentPlaylist(currentPlaylist.id));
                  dispatch(updateCurrentToPlaying(info));
               } else {
                  // trigger not from the playlist. treat as a single track
                  dispatch(emtpyPlayingPlaylist());
                  dispatch(initQueue([info]));
               }
            }
         }
      }
   };

   const onAddQueue = (info) => {
      dispatch(addSuggestionToQueue(info));
   };

   const thumbnailSizes = {
      10: "w-10 h-10",
      11: "w-11 h-11",
      12: "w-12 h-12",
      13: "w-13 h-13",
      14: "w-14 h-14",
      15: "w-15 h-15",
      16: "w-16 h-16",
   };

   return (
      <div
         className={`w-full px-3 py-2 border-secondary grid grid-cols-12 relative rounded-md group
                         ${current ? "bg-alpha" : "hover:bg-alpha"} 
                         ${playlistMode ? "border-b" : ""}
                         ${fade && !current ? "opacity-50 hover:opacity-100" : ""}`}
      >
         <div className={`${playlistMode ? "col-span-6" : "col-span-10"}`}>
            <SongInfo info={info} onClick={playSong} size={size} badges={badges} />

            <button
               className={`items-center justify-center bg-dark-alpha-50 rounded-md absolute top-2 left-3 group-hover:flex group
               ${current ? "flex" : "hidden"} 
               ${thumbnailSizes[size]}`}
               onClick={playSong}
            >
               {playingSong?.playing && current ? (
                  <div className="group">
                     <img src={playingMixIcon} className="w-[18px] h-[18px] group-hover:opacity-0" />
                     <IoMdPause className="text-xl text-white opacity-0 group-hover:opacity-100 absolute-center" />
                  </div>
               ) : (
                  <IoPlay className="text-[22px] text-white" />
               )}
            </button>
         </div>

         {playlistMode && (
            <p className="flex items-center col-span-5 text-xs cursor-pointer text-secondary hover:text-dandelion-primary hover:underline">
               {info?.album?.title ?? ""}
            </p>
         )}
         <div className="flex items-center justify-end">
            {playlistMode && (
               <p className="flex items-center justify-end col-span-1 text-xs text-right text-secondary group-hover:opacity-0">
                  {convertTimeToStr(info.duration)}
               </p>
            )}
            {options && (
               <div className="absolute -translate-y-1/2 top-1/2 right-3">
                  <SongOptions
                     songInfo={info}
                     like={like}
                     addPlaylist={addPlaylist}
                     onAdd={onAdd}
                     addPlayQueue={addPlayQueue}
                     onAddPlayQueue={onAddQueue}
                     inPlaylistPage={inPlaylistPage}
                     canDetele={canDetele}
                     activeLike={activeLike}
                     activeDots={activeDots}
                     onDelete={onDelete}
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default SongItem;
