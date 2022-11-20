import React, { useState } from "react";
import { toast } from "react-toastify";

import Modal from "../../../common/components/Modal/Modal";
import Rank from "../../../common/components/Rank/Rank";
import { uploadZingById } from "../Upload/uploadZing";

const UploadSingleModal = ({ ...props }) => {
   const [songId, setSongId] = useState("");
   const [rank, setRank] = useState("Undefined");

   const onUpload = async () => {
      props.onClose();

      await toast.promise(uploadZingById(songId, rank), {
         pending: `[${rank}] Uploading song ${songId}...`,
         success: `[${rank}] Song ${songId} uploaded`,
         error: {
            render({ data }) {
               // When the promise reject, data will contains the error
               return (
                  <div>
                     <h2 className="text-sm">{`Song ${songId} uploaded fail with error: `}</h2>
                     <p className="mt-2 text-xs">{data.message}</p>
                  </div>
               );
            },
         },
      });
   };

   const cleanUp = () => {
      setSongId("");
      setRank("Undefined");
   };

   return (
      <Modal {...props} className="p-4 text-primary bg-layout w-96 rounded-xl">
         <header className="flex items-center justify-center w-full py-1 header">
            <h4 className="text-xl font-semibold">Add new song with Zing Id</h4>
         </header>
         <main className="flex flex-col w-full gap-4 py-3">
            <input
               type="text"
               value={songId}
               onChange={(e) => setSongId(e.target.value)}
               className="px-4 py-2 border outline-none border-secondary rounded-xl bg-alpha"
               placeholder="Enter song Id"
            />
            <select
               className="w-40 px-4 py-[6px] border border-secondary rounded-lg outline-none bg-alpha text-primary"
               onChange={(e) => setRank(e.target.value)}
            >
               <option defaultValue value="Undefined">
                  Undefined
               </option>
               <option value="B">B</option>
               <option value="A">A</option>
               <option value="A+">A+</option>
               <option value="S">S</option>
               <option value="S+">S+</option>
            </select>
         </main>
         <div className="flex items-center justify-end w-full gap-6 px-4 pt-4 pb-2">
            <button
               className="w-20 px-3 py-2 transition-all duration-150 ease-out rounded-lg bg-alpha text-navigation hover:text-dandelion-primary hover:bg-dark-alpha-10 hover:opacity-100"
               onClick={() => {
                  props.onClose();
                  cleanUp();
               }}
            >
               Cancel
            </button>
            <button
               className="w-20 px-3 py-2 text-white bg-teal-500 rounded-lg"
               onClick={() => {
                  onUpload();
                  cleanUp();
               }}
            >
               Upload
            </button>
         </div>
      </Modal>
   );
};

export default UploadSingleModal;
