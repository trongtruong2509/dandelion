import React, { useEffect } from "react";
import { MdEast, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import defaultAvatar from "./../../../assets/default_avatar.png";
import { updateUser, removeUser } from "../../Reducers/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import Search from "./Search";

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
      <div className="w-full bg-dark-4 flex justify-between items-center py-4">
         <div className="flex gap-8 justify-center items-center">
            <div className="flex gap-4 justify-center items-center">
               <button>
                  <MdWest className="text-white text-2xl" />
               </button>
               <button>
                  <MdEast className="text-white text-2xl opacity-50" />
               </button>
            </div>
            <Search />
         </div>
         <div className="flex gap-3 justify-center items-center">
            <Link
               className="w-10 h-10 rounded-full bg-hover-1 flex text-white justify-center items-center cursor-pointer"
               to="/upload"
            >
               <MdUpload className="text-xl" />
            </Link>
            <div className="w-10 h-10 rounded-full bg-hover-1 flex text-white justify-center items-center cursor-pointer">
               <MdSettings className="text-xl" />
            </div>
            <div
               className="cursor-pointer"
               onClick={user ? handleLogout : handleLogin}
            >
               <img
                  src={user?.avatar ? user.avatar : defaultAvatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
               />
            </div>
         </div>
      </div>
   );
};

export default Header;
