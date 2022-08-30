import React, { useState } from "react";
import Modal from "./Modal";

const CreatePlaylistModal = ({ ...props }) => {
   return (
      <Modal {...props} className="bg-dark-3 w-96 text-white rounded-xl p-4">
         <header className="header py-3 w-full flex justify-center items-center">
            <h4 className="text-2xl font-semibold">Create New Playlist</h4>
         </header>
         <main className="py-3 w-full flex flex-col gap-4">
            <input
               type="text"
               className="px-4 py-[10px] border border-hover-1 rounded-lg bg-hover-1 outline-none"
               placeholder="Enter playlist name"
            />
            <textarea
               className="py-3 px-4 border border-hover-1 rounded-lg bg-hover-1 outline-none"
               placeholder="Enter descrption"
               rows={5}
            />
         </main>
         <div className="pt-4 pb-2 flex justify-end items-center gap-6 w-full px-4">
            <button
               className="px-3 py-2 bg-hover-1 rounded-lg text-navigation w-20
               hover:text-white hover:bg-dark-1 hover:opacity-100"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button
               className="px-3 py-2 bg-teal-500 text-white rounded-lg w-20"
               onClick={props.onClose}
            >
               Create
            </button>
         </div>
      </Modal>
   );
};

export default CreatePlaylistModal;
