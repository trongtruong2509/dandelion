import React from "react";
import PlaylistCoverSkeleton from "../../common/components/PlaylistCover/PlaylistCoverSkeleton";
import SongSkeleton from "../../common/components/Song/SongSkeleton";

const PlaylistSkeleton = () => {
   return (
      <div className="w-full h-full">
         <div className="relative flex w-full h-auto gap-8 mb-8 bg-transparent">
            <>
               <div className="flex-shrink-0">
                  <PlaylistCoverSkeleton size="lg" />
               </div>
               <div className="w-full">
                  <div>
                     {Array.from({ length: 20 }, (v, i) => i).map((loading) => (
                        <SongSkeleton key={loading} />
                     ))}
                  </div>
               </div>
            </>
         </div>
      </div>
   );
};

export default PlaylistSkeleton;
