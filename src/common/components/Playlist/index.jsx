import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { songs } from "./../../../songData";
import PlaylistItem from "./PlaylistItem";
import { update } from "./../Playbar/playingSlice";

const Playlist = () => {
   const currentPlaying = useSelector((state) => state.playing.value);
   const dispatch = useDispatch();

   return (
      <div className="w-full h-auto grid grid-cols-12 bg-transparent mt-20">
         <div className="col-span-3"></div>
         <div className="col-span-9">
            <div className="grid grid-cols-12 px-3 py-3 w-full border-b border-hover-1">
               <p className="col-span-6 text-secondary text-sm">SONG</p>
               <p className="col-span-5 text-secondary text-sm flex items-center">
                  ALBUM
               </p>
               <p className="col-span-1 text-secondary text-sm flex items-center justify-end">
                  TIME
               </p>
            </div>

            {songs.map((song, index) => (
               <PlaylistItem
                  info={song}
                  onClick={() => dispatch(update(song))}
                  key={index}
               />
            ))}
         </div>
      </div>
   );
};

export default Playlist;
