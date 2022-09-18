import React from "react";
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRecentPlaylist } from "../../Reducers/userSlice";
import {
   updateCurrentPlaylist,
   updatePlayingPlaylist,
   fetchPlayingPlaylist,
} from "../../Reducers/playlistSlice";

const PlaylistCover = ({ playlist, sm = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const playingPlaylist = useSelector((state) => state.playlist.playing);

   const onNavigate = () => {
      dispatch(updateCurrentPlaylist(playlist));
      navigate(playlist.link);
   };

   const onPlay = () => {
      onNavigate();

      console.log("[onPlay playlist]", playlist);

      if (playingPlaylist?.value?.id !== playlist.id) {
         console.log("[playingPlaylist?.value?.id]");

         dispatch(fetchPlayingPlaylist(playlist));
         dispatch(updateRecentPlaylist(playlist.id));
      }
   };

   return (
      <div className={`h-auto text-white ${sm ? "w-40" : "w-56"}`}>
         <div
            className={`w-full group relative overflow-hidden cursor-pointer ${
               sm ? "h-40" : "h-56"
            }`}
            onClick={onNavigate}
         >
            <img
               src={playlist?.thumbnail}
               alt={playlist?.title}
               className="object-cover w-full h-full transition-all duration-500 ease-out rounded-md group-hover:scale-105"
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
         <div className="w-full text-sm">
            <div className="w-full gap-2 mt-2 flex-btw">
               <h1 className="w-40 truncate">{playlist?.title}</h1>
               {!sm && (
                  <p className="text-secondary">
                     {playlist?.songs.length} tracks
                  </p>
               )}
            </div>
            <p className="mt-1 text-xs text-secondary">{playlist?.createdBy}</p>
         </div>
      </div>
   );
};

export default PlaylistCover;
