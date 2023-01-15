import React from "react";
import { RankMenu } from "../../../admin/components/Rank/Rank";
import { updateRank, updateTag } from "../../../common/utils/songs";
import ArtistsDisplay from "./ArtistsDisplay";
import { SongThumbnailDefault } from "../../../assets/index";
import { GenMenu } from "../../../admin/components/Generation/Generation";
import { StateMenu } from "../../../admin/components/State/State";

const SongInfo = ({ info, size = "10", onClick, badges = false }) => {
   const thumbnailSizes = {
      10: "w-10 h-10",
      11: "w-11 h-11",
      12: "w-12 h-12",
      13: "w-13 h-13",
      14: "w-14 h-14",
      15: "w-15 h-15",
      16: "w-16 h-16",
   };

   const onRankUpdate = (rank) => {
      updateRank(info, rank);
   };

   const currentGen = info?.tags?.find((t) => t.startsWith("Gen")) || "Gen-0";
   const currentState = info?.tags?.find((t) => t.startsWith("State")) || "Unknown";

   return (
      <div>
         <div className="relative flex items-center gap-3 text-white">
            <div className="relative">
               <div className={`absolute-center group-hover:bg-dark-alpha-50 rounded-md ${thumbnailSizes[size]}`} />
               <img
                  src={info?.thumbnail ?? SongThumbnailDefault}
                  alt={info?.title}
                  className={`object-cover rounded-md ${thumbnailSizes[size]}`}
                  onError={({ currentTarget }) => {
                     currentTarget.onerror = null; // prevents looping
                     currentTarget.src = SongThumbnailDefault;
                  }}
               />
            </div>

            <div className="max-w-[220px]">
               <div className="flex items-center gap-4">
                  <h1 className="w-full mr-2 text-sm truncate cursor-pointer text-primary" onClick={onClick}>
                     {info?.title}
                  </h1>
               </div>
               <div className="flex items-center gap-2 mt-1 text-xs truncate text-secondary">
                  {badges && (
                     <div>
                        <RankMenu rankInput={info?.rank} onRankChange={onRankUpdate} />
                     </div>
                  )}

                  <ArtistsDisplay info={info} />
               </div>
               {badges && (
                  <div className="flex items-center gap-2 mt-1 text-xs truncate text-secondary">
                     <div className="flex gap-2">
                        <GenMenu genInput={currentGen} onGenChange={(gen) => updateTag(info, gen)} />
                        <StateMenu stateInput={currentState} onStateChange={(state) => updateTag(info, state)} />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default SongInfo;
