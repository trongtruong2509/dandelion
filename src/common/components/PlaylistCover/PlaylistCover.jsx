import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IoMdPause } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoHeartOutline, IoHeart, IoClose, IoPlay } from "react-icons/io5";

import useTriggerPlaylist from "../../hooks/useTriggerPlaylist";
import { updatePlaylists } from "../../slices/userSlice";
import { pause, play } from "../../slices/playingSlice";

import { adminPaths } from "../../../app/routes";
import Login from "../Header/Login";
import PlaylistThumbnail from "../Playlist/PlaylistThumbnail";
import DeletePlaylistModal from "../Modal/DeletePlaylistModal";
import { updateCurrentPlaylist } from "../../slices/playlistSlice";

const playingMixIcon = "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif";

const PlaylistCover = ({ info, size = "md", canDelete = false, admin = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const triggerPlaylist = useTriggerPlaylist();

   const playingPlaylist = useSelector((state) => state.playlist.playing);
   const currentPlaylist = useSelector((state) => state.playlist.current);
   const playingSong = useSelector((state) => state.playing.value);
   const currentUser = useSelector((state) => state.user.user);

   const [show, setShow] = useState(false);

   const currentPlaying = () => {
      return info?.id === playingPlaylist?.value?.id && playingSong?.playing;
   };

   const onNavigate = () => {
      const path = admin ? adminPaths.playlistDetail.replace(":id", info.id) : info.link;
      // pass playlist to current to avoid fetching data
      if (currentPlaylist?.value?.id !== info.id) {
         dispatch(updateCurrentPlaylist(info));
      }

      navigate(path);
   };

   const onPlay = () => {
      if (!playingPlaylist?.value || info.id !== playingPlaylist.value.id) {
         if (info?.songs.length) {
            // play new playlist
            onNavigate();
            triggerPlaylist(info);
         }
      } else {
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      }
   };

   const widthSize = {
      sm: "max-w-40",
      md: "max-w-56",
      lg: "max-w-[300px]",
   };

   const LikeIconOutline = () => (
      <IoHeartOutline className={`${size === "sm" ? "text-[22px]" : "text-2xl"} text-white hover:text-dandelion`} />
   );

   const LikeIcon = () => {
      return (
         <div>
            {currentUser ? (
               <button
                  className={`${
                     size === "sm" ? "p-[6px]" : "p-2"
                  } rounded-full cursor-pointer hover:bg-hover-tooltip flex-center"`}
                  onClick={() => dispatch(updatePlaylists(info))}
               >
                  {currentUser?.playlists?.find((p) => p === info?.id) ? (
                     <IoHeart className={`${size === "sm" ? "text-[22px]" : "text-2xl"} text-dandelion`} />
                  ) : (
                     LikeIconOutline()
                  )}
               </button>
            ) : (
               <Login children={LikeIconOutline()} />
            )}
         </div>
      );
   };

   const DisplayIcon = () => {
      if (info?.createdBy === currentUser?.id) {
         return (
            <button
               className={
                  "w-10 h-10 rounded-full cursor-pointer flex-center hover:bg-hover-tooltip " + canDelete
                     ? "opacity-100"
                     : "opacity-0"
               }
               onClick={() => setShow(true)}
            >
               <IoClose className="text-3xl text-white" />
            </button>
         );
      } else {
         return LikeIcon();
      }
   };

   return (
      <div className={`h-auto text-white ${widthSize[size]}`}>
         <DeletePlaylistModal show={show} info={info} onClose={() => setShow(false)} />

         <div
            className={`group relative overflow-hidden rounded-md cursor-pointer ${widthSize[size]} z-10 aspect-square`}
            onClick={onNavigate}
         >
            <PlaylistThumbnail playlist={info} className="z-10" />

            <div
               className={`z-40 items-center justify-center w-full h-full absolute-top text-primary bg-dark-alpha-50 ${
                  currentPlaying() ? "flex" : "hidden group-hover:flex"
               }`}
            >
               <div
                  className={`${size === "sm" ? "gap-4" : "gap-6"} text-white flex-center z-30`}
                  onClick={(e) => e.stopPropagation()}
               >
                  {DisplayIcon()}

                  <button
                     className={`hover:text-dandelion flex-center aspect-square
                        ${widthSize[size]}`}
                     onClick={onPlay}
                  >
                     {currentPlaying() ? (
                        <IoMdPause className="text-4xl opacity-0 group-hover:opacity-100" />
                     ) : (
                        <IoPlay className={size === "sm" ? "text-4xl" : "text-5xl"} />
                     )}
                  </button>
                  <button className={`${size === "sm" ? "p-[6px]" : "p-2"} rounded-full hover:bg-hover-tooltip`}>
                     <HiOutlineDotsHorizontal className={`${size === "sm" ? "text-xl" : "text-2xl"} cursor-pointer`} />
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
               <h1 className="w-40 truncate semibold text-primary">{info?.title}</h1>
            </div>
            <p className="mt-1 text-xs text-secondary">{info?.user}</p>
         </div>
      </div>
   );
};

export default PlaylistCover;
