import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { IoIosMusicalNote } from "react-icons/io";

import { updateTrack } from "../../common/slices/playingSlice";
import {
   fetchCurrentPlaylistInfo,
   addTrackToPlaylist,
   removeTrackFromPlaylist,
} from "../../common/slices/playlistSlice";

import PlaylistHeader from "../../common/components/Playlist/PlaylistHeader";
import SongItem from "../../common/components/Song/SongItem";
import PlaylistSkeleton from "./PlaylistSkeleton";
import { convertTimeToStr } from "../../common/utils/common";
import PlaylistRowHeader from "../../common/components/Playlist/PlaylistRowHeader";

const Playlist = () => {
   const dispatch = useDispatch();
   const params = useParams();

   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const songs = currentPlaylist?.songs;
   const currentSong = useSelector((state) => state.playing.value?.info);
   const loading = useSelector((state) => state.playlist.current.loading);
   const user = useSelector((state) => state.user.user);
   const nonUser = useSelector((state) => state.user.noLogged);

   const [suggestSongs, setSuggestSongs] = useState([]);
   const songRefs = useRef([]);

   useEffect(() => {
      if (user && currentPlaylist?.createdBy === user?.id) {
         let initSuggested = [...user.recentPlayed];
         initSuggested.shift();
         setSuggestSongs(initSuggested);
      }
   }, []);

   useEffect(() => {
      let filtered = [...suggestSongs];

      currentPlaylist?.songs.forEach((s) => {
         filtered = filtered.filter((t) => t.id !== s.id);
      });

      setSuggestSongs(filtered);
   }, [user?.recentPlayed, nonUser?.recentPlayed, currentPlaylist?.songs]);

   useEffect(() => {
      console.log("[params]", params?.id);
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

   useEffect(() => {
      if (songRefs.current.length > 0 && params.id === currentPlaylist.id) {
         const currentIndex = songs.findIndex((s) => s.id === currentSong.id);

         if (currentIndex !== -1) {
            songRefs.current[currentIndex]?.scrollIntoView({ block: "end", behavior: "smooth" });
         }
      }
   }, [currentSong?.id, songRefs, params?.id, currentPlaylist?.id, songs]);

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
                  <PlaylistHeader info={currentPlaylist} />
                  <div className="w-full">
                     <div>
                        {currentPlaylist?.songs?.length > 0 ? (
                           <>
                              <PlaylistRowHeader />
                              {currentPlaylist?.songs?.map((song, index) => (
                                 <SongItem
                                    key={index}
                                    ref={(el) => (songRefs.current = [...songRefs.current, el])}
                                    info={song}
                                    fullMode
                                    isPlaylist
                                    inPlaylist
                                    canDetele={currentPlaylist?.createdBy === user?.id ? true : false}
                                    onDelete={handeDelete}
                                    onClick={() => dispatch(updateTrack(song))}
                                 />
                              ))}
                              <div className="flex w-full gap-2 mt-1 text-xs text-secondary">
                                 <p>
                                    {currentPlaylist?.songs.length > 1
                                       ? `${currentPlaylist?.songs.length} tracks`
                                       : "1 track"}
                                 </p>
                                 <p className="-mt-[14px] text-2xl font-bold flex-center text-secondary">.</p>
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
                                    <h2 className="text-xl semibold text-primary">Recommended</h2>
                                    <p className="text-sm text-secondary">Based on your recently played</p>
                                 </div>
                                 {/* <button className="px-5 py-[6px] rounded-2xl bg-teal-500 mr-2 flex-center text-sm gap-1">
                                    <BiRefresh className="text-xl" />
                                    Refresh
                                 </button> */}
                              </div>
                              <div className="mt-5">
                                 {suggestSongs?.map((s) => (
                                    <SongItem key={s.id} info={s} fullMode addPlaylist onAdd={handleAddToPlaylist} />
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
