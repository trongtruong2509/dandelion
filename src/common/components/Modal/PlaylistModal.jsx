import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addNewDoc } from "../../utils/firebaseApi";
import Modal from "./Modal";
import { updateCreatedPlaylist } from "../../slices/userSlice";

const PlaylistModal = ({ ...props }) => {
   const user = useSelector((state) => state.user.value);
   const playlist = useSelector((state) => state.playlist.value);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [title, setTitle] = useState("");
   const [desc, setDesc] = useState("");
   const [loading, setLoading] = useState(false);

   const onCreate = () => {
      setLoading(true);

      const id = `${Date.now()}`;

      const newPlaylist = {
         id,
         title,
         createdByUserId: user.id,
         createdBy: user.name,
         description: desc,
         link: `/playlist/${id}`,
         thumbnail: "",
         songs: [],
         public: true,
         shuffle: true,
      };

      props.onClose();
      navigate(newPlaylist.link);

      addNewDoc("playlists", newPlaylist, id)
         .then(() => {
            setLoading(false);
         })
         .catch((err) => {
            console.log(err);
            setLoading(true);
         });

      dispatch(updateCreatedPlaylist(id));
   };

   const onUpdate = () => {
      const updatedPlaylist = {
         ...playlist,
         title,
         desc,
         //@todo: shuffle and autoplay?
      };

      // addNewDoc("playlists", updatedPlaylist, playlist.id)
      //    .then(() => {
      //       setLoading(false);
      //    })
      //    .catch((err) => {
      //       console.log(err);
      //       setLoading(true);
      //    });

      console.log("update playlist...");
   };

   return (
      <Modal {...props} className="p-4 text-white bg-dark-3 w-96 rounded-xl">
         <header className="w-full py-1 flex-center header">
            <h4 className="text-xl font-semibold">Create New Playlist</h4>
         </header>
         <main className="flex flex-col w-full gap-4 py-3">
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="px-4 py-2 border outline-none border-hover-1 rounded-xl bg-hover-1"
               placeholder="Enter playlist name"
            />
            <textarea
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
               className="px-4 py-2 border outline-none border-hover-1 rounded-xl bg-hover-1"
               placeholder="Enter descrption"
               rows={5}
            />
         </main>
         <div className="flex items-center justify-end w-full gap-6 px-4 pt-4 pb-2">
            <button
               className="w-20 px-3 py-2 rounded-lg bg-hover-1 text-navigation hover:text-white hover:bg-dark-1 hover:opacity-100"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button
               className="w-20 px-3 py-2 text-white bg-teal-500 rounded-lg"
               onClick={props.update ? onUpdate : onCreate}
            >
               Create
            </button>
         </div>
      </Modal>
   );
};

export default PlaylistModal;
