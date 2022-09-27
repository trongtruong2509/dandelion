import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import SongInfo from "../Song/SongInfo";
import SongOptions from "../Song/SongOptions";

import { play, pause, update } from "../../slices/playingSlice";
import { updateRecentPlay, updateRecentPlaylist } from "../../slices/userSlice";
import { initQueue, updateQueue } from "../../slices/playQueueSlice";
import {
   emtpyPlayingPlaylist,
   updateCurrentToPlaying,
} from "../../slices/playlistSlice";

const SongItem = ({
   info,
   size = "10",
   options = true,
   like = true,
   playlistMode = false,
   isPlaylist = false,
   inPlaylistPage = false,
   addPlaylist = false,
   fade = false,
}) => {
   const dispatch = useDispatch();

   const playingSong = useSelector((state) => state.playing.value);
   const currentUser = useSelector((state) => state.user.value);
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

         if (playingPlaylist) {
            console.log("[info]", info);
            console.log("[isPlaylist]", isPlaylist);

            const inQueue =
               playqueue.played.find((s) => s.id === info.id) ||
               playqueue.next.find((s) => s.id === info.id);

            if (!isPlaylist) {
               // trigger not from the playlist. treat as a single track
               dispatch(emtpyPlayingPlaylist());
               dispatch(initQueue([info]));
            } else if (
               inPlaylistPage &&
               playingPlaylist.id !== currentPlaylist.id
            ) {
               // in case current playlist not playing playlist even tho trigger song is in both current and playing
               // trigger new playlist
               dispatch(updateRecentPlaylist(currentPlaylist.id));
               dispatch(updateCurrentToPlaying(info));
            } else if (playingPlaylist.songs.find((s) => s.id === info.id)) {
               dispatch(updateQueue(info));
            }
         } else {
            if (currentPlaylist?.songs.includes(info.id)) {
               // trigger new playlist
               dispatch(updateRecentPlaylist(currentPlaylist.id));
               dispatch(updateCurrentToPlaying(info));
            } else {
               // trigger not from the playlist. treat as a single track
               dispatch(emtpyPlayingPlaylist());
               dispatch(initQueue([info]));
            }
         }
      }
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
         className={`w-full px-3 py-2  border-hover-1 grid grid-cols-12 relative rounded-md group
                         ${current ? "bg-hover-1" : "hover:bg-hover-1"} 
                         ${playlistMode ? "border-b" : ""}
                         ${
                            fade && !current
                               ? "opacity-50 hover:opacity-100"
                               : ""
                         }`}
      >
         <div className={`${playlistMode ? "col-span-6" : "col-span-10"}`}>
            <SongInfo info={info} onClick={playSong} size={size} />

            <button
               className={`items-center justify-center bg-overlay-3 rounded-md absolute top-2 left-3 group-hover:flex 
               ${current ? "flex" : "hidden"} 
               ${thumbnailSizes[size]}`}
               onClick={playSong}
            >
               {playingSong?.playing && current ? (
                  <FaPause className="text-base text-white" />
               ) : (
                  <FaPlay className="text-base text-white" />
               )}
            </button>
         </div>

         {playlistMode && (
            <p className="flex items-center col-span-5 text-xs cursor-pointer text-secondary hover:text-teal-500 hover:underline">
               {info.album}
            </p>
         )}
         <div className="flex items-center justify-end">
            {playlistMode && (
               <p className="flex items-center justify-end col-span-1 text-xs text-right text-secondary group-hover:opacity-0">
                  {info.time}
               </p>
            )}
            {options && (
               <div className="absolute hidden -translate-y-1/2 top-1/2 right-3 group-hover:block">
                  <SongOptions
                     songInfo={info}
                     like={like}
                     addPlaylist={addPlaylist}
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default SongItem;
