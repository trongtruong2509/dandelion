import React, { useCallback, useEffect, useState } from "react";
import { MdEast, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import defaultAvatar from "./../../../assets/default_avatar.png";
import { updateUser, removeUser } from "../../slices/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import Search from "./Search";
import ThemeModal from "../Modal/ThemeModal";

const Header = ({ active }) => {
   const user = useSelector((state) => state.user.value);
   const dispatch = useDispatch();

   const [isDefault, setIsDefault] = useState(false);
   const [show, setShow] = useState(false);

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

   // const handleScroll = useCallback(
   //    (e) => {
   //       const window = e.currentTarget;
   //       console.log("[setActive]");

   //       if (y < Threshold) {
   //          console.log("[setActive]", y);
   //          setActive(true);
   //       } else {
   //          console.log("[setActive]", y);
   //          setActive(false);
   //       }

   //       setY(window.scrollY);
   //    },
   //    [y]
   // );

   // useEffect(() => {
   //    setY(window.scrollY);
   //    window.addEventListener("scroll", (e) => handleScroll(e));

   //    return () => {
   //       // return a cleanup function to unregister our function since its gonna run multiple times
   //       window.removeEventListener("scroll", (e) => handleScroll(e));
   //    };
   // }, [handleScroll]);

   return (
      <div
         className={`w-full px-12 py-4 flex-btw ${
            active ? "shadow-md bg-layout" : "bg-transparent"
         }`}
      >
         <ThemeModal show={show} onClose={() => setShow(false)} />

         <div className="gap-8 flex-center">
            <div className="gap-4 flex-center">
               <button>
                  <MdWest className="text-2xl text-primary" />
               </button>
               <button>
                  <MdEast className="text-2xl opacity-50 text-primary" />
               </button>
            </div>
            <Search />
         </div>
         <div className="gap-3 flex-center">
            <div
               className="w-10 h-10 rounded-full cursor-pointer text-primary flex-center bg-alpha hover:text-dandelion-primary"
               onClick={() => setShow(true)}
            >
               <RiPaintFill className="text-xl" />
            </div>
            <Link
               className="w-10 h-10 rounded-full cursor-pointer text-primary flex-center bg-alpha"
               to="/upload"
            >
               <MdUpload className="text-xl" />
            </Link>
            <div
               className="w-10 h-10 rounded-full cursor-pointer text-primary flex-center bg-alpha"
               // onClick={handleSettings}
            >
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
