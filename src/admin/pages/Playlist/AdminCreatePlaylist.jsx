import React, { useState, useEffect } from "react";
import { IoIosMusicalNote } from "react-icons/io";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../common/slices/playingSlice";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";
import Tippy from "@tippyjs/react/headless"; // different import path!

import AlbumDefault from "./../../../assets/album_default.png";
import { IoCloudUploadOutline } from "react-icons/io5";
import { fetchAllTracks } from "../../slices/adminTrackSlice";
import AddLinkModal from "./AddLinkModal";
import {
   initPlaylist,
   resetUploadStatus,
   uploadPlaylist,
} from "../../slices/uploadSlice";
import { useNavigate } from "react-router-dom";
import { adminPaths } from "../../../app/routes";

const AdminCreatePlaylist = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const tracks = useSelector((state) => state.adminTrack.allTracks);
   const uploadStatus = useSelector((state) => state.upload.uploadStatus);

   const [thumbnail, setThumbnail] = useState(null);
   const [name, setName] = useState("");
   const [selected, setSelected] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [availableTracks, setAvailableTracks] = useState([]);
   const [show, setShow] = useState(false);
   const [id, setId] = useState(null);

   useEffect(() => {
      dispatch(fetchAllTracks());
   }, []);

   useEffect(() => {
      setAvailableTracks(tracks);
   }, [tracks]);

   useEffect(() => {
      if (uploadStatus) {
         dispatch(resetUploadStatus());
         navigate(adminPaths.playlistDetail.replace(":id", id));
      }
   }, [uploadStatus]);

   const onAddTrack = (info) => {
      setSelected([...selected, info]);

      // remove selected in available tracks
      setAvailableTracks(availableTracks.filter((t) => t.id !== info.id));
   };

   const onRemove = (info) => {
      // remove selected in available tracks
      setSelected(selected.filter((t) => t.id !== info.id));

      setAvailableTracks([info, ...availableTracks]);
   };

   const handleLoadFile = async (src) => {
      console.log("[src]", src);

      let reader = new FileReader();
      reader.readAsDataURL(src);
      reader.onload = (e) => {
         setThumbnail(e.target.result);
      };
   };

   const handleLoadLink = (link) => {
      setThumbnail(link);
   };

   const onCreate = () => {
      const playlistId = Date.now().toString();
      setId(playlistId);

      let playlist = {
         id: playlistId,
         title: name,
         user: "Dandelion",
         createdBy: "dandelion",
         description: "",
         link: `/playlist/${playlistId}`,
         thumbnail,
         songs: selected,
         public: true,
         shuffle: true,
      };

      console.log("[onCreate]", playlist);

      dispatch(uploadPlaylist(playlist));
      dispatch(initPlaylist(playlist));
   };

   const hideOnInnerButtonPress = {
      name: "hideOnInnerButtonPress",
      defaultValue: true,
      fn(instance) {
         return {
            onCreate() {
               instance.popper.addEventListener("click", (event) => {
                  if (
                     instance.props.hideOnInnerButtonPress &&
                     event.target.getAttribute("hide-on-press") === "false"
                  ) {
                     setTimeout(() => instance.hide(), 50);
                     console.log("[hideOnInnerButtonPress]", "pressed");
                     return event;
                  }
               });
            },
         };
      },
   };

   return (
      <div className="w-full mt-10">
         <AddLinkModal
            show={show}
            onClose={() => setShow(false)}
            onUpdate={handleLoadLink}
         />

         <div className="grid w-full grid-cols-12 my-4">
            <div className="flex col-span-8 gap-5">
               <div className="flex flex-col items-center">
                  <div className="relative z-10 flex w-64 h-64 rounded-lg group">
                     <img
                        src={thumbnail ? thumbnail : AlbumDefault}
                        className="z-10 object-cover w-full h-full rounded-lg"
                     />

                     <Tippy
                        interactive
                        placement="bottom"
                        appendTo={() => document.body}
                        delay={[0, 700]}
                        plugins={[hideOnInnerButtonPress]}
                        trigger="click"
                        render={(attrs) => (
                           <div
                              className="w-48 h-auto px-2 py-1 rounded-lg shadow-md min-h-20 bg-primary text-primary"
                              tabIndex="-1"
                              {...attrs}
                           >
                              <div className="w-full text-sm">
                                 <div className="gap-3 flex-center">
                                    <button
                                       className="px-3 py-[6px] rounded-lg hover:text-white hover:bg-dandelion-primary text-primary flex-center"
                                       hide-on-press="false"
                                    >
                                       <label
                                          className="flex-center"
                                          hide-on-press="false"
                                       >
                                          Storage
                                          <input
                                             type="file"
                                             accept="image/*"
                                             className="w-0 h-0"
                                             onChange={(e) =>
                                                handleLoadFile(
                                                   e.target.files[0]
                                                )
                                             }
                                          />
                                       </label>
                                    </button>
                                    <button
                                       className="px-3 py-[6px] rounded-lg hover:text-white hover:bg-dandelion-primary text-primary"
                                       hide-on-press="false"
                                       onClick={() => setShow(true)}
                                    >
                                       Link
                                    </button>
                                 </div>
                              </div>
                           </div>
                        )}
                     >
                        <label className="absolute top-0 left-0 z-20 items-center justify-center hidden w-full h-full text-2xl rounded-lg cursor-pointer text-dandelion-primary bg-dark-alpha-50 group-hover:flex">
                           <IoCloudUploadOutline className="w-12 h-12" />
                        </label>
                     </Tippy>
                  </div>
                  <div className="mt-5">
                     <input
                        type="text"
                        className="w-full px-3 py-1 text-center bg-transparent border-b outline-none text-primary border-primary"
                        value={name}
                        placeholder="Enter playlist name"
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <div className="flex gap-5">
                     <button
                        className="py-[6px] px-4 rounded-lg bg-alpha text-primary hover:bg-dark-alpha-50 mt-8 hover:text-white"
                        onClick={() => navigate(adminPaths.playlists)}
                     >
                        Cancel
                     </button>
                     <button
                        className="py-[6px] px-4 rounded-lg bg-dandelion-primary mt-8 text-white"
                        onClick={onCreate}
                     >
                        Create
                     </button>
                  </div>
               </div>
               <div className="w-full">
                  <div>
                     {selected.length > 0 ? (
                        <>
                           <div className="grid w-full grid-cols-12 px-3 py-3 border-b border-primary">
                              <p className="col-span-6 text-sm text-secondary">
                                 SONG
                              </p>
                              <p className="flex items-center col-span-5 text-sm text-secondary">
                                 ALBUM
                              </p>
                              <p className="flex items-center justify-end col-span-1 text-sm text-secondary">
                                 TIME
                              </p>
                           </div>

                           {selected?.map((song, index) => (
                              <SongItem
                                 key={index}
                                 info={song}
                                 // playlistMode
                                 like={false}
                                 canDetele
                                 onDelete={onRemove}
                                 onClick={() => dispatch(update(song))}
                              />
                           ))}
                        </>
                     ) : (
                        <div className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg bg-alpha text-secondary h-72">
                           <IoIosMusicalNote className="italic text-7xl" />
                           <p className="text-lg">
                              Currently no songs in your playlist
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className="col-span-4 ml-10">
               <div className="w-full ">
                  <div className="relative w-full ">
                     <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-[400px] py-[10px] rounded-2xl outline-none bg-alpha pl-10 text-sm text-search"
                        placeholder="Search for song, artist, album..."
                     />
                     <MdSearch className="absolute text-2xl opacity-50 text-placeholder top-2 left-3" />
                  </div>
                  <Filters allTracks={availableTracks} />
               </div>
               <div className="overflow-y-auto max-h-[650px] scrollbar">
                  {availableTracks.map((s) => (
                     <div className="my-1" key={s.id}>
                        <SongItem
                           info={s}
                           size="13"
                           like={false}
                           addPlaylist
                           onAdd={onAddTrack}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminCreatePlaylist;
