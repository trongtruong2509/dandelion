import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Player from "./Player";
import SongOptions from "../Song/SongOptions";

const Playbar = () => {
   const currentSong = useSelector((state) => state.playing.value)?.info;

   return (
      <div
         className="bg-player py-3 px-5 border-t border-secondary
                        w-full h-[90px]
                        text-white z-[600]"
      >
         <div className="relative h-full flex-btw">
            <div className="gap-3 flex-center">
               <div className="flex items-center gap-3 text-white">
                  <div>
                     <img
                        src={currentSong?.thumbnail}
                        alt={currentSong?.title}
                        className="object-cover w-16 h-16 rounded-md"
                     />
                  </div>
                  <div className="max-w-[240px]">
                     <h1 className="text-sm font-semibold truncate text-player">
                        {currentSong?.title}
                     </h1>
                     <p className="text-xs truncate text-secondary">
                        {currentSong?.artistsNames}
                     </p>
                  </div>
               </div>
               <SongOptions songInfo={currentSong} active />
            </div>
            <Player />
         </div>
      </div>
   );
};

export default Playbar;
