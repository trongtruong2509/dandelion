import React from "react";
import { MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";

const SongOptions = () => {
   return (
      <div className="flex items-center justify-center text-lg gap-2 text-white">
         <div
            className="cursor-pointer flex items-center justify-center
                  p-2 rounded-full hover:bg-hover-1 w-10 h-10"
         >
            <MdFavoriteBorder className="text-lg" />
         </div>

         <div
            className="cursor-pointer flex items-center justify-center
                  p-2 rounded-full hover:bg-hover-1 w-10 h-10"
         >
            <MdMoreHoriz className="text-xl" />
         </div>
      </div>
   );
};

export default SongOptions;
