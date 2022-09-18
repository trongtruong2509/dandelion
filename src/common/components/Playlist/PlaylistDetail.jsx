import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosMusicalNote } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";

import AlbumDefault from "./../../../assets/album_default.png";
import { getDocById, getDocInList } from "../../utils/firebaseApi";
import { shuffleArray } from "../../utils/common";
import SongItem from "../Song/SongItem";
import PlaylistModal from "../Modal/PlaylistModal";

import { update } from "../Playbar/playingSlice";
import {
   updatePlayingTracks,
   updatePlayingPlaylist,
   updateCurrentPlaylist,
   setCurrentTracks,
} from "../../Reducers/playlistSlice";
import { updateRecentPlay } from "../../Reducers/userSlice";
import { initQueue } from "../../Reducers/playQueueSlice";

const PlaylistDetail = ({ id }) => {
   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const currentTracks = useSelector((state) => state.playlist.current.tracks);
   const playingPlaylist = useSelector((state) => state.playlist.playing);
   const user = useSelector((state) => state.user.value);
   // const playqueue = useSelector((state) => state.playqueue.queue);
   // const played = useSelector((state) => state.playqueue.played);
   const dispatch = useDispatch();

   // const [playlistTracks, setPlaylistTracks] = useState([]);
   const [suggestSongs, setSuggestSongs] = useState([]);
   const [show, setShow] = useState(false);
   const isMounted = useRef(false);

   useEffect(() => {
      console.log("[playlist detail] id changed", id);

      // if (playingPlaylist.id === id) {
      //    getDocInList("Songs", playingPlaylist.songs)
      //       .then((result) => {
      //          dispatch(updatePlayingTracks(result));
      //          dispatch(
      //             updatePlayingPlaylist({ ...playingPlaylist, songs: result })
      //          );
      //       })
      //       .catch((err) => console.log("[err] when setPlaylistTracks", err));
      // }

      // if currentPlaylist is empty or different id with current id, fetch playlist again.
      // mostly for reload page, change page
      if (!currentPlaylist || currentPlaylist.id !== id) {
         getDocById("playlists", id)
            .then((result) => {
               dispatch(updateCurrentPlaylist(result));
            })
            .catch((err) => console.log(err));
      }
   }, [id]);

   useEffect(() => {
      if (currentPlaylist?.songs.length > 0) {
         console.log("[result.songs]", currentPlaylist.songs);

         getDocInList("Songs", currentPlaylist.songs)
            .then((result) => {
               console.log("[currentPlaylist] result", result);
               // setPlaylistTracks(result);
               dispatch(setCurrentTracks(result));
            })
            .catch((err) => console.log("[err] when setPlaylistTracks", err));
      }

      // getLatestSongs()
      //    .then((result) => {
      //       const latest = result.slice(0, 10);
      //       console.log(latest);

      //       setSuggestSongs(latest);
      //    })
      //    .then((error) => {
      //       console.log("error");
      //       console.log(error);
      //    });
   }, [currentPlaylist]);

   const shuffleAndUpdate = (songs, shuffle, chosen) => {
      let shuffledSongs = [...songs];

      if (shuffle) {
         shuffleArray(shuffledSongs, chosen);
      }

      dispatch(update({ info: shuffledSongs[0], playing: true }));
      dispatch(updateRecentPlay(shuffledSongs[0]));
      dispatch(initQueue(shuffledSongs));
   };

   useEffect(() => {
      if (isMounted.current) {
         const playing = playingPlaylist.value;
         const track = playingPlaylist?.chosenTrack;

         if (currentPlaylist?.id === playing?.id) {
            if (track) {
               shuffleAndUpdate(playing?.songs, playing.shuffle, track);
            } else {
               if (playing?.songs.length > 0) {
                  shuffleAndUpdate(playing?.songs, playing.shuffle);
               }
            }
         }
      } else {
         isMounted.current = true;
      }
   }, [playingPlaylist?.value]);

   return (
      <div className="relative flex flex-shrink-0 w-full h-auto gap-8 mt-12 mb-8 bg-transparent">
         <PlaylistModal show={show} update onClose={() => setShow(false)} />
         <div className="sticky flex-shrink-0 text-white w-72 top-10 h-fit">
            <div className="w-72">
               <img
                  className="object-cover rounded-md w-72 h-72"
                  src={
                     currentPlaylist?.thumbnail
                        ? currentPlaylist?.thumbnail
                        : AlbumDefault
                  }
                  alt="Album Thumbnail"
               />
               <div className="relative gap-1 mt-4 flex-center">
                  <h1 className="text-2xl font-semibold text-center">
                     {currentPlaylist?.title}
                  </h1>
                  {currentPlaylist?.createdByUserId === user.id && (
                     <button
                        className="p-2 rounded-full text-secondary hover:text-primary hover:bg-hover-1"
                        onClick={() => setShow(!show)}
                     >
                        <FiEdit3 className="text-lg" />
                     </button>
                  )}
               </div>

               <p className="mt-1 text-xs text-center text-secondary">
                  Created by{" "}
                  <span className="font-semibold text-white cursor-pointer hover:text-primary">
                     {currentPlaylist?.createdBy}
                  </span>
               </p>
            </div>
         </div>
         <div className="w-full">
            <div>
               {currentTracks?.length > 0 ? (
                  <>
                     <div className="grid w-full grid-cols-12 p-3 border-b border-hover-1">
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

                     {currentTracks?.map((song, index) => (
                        <SongItem
                           key={index}
                           info={song}
                           playlistMode
                           isPlaylist
                           inPlaylistPage
                           onClick={() => dispatch(update(song))}
                        />
                     ))}
                  </>
               ) : (
                  <div className="flex-col gap-2 py-4 bg-hover-1 flex-center text-secondary h-60">
                     <IoIosMusicalNote className="italic text-7xl" />
                     <p className="text-lg">
                        Currently no songs in your playlist
                     </p>
                  </div>
               )}

               {currentTracks?.length < 10 && (
                  <div className="mt-5">
                     <div className="flex-btw">
                        <div>
                           <h2 className="text-xl font-semibold">
                              Recommended
                           </h2>
                           <p className="text-sm text-secondary">
                              Based on your recent play
                           </p>
                        </div>
                        <button className="px-5 py-[6px] rounded-2xl bg-teal-500 mr-2 flex-center text-sm gap-1">
                           <BiRefresh className="text-xl" />
                           Refresh
                        </button>
                     </div>
                     <div>
                        {suggestSongs.map((s) => {
                           <SongItem key={s.id} info={s} playlistMode />;
                        })}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default PlaylistDetail;
