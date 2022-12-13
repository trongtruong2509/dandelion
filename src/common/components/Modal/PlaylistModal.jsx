import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addNewDoc, updateDocField } from "../../utils/firebaseApi";
import Modal from "./Modal";
import { updateCreatedPlaylist, updatePlaylists } from "../../slices/userSlice";
import { toast } from "react-toastify";
import { firebaseKeys } from "../../../dataTemplate";
import { updateCurrentPlaylist } from "../../slices/playlistSlice";

const PlaylistModal = ({ ...props }) => {
   const user = useSelector((state) => state.user.user);
   const playlist = useSelector((state) => state.playlist.value);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [title, setTitle] = useState(props.update ? props.info?.title : "");
   const [desc, setDesc] = useState(props.update ? props.info?.description : "");
   const [loading, setLoading] = useState(false);

   const onCreate = () => {
      setLoading(true);

      const id = `${Date.now()}`;

      const newPlaylist = {
         id,
         title,
         user: user.name,
         createdBy: user.id,
         description: desc,
         link: `/playlist/${id}`,
         thumbnail: "",
         songs: props.initSong ? [...props.initSongs] : [],
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

      dispatch(updatePlaylists(newPlaylist));
   };

   const onUpdate = async () => {
      props.onClose();

      const updatedProperties = {
         title,
         description: desc,
      };

      try {
         const result = await updateDocField(firebaseKeys.playlists, props.info?.id, updatedProperties);

         if (result) {
            toast.info("Playlist is updated");
            dispatch(updateCurrentPlaylist(result));
         } else {
            toast.error(`Update playlist ${props.info.title} failed`);
         }
      } catch (error) {
         toast.error(`Update playlist ${props.info.title} fail with error: ${error}`);
      }
   };

   return (
      <Modal {...props} className="p-3 text-white bg-layout w-96 rounded-xl">
         <header className="w-full py-1 flex-center header text-primary">
            <h4 className="text-xl font-semibold">{props.update ? "Update playlist" : "Create New Playlist"}</h4>
         </header>
         <main className="flex flex-col w-full gap-4 py-3 text-primary">
            <input
               type="text"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="px-4 py-2 border outline-none border-primary rounded-xl bg-alpha"
               placeholder="Enter playlist name"
            />
            <textarea
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
               className="px-4 py-2 border outline-none border-primary rounded-xl bg-alpha"
               placeholder="Enter descrption"
               rows={5}
            />
         </main>
         <div className="flex items-center justify-end w-full gap-6 pt-4 pb-1">
            <button
               className="w-20 px-3 py-2 rounded-lg bg-dark-alpha-10 text-navigation hover:text-white hover:bg-dark-alpha-50 hover:opacity-100"
               onClick={props.onClose}
            >
               Cancel
            </button>
            <button
               className="w-20 px-3 py-2 text-white bg-teal-500 rounded-lg"
               onClick={props.update ? onUpdate : onCreate}
            >
               {props.update ? "Update" : "Create"}
            </button>
         </div>
      </Modal>
   );
};

export default PlaylistModal;
