import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./playingSlice";

import Player from "./Player";
import SongInfo from "../SongInfo";
import SongOptions from "../SongOptions";

import sample from "./../../../assets/sampleImage.png";

const Playbar = () => {
   const currentSong = useSelector((state) => state.playing.value);

   return (
      <div
         className="bg-dark-3 py-3 px-5  
                        w-full h-[96px] fixed bottom-0 left-0
                        text-white"
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
                  <div>
                     <h1 className="text-sm">{currentSong?.title}</h1>
                     <p className="text-xs text-secondary">
                        {currentSong?.artists}
                     </p>
                  </div>
               </div>
               {/* <SongInfo info={currentSong} size_medium={true} /> */}
               <SongOptions />
            </div>
            <Player src={currentSong?.audio} />
         </div>
      </div>
   );
};

export default Playbar;
