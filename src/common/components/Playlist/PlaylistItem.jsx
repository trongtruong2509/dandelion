import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import { play, pause, update } from "../Playbar/playingSlice";
import SongInfo from "../SongInfo";
import SongOptions from "./../SongOptions";

const PlaylistItem = ({ info }) => {
   const playingSong = useSelector((state) => state.playing.value);
   const dispatch = useDispatch();

   const [current, setCurrent] = useState(false);

   const playSong = () => {
      if (current) {
         console.log("playingSong?.playing");
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      } else {
         dispatch(update({ info, playing: true }));
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
         className={`w-full px-3 py-2 border-b border-hover-1 grid grid-cols-12 relative
                         ${
                            current ? "bg-hover-1" : "hover:bg-hover-1"
                         } rounded-md group`}
      >
         <div className="col-span-6">
            <SongInfo info={info} onClick={playSong} size_medium={false} />
            <button
               className={`w-10 h-10 items-center justify-center bg-overlay-3 rounded-md 
               absolute top-2 left-3 group-hover:flex ${
                  current ? "flex" : "hidden"
               }`}
               onClick={playSong}
            >
               {current && playingSong?.playing ? (
                  <FaPause className="text-base text-white" />
               ) : (
                  <FaPlay className="text-base text-white" />
               )}
            </button>
         </div>
         <p className="text-xs text-secondary hover:text-teal-500 cursor-pointer hover:underline col-span-5 flex items-center">
            {info.album}
         </p>
         <div className="flex items-center justify-end">
            <p
               className="text-xs text-secondary col-span-1 text-right flex items-center justify-end
                              group-hover:opacity-0"
            >
               {info.time}
            </p>
            <div className="absolute top-2 right-3 hidden group-hover:block">
               <SongOptions />
            </div>
         </div>
      </div>
   );
};

export default PlaylistItem;
