import React from "react";
import { MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";

const SongOptions = () => {
   return (
      <div>
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

export default SongOptions;
