import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Player from "./Player";
import SongOptions from "../Song/SongOptions";
import { paths } from "../../../app/routes";
import ArtistsDisplay from "../Song/ArtistsDisplay";

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
                  <div className="max-w-[200px] 2xl:max-w-[240px] min-w-[120px] shrink-0">
                     <h1 className="text-sm font-semibold truncate text-player">{currentSong?.title}</h1>
                     <div className="gap-2 mt-1 text-xs truncate text-secondary">
                        <ArtistsDisplay info={currentSong} />
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
