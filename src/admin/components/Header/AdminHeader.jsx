import React, { useEffect, useState } from "react";
import { MdEast, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { GiCloudUpload } from "react-icons/gi";
import { FiUploadCloud } from "react-icons/fi";
import { FaUpload } from "react-icons/fa";

import { adminPaths } from "../../../app/routes";
import UploadSingleModal from "../Modals/UploadSingleModal";
import { getArtistInfo } from "../Upload/uploadZing";
import UploadMultiModal from "../Modals/UploadMultiModal";
import { updateUser, removeUser } from "../../../common/slices/userSlice";
import { getUserDb, loginGoogle } from "../../../common/utils/user";
import defaultAvatar from "./../../../assets/default.jpg";
import Search from "../../../common/components/Header/Search";
import ThemeModal from "../../../common/components/Modal/ThemeModal";
import { IoColorPaletteOutline } from "react-icons/io5";

const AdminHeader = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector((state) => state.user.value);
   const upload = useSelector((state) => state.upload);

   const [singleShow, setSingleShow] = useState(false);
   const [multiShow, setMultiShow] = useState(false);
   const [themeShow, setThemeShow] = useState(false);

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

   useEffect(() => {
      if (upload?.tracks?.length) {
         navigate(adminPaths.multiUpload.replace(":id", upload?.current.id));
      }
   }, [upload?.tracks]);

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

   const onClickHandle = async () => {
      console.log("[getArtistInfo]", "on click");

      const res = await getArtistInfo("BIGBANG");

      console.log("[getArtistInfo]", res);
   };

   return (
      <div className="flex items-center justify-between w-full py-4 bg-dark-4">
         <ThemeModal show={themeShow} onClose={() => setThemeShow(false)} />

         <UploadSingleModal
            show={singleShow}
            onClose={() => setSingleShow(false)}
         />

         <UploadMultiModal
            show={multiShow}
            onClose={() => setMultiShow(false)}
         />

         <div className="flex items-center justify-center gap-8">
            <div className="flex items-center justify-center gap-4">
               <button>
                  <MdWest className="text-2xl text-primary" />
               </button>
               <button>
                  <MdEast className="text-2xl opacity-50 text-primary" />
               </button>
            </div>
            <Search />
         </div>
         <div className="flex items-center justify-center gap-5">
            <div
               className="w-10 h-10 rounded-full cursor-pointer text-primary flex-center bg-alpha hover:text-dandelion-primary"
               onClick={() => setThemeShow(true)}
            >
               <IoColorPaletteOutline className="text-xl" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-primary bg-alpha">
               <FaUpload className="text-xl" />
            </div>
            <div
               className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-primary bg-alpha"
               onClick={() => setSingleShow(true)}
            >
               <FiUploadCloud className="text-xl" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-primary bg-alpha">
               <GiCloudUpload
                  className="text-xl"
                  onClick={() => setMultiShow(true)}
               />
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

export default AdminHeader;
