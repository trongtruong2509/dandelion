import React, { useEffect, useState } from "react";
import { IoPlay } from "react-icons/io5";
import { IoMdPause } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import { play, pause } from "../../slices/playingSlice";
import { addSuggestionToQueue } from "../../slices/playQueueSlice";
import useTriggerTrack from "../../hooks/useTriggerTrack";
import { convertTimeToStr } from "../../utils/common";

import SongInfo from "../Song/SongInfo";
import SongOptions from "../Song/SongOptions";

const playingMixIcon = "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif";

const SongItem = ({
   info,
   size = "10",
   options = true,
   like = true,
   fullMode = false,
   inPlaylist = false,
   addPlaylist = false,
   onAdd,
   addPlayQueue = false,
   fade = false,
   canDetele = false,
   onDelete,
   badges = false,
   activeLike = false,
   disableLike = false,
   activeDots = false,
}) => {
   const dispatch = useDispatch();
   const triggerTrack = useTriggerTrack();

   const playingSong = useSelector((state) => state.playing.value);
   const [current, setCurrent] = useState(false);

   useEffect(() => {
      if (playingSong?.info?.id === info.id) {
         setCurrent(true);
      } else {
         setCurrent(false);
      }
   }, [playingSong, info]);

   const playSong = () => {
      if (current) {
         playingSong?.playing ? dispatch(pause()) : dispatch(play());
      } else {
         triggerTrack(info, inPlaylist);
      }
   };

   const onAddQueue = (info) => {
      dispatch(addSuggestionToQueue(info));
   };

   const thumbnailSizes = {
      10: "w-10 h-10",
      11: "w-11 h-11",
      12: "w-12 h-12",
      13: "w-13 h-13",
      14: "w-14 h-14",
      15: "w-15 h-15",
      16: "w-16 h-16",
   };

   return (
      <div
         className={`w-full px-3 py-2 border-secondary grid grid-cols-12 relative rounded-md group
                         ${current ? "bg-alpha" : "hover:bg-alpha"} 
                         ${fullMode ? "border-b" : ""}
                         ${fade && !current ? "opacity-50 hover:opacity-100" : ""}`}
      >
         <div className={`${fullMode ? "col-span-6" : "col-span-10"}`}>
            <SongInfo info={info} onClick={playSong} size={size} badges={badges} />

            <button
               className={`items-center justify-center bg-dark-alpha-50 rounded-md absolute top-2 left-3 group-hover:flex group
               ${current ? "flex" : "hidden"} 
               ${thumbnailSizes[size]}`}
               onClick={playSong}
            >
               {playingSong?.playing && current ? (
                  <div className="group">
                     <img src={playingMixIcon} className="w-[18px] h-[18px] group-hover:opacity-0" alt="" />
                     <IoMdPause className="text-xl text-white opacity-0 group-hover:opacity-100 absolute-center" />
                  </div>
               ) : (
                  <IoPlay className="text-[22px] text-white" />
               )}
            </button>
         </div>

         {fullMode && (
            <p className="flex items-center col-span-5 text-xs cursor-pointer text-secondary hover:text-dandelion hover:underline">
               {info?.album?.title ?? ""}
            </p>
         )}
         <div className="flex items-center justify-end">
            {fullMode && (
               <p className="flex items-center justify-end col-span-1 text-xs text-right text-secondary group-hover:opacity-0">
                  {convertTimeToStr(info.duration)}
               </p>
            )}
            {options && (
               <div className="absolute -translate-y-1/2 top-1/2 right-3">
                  <SongOptions
                     songInfo={info}
                     like={like}
                     size={size}
                     addPlaylist={addPlaylist}
                     onAdd={onAdd}
                     addPlayQueue={addPlayQueue}
                     onAddPlayQueue={onAddQueue}
                     canDetele={canDetele}
                     activeLike={activeLike}
                     disableLike={disableLike}
                     activeDots={activeDots}
                     onDelete={onDelete}
                  />
               </div>
            )}
         </div>
      </div>
   );
};

export default SongItem;
