// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Tippy from "@tippyjs/react/headless"; // different import path!

// import { IoIosMusicalNote } from "react-icons/io";
// import { MdSearch } from "react-icons/md";
// import { fetchAllTracks } from "../../slices/adminTrackSlice";
// import { IoCloudUploadOutline } from "react-icons/io5";

// import { adminPaths } from "../../../app/routes";
// import { update } from "../../../common/slices/playingSlice";
// import {
//    initPlaylist,
//    resetUploadStatus,
//    uploadPlaylist,
// } from "../../slices/uploadSlice";
// import AlbumDefault from "./../../../assets/album_default.png";

// import Filters from "../../components/Filter/Filters";
// import SongItem from "../../../common/components/Song/SongItem";
// import AddLinkModal from "./AddLinkModal";
// import PlaylistRowHeader from "../../../common/components/Playlist/PlaylistRowHeader";

// const AdminPlaylistHeader = ({}) => {
//    return (
//       <div className="flex-c items-center">
//          <div className="relative z-10 flex w-64 h-64 rounded-lg group">
//             <img
//                src={thumbnail ? thumbnail : AlbumDefault}
//                className="z-10 object-cover w-full h-full rounded-lg"
//             />

//             <Tippy
//                interactive
//                placement="bottom"
//                appendTo={() => document.body}
//                delay={[0, 700]}
//                plugins={[hideOnInnerButtonPress]}
//                trigger="click"
//                render={(attrs) => (
//                   <div
//                      className="w-48 h-auto px-2 py-1 rounded-lg shadow-md min-h-20 bg-primary text-primary"
//                      tabIndex="-1"
//                      {...attrs}
//                   >
//                      <div className="w-full text-sm">
//                         <div className="gap-3 flex-center">
//                            <button
//                               className="px-3 py-[6px] rounded-lg hover:text-white hover:bg-dandelion text-primary flex-center"
//                               hide-on-press="false"
//                            >
//                               <label
//                                  className="flex-center"
//                                  hide-on-press="false"
//                               >
//                                  Storage
//                                  <input
//                                     type="file"
//                                     accept="image/*"
//                                     className="w-0 h-0"
//                                     onChange={(e) =>
//                                        handleLoadFile(e.target.files[0])
//                                     }
//                                  />
//                               </label>
//                            </button>
//                            <button
//                               className="px-3 py-[6px] rounded-lg hover:text-white hover:bg-dandelion text-primary"
//                               hide-on-press="false"
//                               onClick={() => setShow(true)}
//                            >
//                               Link
//                            </button>
//                         </div>
//                      </div>
//                   </div>
//                )}
//             >
//                <label className="absolute top-0 left-0 z-20 items-center justify-center hidden w-full h-full text-2xl rounded-lg cursor-pointer text-dandelion bg-dark-alpha-50 group-hover:flex">
//                   <IoCloudUploadOutline className="w-12 h-12" />
//                </label>
//             </Tippy>
//          </div>
//          <div className="mt-5">
//             <input
//                type="text"
//                className="w-full px-3 py-1 text-center bg-transparent border-b outline-none text-primary border-primary"
//                value={name}
//                placeholder="Enter playlist name"
//                onChange={(e) => setName(e.target.value)}
//             />
//          </div>
//          <button
//             className="py-[6px] px-4 rounded-lg bg-dandelion mt-8 text-white"
//             onClick={onUpdate}
//          >
//             Update
//          </button>
//       </div>
//    );
// };

// export default AdminPlaylistHeader;
