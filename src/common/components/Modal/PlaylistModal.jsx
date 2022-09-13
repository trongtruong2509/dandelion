import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addNewDoc } from "../../utils/firebaseApi";
import Modal from "./Modal";
import { updateCreatedPlaylist } from "../../Reducers/userSlice";

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
      <Modal {...props} className="bg-dark-3 w-96 text-white rounded-xl p-4">
         <header className="header py-1 w-full flex justify-center items-center">
            <h4 className="text-xl font-semibold">Create New Playlist</h4>
         </header>
         <main className="py-3 w-full flex flex-col gap-4">
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="px-4 py-2 border border-hover-1 rounded-xl bg-hover-1 outline-none"
               placeholder="Enter playlist name"
            />
            <textarea
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
               className="py-2 px-4 border border-hover-1 rounded-xl bg-hover-1 outline-none"
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
               onClick={props.update ? onUpdate : onCreate}
            >
               Create
            </button>
         </div>
      </Modal>
   );
};

export default PlaylistModal;
