import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const PlaylistCoverSkeleton = ({ size = "md" }) => {
   const thumbnailSizes = {
      sm: "w-40 h-40",
      md: "w-56 h-56",
      lg: "w-[300px] h-[300px]",
   };

   const widthSize = {
      sm: "w-40",
      md: "w-56",
      lg: "w-[300px]",
   };

   return (
      <SkeletonTheme baseColor="var(--loading-bg)" highlightColor="var(--dark-alpha-10)" duration={2}>
         <div className={`h-auto text-white ${widthSize[size]} -mb-6`}>
            <Skeleton borderRadius="0.5rem" className={`overflow-hidden rounded-xl bg-alpha ${thumbnailSizes[size]}`} />
            <div className="flex flex-col">
               <Skeleton className="mt-[10px]" />
               <Skeleton width={120} height={12} />
            </div>
         </div>
      </SkeletonTheme>
   );
};

export default PlaylistCoverSkeleton;
