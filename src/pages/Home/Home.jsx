import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import SongItem from "../../common/components/Song/SongItem";
import { getDocInList } from "../../common/utils/firebaseApi";
import { group } from "../../common/utils/common";
import ArtistCover from "../../common/components/Artist/ArtistCover";
import {
   fetchHomepage,
   updateRecentPlaylist,
} from "../../common/slices/dandelionSlice";

import HomeSkeleton from "./HomeSkeleton";
import { paths } from "../../app/routes";
import { IoChevronForward } from "react-icons/io5";

const Home = () => {
   const dispatch = useDispatch();

   const currentUser = useSelector((state) => state.user.user);
   const homePage = useSelector((state) => state.dandelion.homePage);
   const newReleases = useSelector(
      (state) => state.dandelion.homePage.newReleases
   );
   const newPlaylists = useSelector(
      (state) => state.dandelion.homePage.newPlaylists
   );
   const recentPlaylist = useSelector(
      (state) => state.dandelion.homePage.recentPlaylist
   );
   const artists = useSelector((state) => state.dandelion.homePage.artists);

   useEffect(() => {
      if (!(newReleases.length && newPlaylists.length && artists.length)) {
         dispatch(fetchHomepage());
      }
   }, []);

   useEffect(() => {
      if (currentUser) {
         getDocInList("playlists", currentUser.recentPlaylist)
            .then((result) => {
               // correct order for playlist
               const ordered = [];
               currentUser.recentPlaylist?.forEach((playlistId) => {
                  ordered.push(result.find((s) => s.id === playlistId));
               });

               dispatch(updateRecentPlaylist(ordered));
            })
            .catch((err) => console.log(err));
      }
   }, [currentUser]);

   return (
      <>
         {homePage.pending ? (
            <HomeSkeleton />
         ) : (
            <div className="w-full text-primary">
               {currentUser?.recentPlaylist.length > 0 && (
                  <div className="w-full mt-7">
                     <div className="mb-3 flex-btw">
                        <div className="flex items-center justify-start gap-4">
                           <h1 className="text-xl font-bold text-primary">
                              Recently Played
                           </h1>
                        </div>
                        <Link
                           className="gap-1 text-sm flex-center text-secondary hover:text-dandelion-primary"
                           to={paths.playHistory}
                        >
                           View All
                           <IoChevronForward />
                        </Link>
                     </div>
                     <div className="w-full">
                        <Swiper
                           slidesPerView={6}
                           spaceBetween={30}
                           className="w-full"
                        >
                           {recentPlaylist?.map((p) => (
                              <SwiperSlide key={p.id}>
                                 <PlaylistCover info={p} size="sm" />
                              </SwiperSlide>
                           ))}
                        </Swiper>
                     </div>
                  </div>
               )}
               <div className="pt-5">
                  <div className="mb-3 flex-btw">
                     <div className="flex items-center justify-start gap-4">
                        <h1 className="text-xl font-bold text-primary">
                           Your Top Mixes
                        </h1>
                     </div>
                     <Link
                        className="gap-1 text-sm flex-center text-secondary hover:text-dandelion-primary"
                        to={paths.newRelease.replace(":id", "playlist")}
                     >
                        View All
                        <IoChevronForward />
                     </Link>
                  </div>
                  <div className="w-full">
                     {
                        <Swiper
                           slidesPerView={5}
                           spaceBetween={120}
                           className="w-full"
                        >
                           {newPlaylists?.map((p) => (
                              <SwiperSlide key={p.id}>
                                 <PlaylistCover info={p} />
                              </SwiperSlide>
                           ))}
                        </Swiper>
                     }
                  </div>
               </div>
               <div className="pt-5">
                  <div className="mb-3 flex-btw">
                     <div className="flex items-center justify-start gap-4">
                        <button className="text-xl font-bold text-primary">
                           New Uploaded
                        </button>
                     </div>
                     <Link
                        className="gap-1 text-sm flex-center text-secondary hover:text-dandelion-primary"
                        to={paths.newRelease.replace(":id", "song")}
                     >
                        View All
                        <IoChevronForward />
                     </Link>
                  </div>
                  <div className="w-full">
                     <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        className="flex w-full gap-3"
                     >
                        {group(newReleases, 5)?.map((songs, index) => (
                           <SwiperSlide key={index}>
                              {songs.map((s) => (
                                 <div className="my-1" key={s.id}>
                                    <SongItem info={s} size="13" like={false} />
                                 </div>
                              ))}
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className="py-5 mb-10">
                  <div className="mb-3 flex-btw">
                     <div className="flex items-center justify-start gap-4">
                        <p className="text-xl font-bold text-primary">
                           Popular Artists
                        </p>
                     </div>
                  </div>
                  <div className="flex flex-wrap w-full gap-7">
                     {artists?.map((s) => (
                        <div className="my-1" key={s.id}>
                           <ArtistCover info={s} />
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Home;
