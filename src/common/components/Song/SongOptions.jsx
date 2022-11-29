import React, { forwardRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
   IoAddOutline,
   IoEllipsisHorizontalOutline,
   IoEllipsisHorizontalSharp,
   IoTrashOutline,
} from "react-icons/io5";
import { MdFavorite, MdFavoriteBorder, MdMoreHoriz, MdOutlinePlaylistAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
// import Tippy from "@tippyjs/react";

import { updateLikeSong, updateUser } from "../../slices/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import SongMenu from "../Popers/SongMenu";

const SongOptions = ({
   songInfo,
   like = true,
   inPlaylistPage = false,
   addPlaylist = false,
   addPlayQueue = false,
   onAdd,
   onAddPlayQueue,
   canDetele = false,
   activeLike = false,
   activeDots = false,
   onDelete,
}) => {
   const currentUser = useSelector((state) => state.user.user);
   const dispatch = useDispatch();

   const handleLogin = async () => {
      const user = await loginGoogle();
      const userDb = await getUserDb(user.email);

      if (userDb) {
         dispatch(updateUser(userDb));
      } else {
         dispatch(
            updateUser({
               id: user.email,
               name: user.displayName,
               avatar: user.photoURL,
               phone: user.phoneNumber,
               uploaded: [],
               likedSongs: [],
               createdPlaylist: [],
               recentPlayed: [],
               likedPlaylists: [],
               likedAlbums: [],
            })
         );
      }
   };

   const notLiked =
      !currentUser || currentUser?.likedSongs.findIndex((t) => t.id === songInfo?.id) === -1;

   return (
      <div className="gap-1 text-lg text-primary flex-center group">
         {like && (
            <div
               className={`items-center justify-center w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-alpha ${
                  activeLike ? "flex" : notLiked ? "hidden group-hover:flex" : "flex"
               }`}
               onClick={() => (currentUser ? dispatch(updateLikeSong(songInfo)) : handleLogin())}
            >
               {notLiked ? (
                  <MdFavoriteBorder className={`text-lg hover:text-dandelion-primary`} />
               ) : (
                  <MdFavorite className="text-lg text-dandelion-primary" />
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
               className="w-10 h-10 p-2 rounded-full opacity-100 cursor-pointer flex-center hover:bg-alpha"
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
                  className={`rounded-full text-primary hover:text-primary cursor-pointer flex-center hover:bg-alpha ${
                     activeDots
                        ? "w-8 h-8 p-[6px]"
                        : "group-hover:opacity-100 opacity-0 w-10 h-10 p-2"
                  }`}
               >
                  <IoEllipsisHorizontalSharp className="" />
               </div>
            </SongMenu>
         )}
      </div>
   );
};

export default SongOptions;
