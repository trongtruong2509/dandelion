import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import SongInfo from "../Song/SongInfo";
import SongOptions from "../Song/SongOptions";

import { play, pause, update } from "../Playbar/playingSlice";
import { updateRecentPlay } from "../../Reducers/userSlice";

const SongItem = ({
   info,
   size = "40",
   options = true,
   like = true,
   playlistMode = false,
   addPlaylist = false,
   fade = false,
}) => {
   const playingSong = useSelector((state) => state.playing.value);
   const currentUser = useSelector((state) => state.user.value);
   const dispatch = useDispatch();

   const [current, setCurrent] = useState(false);

   const playSong = () => {
      if (current) {
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      } else {
         dispatch(update({ info, playing: true }));
         dispatch(updateRecentPlay(info));
      }
   };

   useEffect(() => {
      if (playingSong?.info?.id === info.id) {
         setCurrent(true);
      } else {
         setCurrent(false);
      }
   }, [playingSong]);

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
               className={` items-center justify-center bg-overlay-3 rounded-md absolute top-2 left-3 group-hover:flex 
               ${current ? "flex" : "hidden"} 
               w-[${size}px] h-[${size}px]`}
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
