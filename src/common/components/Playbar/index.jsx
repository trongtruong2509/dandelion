import React, { useState } from "react";
import { useSelector } from "react-redux";
// import { update } from "./playingSlice";

import Player from "./Player";
import SongOptions from "../SongOptions";
import PlaybarOptions from "./PlaybarOptions";

const Playbar = () => {
   const currentSong = useSelector((state) => state.playing.value)?.info;

   return (
      <div
         className="bg-dark-3 py-3 px-5  
                        w-full h-[90px]
                        text-white z-999"
      >
         <div className="relative flex justify-between items-center h-full drop-shadow-md">
            <div className="flex gap-3 justify-center items-center">
               <div className="flex items-center gap-3 text-white">
                  <div>
                     <img
                        src={currentSong?.thumbnail}
                        alt={currentSong?.title}
                        className="object-cover rounded-md w-16 h-16"
                     />
                  </div>
                  <div className="max-w-[240px]">
                     <h1 className="text-sm truncate">{currentSong?.title}</h1>
                     <p className="text-xs text-secondary truncate">
                        {currentSong?.artistNames}
                     </p>
                  </div>
               </div>
               <SongOptions songInfo={currentSong} />
            </div>
            <Player />
            <PlaybarOptions />
         </div>
      </div>
   );
};

export default Playbar;
