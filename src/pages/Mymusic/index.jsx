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
      <div className="w-full mt-20 mb-20 text-white ">
         <PlaylistModal show={show} onClose={() => setShow(false)} />

         <div className="relative z-10 w-full">
            <div className="flex-btw">
               <div className="flex items-center justify-start gap-4">
                  <h1 className="text-xl font-semibold text-primary">
                     MY PLAYLIST
                  </h1>
                  <button
                     className="p-2 rounded-full outline-none bg-hover-1 hover:text-primary"
                     onClick={() => setShow(!show)}
                  >
                     <MdOutlineAdd className="text-xl" />
                  </button>
               </div>
               <button className="gap-2 flex-center text-secondary hover:text-primary">
                  View All
                  <MdArrowForwardIos />
               </button>
            </div>
            <div className="flex flex-wrap w-full gap-8 py-2 my-6">
               {playlists?.map((p) => (
                  <PlaylistCover key={p.id} playlist={p} />
               ))}
            </div>
         </div>

         <div className="w-full text-white">
            <div className="w-full py-2 border-b border-hover-1">
               <p className="text-lg font-semibold uppercase">Songs</p>
            </div>

            {currentUser?.likedSongs.length > 0 ? (
               currentUser?.likedSongs.map((song) => (
                  <SongItem key={song.id} info={song} playlistMode isPlaylist />
               ))
            ) : (
               <div className="flex-col w-full gap-6 flex-center h-96 text-secondary">
                  <h1 className="text-2xl font-semibold">
                     Songs you like will appear here
                  </h1>
                  <p className="text-sm">
                     Save songs by tapping the heart icon.
                  </p>
                  <Link
                     to="/"
                     className="px-4 py-2 text-white bg-teal-500 rounded-full"
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
