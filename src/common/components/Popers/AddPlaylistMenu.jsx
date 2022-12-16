import React, { Children } from "react";
import { useDispatch, useSelector } from "react-redux";

import Tippy from "@tippyjs/react/headless"; // different import path!
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";

import PlaylistImg from "../../../assets/playlist_outline64.png";
import { removeAccents } from "../../utils/common";
import { addTrackToPlaylist } from "../../slices/playlistSlice";
import PlaylistModal from "../Modal/PlaylistModal";

const AddPlaylistMenu = ({ children, songInfo }) => {
   const dispatch = useDispatch();

   const currentUser = useSelector((state) => state.user.user);
   const playlists = useSelector((state) => state.user.playlist);
   const loading = useSelector((state) => state.user.pending);

   const [searchTerm, setSearchTerm] = useState("");
   const [show, setShow] = useState(false);
   // const [chosenTrack, setChosenTrack] = useState(null);

   const createdPlaylist = () => {
      return playlists.filter((p) => p.createdBy === currentUser.id);
   };

   const filterPlaylist = () => {
      return createdPlaylist().filter((p) =>
         removeAccents(p.title.toLowerCase()).includes(removeAccents(searchTerm.toLowerCase()))
      );
   };

   const hideOnInnerButtonPress = {
      name: "hideOnInnerButtonPress",
      defaultValue: true,
      fn(instance) {
         return {
            onCreate() {
               instance.popper.addEventListener("click", (event) => {
                  if (instance.props.hideOnInnerButtonPress && event.target.getAttribute("hide-on-press") === "false") {
                     setTimeout(() => instance.hide(), 50);
                     console.log("[hideOnInnerButtonPress]", "pressed");
                     return event;
                  }
               });
            },
         };
      },
   };

   const handleAddToPlaylist = (playlist, track) => {
      // onClose();
      dispatch(addTrackToPlaylist({ playlist, track }));
   };

   const handleCreateAdd = () => {
      setShow(true);
   };

   return (
      <div>
         <Tippy
            interactive
            delay={[0, 400]}
            trigger="mouseenter"
            placement="right"
            plugins={[hideOnInnerButtonPress]}
            render={(attrs) => (
               <div
                  className="w-[220px] h-[284px] flex-c bg-primary shadow-md rounded-xl -ml-5"
                  tabIndex="-1"
                  {...attrs}
               >
                  <PlaylistModal show={show} onClose={() => setShow(false)} initSong={songInfo} />
                  <div className="w-full h-full p-3">
                     <div className="">
                        <input
                           type="text"
                           className="w-full px-3 py-[6px] rounded-lg outline-none bg-alpha text-primary mb-1"
                           value={searchTerm}
                           placeholder="Find playlist"
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                           className="flex items-center w-full py-3 rounded-lg hover:text-dandelion text-primary"
                           hide-on-press="false"
                           // onClick={() => setShow(true)}
                        >
                           <div className="flex items-center gap-3" hide-on-press="false">
                              <MdOutlineAdd className="text-2xl" hide-on-press="false" />
                              Create new
                           </div>
                        </button>
                     </div>
                     <div className="h-full">
                        {loading ? (
                           <div className="flex-center">
                              <SyncLoader
                                 color="var(--dandelion)"
                                 // loading={adminTrack?.fetching}
                                 cssOverride={{
                                    display: "block",
                                    margin: "0 auto",
                                    borderColor: "red",
                                 }}
                                 size={8}
                              />
                           </div>
                        ) : (
                           <div className="h-[174px] overflow-y-scroll overscroll-auto scrollbar -mr-2">
                              {filterPlaylist()?.map((p, index) => (
                                 <button
                                    className="flex items-center w-full gap-3 py-[6px] px-2 rounded-lg hover:bg-alpha hover:text-primary text-secondary"
                                    key={index}
                                    hide-on-press="false"
                                    onClick={() => handleAddToPlaylist(p, songInfo)}
                                 >
                                    <img
                                       src={PlaylistImg}
                                       alt=""
                                       className="object-cover w-4 h-4"
                                       hide-on-press="false"
                                    />
                                    {p.title}
                                 </button>
                              ))}
                           </div>
                        )}
                     </div>
                  </div>
               </div>
            )}
         >
            {children}
         </Tippy>
      </div>
   );
};

export default AddPlaylistMenu;
