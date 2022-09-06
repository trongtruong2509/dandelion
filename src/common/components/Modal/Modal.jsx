import React, { useState } from "react";
import ReactDOM from "react-dom";

//https://medium.com/tinyso/how-to-create-a-modal-component-in-react-from-basic-to-advanced-a3357a2a716a

const Modal = ({ ...props }) => {
   if (!props.show) return null;

   return ReactDOM.createPortal(
      <div
         className="modal fixed left-0 top-0 right-0 bottom-0
               bg-overlay-3 flex items-center justify-center z-50"
         onClick={props.onClose}
      >
         <div className={props.className} onClick={(e) => e.stopPropagation()}>
            {props.children}
         </div>
      </div>,
      document.getElementById("root")
   );
};

export default Modal;