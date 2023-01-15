import React, { useEffect, useState } from "react";
import { MdEast, MdWest } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IoCloudUploadOutline, IoColorPaletteOutline, IoSettingsOutline } from "react-icons/io5";

import { updateUser, removeUser, fetchUserPlaylist } from "../../slices/userSlice";
import { getUserDb } from "../../utils/user";

import defaultAvatar from "./../../../assets/default.jpg";
import Search from "./Search";
import ThemeModal from "../Modal/ThemeModal";
import ConfirmModal from "../Modal/ConfirmModal";
import Login from "./Login";
import { paths } from "../../../app/routes";
import { getTheme } from "../../utils/localStorage";

const Header = ({ active }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const history = window.history;
   const location = useLocation();
   const user = useSelector((state) => state.user.user);

   const [show, setShow] = useState(false);
   const [confirmShow, setConfirmShow] = useState(false);

   useEffect(() => {
      const localTheme = getTheme();
      if (!localTheme) {
         setShow(true);
      }

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

   useEffect(() => {
      if (user) {
         dispatch(fetchUserPlaylist(user));
      }
   }, [user?.playlists]);

   const handleLogout = () => {
      setConfirmShow(false);
      dispatch(removeUser());

      if (location.pathname === paths.mymusic) {
         navigate(paths.home);
      }
   };

   const handleBack = () => {
      history.back();
   };

   const handleNext = () => {
      history.forward();
   };

   return (
      <div className={`w-full px-12 py-4 flex-btw ${active ? "shadow-md bg-layout" : "bg-transparent"}`}>
         <ThemeModal show={show} onClose={() => setShow(false)} />

         <ConfirmModal
            show={confirmShow}
            onClose={() => setConfirmShow(false)}
            modalTitle="Confirm"
            content="Do you want to log out?"
            onOK={handleLogout}
         />

         <div className="gap-8 flex-center">
            <div className="gap-4 flex-center">
               <button>
                  <MdWest className="text-2xl text-primary" onClick={handleBack} />
               </button>
               <button>
                  <MdEast className="text-2xl text-primary" onClick={handleNext} />
               </button>
            </div>
            <Search />
         </div>
         <div className="gap-3 text-xl flex-center text-primary">
            <div
               className="w-10 h-10 rounded-full cursor-pointer flex-center bg-alpha hover:text-dandelion"
               onClick={() => setShow(true)}
            >
               <IoColorPaletteOutline />
            </div>
            <Link
               className="w-10 h-10 rounded-full cursor-pointer flex-center bg-alpha hover:text-dandelion"
               to="/upload"
            >
               <IoCloudUploadOutline />
            </Link>
            <div
               className="w-10 h-10 rounded-full cursor-pointer flex-center bg-alpha hover:text-dandelion"
               // onClick={handleSettings}
            >
               <IoSettingsOutline />
            </div>
            <div className="cursor-pointer">
               {user ? (
                  <img
                     src={user?.avatar ? user.avatar : defaultAvatar}
                     alt={user?.name}
                     onClick={() => setConfirmShow(true)}
                     className="object-cover w-10 h-10 rounded-full"
                  />
               ) : (
                  <Login
                     children={<img src={defaultAvatar} alt="Avatar" className="object-cover w-10 h-10 rounded-full" />}
                  />
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
