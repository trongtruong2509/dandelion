import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminPaths } from "../../../app/routes";

import Modal from "../../../common/components/Modal/Modal";
import { getTracks } from "../../slices/uploadSlice";

const UploadMultiModal = ({ ...props }) => {
   const dispatch = useDispatch();
   // const navigate = useNavigate();

   const [inputId, setInputId] = useState("BIGBANG");
   const [category, setCategory] = useState("Artist");

   const onUpload = async () => {
      props.onClose();

      if (category && inputId) {
         console.log("[onUpload] category +  inputId", category, inputId);
         dispatch(getTracks({ category, id: inputId }));
      }
   };

   return (
      <Modal {...props} className="p-4 text-primary bg-layout w-96 rounded-xl">
         <header className="flex items-center justify-center w-full py-1 header">
            <h4 className="text-xl font-semibold">Add new song with Zing Id</h4>
         </header>
         <main className="flex flex-col w-full gap-4 py-3">
            <select
               className="w-full px-4 py-[6px] border border-secondary rounded-lg outline-none bg-alpha text-primary"
               onChange={(e) => setCategory(e.target.value)}
            >
               <option defaultValue value="Artist">
                  Artist
               </option>
               <option value="Playlist">Playlist</option>
               <option value="Album">Album</option>
            </select>
            <input
               type="text"
               value={inputId}
               onChange={(e) => setInputId(e.target.value)}
               className="px-4 py-2 border rounded-lg outline-none border-secondary bg-alpha"
               placeholder="Enter Id"
            />
         </main>
         <div className="flex items-center justify-end w-full gap-6 px-4 pt-4 pb-2">
            <button
               className="w-20 px-3 py-2 rounded-lg bg-hover-1 text-navigation hover:text-dandelion-primary hover:bg-alpha hover:opacity-100"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button
               className="w-20 px-3 py-2 text-white bg-teal-500 rounded-lg"
               onClick={onUpload}
            >
               Query
            </button>
         </div>
      </Modal>
   );
};

export default UploadMultiModal;
