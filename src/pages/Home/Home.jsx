import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import PlaylistCover from "../../common/components/PlaylistCover/PlaylistCover";
import SongItem from "../../common/components/Song/SongItem";
import { getAllDocs, getDocInList } from "../../common/utils/firebaseApi";
import { group } from "../../common/utils/common";
import ArtistCover from "../../common/components/Artist/ArtistCover";
import { fetchHomepage, updateRecentPlaylist } from "../../common/slices/dandelionSlice";

import HomeSkeleton from "./HomeSkeleton";
import { paths } from "../../app/routes";
import { IoChevronForward } from "react-icons/io5";
import { firebaseKeys } from "../../dataTemplate";
import CoverCarousel from "../../common/components/PlaylistCover/CoverCarousel";
import PlaylistCoverCarouselSkeleton from "../../common/components/PlaylistCover/PlaylistCoverCarouselSkeleton";
import SectionTitleSkeleton from "../../common/components/SectionTitle/SectionTitleSkeleton";
import { getPopularArtist } from "../../common/utils/artists";
import { updateCurrentPlaylist } from "../../common/slices/playlistSlice";
import { initHiddenPlaylist } from "../../common/utils/playlist";

const Home = () => {
   const dispatch = useDispatch();

   const currentUser = useSelector((state) => state.user.user);
   const homePage = useSelector((state) => state.dandelion.homePage);
   const newReleases = useSelector((state) => state.dandelion.homePage.newReleases);
   const newPlaylists = useSelector((state) => state.dandelion.homePage.newPlaylists);
   const recentPlaylist = useSelector((state) => state.dandelion.homePage.recentPlaylist);
   const artists = useSelector((state) => state.dandelion.homePage.artists);

   const [loading, setLoading] = useState(false);
   const [topGenres, setTopGenres] = useState(null);

   useEffect(() => {
      if (!(newReleases.length && newPlaylists.length && artists.length)) {
         dispatch(fetchHomepage());
      }
   }, []);

   useEffect(() => {
      if (newReleases) {
         dispatch(updateCurrentPlaylist(initHiddenPlaylist(newReleases)));
      }
   }, [newReleases]);

   useEffect(() => {
      const fetchTopGenres = async () => {
         setLoading(true);
         const genres = await getAllDocs(firebaseKeys.topGenres);

         const playlistIds = genres.map((g) => g.topPlaylist).flat();
         const playlists = await getDocInList(firebaseKeys.playlists, playlistIds);

         genres.forEach((genre) => {
            const fullPlaylist = genre.topPlaylist.map((id) => playlists.find((p) => p.id === id));
            genre.topPlaylist = fullPlaylist;
         });

         setTopGenres(genres);
         setLoading(false);
      };

      fetchTopGenres();
   }, []);

   useEffect(() => {
      if (currentUser) {
         getDocInList(firebaseKeys.playlists, currentUser.recentPlaylist)
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
                           <h1 className="text-xl font-bold text-primary">Recently Played</h1>
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
                        <CoverCarousel playlist={recentPlaylist} size="sm" />
                     </div>
                  </div>
               )}
               <div className="pt-5">
                  <div className="mb-3 flex-btw">
                     <div className="flex items-center justify-start gap-4">
                        <h1 className="text-xl font-bold text-primary">Your Top Mixes</h1>
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
                     <CoverCarousel playlist={newPlaylists} />
                  </div>
               </div>
               <div className="pt-5">
                  <div className="mb-3 flex-btw">
                     <div className="flex items-center justify-start gap-4">
                        <button className="text-xl font-bold text-primary">New Uploaded</button>
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
                     <Swiper slidesPerView={3} spaceBetween={20} className="flex w-full gap-3">
                        {group(newReleases, 5)?.map((songs, index) => (
                           <SwiperSlide key={index}>
                              {songs.map((s) => (
                                 <div className="my-1" key={s.id}>
                                    <SongItem info={s} size="13" like={false} inPlaylist />
                                 </div>
                              ))}
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className="py-5">
                  <div className="mb-3 flex-btw">
                     <div className="flex items-center justify-start gap-4">
                        <p className="text-xl font-bold text-primary">Popular Artists</p>
                     </div>
                  </div>
                  <div className="w-full">
                     <CoverCarousel playlist={artists} artistMode />
                  </div>
               </div>

               <div>
                  {loading ? (
                     [1, 2, 3, 4, 5].map((genre) => (
                        <div className="pt-5" key={genre}>
                           <SectionTitleSkeleton />
                           <PlaylistCoverCarouselSkeleton />
                        </div>
                     ))
                  ) : (
                     <>
                        {topGenres?.map((genre) => (
                           <div className="pt-5" key={genre.id}>
                              <h1 className="mb-5 text-xl font-bold text-primary">{genre.name}</h1>
                              <div>
                                 <CoverCarousel playlist={genre?.topPlaylist} />
                              </div>
                           </div>
                        ))}
                     </>
                  )}
               </div>
            </div>
         )}
      </>
   );
};

export default Home;
