import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoIosAddCircle, IoIosMusicalNote } from "react-icons/io";
import { FiEdit3 } from "react-icons/fi";
import { BiRefresh } from "react-icons/bi";

import AlbumDefault from "./../../../assets/album_default.png";
import {
   getDocById,
   getDocInList,
   getLatestSongs,
} from "../../utils/firebaseApi";
import { shuffleArray } from "../../utils/common";
import SongItem from "../Song/SongItem";
import PlaylistModal from "../Modal/PlaylistModal";

import { update } from "../Playbar/playingSlice";
import { updatePlaylist } from "../Playlist/playlistSlice";
import { updateRecentPlay } from "../../Reducers/userSlice";
import { updateQueue, addASongToPlayed } from "../../Reducers/playQueueSlice";

const PlaylistDetail = ({ id }) => {
   const playlist = useSelector((state) => state.playlist.value);
   const user = useSelector((state) => state.user.value);
   // const playqueue = useSelector((state) => state.playqueue.queue);
   // const played = useSelector((state) => state.playqueue.played);
   const dispatch = useDispatch();

   const [playSongs, setPlaySongs] = useState([]);
   const [suggestSongs, setSuggestSongs] = useState([]);
   const [show, setShow] = useState(false);

   useEffect(() => {
      getDocById("playlists", id)
         .then((result) => {
            dispatch(updatePlaylist(result));

            if (result.songs.length > 0) {
               getDocInList("Songs", result.songs).then((result) => {
                  setPlaySongs(result);
               });
            }
         })
         .catch((err) => console.log(err));

      getLatestSongs()
         .then((result) => {
            const latest = result.slice(0, 10);
            console.log(latest);

            setSuggestSongs(latest);
         })
         .then((error) => {
            console.log("error");
            console.log(error);
         });
   }, [id]);

   useEffect(() => {
      if (playSongs.length > 0) {
         let shuffledSongs = [...playSongs];
         if (playlist.shuffle) {
            shuffleArray(shuffledSongs);
         }

         console.log(shuffledSongs);

         //@todo: dispatch shuffledSong to playingQueue slice
         dispatch(update({ info: shuffledSongs[0], playing: true }));
         dispatch(addASongToPlayed(shuffledSongs[0]));
         dispatch(updateQueue(shuffledSongs.slice(1)));
         dispatch(updateRecentPlay(shuffledSongs[0]));
      }
   }, [playSongs]);

   return (
      <div className="w-full h-full bg-transparent mt-20 relative flex gap-8">
         <PlaylistModal show={show} update onClose={() => setShow(false)} />

         <div className="w-72  flex-shrink-0 text-white sticky top-40 h-72">
            <div className="w-72">
               <img
                  className="w-72 h-72 rounded-md object-cover"
                  src={playlist?.thumbnail ? playlist?.thumbnail : AlbumDefault}
                  alt="Album Thumbnail"
               />
               <div className="relative flex justify-center items-center mt-4 gap-1">
                  <h1 className="text-2xl font-semibold text-center">
                     {playlist?.title}
                  </h1>
                  {playlist?.createdByUserId === user.id && (
                     <button
                        className="text-secondary hover:text-primary hover:bg-hover-1 rounded-full p-2"
                        onClick={() => setShow(!show)}
                     >
                        <FiEdit3 className="text-lg" />
                     </button>
                  )}
               </div>

               <p className="text-xs mt-1 text-secondary text-center">
                  Created by{" "}
                  <span className="text-white font-semibold cursor-pointer hover:text-primary">
                     {playlist?.createdBy}
                  </span>
               </p>
            </div>
         </div>
         <div className="w-full">
            <div>
               {playSongs.length > 0 ? (
                  <>
                     <div className="grid grid-cols-12 px-3 py-3 w-full border-b border-hover-1">
                        <p className="col-span-6 text-secondary text-sm">
                           SONG
                        </p>
                        <p className="col-span-5 text-secondary text-sm flex items-center">
                           ALBUM
                        </p>
                        <p className="col-span-1 text-secondary text-sm flex items-center justify-end">
                           TIME
                        </p>
                     </div>

                     {playSongs?.map((song, index) => (
                        <SongItem
                           key={index}
                           info={song}
                           playlistMode
                           onClick={() => dispatch(update(song))}
                        />
                     ))}
                  </>
               ) : (
                  <div className="bg-hover-1 py-4 flex items-center justify-center text-secondary flex-col gap-2 h-60">
                     <IoIosMusicalNote className="text-7xl italic" />
                     <p className="text-lg">
                        Currently no songs in your playlist
                     </p>
                  </div>
               )}

               {playSongs.length < 10 && (
                  <div className="mt-5">
                     <div className="flex justify-between items-center">
                        <div>
                           <h2 className="text-xl font-semibold">
                              Recommended
                           </h2>
                           <p className="text-sm text-secondary">
                              Based on your recent play
                           </p>
                        </div>
                        <button className="px-5 py-[6px] rounded-2xl bg-teal-500 mr-2 flex justify-center items-center text-sm gap-1">
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
