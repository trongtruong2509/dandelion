import React from "react";
import { useDispatch } from "react-redux";

import Modal from "./Modal";

const ConfirmModal = ({ ...props }) => {
   return (
      <Modal {...props} className="w-auto min-w-[500px] p-4 text-primary bg-layout rounded-xl">
         <header className="w-full header text-primary">
            <h4 className="text-lg semibold">{props.modalTitle}</h4>
         </header>
         <main className="flex-c w-full gap-4 pt-2 text-primary">
            <p>{props.content}</p>
         </main>
         <div className="flex items-center justify-end w-full gap-4 pt-4">
            <button
               className="w-20 px-3 py-1 rounded-xl bg-dark-alpha-50 text-navigation hover:text-primary hover:bg-alpha"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button className="w-20 px-4 py-1 rounded-xl text-primary bg-dandelion" onClick={props.onOK}>
               OK
            </button>
         </div>
      </Modal>
   );
};

export default ConfirmModal;
