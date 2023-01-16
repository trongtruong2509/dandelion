import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";
import SyncLoader from "react-spinners/SyncLoader";

import { addNewDoc, deleteDocById, getAllDocs } from "../../../common/utils/firebaseApi";
import { group } from "../../../common/utils/common";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";
import { useDispatch, useSelector } from "react-redux";
import { updateDeleting, updateTracks } from "../../slices/adminTrackSlice";
import { firebaseKeys } from "../../../dataTemplate";
import { uploadAllExistGenres } from "../../components/Filter/filterApi";
import { StateNames } from "../../components/State/State";

const AdminHome = () => {
   const dispatch = useDispatch();

   const adminTrack = useSelector((state) => state.adminTrack);
   // const allTracks = useSelector((state) => state.adminTrack.allTracks);

   const [filterTracks, setFilterTracks] = useState([]);

   // useEffect(() => {
   //    for (const track of adminTrack?.tracks) {
   //       console.log(`${track.title} - ${track.artistsNames}`);
   //    }
   // }, [adminTrack?.tracks]);

   const deleteSongById = async (songInfo) => {
      const result = await toast.promise(deleteDocById(firebaseKeys.songs, songInfo?.id), {
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
      });

      // fetch data after deleting a song
      dispatch(updateDeleting(true));
   };

   useEffect(() => {
      let tracks = adminTrack?.tracks;
      const gen = adminTrack.currentGen;
      const state = adminTrack.currentState;

      console.log("[filterTracks] gen", gen);

      if (gen && gen !== "All") {
         if (gen === "Gen-0") {
            tracks = tracks.filter((t) => t.tags?.includes(gen) || !t.tags?.some((e) => /Gen_./g.test(e)));
         } else {
            tracks = tracks.filter((t) => t?.tags?.includes(gen));
         }
      }

      if (state && state !== "All") {
         if (state === StateNames.Undefined) {
            tracks = tracks.filter((t) => t.tags?.includes(gen) || !t.tags?.some((e) => /State_./g.test(e)));
         } else {
            tracks = tracks.filter((t) => t?.tags?.includes(state));
         }
      }

      setFilterTracks(tracks);
   }, [adminTrack]);

   return (
      <div className="w-full mt-10">
         <Filters />
         <div className="w-full my-2">
            <p className="text-sm text-secondary">
               {filterTracks?.length} / {adminTrack?.tracks?.length} tracks
            </p>
            {adminTrack?.fetching ? (
               <div className="h-[600px] flex-center">
                  <SyncLoader
                     color="var(--dandelion)"
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
               <div className="grid w-full grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {filterTracks?.map((s) => (
                     <div className="col-span-1 my-1" key={s.id}>
                        <SongItem info={s} size="13" like={false} canDetele badges onDelete={deleteSongById} />
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default AdminHome;
