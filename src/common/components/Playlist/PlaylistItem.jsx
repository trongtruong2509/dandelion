import React from "react";
import SongInfo from "../SongInfo";

const PlaylistItem = ({ info, onClick }) => {
   return (
      <div
         className="w-full px-3 py-2 border-b border-hover-1 grid grid-cols-12
                     hover:bg-hover-1 cursor-pointer rounded-md"
      >
         <div className="col-span-6">
            <SongInfo info={info} onClick={onClick} size_medium={false} />
         </div>
         <p className="text-xs text-secondary hover:text-teal-500 cursor-pointer hover:underline col-span-5 flex items-center">
            {info.album}
         </p>
         <p className="text-xs text-secondary col-span-1 text-right flex items-center justify-end">
            {info.time}
         </p>
      </div>
   );
};

export default PlaylistItem;
