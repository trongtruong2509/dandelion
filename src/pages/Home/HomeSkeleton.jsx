import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import PlaylistCoverSkeleton from "../../common/components/PlaylistCover/PlaylistCoverSkeleton";
import SectionTitleSkeleton from "../../common/components/SectionTitle/SectionTitleSkeleton";

const HomeSkeleton = () => {
   return (
      <div>
         <div className="w-full mt-7">
            <SectionTitleSkeleton />
            <div className="flex w-full gap-5">
               {[1, 2, 3, 4, 5].map((loading) => (
                  <PlaylistCoverSkeleton key={loading} />
               ))}
            </div>
         </div>
         <div className="w-full mt-10">
            <div className="mb-3 flex-btw">
               <SkeletonTheme
                  baseColor="var(--loading-bg)"
                  highlightColor="var(--dark-alpha-10)"
                  duration={2}
               >
                  <Skeleton width={300} height={32} />
               </SkeletonTheme>
            </div>
            <div className="flex w-full gap-5">
               {[1, 2, 3, 4, 5].map((loading) => (
                  <PlaylistCoverSkeleton key={loading} />
               ))}
            </div>
         </div>
         <div className="w-full mt-10">
            <div className="mb-3 flex-btw">
               <SkeletonTheme
                  baseColor="var(--loading-bg)"
                  highlightColor="var(--dark-alpha-10)"
                  duration={2}
               >
                  <Skeleton width={300} height={32} />
               </SkeletonTheme>
            </div>
            <div className="flex w-full gap-5">
               {[1, 2, 3, 4, 5].map((loading) => (
                  <PlaylistCoverSkeleton key={loading} />
               ))}
            </div>
         </div>
         <div className="w-full mt-10">
            <div className="mb-3 flex-btw">
               <SkeletonTheme
                  baseColor="var(--loading-bg)"
                  highlightColor="var(--dark-alpha-10)"
                  duration={2}
               >
                  <Skeleton width={300} height={32} />
               </SkeletonTheme>
            </div>
            <div className="flex w-full gap-5">
               {[1, 2, 3, 4, 5].map((loading) => (
                  <PlaylistCoverSkeleton key={loading} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default HomeSkeleton;
