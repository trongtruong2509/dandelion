import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "../../../app/routes";
import Player from "./Player";
import SongOptions from "../Song/SongOptions";
import SongInfo from "../Song/SongInfo";

const Playbar = () => {
   const navigate = useNavigate();

   const currentSong = useSelector((state) => state.playing.value)?.info;
   const playingPlaylist = useSelector((state) => state.playlist.playing.value);

   const inPlaylist = () => playingPlaylist && !playingPlaylist.id.startsWith("hidden");

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
         <div className="relative z-0 h-full flex-btw">
            <div className="gap-3 flex-center ">
               <SongInfo info={currentSong} size="16" />
               <SongOptions songInfo={currentSong} activeLike activeDots />
            </div>
            <Player />
         </div>
      </div>
   );
};

export default Playbar;
