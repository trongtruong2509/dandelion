import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { IoAddOutline, IoEllipsisHorizontalSharp, IoTrashOutline } from "react-icons/io5";
import { MdFavorite, MdFavoriteBorder, MdOutlinePlaylistAdd } from "react-icons/md";

import { updateLikeSong } from "../../slices/userSlice";
import Login from "../Header/Login";
import SongMenu from "../Popers/SongMenu";

const SongOptions = ({
   songInfo,
   size,
   like = true,
   addPlaylist = false,
   addPlayQueue = false,
   onAdd,
   onAddPlayQueue,
   canDetele = false,
   activeLike = false,
   disableLike = false,
   activeDots = false,
   onDelete,
}) => {
   const dispatch = useDispatch();
   const currentUser = useSelector((state) => state.user.user);

   const notLiked =
      !currentUser || currentUser?.likedSongs.findIndex((t) => t.id === songInfo?.id) === -1;
   const dotSize = size === "10" ? "w-8 h-8 p-[6px]" : "w-10 h-10 p-2";

   return (
      <div className="gap-1 text-lg text-primary flex-center group">
         {like && (
            <div
               className={`items-center justify-center rounded-full cursor-pointer hover:bg-alpha 
               ${dotSize}
               ${
                  activeLike
                     ? "flex"
                     : disableLike
                     ? "hidden group-hover:flex"
                     : notLiked
                     ? "hidden group-hover:flex"
                     : "flex"
               }`}
            >
               {currentUser ? (
                  <div
                     onClick={(e) => {
                        dispatch(updateLikeSong(songInfo));
                        e.stopPropagation();
                     }}
                  >
                     {notLiked ? (
                        <MdFavoriteBorder className={`text-lg hover:text-dandelion-primary`} />
                     ) : (
                        <MdFavorite className="text-lg text-dandelion-primary" />
                     )}
                  </div>
               ) : (
                  <Login
                     children={
                        <MdFavoriteBorder className={`text-lg hover:text-dandelion-primary`} />
                     }
                  />
               )}
            </div>
         )}

         {canDetele && (
            <button
               className="w-10 h-10 p-2 rounded-full opacity-0 cursor-pointer flex-center hover:bg-alpha group-hover:opacity-100"
               onClick={() => onDelete(songInfo)}
            >
               <IoTrashOutline className="text-xl" />
            </button>
         )}

         {addPlaylist && (
            <button
               className="w-10 h-10 p-2 rounded-full opacity-0 ursor-pointer flex-center hover:bg-alpha group-hover:opacity-100"
               onClick={() => onAdd(songInfo)}
            >
               <IoAddOutline className="text-2xl" />
            </button>
         )}
         {addPlayQueue && (
            <button
               className="w-8 h-8 p-[6px] rounded-full opacity-100 cursor-pointer flex-center hover:bg-alpha text-secondary hover:text-primary"
               onClick={() => onAddPlayQueue(songInfo)}
            >
               <MdOutlinePlaylistAdd className="text-2xl" />
            </button>
         )}
         {!addPlaylist && (
            <SongMenu info={songInfo}>
               <div
                  className={`rounded-full text-primary hover:text-primary cursor-pointer flex-center hover:bg-alpha 
                  ${dotSize}
                  ${activeDots ? "" : "group-hover:opacity-100 opacity-0"}`}
                  onClick={(e) => e.stopPropagation()}
               >
                  <IoEllipsisHorizontalSharp />
               </div>
            </SongMenu>
         )}
      </div>
   );
};

export default SongOptions;
