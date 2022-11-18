import React from "react";
import { FaPlay } from "react-icons/fa";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
   IoHeartOutline,
   IoHeart,
   IoCloseOutline,
   IoClose,
} from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePlaylists, updateRecentPlaylist } from "../../slices/userSlice";
import {
   updateCurrentPlaylist,
   updatePlayingPlaylist,
   fetchPlayingPlaylist,
} from "../../slices/playlistSlice";

import DefaultThumbnail from "../../../assets/album_default.png";

const PlaylistCover = ({ info, size = "md", editable = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const playingPlaylist = useSelector((state) => state.playlist.playing);
   const currentUser = useSelector((state) => state.user.user);
   // const playingTrack = useSelector((state) => state.playlist.value);

   const onNavigate = () => {
      dispatch(updateCurrentPlaylist(info));
      navigate(info.link);
   };

   const onPlay = () => {
      onNavigate();

      // console.log("[onPlay playlist]", info);

      if (playingPlaylist?.value?.id !== info?.id) {
         // console.log("[playingPlaylist?.value?.id]");

         dispatch(fetchPlayingPlaylist(info));
         dispatch(updateRecentPlaylist(info?.id));
      }
   };

   const thumbnailSizes = {
      sm: "w-40 h-40",
      md: "w-56 h-56",
      lg: "w-[300px] h-[300px]",
   };

   const widthSize = {
      sm: "w-40",
      md: "w-56",
      lg: "w-[300px]",
   };

   const handleLogin = () => {
      console.log("[TODO] handleLogin");
   };

   // const handleLike = () => {

   //  }

   const likeIcon = () => {
      return (
         <button
            className="w-full h-full rounded-full cursor-pointer hover:bg-hover-tooltip flex-center"
            onClick={() =>
               currentUser ? dispatch(updatePlaylists(info?.id)) : handleLogin()
            }
         >
            {currentUser?.playlists?.find((p) => p === info?.id) ? (
               <IoHeart className="text-2xl text-dandelion-primary" />
            ) : (
               <IoHeartOutline className="text-2xl text-white hover:text-dandelion-primary" />
            )}
         </button>
      );
   };

   const displayIcon = () => {
      if (info?.createdBy === currentUser?.id) {
         return (
            editable && (
               <button
                  className="w-10 h-10 rounded-full cursor-pointer flex-center hover:bg-hover-tooltip"
                  onClick={() => dispatch(updatePlaylists(info.id))}
               >
                  <IoClose className="text-3xl text-white" />
               </button>
            )
         );
      } else {
         return likeIcon();
      }
   };

   return (
      <div className={`h-auto text-white ${widthSize[size]}`}>
         <div
            className={`group relative overflow-hidden rounded-md cursor-pointer ${thumbnailSizes[size]} z-10`}
            onClick={onNavigate}
         >
            <img
               src={info?.thumbnail ? info?.thumbnail : DefaultThumbnail}
               alt={info?.title}
               className="z-10 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 z-50 items-center justify-center hidden w-full h-full text-primary group-hover:flex bg-dark-alpha-50">
               <div
                  className="gap-6 flex-center"
                  onClick={(e) => e.stopPropagation()}
               >
                  <div className="w-10 h-10 ">{displayIcon()}</div>

                  <button
                     className="text-white hover:text-dandelion-primary"
                     onClick={onPlay}
                  >
                     <FaPlay className="text-3xl cursor-pointer" />
                  </button>

                  <button className="p-2 text-white rounded-full hover:bg-hover-tooltip">
                     <HiOutlineDotsHorizontal className="text-2xl cursor-pointer" />
                  </button>
               </div>
            </div>
         </div>
         <div className="w-full">
            <div className="w-full mt-2 flex-btw">
               <h1 className="w-40 font-semibold truncate text-primary">
                  {info?.title}
               </h1>
               {size == "md" && (
                  <p className="text-sm text-secondary">
                     {info?.songs.length} tracks
                  </p>
               )}
            </div>
            <p className="mt-1 text-xs text-secondary">{info?.user}</p>
         </div>
      </div>
   );
};

export default PlaylistCover;
