import React, { useEffect, useState } from "react";
import { MdEast, MdSearch, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { Link } from "react-router-dom";
// import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import defaultAvatar from "./../../../assets/default_avatar.png";
import { addNewDoc } from "../../utils/firebaseApi";
import { updateUserToDb } from "../../utils/user";

const Header = () => {
   const [userAvatar, setUserAvatar] = useState(defaultAvatar);
   const [user, setUser] = useState(null);

   useEffect(() => {
      if (user) {
         setUserAvatar(user.photoURL);
         updateUserToDb(user);
      } else {
         setUserAvatar(defaultAvatar);
      }
   }, [user]);

   const provider = new GoogleAuthProvider();
   const auth = getAuth();

   const login = () => {
      signInWithPopup(auth, provider)
         .then((result) => {
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            setUser(user);
            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log("errorrrrrrrrrrrr");
         });
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
            <div onClick={login}>
               <img
                  src={userAvatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
               />
            </div>
         </div>
      </div>
   );
};

export default Header;
