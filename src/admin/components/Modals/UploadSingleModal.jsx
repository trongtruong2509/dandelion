import React, { useState } from "react";
import { toast } from "react-toastify";

import Modal from "../../../common/components/Modal/Modal";
import { uploadZingById } from "../Upload/uploadZing";
import { uploadNctById } from "../Upload/uploadNct";
import { uploadCsnByMp3 } from "../Upload/uploadCsn";
import { async } from "@firebase/util";

const UploadSingleModal = ({ ...props }) => {
   const [songId, setSongId] = useState("");
   const [rank, setRank] = useState("Undefined");
   const [vendor, setVendor] = useState("csn");
   const [country, setCountry] = useState("IWZ9Z08I");

   const list = [
      "2pR7ueJaXn9x",
      "VHb3WNnM02fQ",
      "RRTxybROZblO",
      "9CeePhklTJve",
      "RJOR3FaWJISL",
      "2UePVSCb5Q",
      "Px4ubnmilH",
      "kM48jbNK7chp",
      "mrhZxsQBimot",
      "bU4WN6aOwS",
      "DF6aXrJ133KV",
      "rftZlYbjWC5d",
      "svYSFyC4gcZa",
      "FYQHAmWEH6tE",
      "1e2POtG4BX1j",
      "PVn2t8uT7eHV",
   ];

   const uploadList = () => {
      for (const track of list) {
         toast.promise(uploadNctById(track, rank, "IWZ9Z08O"), {
            pending: `[NCT][${rank}] Uploading song ${track}...`,
            success: `[NCT][${rank}] Song ${track} uploaded`,
            error: {
               render({ data }) {
                  // When the promise reject, data will contains the error
                  return (
                     <div>
                        <h2 className="text-sm">{`[NCT] Song ${track} uploaded fail with error: `}</h2>
                        <p className="mt-2 text-xs">{data.message}</p>
                     </div>
                  );
               },
            },
         });
      }
   };

   const onUpload = async () => {
      props.onClose();
      // uploadList();

      if (vendor === "zm3") {
         await toast.promise(uploadZingById(songId, rank, country), {
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
      } else if (vendor === "nct") {
         await toast.promise(uploadNctById(songId, rank, country), {
            pending: `[NCT][${rank}] Uploading song ${songId}...`,
            success: `[NCT][${rank}] Song ${songId} uploaded`,
            error: {
               render({ data }) {
                  // When the promise reject, data will contains the error
                  return (
                     <div>
                        <h2 className="text-sm">{`[NCT] Song ${songId} uploaded fail with error: `}</h2>
                        <p className="mt-2 text-xs">{data.message}</p>
                     </div>
                  );
               },
            },
         });
      } else if (vendor === "csn") {
         await toast.promise(uploadCsnByMp3(songId, rank, country), {
            pending: `[CSN][${rank}] Uploading song ${songId}...`,
            success: `[CSN][${rank}] Song ${songId} uploaded`,
            error: {
               render({ data }) {
                  // When the promise reject, data will contains the error
                  return (
                     <div>
                        <h2 className="text-sm">{`[CSN] Song ${songId} uploaded fail with error: `}</h2>
                        <p className="mt-2 text-xs">{data.message}</p>
                     </div>
                  );
               },
            },
         });
      } else {
         toast.error("Not supported vendor");
      }
   };

   const cleanUp = () => {
      setSongId("");
      setRank("Undefined");
      setVendor("csn");
      setCountry("IWZ9Z08I");
   };

   return (
      <Modal {...props} className="p-4 text-primary bg-layout w-96 rounded-xl">
         <header className="w-full py-1 flex-center header">
            <h4 className="text-xl semibold">Add new song with Zing Id</h4>
         </header>
         <main className="w-full gap-3 py-3 flex-c">
            <input
               type="text"
               value={songId}
               onChange={(e) => setSongId(e.target.value)}
               className="px-4 py-2 border outline-none border-secondary rounded-xl bg-alpha"
               placeholder="Enter song Id"
            />
            <select
               className="w-40 px-4 py-[6px] border border-secondary rounded-lg outline-none bg-alpha text-dandelion"
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
            <select
               className="w-40 px-4 py-[6px] border border-secondary rounded-lg outline-none bg-alpha text-dandelion"
               onChange={(e) => setCountry(e.target.value)}
            >
               <option defaultValue value="IWZ9Z08I">
                  VietNam
               </option>
               <option value="IWZ9Z08O">US-UK</option>
               <option value="IWZ9Z08W">Kpop</option>
               <option value="Others">Others</option>
            </select>
            <select
               className="w-40 px-4 py-[6px] border border-secondary rounded-lg outline-none bg-alpha text-dandelion"
               onChange={(e) => setVendor(e.target.value)}
            >
               <option defaultValue value="csn">
                  CSN
               </option>
               <option value="zm3">ZingMp3</option>
               <option value="nct">NCT</option>
            </select>
         </main>
         <div className="flex items-center justify-end w-full gap-6 px-4 pt-4 pb-2">
            <button
               className="w-20 px-3 py-2 transition-all duration-150 ease-out rounded-lg bg-alpha text-navigation hover:text-dandelion hover:bg-dark-alpha-10 hover:opacity-100"
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
