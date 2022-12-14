import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

import { getDocById } from "../../common/utils/firebaseApi";
import { fetchCountryGenreInfo } from "../../common/utils/genres";
import { firebaseKeys } from "../../dataTemplate";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { group } from "../../common/utils/common";
import CoverCarousel from "../../common/components/PlaylistCover/CoverCarousel";
import SectionTitleSkeleton from "../../common/components/SectionTitle/SectionTitleSkeleton";
import PlaylistCoverCarouselSkeleton from "../../common/components/PlaylistCover/PlaylistCoverCarouselSkeleton";
import SongItem from "../../common/components/Song/SongItem";

const CountryGenre = () => {
   const params = useParams();

   const [loading, setLoading] = useState(false);
   const [infoLoading, setInfoLoading] = useState(false);
   const [fetch, setFetch] = useState(false);
   const [country, setCountry] = useState(null);
   const [playlists, setPlaylists] = useState([]);

   useEffect(() => {
      const getTopic = async () => {
         setLoading(true);
         const country = await getDocById(firebaseKeys.countryGenres, params?.id);
         setLoading(false);

         setCountry(country);
      };

      getTopic();
   }, [params?.id]);

   useEffect(() => {
      const fetchInfo = async () => {
         setFetch(true);
         setInfoLoading(true);
         await fetchCountryGenreInfo(country);
         setInfoLoading(false);
      };

      if (country && !fetch) {
         fetchInfo();
      }
   }, [country]);

   return (
      <div>
         {loading ? (
            <div className="h-[600px] flex-center">
               <SyncLoader
                  color="var(--dandelion-primary)"
                  loading={loading}
                  cssOverride={{
                     display: "block",
                     margin: "0 auto",
                     borderColor: "red",
                  }}
                  size={10}
               />
            </div>
         ) : (
            <>
               <header className="relative w-full h-[450px]">
                  {country?.thumbnailM && (
                     <div className="overflow-hidden h-[450px] -mx-[48px] absolute top-0 bottom-0 left-0 right-0">
                        <div
                           style={{
                              backgroundImage: `url(${country?.thumbnailM})`,
                              backgroundPosition: "50%",
                           }}
                           className={`h-full bg-no-repeat bg-cover w-full`}
                        />
                        <div className="h-full w-full z-[1] absolute top-0 bottom-0 left-0 right-0 topic-bg" />
                     </div>
                  )}
               </header>
               <div className="w-full -mt-2">
                  {infoLoading ? (
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
                        <CoverCarousel playlist={country?.topPlaylist} />

                        <div className="pt-7">
                           <h1 className="mb-5 text-xl font-bold text-primary">Top Songs</h1>
                           <Swiper slidesPerView={3} spaceBetween={20} className="flex w-full gap-3">
                              {group(country?.topTracks, 4)?.map((songs, index) => (
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

                        <div className="pt-7">
                           <h1 className="mb-5 text-xl font-bold text-primary">Top Artist</h1>
                           <CoverCarousel playlist={country?.topArtist} artistMode />
                        </div>

                        {country?.playlist?.map((row, index) => (
                           <div className="pt-7" key={index}>
                              <h1 className="mb-5 text-xl font-bold text-primary">{row.title}</h1>

                              <div>
                                 <CoverCarousel playlist={row?.list} />
                              </div>
                           </div>
                        ))}
                     </>
                  )}
               </div>

               <div className="mt-20"></div>
            </>
         )}
      </div>
   );
};

export default CountryGenre;
