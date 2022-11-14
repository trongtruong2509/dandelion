import React, { forwardRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdFavorite, MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
// import Tippy from "@tippyjs/react";

import { updateLikeSong, updateUser } from "../../slices/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import SongMenu from "../Popers/SongMenu";

const SongOptions = ({ songInfo, like = true, addPlaylist = false }) => {
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

   return (
      <div className="gap-2 text-lg text-primary flex-center">
         {like && (
            <div
               className="w-10 h-10 p-2 rounded-full cursor-pointer flex-center hover:bg-hover-1"
               onClick={() =>
                  currentUser
                     ? dispatch(updateLikeSong(songInfo))
                     : handleLogin()
               }
            >
               {!currentUser ||
               currentUser?.likedSongs.findIndex(
                  (t) => t.id === songInfo?.id
               ) === -1 ? (
                  <MdFavoriteBorder
                     className={`text-lg hover:text-dandelion-primary`}
                  />
               ) : (
                  <MdFavorite className="text-lg text-dandelion-primary" />
               )}
            </div>
         )}

         <SongMenu info={songInfo}>
            <div className="w-10 h-10 p-2 rounded-full cursor-pointer flex-center hover:bg-dark-alpha-10">
               <HiOutlineDotsHorizontal className="text-xl" />
            </div>
         </SongMenu>
      </div>
   );
};

export default SongOptions;
