import React, { useEffect } from "react";
import { MdEast, MdSettings, MdUpload, MdWest } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import defaultAvatar from "./../../../assets/default_avatar.png";
import { updateUser, removeUser } from "../../../common/Reducers/userSlice";
import { getUserDb, loginGoogle } from "../../../common/utils/user";
import Search from "../../../common/components/Header/Search";
import { FaUpload } from "react-icons/fa";
import { FiUploadCloud } from "react-icons/fi";
import { GiCloudUpload } from "react-icons/gi";
import { useState } from "react";
import UploadSingleModal from "../Modals/UploadSingleModal";
import { getArtistInfo } from "../Upload/uploadZing";
import UploadMultiModal from "../Modals/UploadMultiModal";
import { adminPaths } from "../../../app/routes";

const AdminHeader = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector((state) => state.user.value);
   const upload = useSelector((state) => state.upload);

   const [singleShow, setSingleShow] = useState(false);
   const [multiShow, setMultiShow] = useState(false);

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
                  <MdWest className="text-2xl text-white" />
               </button>
               <button>
                  <MdEast className="text-2xl text-white opacity-50" />
               </button>
            </div>
            <Search />
         </div>
         <div className="flex items-center justify-center gap-5">
            {/* <Link
               className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-hover-1"
               to="/upload"
            >
               <MdUpload className="text-xl" />
            </Link> */}
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-hover-1">
               <FaUpload className="text-xl" />
            </div>
            <div
               className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-hover-1"
               onClick={() => setSingleShow(true)}
            >
               <FiUploadCloud className="text-xl" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 text-white rounded-full cursor-pointer bg-hover-1">
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
