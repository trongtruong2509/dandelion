import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";

import {
   addNewDoc,
   deleteDocById,
   getAllDocs,
} from "../../../common/utils/firebaseApi";
import { group } from "../../../common/utils/common";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchAllTracks,
   initTracks,
   updateTracks,
} from "../../slices/adminTrackSlice";
import { firebaseCollections } from "../../../dataTemplate";

const AdminHome = () => {
   const dispatch = useDispatch();

   const adminTrack = useSelector((state) => state.adminTrack);
   // const allTracks = useSelector((state) => state.adminTrack.allTracks);

   useEffect(() => {
      // fetchAllSongs();
      dispatch(fetchAllTracks());
   }, []);

   const deleteSongById = async (songInfo) => {
      const result = await toast.promise(
         deleteDocById(firebaseCollections.songs, songInfo?.id),
         {
            pending: `Deleting ${songInfo?.title}...`,
            success: `Song ${songInfo?.title} is deleted`,
            error: {
               render({ data }) {
                  // When the promise reject, data will contains the error
                  return (
                     <div>
                        <h2 className="text-sm">{`Song ${songInfo?.title} delete fail with error: `}</h2>
                        <p className="mt-2 text-xs">{data.message}</p>
                     </div>
                  );
               },
            },
         }
      );

      // fetch data after deleting a song
      fetchAllSongs();
   };

   const fetchAllSongs = async () => {
      getAllDocs("songs")
         .then((result) => {
            dispatch(initTracks(result));
            dispatch(updateTracks(result));
         })
         .catch((err) => {
            toast.error(err);
         });
   };

   return (
      <div className="w-full mt-10">
         <Filters allTracks={adminTrack?.allTracks} />
         <div className="w-full my-4">
            {adminTrack?.fetching ? (
               <div className="h-[600px] flex-center">
                  <SyncLoader
                     color="var(--dandelion-primary)"
                     loading={adminTrack?.fetching}
                     cssOverride={{
                        display: "block",
                        margin: "0 auto",
                        borderColor: "red",
                     }}
                     size={10}
                  />
               </div>
            ) : (
               <Swiper
                  slidesPerView={4}
                  spaceBetween={20}
                  className="flex w-full gap-3"
               >
                  {group(
                     adminTrack?.allTracks,
                     adminTrack?.allTracks.length / 4
                  ).map((songs, index) => (
                     <SwiperSlide key={index}>
                        {songs.map((s) => (
                           <div className="my-1" key={s.id}>
                              <SongItem
                                 info={s}
                                 size="13"
                                 like={false}
                                 canDetele
                                 badges
                                 onDelete={deleteSongById}
                              />
                           </div>
                        ))}
                     </SwiperSlide>
                  ))}
               </Swiper>
            )}
         </div>
      </div>
   );
};

export default AdminHome;
