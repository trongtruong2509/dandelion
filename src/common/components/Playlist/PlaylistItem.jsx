import React, { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import SongInfo from "../SongInfo";
import SongOptions from "./../SongOptions";

import { play, pause, update } from "../Playbar/playingSlice";
// import currentUser from "../../Reducers/userSlice";

const PlaylistItem = ({ info, simple = false }) => {
   const playingSong = useSelector((state) => state.playing.value);
   // const currentUser = useSelector((state) => state.user.value);
   const dispatch = useDispatch();

   const [current, setCurrent] = useState(false);

   const playSong = () => {
      if (current) {
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
         className={`w-full px-3 py-2  border-hover-1 grid grid-cols-12 relative rounded-md group
                         ${current ? "bg-hover-1" : "hover:bg-hover-1"} 
                         ${simple ? "" : "border-b"}`}
      >
         <div className={`${simple ? "col-span-10" : "col-span-6"}`}>
            <SongInfo info={info} onClick={playSong} medium={simple} />
            <button
               className={` items-center justify-center bg-overlay-3 rounded-md 
               absolute top-2 left-3 group-hover:flex 
               ${current ? "flex" : "hidden"} 
               ${simple ? "w-[60px] h-[60px]" : "w-10 h-10"}`}
               onClick={playSong}
            >
               {current && playingSong?.playing ? (
                  <FaPause className="text-base text-white" />
               ) : (
                  <FaPlay className="text-base text-white" />
               )}
            </button>
         </div>
         {!simple && (
            <p className="text-xs text-secondary hover:text-teal-500 cursor-pointer hover:underline col-span-5 flex items-center">
               {info.album}
            </p>
         )}
         <div className="flex items-center justify-end">
            {!simple && (
               <p
                  className="text-xs text-secondary col-span-1 text-right flex items-center justify-end
                              group-hover:opacity-0"
               >
                  {info.time}
               </p>
            )}
            <div className="absolute top-1/2 -translate-y-1/2 right-3 hidden group-hover:block">
               <SongOptions songInfo={info} simple={simple} />
            </div>
         </div>
      </div>
   );
};

export default PlaylistItem;
