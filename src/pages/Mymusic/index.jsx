import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { MdArrowForwardIos, MdOutlineAdd } from "react-icons/md";

import { fetchUserPlaylist } from "../../common/slices/userSlice";

import SongItem from "../../common/components/Song/SongItem";
import PlaylistModal from "../../common/components/Modal/PlaylistModal";
import CoverCarousel from "../../common/components/PlaylistCover/CoverCarousel";
import PlaylistCoverCarouselSkeleton from "../../common/components/PlaylistCover/PlaylistCoverCarouselSkeleton";
import { updateCurrentPlaylist } from "../../common/slices/playlistSlice";
import { initHiddenPlaylist } from "../../common/utils/playlist";
import { paths } from "../../app/routes";
import PlaylistRowHeader from "../../common/components/Playlist/PlaylistRowHeader";

const Mymusic = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const currentUser = useSelector((state) => state.user.user);
   const userPlaylist = useSelector((state) => state.user.playlist);

   const [show, setShow] = useState(false);

   // init current playlist for liked songs
   useEffect(() => {
      if (!currentUser) {
         navigate(paths.home);
      } else if (currentUser?.likedSongs) {
         dispatch(updateCurrentPlaylist(initHiddenPlaylist(currentUser.likedSongs, "hidden_mymusic")));
      }
   }, [currentUser?.likedSongs, currentUser]);

   useEffect(() => {
      dispatch(fetchUserPlaylist(currentUser));
   }, [currentUser?.playlists]);

   return (
      <div className="w-full mt-20 mb-20 text-white ">
         <PlaylistModal show={show} onClose={() => setShow(false)} />

         <div className="relative z-10 w-full">
            <div className="flex-btw">
               <div className="flex items-center justify-start gap-4">
                  <h1 className="text-xl semibold text-primary">MY PLAYLIST</h1>
                  <button
                     className="p-2 rounded-full outline-none bg-alpha hover:text-dandelion text-primary"
                     onClick={() => setShow(!show)}
                  >
                     <MdOutlineAdd className="text-xl" />
                  </button>
               </div>
               <Link className="gap-2 flex-center text-secondary hover:text-primary" to="/mymusic/playlist">
                  View All
                  <MdArrowForwardIos />
               </Link>
            </div>
            <div className="flex w-full gap-8 py-2 my-6">
               {userPlaylist?.length > 0 ? (
                  <CoverCarousel canDelete playlist={userPlaylist} />
               ) : (
                  <PlaylistCoverCarouselSkeleton />
               )}
            </div>
         </div>

         <div className="w-full text-primary">
            <div className="w-full py-2 border-secondary">
               <p className="text-lg uppercase semibold">Liked Songs</p>
            </div>
            <PlaylistRowHeader />

            {currentUser?.likedSongs.length > 0 ? (
               currentUser?.likedSongs.map((song, index) => <SongItem key={index} info={song} fullMode inPlaylist />)
            ) : (
               <div className="flex-col w-full gap-6 flex-center h-96 text-secondary">
                  <h1 className="text-2xl semibold">Songs you like will appear here</h1>
                  <p className="text-sm">Save songs by tapping the heart icon.</p>
                  <Link to="/" className="px-4 py-2 text-white bg-teal-500 rounded-full">
                     Explore Now
                  </Link>
               </div>
            )}
         </div>
      </div>
   );
};

export default Mymusic;
