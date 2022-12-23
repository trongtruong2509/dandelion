import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { IoShuffleOutline } from "react-icons/io5";

import { updateCurrentPlaylist } from "../../slices/playlistSlice";
import { initQueue } from "../../slices/playQueueSlice";
import { updateAndPlay } from "../../slices/playingSlice";

import DefaultThumbnail from "../../../assets/album_default.png";
import { adminPaths } from "../../../app/routes";
import { initHiddenPlaylist } from "../../utils/playlist";
import { getArtistTopHits } from "../../utils/songs";
import useTriggerPlaylist from "../../hooks/useTriggerPlaylist";
import { LoadingSpinner } from "./../../../assets";

const ArtistCover = ({ info, size = "md", admin = false }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const triggerPlaylist = useTriggerPlaylist();
   const [fetching, setFetching] = useState(false);

   const onNavigate = () => {
      if (admin) {
         navigate(adminPaths.playlistDetail.replace(":id", info.id));
      } else {
         navigate(info.link);
      }
   };

   const onPlay = async () => {
      setFetching(true);
      const hits = await getArtistTopHits(info);
      setFetching(false);

      triggerPlaylist(initHiddenPlaylist(hits, "hidden_artist"));
   };

   const widthSize = {
      sm: "max-w-40",
      md: "max-w-56",
      lg: "max-w-[300px]",
   };

   return (
      <div className={`h-auto text-white ${widthSize[size]} rounded-full`}>
         <div
            className={`group relative overflow-hidden rounded-full cursor-pointer ${widthSize[size]} z-10 aspect-square`}
            onClick={onNavigate}
         >
            <img
               src={info?.thumbnail ? info?.thumbnail : DefaultThumbnail}
               alt={info?.name}
               className="z-10 object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105"
            />
            <div className="z-50 items-center justify-center hidden w-full h-full absolute-top text-primary group-hover:flex bg-dark-alpha-50">
               <div
                  className="w-12 gap-6 border border-white rounded-full aspect-square flex-center"
                  onClick={(e) => e.stopPropagation()}
               >
                  {fetching ? (
                     <div className="-m-1">
                        <LoadingSpinner />
                     </div>
                  ) : (
                     <button className="text-3xl text-white cursor-pointer hover:text-dandelion" onClick={onPlay}>
                        <IoShuffleOutline />
                     </button>
                  )}
               </div>
            </div>
         </div>
         <div className="w-full mt-3 text-center">
            <Link className="w-full truncate semibold text-primary hover:text-dandelion" to={info?.link}>
               {info?.name}
            </Link>
         </div>
      </div>
   );
};

export default ArtistCover;
