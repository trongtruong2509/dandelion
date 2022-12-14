import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { getBreakpoints } from "../../utils/common";
import PlaylistCover from "./PlaylistCover";
import ArtistCover from "../Artist/ArtistCover";

const CoverCarousel = ({ playlist, artistMode = false, size = "md", canDelete = false }) => {
   return (
      <Swiper className="w-full" breakpoints={getBreakpoints(size)}>
         {playlist?.map((p, index) => (
            <SwiperSlide key={index}>
               {artistMode ? (
                  <ArtistCover info={p} size={size} />
               ) : (
                  <PlaylistCover size={size} info={p} canDelete={canDelete} />
               )}
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default CoverCarousel;
