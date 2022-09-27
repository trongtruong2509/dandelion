import React from "react";
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRecentPlaylist } from "../../slices/userSlice";
import {
   updateCurrentPlaylist,
   updatePlayingPlaylist,
   fetchPlayingPlaylist,
} from "../../slices/playlistSlice";

const PlaylistCover = ({ info, size = "md", inPlaylist = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const playingPlaylist = useSelector((state) => state.playlist.playing);
   // const playingTrack = useSelector((state) => state.playlist.value);

   const onNavigate = () => {
      dispatch(updateCurrentPlaylist(info));
      navigate(info.link);
   };

   const onPlay = () => {
      onNavigate();

      // console.log("[onPlay playlist]", info);

      if (playingPlaylist?.value?.id !== info.id) {
         // console.log("[playingPlaylist?.value?.id]");

         dispatch(fetchPlayingPlaylist(info));
         dispatch(updateRecentPlaylist(info.id));
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

   return (
      <div className={`h-auto text-white ${widthSize[size]}`}>
         <div
            className={`group relative overflow-hidden rounded-md cursor-pointer ${thumbnailSizes[size]}`}
            onClick={inPlaylist ? onPlay : onNavigate}
         >
            <img
               src={info?.thumbnail}
               alt={info?.title}
               className="object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute top-0 left-0 items-center justify-center hidden w-full h-full gap-6 text-white group-hover:flex bg-overlay-2">
               <button className="p-2 rounded-full hover:bg-hover-2">
                  <MdFavoriteBorder className="text-2xl cursor-pointer" />
               </button>
               <button className="hover:text-primary" onClick={onPlay}>
                  <FaPlay className="text-3xl cursor-pointer" />
               </button>

               <button className="p-2 rounded-full hover:bg-hover-2">
                  <HiOutlineDotsHorizontal className="text-2xl cursor-pointer" />
               </button>
            </div>
         </div>
         <div className="w-full">
            <div className="w-full gap-2 mt-2 flex-btw">
               <h1 className="w-40 truncate">{info?.title}</h1>
               {size == "md" && (
                  <p className="text-sm text-secondary">
                     {info?.songs.length} tracks
                  </p>
               )}
            </div>
            <p className="mt-1 text-xs text-secondary">{info?.createdBy}</p>
         </div>
      </div>
   );
};

export default PlaylistCover;
