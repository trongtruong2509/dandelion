import React, { useEffect } from "react";
import { MdEast, MdSearch, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";

import defaultAvatar from "./../../../assets/default_avatar.png";
// import { addNewDoc } from "../../utils/firebaseApi";
import { updateUser, removeUser } from "../../Reducers/userSlice";
import { getUserDb } from "../../utils/user";

// import { updateUser, getUserLocal } from "../../utils/user";

// import { playlists } from "../../../tempData/playlists";

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

   const provider = new GoogleAuthProvider();
   const auth = getAuth();

   const login = async () => {
      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user;

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
      } catch (error) {
         // Handle Errors here.
         // const errorCode = error.code;
         // const errorMessage = error.message;
         // The email of the user's account used.
         // const email = error.customData.email;
         // The AuthCredential type that was used.
         // const credential = GoogleAuthProvider.credentialFromError(error);
         // ...
         console.log("errorrrrrrrrrrrr");
      }
   };

   const logout = () => {
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
            <div className="w-96 relative">
               <input
                  type="text"
                  className="w-full py-2 rounded-3xl outline-none bg-hover-1 pl-10 text-sm text-white"
                  placeholder="Search for song, artist, album..."
               />
               <MdSearch className="absolute top-2 left-3 text-2xl text-white opacity-50" />
            </div>
         </div>
         <div className="flex gap-3 justify-center items-center">
            <Link
               className="w-10 h-10 rounded-full bg-hover-1 flex text-white justify-center items-center cursor-pointer"
               to="/upload"
            >
               <MdUpload className="text-xl" />
            </Link>
            <div className="w-10 h-10 rounded-full bg-hover-1 flex text-white justify-center items-center">
               <MdSettings className="text-xl" />
            </div>
            <div onClick={user ? logout : login}>
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
