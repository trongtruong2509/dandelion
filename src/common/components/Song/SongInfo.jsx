import React from "react";
import { Link } from "react-router-dom";
import { RankItem, RankMenu } from "../../../admin/components/Rank/Rank";
import { updateRank } from "../../../common/utils/songs";

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

   return (
      <div>
         <div className="relative flex items-center gap-3 text-white">
            <div
               className={`absolute group-hover:bg-dark-alpha-50 rounded-md ${thumbnailSizes[size]}`}
            />
            <img
               src={info?.thumbnail}
               alt={info?.title}
               className={`object-cover rounded-md ${thumbnailSizes[size]}`}
            />
            {/* </div> */}
            <div className="max-w-[220px]">
               <div className="flex items-center gap-4">
                  <h1
                     className="w-full text-sm truncate cursor-pointer text-primary"
                     onClick={onClick}
                  >
                     {info?.title}
                  </h1>
               </div>
               <div className="flex items-center gap-2 mt-1 text-xs truncate text-secondary">
                  {badges && (
                     <div>
                        <RankMenu rankInput={info?.rank} onRankChange={onRankUpdate} />
                     </div>
                  )}
                  {info?.artists.length > 0 ? (
                     <p>
                        {info?.artists.map((artist, index) => (
                           <span key={index}>
                              <Link
                                 className="hover:text-dandelion-primary hover:underline"
                                 to={artist?.link}
                              >
                                 {artist?.name}
                              </Link>
                              {info?.artists?.length - 1 !== index && ", "}
                           </span>
                        ))}
                     </p>
                  ) : (
                     info?.artistsNames
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SongInfo;
