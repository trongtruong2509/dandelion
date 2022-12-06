import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IoIosMusicalNote } from "react-icons/io";
import { BiRefresh } from "react-icons/bi";

import { update } from "../../common/slices/playingSlice";
import {
   fetchCurrentPlaylistInfo,
   addTrackToPlaylist,
   removeTrackFromPlaylist,
} from "../../common/slices/playlistSlice";

import PlaylistHeader from "../../common/components/Playlist/PlaylistHeader";
import SongItem from "../../common/components/Song/SongItem";
import PlaylistSkeleton from "./PlaylistSkeleton";
import PlaylistModal from "../../common/components/Modal/PlaylistModal";
import { convertTimeToStr } from "../../common/utils/common";

const Playlist = () => {
   const params = useParams();
   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const loading = useSelector((state) => state.playlist.current.loading);
   // const playingPlaylist = useSelector((state) => state.playlist.playing);
   const user = useSelector((state) => state.user.user);
   const nonUser = useSelector((state) => state.user.noLogged);
   // const isMounted = useRef(false);

   const dispatch = useDispatch();

   const [suggestSongs, setSuggestSongs] = useState(user?.recentPlayed || nonUser?.recentPlayed);
   const [show, setShow] = useState(false);

   useEffect(() => {
      let filtered = [...suggestSongs];

      currentPlaylist?.songs.forEach((s) => {
         filtered = filtered.filter((t) => t.id !== s.id);
      });

      setSuggestSongs(filtered);
   }, [user?.recentPlayed, nonUser?.recentPlayed, currentPlaylist?.songs]);

   useEffect(() => {
      // if currentPlaylist is empty or different id with current id, fetch playlist again.
      // mostly for reload page, change page
      if (!currentPlaylist || currentPlaylist.id !== params?.id) {
         dispatch(fetchCurrentPlaylistInfo(params?.id));
      }
   }, [params?.id]);

   const calcTotalTime = () => {
      let total = 0;

      currentPlaylist?.songs?.forEach((s) => {
         total += s.duration;
      });

      return convertTimeToStr(total, true);
   };

   const handleAddToPlaylist = (track) => {
      setSuggestSongs([...suggestSongs].filter((t) => t.id !== track.id));
      dispatch(addTrackToPlaylist({ playlist: currentPlaylist, track }));
   };

   const handeDelete = (track) => {
      setSuggestSongs([track, ...suggestSongs]);
      dispatch(removeTrackFromPlaylist({ playlist: currentPlaylist, track }));
   };

   return (
      <div className="w-full h-full">
         <div className="relative flex flex-shrink-0 w-full h-auto gap-8 p-12 mb-8 bg-transparent">
            {loading ? (
               <PlaylistSkeleton />
            ) : (
               <>
                  <PlaylistHeader />
                  <div className="w-full">
                     <div>
                        {currentPlaylist?.songs?.length > 0 ? (
                           <>
                              <div className="grid w-full grid-cols-12 p-3 border-b border-secondary">
                                 <p className="col-span-6 text-sm text-secondary">SONG</p>
                                 <p className="flex items-center col-span-5 text-sm text-secondary">ALBUM</p>
                                 <p className="flex items-center justify-end col-span-1 text-sm text-secondary">TIME</p>
                              </div>

                              {currentPlaylist?.songs?.map((song, index) => (
                                 <SongItem
                                    key={index}
                                    info={song}
                                    playlistMode
                                    isPlaylist
                                    inPlaylistPage
                                    canDetele={currentPlaylist?.createdBy === user?.id ? true : false}
                                    onDelete={handeDelete}
                                    onClick={() => dispatch(update(song))}
                                 />
                              ))}
                              <div className="flex w-full gap-2 mt-1 text-xs text-secondary">
                                 <p>
                                    {currentPlaylist?.songs.length > 1
                                       ? `${currentPlaylist?.songs.length} tracks`
                                       : "1 track"}
                                 </p>
                                 <p className="-mt-[14px] text-2xl font-bold flex-center text-primary">.</p>
                                 <p>{calcTotalTime()}</p>
                              </div>
                           </>
                        ) : (
                           <div className="flex-col gap-2 py-4 rounded-md bg-dark-alpha-10 flex-center text-secondary h-60">
                              <IoIosMusicalNote className="italic text-7xl" />
                              <p className="text-lg">Currently no songs in your playlist</p>
                           </div>
                        )}

                        {currentPlaylist?.createdBy === user?.id && currentPlaylist?.songs?.length < 20 && (
                           <div className="mt-5">
                              <div className="flex-btw">
                                 <div>
                                    <h2 className="text-xl font-semibold text-primary">Recommended</h2>
                                    <p className="text-sm text-secondary">Based on your recently played</p>
                                 </div>
                                 <button className="px-5 py-[6px] rounded-2xl bg-teal-500 mr-2 flex-center text-sm gap-1">
                                    <BiRefresh className="text-xl" />
                                    Refresh
                                 </button>
                              </div>
                              <div className="mt-5">
                                 {suggestSongs?.map((s) => (
                                    <SongItem
                                       key={s.id}
                                       info={s}
                                       playlistMode
                                       addPlaylist
                                       onAdd={handleAddToPlaylist}
                                    />
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Playlist;
