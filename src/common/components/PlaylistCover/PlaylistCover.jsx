import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FaPlay } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoHeartOutline, IoHeart, IoClose, IoPlay } from "react-icons/io5";

import { updatePlaylists, updateRecentPlay, updateRecentPlaylist } from "../../slices/userSlice";
import { updateCurrentPlaylist, updatePlayingPlaylist } from "../../slices/playlistSlice";

import { adminPaths } from "../../../app/routes";
import PlaylistThumbnail from "../Playlist/PlaylistThumbnail";
import { IoMdPause } from "react-icons/io";
import { pause, play, update } from "../../slices/playingSlice";
import { initQueue } from "../../slices/playQueueSlice";
import { shuffleArray } from "../../utils/common";

const playingMixIcon = "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif";

const PlaylistCover = ({ info, size = "md", editable = false, admin = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const playingPlaylist = useSelector((state) => state.playlist.playing);
   const currentPlaylist = useSelector((state) => state.playlist.current);
   const playingSong = useSelector((state) => state.playing.value);
   const currentUser = useSelector((state) => state.user.user);

   const currentPlaying = () => {
      return info?.id === playingPlaylist?.value?.id && playingSong?.playing;
   };

   const onNavigate = (triggerPlay) => {
      console.log("[onNavigate] clicked");
      if (admin) {
         navigate(adminPaths.playlistDetail.replace(":id", info.id));
      } else {
         navigate(info.link);

         if (currentPlaylist?.value?.id !== info.id) {
            dispatch(updateCurrentPlaylist(info));
         }
      }
   };

   const onPlay = () => {
      console.log("[onPlay] clicked");

      if (!playingPlaylist?.value || info.id !== playingPlaylist.value.id) {
         // play new playlist
         onNavigate(true);

         dispatch(updateRecentPlaylist(info?.id));
         dispatch(updatePlayingPlaylist(info));
         shuffleAndPlay(info?.songs, playingSong.shuffle);
      } else {
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      }
   };

   const shuffleAndPlay = (songs, shuffle, chosen) => {
      let shuffledSongs = [...songs];

      if (shuffle) {
         shuffleArray(shuffledSongs, chosen);
      }

      dispatch(update({ info: shuffledSongs[0], playing: true }));
      dispatch(updateRecentPlay(shuffledSongs[0]));
      dispatch(initQueue(shuffledSongs));
   };

   const thumbnailSizes = {
      sm: "max-w-40 max-h-40",
      md: "max-w-56 ",
      lg: "max-w-[300px] h-[300px]",
   };

   const widthSize = {
      sm: "max-w-40",
      md: "max-w-56",
      lg: "max-w-[300px]",
   };

   const handleLogin = () => {
      console.log("[TODO] handleLogin");
   };

   const likeIcon = () => {
      return (
         <button
            className={`${
               size === "sm" ? "p-[6px]" : "p-2"
            } rounded-full cursor-pointer hover:bg-hover-tooltip flex-center"`}
            onClick={() => (currentUser ? dispatch(updatePlaylists(info)) : handleLogin())}
         >
            {currentUser?.playlists?.find((p) => p === info?.id) ? (
               <IoHeart className={`${size === "sm" ? "text-[22px]" : "text-2xl"} text-dandelion-primary`} />
            ) : (
               <IoHeartOutline
                  className={`${size === "sm" ? "text-[22px]" : "text-2xl"} text-white hover:text-dandelion-primary`}
               />
            )}
         </button>
      );
   };

   const displayIcon = () => {
      if (info?.createdBy === currentUser?.id) {
         return (
            editable && (
               <button
                  className="w-10 h-10 rounded-full cursor-pointer flex-center hover:bg-hover-tooltip"
                  onClick={() => dispatch(updatePlaylists(info))}
               >
                  <IoClose className="text-2xl text-white" />
               </button>
            )
         );
      } else {
         return likeIcon();
      }
   };

   return (
      <div className={`h-auto text-white ${widthSize[size]}`}>
         <div
            className={`group relative overflow-hidden rounded-md cursor-pointer ${widthSize[size]} z-10 aspect-square`}
            onClick={onNavigate}
         >
            <PlaylistThumbnail playlist={info} className="z-10" />

            <div
               className={`z-40 items-center justify-center w-full h-full absolute-top-0 text-primary bg-dark-alpha-50 ${
                  currentPlaying() ? "flex" : "hidden group-hover:flex"
               }`}
            >
               <div
                  className={`${size === "sm" ? "gap-4" : "gap-6"} flex-center z-30`}
                  onClick={(e) => e.stopPropagation()}
               >
                  <div>{displayIcon()}</div>
                  <button
                     className={`text-white hover:text-dandelion-primary flex-center
                        ${thumbnailSizes[size]}`}
                     onClick={onPlay}
                  >
                     {currentPlaying() ? (
                        <IoMdPause className="text-4xl text-white opacity-0 group-hover:opacity-100" />
                     ) : (
                        <IoPlay className="text-5xl text-white" />
                     )}
                  </button>
                  <button
                     className={`${size === "sm" ? "p-[6px]" : "p-2"} text-white rounded-full hover:bg-hover-tooltip`}
                  >
                     <HiOutlineDotsHorizontal className={`${size === "sm" ? "text-xl" : "text-2xl"}  cursor-pointer`} />
                  </button>
               </div>
            </div>
            {currentPlaying() && (
               <div className={`absolute-center w-full h-full group-hover:hidden flex-center z-50`}>
                  <div className="w-10 h-10 border border-white rounded-full flex-center">
                     <img src={playingMixIcon} className="w-4 h-4" />
                  </div>
               </div>
            )}
         </div>
         <div className="w-full">
            <div className="w-full mt-2 flex-btw">
               <h1 className="w-40 font-semibold truncate text-primary">{info?.title}</h1>
               {/* {size === "md" && <p className="text-sm text-secondary">{info?.songs?.length} tracks</p>} */}
            </div>
            <p className="mt-1 text-xs text-secondary">{info?.user}</p>
         </div>
      </div>
   );
};

export default PlaylistCover;