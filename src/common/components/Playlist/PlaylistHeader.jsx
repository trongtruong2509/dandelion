import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosShuffle, IoMdPause, IoMdPlay } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";

import { pause, play } from "../../slices/playingSlice";
import { updateCurrentToPlaying } from "../../slices/playlistSlice";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { updatePlaylists } from "../../slices/userSlice";
import Login from "../Header/Login";
import PlaylistThumbnail from "./PlaylistThumbnail";

const playingMixIcon =
   "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif";

const PlaylistHeader = () => {
   const dispatch = useDispatch();

   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const playingPlaylist = useSelector((state) => state.playlist.playing);
   const playingTrack = useSelector((state) => state.playing.value);
   const user = useSelector((state) => state.user.user);

   const [show, setShow] = useState(false);
   // const [isCurrentPlaying, setIsCurrentPlaying] = useState(false);
   const [thumbnailRotateOff, setThumbnailRotateOff] = useState(
      "rounded-md transition-[border-radius] duration-500 delay-500 ease-out"
   );

   const onPlay = () => {
      if (!thumbnailRotateOff.includes("animate-[spinoff_0.5s_ease_1]")) {
         setThumbnailRotateOff(`${thumbnailRotateOff} animate-[spinoff_0.5s_ease_1]`);
      }

      console.log("[onPlay] clicked");
      if (currentPlaylist?.id !== playingPlaylist?.value?.id) {
         dispatch(updateCurrentToPlaying());
      } else {
         dispatch(play());
      }
   };

   const onPause = () => {
      dispatch(pause());
   };

   const isCurrentPlaying = () => {
      return currentPlaylist?.id === playingPlaylist?.value?.id && playingTrack?.playing;
   };

   const notLiked = !user || !user?.playlists.find((t) => t === currentPlaylist?.id);

   const thumbnailRotate =
      "animate-[spin_12s_linear_infinite] rounded-full transition-[border-radius] duration-[2000ms] ease-out";

   return (
      <div className="sticky flex-shrink-0 text-white top-24 w-72 h-fit">
         <div className="relative overflow-hidden w-72 h-72 group">
            <div
               className={`overflow-hidden shadow-lg w-72 group h-72 hover:cursor-pointer ${
                  isCurrentPlaying() ? thumbnailRotate : thumbnailRotateOff
               }`}
               onClick={playingTrack?.playing ? onPause : onPlay}
            >
               <PlaylistThumbnail playlist={currentPlaylist} size="playlist" />
               {currentPlaylist?.songs?.length && (
                  <div className="absolute top-0 left-0 items-center justify-center hidden gap-6 text-white rounded-md w-72 h-72 group-hover:flex">
                     {isCurrentPlaying() ? (
                        <button className="hover:text-dandelion-primary">
                           <IoMdPause className="text-4xl cursor-pointer" />
                        </button>
                     ) : (
                        <button className="hover:text-dandelion-primary">
                           <FaPlay className="text-3xl cursor-pointer" />
                        </button>
                     )}
                  </div>
               )}
            </div>
            {isCurrentPlaying() && (
               <div className="absolute-center w-72 h-72 group-hover:hidden flex-center">
                  <div className="w-10 h-10 border border-white rounded-full flex-center">
                     <img src={playingMixIcon} className="w-4 h-4" />
                  </div>
               </div>
            )}
         </div>

         <div>
            <div className="relative gap-1 mt-4 flex-center">
               <h1 className="text-2xl font-semibold text-center text-primary">
                  {currentPlaylist?.title}
               </h1>
               {currentPlaylist?.createdBy === user?.id && (
                  <button
                     className="p-2 rounded-full text-secondary hover:text-primary hover:bg-alpha"
                     onClick={() => setShow(!show)}
                  >
                     <FiEdit3 className="text-lg" />
                  </button>
               )}
            </div>
            <p className="mt-1 mb-5 text-xs text-center text-secondary">
               Created by{" "}
               <span className="font-semibold cursor-pointer text-primary hover:text-dandelion-primary">
                  {currentPlaylist?.user}
               </span>
            </p>

            {currentPlaylist?.songs?.length > 0 && (
               <div className="flex items-center justify-center w-full">
                  {currentPlaylist?.id !== playingPlaylist?.value?.id ? (
                     <button
                        className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion-primary rounded-3xl"
                        onClick={onPlay}
                     >
                        <IoIosShuffle className="text-lg" />
                        Shuffle Play
                     </button>
                  ) : playingTrack?.playing ? (
                     <button
                        className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion-primary rounded-3xl"
                        onClick={onPause}
                     >
                        <IoMdPause className="text-lg" />
                        Pause
                     </button>
                  ) : (
                     <button
                        className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion-primary rounded-3xl"
                        onClick={onPlay}
                     >
                        <IoMdPlay className="text-lg" />
                        Continue
                     </button>
                  )}
               </div>
            )}

            <div className="flex items-center justify-center gap-4 mt-5">
               <div className="p-2 rounded-full cursor-pointer flex-center bg-alpha">
                  {user ? (
                     <div onClick={() => dispatch(updatePlaylists(currentPlaylist))}>
                        {notLiked ? (
                           <MdFavoriteBorder
                              className={`text-lg hover:text-dandelion-primary text-primary`}
                           />
                        ) : (
                           <MdFavorite className="text-lg text-dandelion-primary" />
                        )}
                     </div>
                  ) : (
                     <Login
                        children={
                           <MdFavoriteBorder
                              className={`text-lg hover:text-dandelion-primary text-primary`}
                           />
                        }
                     />
                  )}
                  {/* <MdFavorite className="text-lg text-dandelion-primary" /> */}
               </div>
               <button className="p-2 rounded-full cursor-pointer flex-center bg-alpha">
                  <HiOutlineDotsHorizontal className="text-lg text-primary" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default PlaylistHeader;
