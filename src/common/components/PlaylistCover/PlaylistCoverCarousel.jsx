import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { playlistBreakpoins } from "../../utils/common";
import PlaylistCover from "./PlaylistCover";
import ArtistCover from "../Artist/ArtistCover";

const PlaylistCoverCarousel = ({ playlist, artistMode = false, canDelete = false }) => {
   return (
      <Swiper className="w-full" breakpoints={playlistBreakpoins}>
         {playlist?.map((p, index) => (
            <SwiperSlide key={index}>
               {artistMode ? <ArtistCover info={p} /> : <PlaylistCover info={p} canDelete={canDelete} />}
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default PlaylistCoverCarousel;
