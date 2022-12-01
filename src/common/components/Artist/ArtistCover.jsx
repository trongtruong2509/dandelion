import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FaPlay } from "react-icons/fa";

import { updateCurrentPlaylist } from "../../slices/playlistSlice";

import DefaultThumbnail from "../../../assets/album_default.png";
import { adminPaths } from "../../../app/routes";

const ArtistCover = ({ info, size = "md", admin = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onNavigate = () => {
      if (admin) {
         navigate(adminPaths.playlistDetail.replace(":id", info.id));
      } else {
         dispatch(updateCurrentPlaylist(info));
         navigate(info.link);
      }
   };

   const onPlay = () => {
      // onNavigate();
      // if (playingPlaylist?.value?.id !== info?.id) {
      //    dispatch(updateRecentPlaylist(info?.id));
      //    dispatch(updatePlayingPlaylist(info));
      // }
   };

   const thumbnailSizes = {
      sm: "w-40 h-40",
      md: "w-52 h-52",
      lg: "w-[300px] h-[300px]",
   };

   const widthSize = {
      sm: "w-40",
      md: "w-52",
      lg: "w-[300px]",
   };

   return (
      <div className={`h-auto text-white ${widthSize[size]}`}>
         <div
            className={`group relative overflow-hidden rounded-full cursor-pointer ${thumbnailSizes[size]} z-10`}
            onClick={onNavigate}
         >
            <img
               src={info?.thumbnail ? info?.thumbnail : DefaultThumbnail}
               alt={info?.name}
               className="z-10 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 z-50 items-center justify-center hidden w-full h-full text-primary group-hover:flex bg-dark-alpha-50">
               <div
                  className="gap-6 flex-center"
                  onClick={(e) => e.stopPropagation()}
               >
                  <button
                     className="text-white hover:text-dandelion-primary"
                     onClick={onPlay}
                  >
                     <FaPlay className="text-3xl cursor-pointer" />
                  </button>
               </div>
            </div>
         </div>
         <div className="w-full mt-3 text-center">
            <Link
               className="w-full font-semibold truncate text-primary hover:text-dandelion-primary"
               to={info?.link}
            >
               {info?.name}
            </Link>
         </div>
      </div>
   );
};

export default ArtistCover;
