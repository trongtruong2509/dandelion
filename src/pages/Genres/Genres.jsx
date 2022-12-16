import React, { useState, useEffect } from "react";

import { paths } from "../../app/routes";
import { getAllDocs, getDocInList } from "../../common/utils/firebaseApi";
import { CountryGenres, TopicGenres } from "../../data";
import { firebaseKeys } from "../../dataTemplate";

import TopicItem from "./TopicItem";
import CountryItem from "./CountryItem";
import CoverCarousel from "../../common/components/PlaylistCover/CoverCarousel";
import SectionTitleSkeleton from "../../common/components/SectionTitle/SectionTitleSkeleton";
import PlaylistCoverCarouselSkeleton from "../../common/components/PlaylistCover/PlaylistCoverCarouselSkeleton";

const Genres = () => {
   const [displayAll, setDisplayAll] = useState(false);

   const [loading, setLoading] = useState(false);
   const [topGenres, setTopGenres] = useState(null);

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

   return (
      <div className="w-full text-primary">
         <div className="py-5">
            <div className="mb-5 flex-btw">
               <div className="flex items-center justify-start gap-4">
                  <h1 className="text-xl font-bold text-primary">Mood and Activity</h1>
               </div>
            </div>
            <div className="grid w-full grid-cols-4 gap-6">
               {displayAll ? (
                  TopicGenres.map((t, index) => (
                     <TopicItem
                        key={index}
                        className="col-span-1"
                        thumbnail={t.thumbnail}
                        topic={t.name}
                        to={paths.genre.replace(":id", t.name)}
                     />
                  ))
               ) : (
                  <>
                     {TopicGenres.slice(0, 8).map((t, index) => (
                        <TopicItem
                           key={index}
                           className="col-span-1"
                           thumbnail={t.thumbnail}
                           topic={t.name}
                           to={paths.genre.replace(":id", t.id)}
                        />
                     ))}

                     {!displayAll && (
                        <div className="w-full col-span-4 pb-3 flex-center">
                           <button
                              className="px-5 py-[6px] transition-all duration-150 ease-out border rounded-3xl text-primary border-primary hover:text-dandelion"
                              onClick={() => setDisplayAll(true)}
                           >
                              Show All
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
         <div className="py-7">
            <h1 className="mb-5 text-xl font-bold text-primary">By Country</h1>
            <div className="grid w-full grid-cols-4 gap-6">
               {CountryGenres.map((t, index) => (
                  <CountryItem
                     key={index}
                     className="col-span-1 "
                     thumbnail={t.thumbnail}
                     topic={t.name}
                     to={paths.countryGenre.replace(":id", t.id)}
                  />
               ))}
            </div>
         </div>

         {loading ? (
            <>
               {[1, 2, 3, 4, 5].map((genre) => (
                  <div className="pt-7" key={genre}>
                     <SectionTitleSkeleton />
                     <PlaylistCoverCarouselSkeleton />
                  </div>
               ))}
            </>
         ) : (
            <>
               {topGenres?.map((genre) => (
                  <div className="pt-7" key={genre.id}>
                     <h1 className="mb-5 text-xl font-bold text-primary">{genre.name}</h1>

                     <div>
                        <CoverCarousel playlist={genre?.topPlaylist} />
                     </div>
                  </div>
               ))}
            </>
         )}

         <div className="pt-20"></div>
      </div>
   );
};

export default Genres;
