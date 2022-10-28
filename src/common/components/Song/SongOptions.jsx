import React, { forwardRef } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdFavorite, MdFavoriteBorder, MdMoreHoriz } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
// import Tippy from "@tippyjs/react";

import { updateLikeSong, updateUser } from "../../Reducers/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import SongMenu from "../Popers/SongMenu";

const SongOptions = ({
   songInfo,
   like = true,
   addPlaylist = false,
   canDetele = false,
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

   return (
      <div className="flex items-center justify-center gap-2 text-lg text-white">
         {like && (
            <div
               className="flex items-center justify-center w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-hover-1"
               // onClick={() =>
               //    currentUser
               //       ? dispatch(updateLikeSong(songInfo))
               //       : handleLogin()
               // }
            >
               {/* {!currentUser ||
               currentUser?.likedSongs.indexOf(songInfo) === -1 ? (
                  <MdFavoriteBorder className={`text-lg`} />
               ) : (
                  <MdFavorite className="text-lg text-primary" />
               )} */}
            </div>
         )}

         <SongMenu info={songInfo} canDetele={canDetele}>
            <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-hover-1">
               <HiOutlineDotsHorizontal className="text-xl" />
            </div>
         </SongMenu>
      </div>
   );
};

export default SongOptions;
