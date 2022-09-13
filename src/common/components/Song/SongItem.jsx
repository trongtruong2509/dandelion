import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import SongInfo from "../Song/SongInfo";
import SongOptions from "../Song/SongOptions";

import { play, pause, update } from "../Playbar/playingSlice";
import {
   updateRecentPlay,
   updateRecentPlaylist,
} from "../../Reducers/userSlice";
import { updateQueue } from "../../Reducers/playQueueSlice";
import { fetchPlayingPlaylist } from "../../Reducers/playlistSlice";

const SongItem = ({
   info,
   size = "10",
   options = true,
   like = true,
   playlistMode = false,
   addPlaylist = false,
   fade = false,
}) => {
   const dispatch = useDispatch();

   const playingSong = useSelector((state) => state.playing.value);
   const currentUser = useSelector((state) => state.user.value);
   const playingPlaylist = useSelector((state) => state.playlist.playing.value);
   const currentPlaylist = useSelector((state) => state.playlist.current);
   const playqueue = useSelector((state) => state.playqueue);

   const [current, setCurrent] = useState(false);

   useEffect(() => {
      if (playingSong?.info?.id === info.id) {
         setCurrent(true);
      } else {
         setCurrent(false);
      }
   }, [playingSong]);

   const playSong = () => {
      if (current) {
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      } else {
         dispatch(update({ info, playing: true }));
         dispatch(updateRecentPlay(info));

         if (!playingPlaylist || playingPlaylist.songs.indexOf(info) === -1) {
            if (currentPlaylist?.songs.includes(info.id)) {
               dispatch(fetchPlayingPlaylist(currentPlaylist));
               dispatch(updateRecentPlaylist(currentPlaylist.id));
            } else {
               // clean play queue
               // clean playing playlist
            }
         } else {
            dispatch(updateQueue(info));
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
               {current && playingSong?.playing ? (
                  <FaPause className="text-base text-white" />
               ) : (
                  <FaPlay className="text-base text-white" />
               )}
            </button>
         </div>

         {playlistMode && (
            <p className="text-xs text-secondary hover:text-teal-500 cursor-pointer hover:underline col-span-5 flex items-center">
               {info.album}
            </p>
         )}
         <div className="flex items-center justify-end">
            {playlistMode && (
               <p className="text-xs text-secondary col-span-1 text-right flex items-center justify-end group-hover:opacity-0">
                  {info.time}
               </p>
            )}
            {options && (
               <div className="absolute top-1/2 -translate-y-1/2 right-3 hidden group-hover:block">
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
