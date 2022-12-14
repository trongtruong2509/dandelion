import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { playlistBreakpoints } from "../../utils/common";
import PlaylistCoverSkeleton from "./PlaylistCoverSkeleton";

const PlaylistCoverCarouselSkeleton = () => {
   const playlist = Array.from({ length: 7 }, (v, i) => i);

   return (
      <Swiper className="w-full" breakpoints={playlistBreakpoints}>
         {playlist?.map((p) => (
            <SwiperSlide key={p}>
               <PlaylistCoverSkeleton info={p} />
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default PlaylistCoverCarouselSkeleton;
