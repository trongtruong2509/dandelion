import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { MdArrowForwardIos, MdOutlineAdd } from "react-icons/md";

import PlaylistModal from "../../common/components/Modal/PlaylistModal";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import SongItem from "../../common/components/Song/SongItem";
import { getDocInList } from "../../common/utils/firebaseApi";

const Mymusic = () => {
   const currentUser = useSelector((state) => state.user.value);

   const [playlists, setPlaylists] = useState([]);
   const [show, setShow] = useState(false);

   useEffect(() => {
      getDocInList("playlists", currentUser.recentPlaylist)
         .then((result) => {
            const ordered = [];
            console.log("[result]", result);

            // correct order for playlist
            currentUser.recentPlaylist?.forEach((playlistId) => {
               ordered.push(result.find((s) => s.id === playlistId));
            });

            setPlaylists(ordered);
         })
         .catch((err) => console.log(err));
   }, [currentUser.recentPlaylist]);

   console.log("[playlists]", playlists);

   return (
      <div className="w-full mt-20 text-white mb-20 ">
         <PlaylistModal show={show} onClose={() => setShow(false)} />

         <div className="w-full z-10 relative">
            <div className="flex justify-between items-center">
               <div className="flex gap-4 justify-start items-center">
                  <h1 className="text-xl text-primary font-semibold">
                     MY PLAYLIST
                  </h1>
                  <button
                     className="p-2 bg-hover-1 hover:text-primary rounded-full outline-none"
                     onClick={() => setShow(!show)}
                  >
                     <MdOutlineAdd className="text-xl" />
                  </button>
               </div>
               <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                  View All
                  <MdArrowForwardIos />
               </button>
            </div>
            <div className="w-full py-2 flex gap-8 flex-wrap my-6">
               {playlists?.map((p) => (
                  <PlaylistCover key={p.id} playlist={p} />
               ))}
            </div>
         </div>

         <div className="w-full text-white">
            <div className="w-full border-b border-hover-1 py-2">
               <p className="uppercase text-lg font-semibold">Songs</p>
            </div>

            {currentUser?.likedSongs.length > 0 ? (
               currentUser?.likedSongs.map((song) => (
                  <SongItem key={song.id} info={song} playlistMode isPlaylist />
               ))
            ) : (
               <div className="w-full flex flex-col gap-6 items-center justify-center h-96 text-secondary">
                  <h1 className="text-2xl font-semibold">
                     Songs you like will appear here
                  </h1>
                  <p className="text-sm">
                     Save songs by tapping the heart icon.
                  </p>
                  <Link
                     to="/"
                     className="px-4 py-2 rounded-full bg-teal-500 text-white"
                  >
                     Explore Now
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default Mymusic;
