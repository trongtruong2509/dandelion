import React from "react";
import { useDispatch } from "react-redux";

import { deleteDocById } from "../../utils/firebaseApi";
import Modal from "./Modal";
import { removeFromRecentPlaylist, updatePlaylists } from "../../slices/userSlice";
import { firebaseKeys } from "../../../dataTemplate";

const DeletePlaylistModal = ({ ...props }) => {
   const dispatch = useDispatch();

   const onDelete = async () => {
      props.onClose();
      dispatch(updatePlaylists(props.info)); // remove from playlist
      dispatch(removeFromRecentPlaylist(props.info.id)); // remove from recent playlist if have
      await deleteDocById(firebaseKeys.playlists, props.info.id);
   };

   return (
      <Modal {...props} className="w-auto p-4 text-primary bg-layout rounded-xl">
         <header className="w-full header text-primary">
            <h4 className="text-lg font-semibold">Delete playlist</h4>
         </header>
         <main className="flex flex-col w-full gap-4 pt-2 text-primary">
            <p>{`Do you want to delete playlist ${props.info.title}? Click OK to continue`}</p>
         </main>
         <div className="flex items-center justify-end w-full gap-4 pt-4">
            <button
               className="w-20 px-3 py-1 rounded-xl bg-dark-alpha-50 text-navigation hover:text-primary hover:bg-alpha"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button
               className="w-20 px-4 py-1 rounded-xl text-primary bg-dandelion-primary"
               onClick={onDelete}
            >
               OK
            </button>
         </div>
      </Modal>
   );
};

export default DeletePlaylistModal;
