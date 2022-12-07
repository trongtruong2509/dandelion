import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Player from "./Player";
import SongOptions from "../Song/SongOptions";
import { paths } from "../../../app/routes";

const Playbar = () => {
   const navigate = useNavigate();

   const currentSong = useSelector((state) => state.playing.value)?.info;
   const playingPlaylist = useSelector((state) => state.playlist.playing.value);

   const inPlaylist = () => playingPlaylist && playingPlaylist?.id !== "hidden";

   const onClick = () => {
      if (inPlaylist()) {
         navigate(paths.playlist.replace(":id", playingPlaylist.id));
      }
   };

   return (
      <div
         className={`bg-player py-3 px-5 border-t border-secondary w-full h-[90px] z-[600] ${
            inPlaylist() ? "cursor-pointer" : ""
         }`}
         onClick={onClick}
      >
         <div className="relative h-full flex-btw">
            <div className="gap-3 flex-center ">
               <div className="flex items-center gap-3 text-white ">
                  <div>
                     <img
                        src={currentSong?.thumbnail}
                        alt={currentSong?.title}
                        className="object-cover w-16 h-16 rounded-md"
                     />
                  </div>
                  <div className="max-w-[240px] min-w-[120px] shrink-0">
                     <h1 className="text-sm font-semibold truncate text-player">{currentSong?.title}</h1>
                     <div className="gap-2 mt-1 text-xs truncate text-secondary">
                        {currentSong?.artists?.length > 0 ? (
                           <p>
                              {currentSong?.artists.map((artist, index) => (
                                 <span key={index}>
                                    <Link className="hover:text-dandelion-primary hover:underline" to={artist?.link}>
                                       {artist?.name}
                                    </Link>
                                    {currentSong?.artists?.length - 1 !== index && ", "}
                                 </span>
                              ))}
                           </p>
                        ) : (
                           currentSong?.artistsNames
                        )}
                     </div>
                  </div>
               </div>
               <SongOptions songInfo={currentSong} activeLike activeDots />
            </div>
            <Player />
         </div>
      </div>
   );
};

export default Playbar;
