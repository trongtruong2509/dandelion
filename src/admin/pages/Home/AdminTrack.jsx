import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { addNewDoc, getAllDocs } from "../../../common/utils/firebaseApi";
import { group } from "../../../common/utils/common";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";
import { useDispatch, useSelector } from "react-redux";
import { initTracks, updateTracks } from "../../slices/adminTrackSlice";

const AdminTracks = ({ info }) => {
   const dispatch = useDispatch();

   const tracks = useSelector((state) => state.adminTrack.tracks);
   const allTracks = useSelector((state) => state.adminTrack.allTracks);

   return (
      <div className="flex w-full gap-8 mt-10">
         <div className="flex gap-4 my-4">
            <div className="w-60">
               <img src={info?.thumbnailM} alt={info?.title} />
            </div>
         </div>
      </div>
   );
};

export default AdminTracks;
