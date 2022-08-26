import React, { forwardRef } from "react";
import { MdFavorite, MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
// import Tippy from "@tippyjs/react";

import { updateLikeSong, updateUser } from "../Reducers/userSlice";
import { getUserDb, loginGoogle } from "../utils/user";

const SongOptions = ({ songInfo, simple = false }) => {
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
      <div className="flex items-center justify-center text-lg gap-2 text-white">
         {!simple && (
            <div
               className="cursor-pointer flex items-center justify-center
                  p-2 rounded-full hover:bg-hover-1 w-10 h-10"
               onClick={() =>
                  currentUser
                     ? dispatch(updateLikeSong(songInfo))
                     : handleLogin()
               }
            >
               {!currentUser ||
               currentUser?.likedSongs.indexOf(songInfo) === -1 ? (
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
