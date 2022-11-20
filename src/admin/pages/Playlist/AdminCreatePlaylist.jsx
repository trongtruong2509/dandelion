import React, { useState, useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import { IoIosMusicalNote } from "react-icons/io";
import { MdCloudUpload, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../common/slices/playingSlice";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";

import AlbumDefault from "./../../../assets/album_default.png";
import { IoCloudUploadOutline } from "react-icons/io5";
import { fetchAllTracks } from "../../slices/adminTrackSlice";

const AdminCreatePlaylist = () => {
   const dispatch = useDispatch();

   const tracks = useSelector((state) => state.adminTrack.allTracks);
   // const allTracks = useSelector((state) => state.adminTrack.allTracks);

   const [thumbnail, setThumbnail] = useState(null);
   const [name, setName] = useState("");
   const [selected, setSelected] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [availableTracks, setAvailableTracks] = useState([]);

   useEffect(() => {
      dispatch(fetchAllTracks());
   }, []);

   useEffect(() => {
      setAvailableTracks(tracks);
   }, [tracks]);

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

   return (
      <div className="w-full mt-10">
         <div className="grid w-full grid-cols-12 my-4">
            <div className="flex col-span-8 gap-5">
               <div className="flex flex-col items-center">
                  <div className="relative z-10 flex w-64 h-64 rounded-lg group">
                     <img
                        src={thumbnail ? thumbnail : AlbumDefault}
                        className="z-10 object-cover w-full h-full rounded-lg"
                     />
                     <label className="absolute top-0 left-0 z-20 items-center justify-center hidden w-full h-full text-2xl text-white rounded-lg cursor-pointer bg-dark-alpha-50 group-hover:flex">
                        <IoCloudUploadOutline className="w-12 h-12" />
                        <input
                           type="file"
                           accept="audio/*"
                           className="w-0 h-0"
                           // onChange={(e) => handleLoadFile(e.target.files[0])}
                        />
                     </label>
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
                  <button className="py-[6px] px-4 rounded-lg bg-dandelion-primary mt-8 text-white">
                     Create
                  </button>
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
