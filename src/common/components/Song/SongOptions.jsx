import React, { forwardRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdFavorite, MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";
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
}) => {
   const currentUser = useSelector((state) => state.user.value);
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
      !currentUser ||
      currentUser?.likedSongs.findIndex((t) => t.id === songInfo?.id) === -1;

   return (
      <div className="gap-1 text-lg text-primary flex-center group">
         {like && (
            <div
               className={`items-center justify-center w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-alpha group-hover:flex ${
                  notLiked ? "hidden" : "flex"
               }`}
               onClick={() =>
                  currentUser
                     ? dispatch(updateLikeSong(songInfo))
                     : handleLogin()
               }
            >
               {notLiked ? (
                  <MdFavoriteBorder
                     className={`text-lg hover:text-dandelion-primary`}
                  />
               ) : (
                  <MdFavorite className="text-lg text-dandelion-primary" />
               )}
            </div>
         )}

         <SongMenu info={songInfo}>
            <div className="w-10 h-10 p-2 rounded-full opacity-0 cursor-pointer flex-center group-hover:opacity-100 hover:bg-dark-alpha-10">
               <HiOutlineDotsHorizontal className="text-xl" />
            </div>
         </SongMenu>
      </div>
   );
};

export default SongOptions;
