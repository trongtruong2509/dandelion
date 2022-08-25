import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PlaylistCover = ({ playlist, sm = false }) => {
   const navigate = useNavigate();

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
                        hidden group-hover:flex justify-center items-center text-white bg-overlay-2"
            >
               <button
                  onClick={() => navigate(playlist.link, { replace: true })}
               >
                  <FaPlay className="text-3xl cursor-pointer" />
               </button>
            </div>
         </div>
         <div className="w-full text-sm">
            <div className="flex gap-2 items-center justify-between w-full mt-2">
               <h1 className="">{playlist?.title}</h1>
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
