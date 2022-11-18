import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { addNewDoc, getAllDocs } from "../../../common/utils/firebaseApi";
import { group } from "../../../common/utils/common";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";
import { useDispatch, useSelector } from "react-redux";
import { initTracks, updateTracks } from "../../slices/adminTrackSlice";

const AdminHome = () => {
   const dispatch = useDispatch();

   const tracks = useSelector((state) => state.adminTrack.tracks);
   const allTracks = useSelector((state) => state.adminTrack.allTracks);

   // const [allTracks, setAllTracks] = useState([]);

   useEffect(() => {
      getAllDocs("songs")
         .then((result) => {
            dispatch(initTracks(result));
            dispatch(updateTracks(result));
         })
         .catch((err) => {
            toast.error(err);
         });
   }, []);

   return (
      <div className="w-full mt-10">
         <Filters allTracks={allTracks} />
         <div className="w-full my-4">
            <Swiper slidesPerView={4} spaceBetween={20} className="flex w-full gap-3">
               {group(tracks, tracks.length / 4).map((songs, index) => (
                  <SwiperSlide key={index}>
                     {songs.map((s) => (
                        <div className="my-1" key={s.id}>
                           <SongItem
                              info={s}
                              size="13"
                              like={false}
                              canDetele
                           />
                        </div>
                     ))}
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   );
};

export default AdminHome;
