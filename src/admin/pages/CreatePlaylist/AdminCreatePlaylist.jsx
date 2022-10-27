import React, { useState, useEffect } from "react";
import { BiRefresh } from "react-icons/bi";
import { IoIosMusicalNote } from "react-icons/io";
import { MdCloudUpload, MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../common/components/Playbar/playingSlice";
import SongItem from "../../../common/components/Song/SongItem";
import Filters from "../../components/Filter/Filters";

import AlbumDefault from "./../../../assets/album_default.png";

const AdminCreatePlaylist = () => {
   const dispatch = useDispatch();

   const tracks = useSelector((state) => state.adminTrack.tracks);
   // const allTracks = useSelector((state) => state.adminTrack.allTracks);

   const [thumbnail, setThumbnail] = useState(null);
   const [name, setName] = useState("");
   const [selected, setSelected] = useState([]);
   const [searchText, setSearchText] = useState("");
   const [availableTracks, setAvailableTracks] = useState([]);

   useEffect(() => {
      setAvailableTracks(tracks);
   }, [tracks]);

   return (
      <div className="w-full mt-10">
         <div className="grid w-full grid-cols-12 gap-5 my-4">
            <div className="flex col-span-7 gap-3">
               <div className="flex flex-col items-center">
                  <div className="relative z-10 flex rounded-lg w-52 h-52 group">
                     <img
                        src={thumbnail ? thumbnail : AlbumDefault}
                        className="z-10 object-cover w-full h-full rounded-lg"
                     />
                     <label className="absolute top-0 left-0 z-20 items-center justify-center hidden w-full h-full text-3xl rounded-lg cursor-pointer bg-overlay-4 text-secondary group-hover:flex">
                        <MdCloudUpload className="w-12 h-12" />
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
                        className="w-48 px-3 py-1 text-white bg-transparent border-b outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                     />
                  </div>
                  <button className="py-[6px] px-4 rounded-lg bg-primary mt-8 text-white">
                     Create
                  </button>
               </div>
               <div className="w-full ">
                  <div>
                     {selected.length > 0 ? (
                        <>
                           <div className="grid w-full grid-cols-12 px-3 py-3 border-b border-hover-1">
                              <p className="col-span-6 text-sm text-secondary">SONG</p>
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
                                 playlistMode
                                 onClick={() => dispatch(update(song))}
                              />
                           ))}
                        </>
                     ) : (
                        <div className="flex flex-col items-center justify-center gap-2 py-4 rounded-lg bg-hover-1 text-secondary h-72">
                           <IoIosMusicalNote className="italic text-7xl" />
                           <p className="text-lg">Currently no songs in your playlist</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
            <div className="col-span-5">
               <div className="w-full ml-10">
                  <div className="relative w-full ">
                     <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-[400px]  py-[10px] rounded-2xl outline-none bg-hover-1 pl-10 text-sm text-white "
                        placeholder="Search for song, artist, album..."
                     />
                     <MdSearch className="absolute text-2xl text-white opacity-50 top-2 left-3" />
                  </div>
                  <Filters allTracks={availableTracks} />
               </div>
               <div>
                  {availableTracks.map((s) => (
                     <div className="my-1" key={s.id}>
                        <SongItem info={s} size="13" like={false} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AdminCreatePlaylist;
