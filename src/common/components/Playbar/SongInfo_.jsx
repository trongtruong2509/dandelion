import React from "react";
import { MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";

import sample from "./../../../assets/sampleImage.png";

const SongInfo = ({ info }) => {
   return (
      <div className="flex items-center gap-3">
         <div>
            <img
               src={info.avatar}
               alt={info.name}
               className="w-16 h-16 object-cover rounded-md"
            />
         </div>
         <div>
            <h1 className="text-sm">{info.name}</h1>
            <p className="text-xs text-secondary">{info.singer}</p>
         </div>
         <div className="flex items-center justify-center text-lg">
            <div
               className="cursor-pointer flex items-center justify-center
                           p-2 rounded-full hover:bg-hover-1"
            >
               <MdFavoriteBorder />
            </div>
            <div
               className="cursor-pointer flex items-center justify-center
                           p-2 rounded-full hover:bg-hover-1"
            >
               <MdMoreHoriz />
            </div>
         </div>
      </div>
   );
};

export default SongInfo;
