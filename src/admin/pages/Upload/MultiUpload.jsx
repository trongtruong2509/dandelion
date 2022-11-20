import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadItem from "../../components/Upload/UploadItem";
import { deleteTrack } from "../../slices/uploadSlice";
import { toast } from "react-toastify";
import { uploadZingById } from "../../components/Upload/uploadZing";

const MultiUpload = ({ id }) => {
   const upload = useSelector((state) => state.upload);

   const dispatch = useDispatch();

   const onDelete = (track) => {
      dispatch(deleteTrack(track.encodeId));
   };

   const onUpload = async () => {
      upload?.tracks.forEach((track) => {
         uploadSong(track.encodeId, track.rank);
      });
   };

   const uploadSong = async (id, rank) => {
      await toast.promise(uploadZingById(id, rank), {
         pending: `[${rank}] Uploading song ${id}...`,
         success: `[${rank}] Song ${id} uploaded`,
         error: {
            render({ data }) {
               // When the promise reject, data will contains the error
               return (
                  <div>
                     <h2 className="text-sm">{`Song ${id} uploaded fail with error: `}</h2>
                     <p className="mt-2 text-xs">{data.message}</p>
                  </div>
               );
            },
         },
      });
   };

   return (
      <div className="w-full">
         <div className="flex gap-3 my-6 text-xl text-primary">
            <p>From</p>
            <h2 className="">{upload?.current.category}</h2>
            <h2 className="font-semibold text-dandelion-primary">
               {upload?.current.id}
            </h2>
         </div>

         <div className="mt-3">
            {upload?.tracks.map((track, index) => (
               <UploadItem
                  key={index}
                  info={track}
                  onDelete={() => onDelete(track)}
               />
            ))}
         </div>

         <div className="w-3/4 pb-20 mt-12 text-right">
            <button
               className="px-4 py-2 text-white bg-teal-500 rounded-xl"
               onClick={onUpload}
            >
               Upload All
            </button>
         </div>
      </div>
   );
};

export default MultiUpload;
