import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SongSkeleton = ({ size = "10" }) => {
   return (
      <SkeletonTheme baseColor="var(--loading-bg)" highlightColor="var(--dark-alpha-10)" duration={2}>
         <div className={`text-white flex gap-3 w-full justify-between`}>
            <div className="flex gap-3">
               <Skeleton width={40} height={40} className={`overflow-hidden rounded-md`} />
               <div className="flex-c">
                  <Skeleton className="mt-2" height={14} width={350} />
                  <Skeleton width={180} height={10} />
               </div>
            </div>
            <Skeleton width={60} height={12} className={`overflow-hidden rounded-md mt-2`} />
            <div className="flex gap-3">
               <Skeleton width={32} height={32} className="rounded-full" borderRadius={999} />
               <Skeleton width={32} height={32} className="rounded-full" borderRadius={999} />
               <Skeleton width={32} height={32} className="rounded-full" borderRadius={999} />
            </div>
         </div>
      </SkeletonTheme>
   );
};

export default SongSkeleton;
