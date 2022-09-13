import React from "react";
import { FaPlay } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateRecentPlaylist } from "../../Reducers/userSlice";

const PlaylistCover = ({ playlist, sm = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onPlay = () => {
      dispatch(updateRecentPlaylist(playlist.id));
      navigate(playlist.link, { replace: true });
   };

   return (
      <div className={`h-auto text-white ${sm ? "w-40" : "w-56"}`}>
         <div
            className={`w-full group relative overflow-hidden ${
               sm ? "h-40" : "h-56"
            }`}
         >
            <img
               src={playlist?.thumbnail}
               alt={playlist?.title}
               className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ease-out rounded-md"
            />
            <div
               className="absolute top-0 left-0 w-full h-full
                        hidden group-hover:flex justify-center items-center text-white bg-overlay-2 gap-6"
            >
               <button className="hover:bg-hover-2 p-2 rounded-full">
                  <MdFavoriteBorder className="text-2xl cursor-pointer" />
               </button>

               {/* <<<<<<< HEAD
               <button
                  className="hover:text-primary"
                  onClick={() => navigate(playlist.link)}
               >
======= */}
               <button className="hover:text-primary" onClick={onPlay}>
                  {/* >>>>>>> contributors/iris */}
                  <FaPlay className="text-3xl cursor-pointer" />
               </button>

               <button className="hover:bg-hover-2 p-2 rounded-full">
                  <HiOutlineDotsHorizontal className="text-2xl cursor-pointer" />
               </button>
            </div>
         </div>
         <div className="w-full text-sm">
            <div className="flex gap-2 items-center justify-between w-full mt-2">
               <h1 className="w-40 truncate">{playlist?.title}</h1>
               {!sm && (
                  <p className="text-secondary">
                     {playlist?.songs.length} tracks
                  </p>
               )}
            </div>
            <p className="text-secondary text-xs mt-1">{playlist?.createdBy}</p>
         </div>
      </div>
   );
};

export default PlaylistCover;
