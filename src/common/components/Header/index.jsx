import React, { useCallback, useEffect, useState } from "react";
import { MdEast, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { RiPaintFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import defaultAvatar from "./../../../assets/default.jpg";
import { updateUser, removeUser } from "../../slices/userSlice";
import { getUserDb, loginGoogle } from "../../utils/user";
import Search from "./Search";
import ThemeModal from "../Modal/ThemeModal";
import {
   IoCloudUploadOutline,
   IoColorPaletteOutline,
   IoSettingsOutline,
} from "react-icons/io5";
import Login from "./Login";

const Header = ({ active }) => {
   const user = useSelector((state) => state.user.user);
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
      }
   }, []);

   const handleLogout = () => {
      console.log("logging out...");
      dispatch(removeUser());
   };

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
               <IoColorPaletteOutline className="text-xl" />
            </div>
            <Link
               className="w-10 h-10 rounded-full cursor-pointer text-primary flex-center bg-alpha hover:text-dandelion-primary"
               to="/upload"
            >
               <IoCloudUploadOutline className="text-xl" />
            </Link>
            <div
               className="w-10 h-10 rounded-full cursor-pointer text-primary flex-center bg-alpha hover:text-dandelion-primary"
               // onClick={handleSettings}
            >
               <IoSettingsOutline className="text-xl" />
            </div>
            <div className="cursor-pointer">
               {user ? (
                  <img
                     src={user?.avatar ? user.avatar : defaultAvatar}
                     alt="Avatar"
                     onClick={handleLogout}
                     className="object-cover w-10 h-10 rounded-full"
                  />
               ) : (
                  <Login
                     children={
                        <img
                           src={defaultAvatar}
                           alt="Avatar"
                           className="object-cover w-10 h-10 rounded-full"
                        />
                     }
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
