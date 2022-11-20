import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "../../../common/components/Modal/Modal";

const AddLinkModal = ({ ...props }) => {
   const [link, setLink] = useState("");

   return (
      <Modal
         {...props}
         className="p-4 text-white bg-layout w-[600px] rounded-xl"
      >
         <header className="relative flex items-center w-full pb-1 header text-primary">
            <h4 className="text-2xl font-bold">Add Link</h4>
            <button
               className="absolute top-0 right-0 text-2xl text-right opacity-50 font-extralight text-secondary hover:text-dandelion-primary hover:opacity-100"
               onClick={props.onClose}
            >
               <IoCloseOutline />
            </button>
         </header>
         <main className="flex flex-col w-full gap-4 py-3 text-primary">
            <input
               type="text"
               value={link}
               onChange={(e) => setLink(e.target.value)}
               className="px-4 py-2 border outline-none border-primary rounded-xl bg-alpha"
               placeholder="Enter playlist name"
            />
         </main>
         <div className="flex items-center justify-end w-full gap-6 pt-4 pb-2">
            <button
               className="w-20 px-3 py-[6px] rounded-lg bg-dark-alpha-10 text-navigation hover:text-white hover:bg-dark-alpha-50 hover:opacity-100"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button
               className="w-20 px-3 py-[6px] text-white bg-dandelion-primary rounded-lg"
               onClick={() => {
                  props.onUpdate(link);
                  props.onClose();
                  setLink("");
               }}
            >
               OK
            </button>
         </div>
      </Modal>
   );
};

export default AddLinkModal;
