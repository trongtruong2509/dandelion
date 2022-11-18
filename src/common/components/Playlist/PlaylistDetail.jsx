import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   IoIosMusicalNote,
   IoIosShuffle,
   IoMdPause,
   IoMdPlay,
} from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";
// import SyncLoader from "react-spinners/SyncLoader";

import AlbumDefault from "./../../../assets/album_default.png";
import { getDocInList } from "../../utils/firebaseApi";
import { shuffleArray } from "../../utils/common";
import SongItem from "../Song/SongItem";
import PlaylistModal from "../Modal/PlaylistModal";

import { pause, play, update } from "../../slices/playingSlice";
import {
   setCurrentTracks,
   fetchCurrentPlaylistInfo,
   updateCurrentToPlaying,
} from "../../slices/playlistSlice";
import { updateRecentPlay } from "../../slices/userSlice";
import { initQueue } from "../../slices/playQueueSlice";
import { MdFavorite } from "react-icons/md";
import { FaPause, FaPlay } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const PlaylistDetail = ({ id }) => {
   const currentPlaylist = useSelector((state) => state.playlist.current.value);
   const playingPlaylist = useSelector((state) => state.playlist.playing);
   const currentTracks = useSelector((state) => state.playlist.current.tracks);
   const playingTrack = useSelector((state) => state.playing.value);
   const user = useSelector((state) => state.user.value);
   // const playqueue = useSelector((state) => state.playqueue.queue);
   // const played = useSelector((state) => state.playqueue.played);
   const dispatch = useDispatch();

   // const [playlistTracks, setPlaylistTracks] = useState([]);
   const [suggestSongs, setSuggestSongs] = useState([]);
   const [show, setShow] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const isMounted = useRef(false);
   const [thumbnailRotateOff, setThumbnailRotateOff] = useState(
      "rounded-md transition-[border-radius] duration-500 delay-500 ease-out"
   );

   useEffect(() => {
      console.log("[playlist detail] id changed", id);

      // if currentPlaylist is empty or different id with current id, fetch playlist again.
      // mostly for reload page, change page
      if (!currentPlaylist || currentPlaylist.id !== id) {
         dispatch(fetchCurrentPlaylistInfo(id));
         // getDocById("playlists", id)
         //    .then((result) => {
         //       dispatch(updateCurrentPlaylist(result));
         //    })
         //    .catch((err) => console.log(err));
      }
   }, [id]);

   useEffect(() => {
      if (currentPlaylist?.songs?.length) {
         console.log("[result.songs]", currentPlaylist.songs);
         getDocInList("Songs", currentPlaylist.songs)
            .then((result) => {
               console.log("[currentPlaylist] result", result);
               // setPlaylistTracks(result);
               dispatch(setCurrentTracks(result));
            })
            .catch((err) => console.log("[err] when setPlaylistTracks", err));
      }
   }, [currentPlaylist]);

   const shuffleAndPlay = (songs, shuffle, chosen) => {
      let shuffledSongs = [...songs];

      if (shuffle) {
         shuffleArray(shuffledSongs, chosen);
      }

      dispatch(update({ info: shuffledSongs[0], playing: true }));
      dispatch(updateRecentPlay(shuffledSongs[0]));
      dispatch(initQueue(shuffledSongs));
   };

   const thumbnailRotate =
      "animate-[spin_12s_linear_infinite] rounded-full transition-[border-radius] duration-[2000ms] ease-out";
   // let thumbnailRotateOff =
   //    "rounded-md transition-[border-radius] duration-500 delay-500 ease-out";

   const onPlay = () => {
      if (!thumbnailRotateOff.includes("animate-[spinoff_0.5s_ease_1]")) {
         setThumbnailRotateOff(
            `${thumbnailRotateOff} animate-[spinoff_0.5s_ease_1]`
         );
      }

      console.log("[onPlay] clicked");
      if (currentPlaylist?.id !== playingPlaylist?.value?.id) {
         dispatch(updateCurrentToPlaying());
      } else {
         dispatch(play());
      }
   };

   const onPause = () => {
      dispatch(pause());
   };

   useEffect(() => {
      if (isMounted.current) {
         const playing = playingPlaylist.value;
         const track = playingPlaylist?.chosenTrack;

         if (currentPlaylist?.id === playing?.id) {
            if (track) {
               shuffleAndPlay(playing?.songs, playing.shuffle, track);
            } else {
               if (playing?.songs.length > 0) {
                  shuffleAndPlay(playing?.songs, playing.shuffle);
               }
            }
         }
      } else {
         isMounted.current = true;
      }
   }, [playingPlaylist?.value]);

   return (
      <div className="relative flex flex-shrink-0 w-full h-auto gap-8 pb-12 mt-12 mb-8 bg-transparent">
         <PlaylistModal show={show} update onClose={() => setShow(false)} />

         <div className="sticky flex-shrink-0 text-white w-72 top-10 h-fit">
            <div
               className={`overflow-hidden shadow-lg w-72 group h-72 hover:cursor-pointer ${
                  playingTrack?.playing ? thumbnailRotate : thumbnailRotateOff
               }`}
               onClick={playingTrack?.playing ? onPause : onPlay}
            >
               <img
                  className="object-cover w-full h-full transition-all duration-500 ease-out group-hover:scale-105"
                  src={
                     currentPlaylist?.thumbnail
                        ? currentPlaylist?.thumbnail
                        : AlbumDefault
                  }
                  alt="Playlist Cover"
               />
               {currentTracks && currentTracks.length && (
                  <div className="absolute top-0 left-0 items-center justify-center hidden gap-6 text-white rounded-md w-72 h-72 group-hover:flex">
                     {/* <button className="p-2 rounded-full hover:bg-hover-2">
                     <MdFavoriteBorder className="text-2xl cursor-pointer" />
                  </button> */}

                     {playingTrack?.playing ? (
                        <button className="hover:text-dandelion-primary">
                           <FaPause className="text-3xl cursor-pointer" />
                        </button>
                     ) : (
                        <button className="hover:text-dandelion-primary">
                           <FaPlay className="text-3xl cursor-pointer" />
                        </button>
                     )}
                  </div>
               )}
            </div>

            <div>
               <div className="relative gap-1 mt-4 flex-center">
                  <h1 className="text-2xl font-semibold text-center text-primary">
                     {currentPlaylist?.title}
                  </h1>
                  {currentPlaylist?.createdByUserId === user.id && (
                     <button
                        className="p-2 rounded-full text-secondary hover:text-primary hover:bg-alpha"
                        onClick={() => setShow(!show)}
                     >
                        <FiEdit3 className="text-lg" />
                     </button>
                  )}
               </div>
               <p className="mt-1 mb-5 text-xs text-center text-secondary">
                  Created by{" "}
                  <span className="font-semibold cursor-pointer text-primary hover:text-dandelion-primary">
                     {currentPlaylist?.createdBy}
                  </span>
               </p>

               {currentTracks && currentTracks.length && (
                  <div className="flex items-center justify-center w-full">
                     {currentPlaylist?.id !== playingPlaylist?.value?.id ? (
                        <button
                           className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion-primary rounded-3xl"
                           onClick={onPlay}
                        >
                           <IoIosShuffle className="text-lg" />
                           Shuffle Play
                        </button>
                     ) : playingTrack?.playing ? (
                        <button
                           className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion-primary rounded-3xl"
                           onClick={onPause}
                        >
                           <IoMdPause className="text-lg" />
                           Pause
                        </button>
                     ) : (
                        <button
                           className="flex items-center gap-1 px-5 py-2 text-sm uppercase bg-dandelion-primary rounded-3xl"
                           onClick={onPlay}
                        >
                           <IoMdPlay className="text-lg" />
                           Continue
                        </button>
                     )}
                  </div>
               )}

               <div className="flex items-center justify-center gap-4 mt-5">
                  <button className="p-2 rounded-full cursor-pointer flex-center bg-alpha">
                     <MdFavorite className="text-lg text-dandelion-primary" />
                  </button>
                  <button className="p-2 rounded-full cursor-pointer flex-center bg-alpha">
                     <HiOutlineDotsHorizontal className="text-lg text-primary" />
                  </button>
               </div>
            </div>
         </div>
         <div className="w-full">
            <div>
               {currentTracks?.length > 0 ? (
                  <>
                     <div className="grid w-full grid-cols-12 p-3 border-b border-secondary">
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
                     <div className="flex w-full gap-2 mt-1 text-sm text-secondary">
                        <p>
                           {currentTracks.length > 1
                              ? `${currentTracks.length} tracks`
                              : "1 track"}
                        </p>
                        <p className="-mt-3 text-2xl font-bold flex-center text-primary">
                           .
                        </p>
                        <p>11 mins</p>
                     </div>
                  </>
               ) : (
                  <div className="flex-col gap-2 py-4 rounded-md bg-dark-alpha-10 flex-center text-secondary h-60">
                     <IoIosMusicalNote className="italic text-7xl" />
                     <p className="text-lg">
                        Currently no songs in your playlist
                     </p>
                  </div>
               )}

               {currentTracks?.length < 15 && (
                  <div className="mt-5">
                     <div className="flex-btw">
                        <div>
                           <h2 className="text-xl font-semibold text-primary">
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
