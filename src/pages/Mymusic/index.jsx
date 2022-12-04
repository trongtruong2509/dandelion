import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MdArrowForwardIos, MdOutlineAdd } from "react-icons/md";

import { fetchUserPlaylist } from "../../common/slices/userSlice";

import SongItem from "../../common/components/Song/SongItem";
import PlaylistModal from "../../common/components/Modal/PlaylistModal";
import PlaylistCoverCarousel from "../../common/components/PlaylistCover/PlaylistCoverCarousel";
import PlaylistCoverCarouselSkeleton from "../../common/components/PlaylistCover/PlaylistCoverCarouselSkeleton";

const Mymusic = () => {
   const currentUser = useSelector((state) => state.user.user);
   const userPlaylist = useSelector((state) => state.user.playlist);
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);

   useEffect(
      () => {
         dispatch(fetchUserPlaylist(currentUser));
      },
      [currentUser?.playlists],
      currentUser
   );

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
                     className="p-2 rounded-full outline-none bg-alpha hover:text-dandelion-primary text-primary"
                     onClick={() => setShow(!show)}
                  >
                     <MdOutlineAdd className="text-xl" />
                  </button>
               </div>
               <Link
                  className="gap-2 flex-center text-secondary hover:text-primary"
                  to="/mymusic/playlist"
               >
                  View All
                  <MdArrowForwardIos />
               </Link>
            </div>
            <div className="flex w-full gap-8 py-2 my-6">
               {userPlaylist?.length > 0 ? (
                  <PlaylistCoverCarousel playlist={userPlaylist} />
               ) : (
                  <PlaylistCoverCarouselSkeleton />
               )}
            </div>
         </div>

         <div className="w-full text-primary">
            <div className="w-full py-2 border-secondary">
               <p className="text-lg font-semibold uppercase">Liked Songs</p>
            </div>
            <div className="grid w-full grid-cols-12 p-3 border-b border-secondary">
               <p className="col-span-6 text-sm text-secondary">SONG</p>
               <p className="flex items-center col-span-5 text-sm text-secondary">
                  ALBUM
               </p>
               <p className="flex items-center justify-end col-span-1 text-sm text-secondary">
                  TIME
               </p>
            </div>
            {currentUser?.likedSongs.length > 0 ? (
               currentUser?.likedSongs.map((song, index) => (
                  <SongItem key={index} info={song} playlistMode isPlaylist />
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
