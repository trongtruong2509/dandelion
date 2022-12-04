import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SectionTitleSkeleton = () => {
   return (
      <div className="mb-3 flex-btw">
         <SkeletonTheme
            baseColor="var(--loading-bg)"
            highlightColor="var(--dark-alpha-10)"
            duration={2}
         >
            <Skeleton width={300} height={32} />
         </SkeletonTheme>
      </div>
   );
};

export default SectionTitleSkeleton;
