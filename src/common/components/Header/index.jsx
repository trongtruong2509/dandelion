import React, { useEffect } from "react";
import { MdEast, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import defaultAvatar from "./../../../assets/default_avatar.png";
import { updateUser, removeUser } from "../../Reducers/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import Search from "./Search";
import axios from "axios";

const Header = () => {
   const user = useSelector((state) => state.user.value);
   const dispatch = useDispatch();

   useEffect(() => {
      if (user) {
         getUserDb(user.id)
            .then((userInfo) => {
               if (userInfo) {
                  dispatch(updateUser(userInfo));
               }
            })
            .catch((err) => {
               console.log("error while get user from db");
               console.log(err);
            });
      } else {
         console.log("no current user loggin before");
      }
   }, []);

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

   const handleLogout = () => {
      console.log("logging out...");
      dispatch(removeUser());
   };

   return (
      <div className="flex items-center justify-between w-full py-4 bg-dark-4">
         <div className="flex items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-4">
               <button>
                  <MdWest className="text-2xl text-white" />
               </button>
               <button>
                  <MdEast className="text-2xl text-white opacity-50" />
               </button>
            </div>
            <Search />
         </div>
         <div className="flex items-center justify-center gap-3">
            <Link
               className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-hover-1"
               to="/upload"
            >
               <MdUpload className="text-xl" />
            </Link>
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-hover-1">
               <MdSettings className="text-xl" />
            </div>
            <div
               className="cursor-pointer"
               onClick={user ? handleLogout : handleLogin}
            >
               <img
                  src={user?.avatar ? user.avatar : defaultAvatar}
                  alt="Avatar"
                  className="object-cover w-10 h-10 rounded-full"
               />
            </div>
         </div>
      </div>
   );
};

export default Header;
