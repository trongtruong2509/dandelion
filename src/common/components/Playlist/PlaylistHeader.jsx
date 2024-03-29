import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosShuffle, IoMdPause, IoMdPlay } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";

import { pause, play, update } from "../../slices/playingSlice";
import { updateCurrentToPlaying } from "../../slices/playlistSlice";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { updatePlaylists, updateRecentPlay } from "../../slices/userSlice";
import Login from "../Header/Login";
import PlaylistThumbnail from "./PlaylistThumbnail";
import { initQueue } from "../../slices/playQueueSlice";
import { shuffleArray } from "../../utils/common";
import { useRef } from "react";
import PlaylistModal from "../Modal/PlaylistModal";
import useTriggerPlaylist from "../../hooks/useTriggerPlaylist";
import { playingMixIcon } from "../../../assets/index";

const PlaylistHeader = ({ info }) => {
   const dispatch = useDispatch();
   const triggerPlaylist = useTriggerPlaylist();

   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const playingPlaylistSlice = useSelector((state) => state.playlist.playing);
   const playingTrack = useSelector((state) => state.playing.value);
   const user = useSelector((state) => state.user.user);
   const isMounted = useRef(false);

   const [show, setShow] = useState(false);
   const [thumbnailRotateOff, setThumbnailRotateOff] = useState(
      "rounded-md transition-[border-radius] duration-500 delay-500 ease-out"
   );

   useEffect(() => {
      const playing = playingPlaylistSlice.value;
      const track = playingPlaylistSlice?.chosenTrack;

      if (isMounted.current) {
         if (currentPlaylist?.id === playing?.id) {
            if (track) {
               triggerPlaylist(playing, track);
            } else {
               if (playing?.songs.length > 0) {
                  triggerPlaylist(playing);
               }
            }
         }
      } else {
         isMounted.current = true;
      }
   }, [playingPlaylistSlice?.value]);

   // special spinoff animation. only apply when a track already played
   useEffect(() => {
      if (playingTrack?.playing && currentPlaylist.id === playingPlaylistSlice?.value?.id) {
         setThumbnailRotateOff(`${thumbnailRotateOff} animate-[spinoff_0.5s_ease_1]`);
      }
   }, [playingTrack, currentPlaylist, playingPlaylistSlice]);

   const onPlay = () => {
      if (currentPlaylist.songs.length) {
         if (currentPlaylist?.id !== playingPlaylistSlice?.value?.id) {
            dispatch(updateCurrentToPlaying());
         } else {
            dispatch(play());
         }
      }
   };

   const onPause = () => {
      if (isCurrentPlaying()) {
         dispatch(pause());
      } else {
         // play new playlist
         onPlay();
      }
   };

   const isCurrentPlaying = () => {
      return currentPlaylist?.id === playingPlaylistSlice?.value?.id && playingTrack?.playing;
   };

   const notLiked = !user || !user?.playlists.find((t) => t === currentPlaylist?.id);

   const thumbnailRotate =
      "animate-[spin_12s_linear_infinite] rounded-full transition-[border-radius] duration-[2000ms] ease-out";

   return (
      <div className="sticky flex-shrink-0 text-white top-24 w-72 h-fit">
         <PlaylistModal show={show} update info={currentPlaylist} onClose={() => setShow(false)} />

         <div className="relative overflow-hidden w-72 h-72 group">
            <div
               className={`overflow-hidden shadow-lg w-72 group h-72 hover:cursor-pointer ${
                  isCurrentPlaying() ? thumbnailRotate : thumbnailRotateOff
               }`}
               onClick={playingTrack?.playing ? onPause : onPlay}
            >
               <PlaylistThumbnail playlist={info} size="playlist" />
               {currentPlaylist?.songs?.length && (
                  <div className="items-center justify-center hidden gap-6 text-white rounded-md absolute-top w-72 h-72 group-hover:flex">
                     {isCurrentPlaying() ? (
                        <button className="text-4xl cursor-pointer hover:text-dandelion">
                           <IoMdPause />
                        </button>
                     ) : (
                        <button className="text-3xl cursor-pointer hover:text-dandelion">
                           <FaPlay />
                        </button>
                     )}
                  </div>
               )}
            </div>
            {isCurrentPlaying() && (
               <div className="absolute-center w-72 h-72 group-hover:hidden flex-center">
                  <div className="w-10 h-10 border border-white rounded-full flex-center">
                     <img src={playingMixIcon} className="w-4 h-4" alt="" />
                  </div>
               </div>
            )}
         </div>

         <div>
            <div className="relative gap-1 mt-4 flex-center">
               <h1 className="text-2xl text-center semibold text-primary">{currentPlaylist?.title}</h1>
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
               <span className="cursor-pointer semibold text-primary hover:text-dandelion">
                  {currentPlaylist?.user}
               </span>
            </p>

            {currentPlaylist?.songs?.length > 0 && (
               <div className="w-full flex-center">
                  {currentPlaylist?.id !== playingPlaylistSlice?.value?.id ? (
                     <button
                        className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion rounded-3xl"
                        onClick={onPlay}
                     >
                        <IoIosShuffle className="text-lg" />
                        Shuffle Play
                     </button>
                  ) : playingTrack?.playing ? (
                     <button
                        className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion rounded-3xl"
                        onClick={onPause}
                     >
                        <IoMdPause className="text-lg" />
                        Pause
                     </button>
                  ) : (
                     <button
                        className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion rounded-3xl"
                        onClick={onPlay}
                     >
                        <IoMdPlay className="text-lg" />
                        Continue
                     </button>
                  )}
               </div>
            )}

            <div className="gap-4 mt-5 flex-center">
               <div className="p-2 rounded-full cursor-pointer flex-center bg-alpha">
                  {user ? (
                     <div onClick={() => dispatch(updatePlaylists(currentPlaylist))}>
                        {notLiked ? (
                           <MdFavoriteBorder className={`text-lg hover:text-dandelion text-primary`} />
                        ) : (
                           <MdFavorite className="text-lg text-dandelion" />
                        )}
                     </div>
                  ) : (
                     <Login children={<MdFavoriteBorder className={`text-lg hover:text-dandelion text-primary`} />} />
                  )}
                  {/* <MdFavorite className="text-lg text-dandelion" /> */}
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
