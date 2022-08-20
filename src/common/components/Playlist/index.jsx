import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { playlist } from "../../../tempData/playlistData";
import PlaylistItem from "./PlaylistItem";
import { update } from "./../Playbar/playingSlice";
import AlbumDefault from "./../../../assets/album_default.png";

const Playlist = () => {
   const currentPlaying = useSelector((state) => state.playing.value);
   const dispatch = useDispatch();

   return (
      <div className="w-full h-full bg-transparent mt-20 relative flex">
         <div className="w-72  flex-shrink-0 text-white sticky top-40 h-72">
            <div className="w-60">
               <img
                  className="w-60 h-60 rounded-md object-cover"
                  src={playlist.thumbnail ? playlist.thumbnail : AlbumDefault}
                  alt="Album Thumbnail"
               />
               <h1 className="text-2xl font-semibold text-center mt-4">
                  {playlist.title}
               </h1>
               <p className="text-xs mt-1 text-secondary text-center">
                  Created by{" "}
                  <span className="text-white font-semibold cursor-pointer hover:text-primary">
                     {playlist.createdBy}
                  </span>
               </p>
            </div>
         </div>
         <div className="w-full">
            <div className="grid grid-cols-12 px-3 py-3 w-full border-b border-hover-1">
               <p className="col-span-6 text-secondary text-sm">SONG</p>
               <p className="col-span-5 text-secondary text-sm flex items-center">
                  ALBUM
               </p>
               <p className="col-span-1 text-secondary text-sm flex items-center justify-end">
                  TIME
               </p>
            </div>

            {playlist?.songs?.map((song, index) => (
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
