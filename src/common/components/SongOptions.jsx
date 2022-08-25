import React, { forwardRef } from "react";
import { MdFavorite, MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";

import { updateLikeSong } from "../Reducers/userSlice";

const SongOptions = ({ songInfo, simple = false }) => {
   const currentUser = useSelector((state) => state.user.value);
   const dispatch = useDispatch();

   return (
      <div className="flex items-center justify-center text-lg gap-2 text-white">
         {!simple && (
            <div
               className="cursor-pointer flex items-center justify-center
                  p-2 rounded-full hover:bg-hover-1 w-10 h-10"
               onClick={() => dispatch(updateLikeSong(songInfo))}
            >
               {currentUser?.likedSongs.indexOf(songInfo) === -1 ? (
                  <MdFavoriteBorder className={`text-lg`} />
               ) : (
                  <MdFavorite className="text-lg text-primary" />
               )}
            </div>
         )}

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
