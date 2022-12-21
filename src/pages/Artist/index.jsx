import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay, FaPlus } from "react-icons/fa";
// import { MdArrowForwardIos } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import { getDocInList } from "../../common/utils/firebaseApi";
import { getArtistDb } from "../../common/utils/user";
// import AlbumDefault from "./../../assets/album_default.png";
// import PlaylistCover from "../../common/components/PlaylistCover/PlaylistCover";

import SongItem from "../../common/components/Song/SongItem";
// import { firebaseKeys } from "../../dataTemplate";
import { getArtistTopHits } from "../../common/utils/songs";
import { updateCurrentPlaylist } from "../../common/slices/playlistSlice";
import { initHiddenPlaylist } from "../../common/utils/playlist";
import { updateAndPlay } from "../../common/slices/playingSlice";
import { initQueue } from "../../common/slices/playQueueSlice";

const Artist = () => {
   const dispatch = useDispatch();
   const params = useParams();

   const [artist, setArtist] = useState(null);
   const [topHits, setTopHits] = useState(null);

   useEffect(() => {
      console.log(params.id);
      getArtistDb(params.id)
         .then((result) => {
            setArtist(result);
            console.log(result);
         })
         .catch((err) => {
            console.log("error while get user from db");
            console.log(err);
         });
   }, [params.id]);

   useEffect(() => {
      const fetchTophits = async () => {
         const hits = await getArtistTopHits(artist);
         setTopHits(hits);
         dispatch(updateCurrentPlaylist(initHiddenPlaylist(hits, "hidden_artistHits")));
      };

      fetchTophits();
   }, [artist]);

   const onPlayTophits = () => {
      const songs = [...topHits];
      dispatch(updateAndPlay(songs[0]));
      dispatch(initQueue(songs));
   };

   return (
      <div className="relative w-full px-3 mt-8 text-white">
         <header className="relative w-full py-8 flex-btw">
            {artist?.thumbnail && (
               <div className="absolute -top-[72px] bottom-0 left-0 right-0 overflow-hidden -mx-[60px] -mt-8 z-[1]">
                  <div
                     style={{
                        backgroundImage: `url(${artist.thumbnail})`,
                        backgroundPosition: "50%",
                     }}
                     className={`h-full bg-no-repeat bg-cover 
                                 absolute -top-[72px] bottom-0 left-0 right-0 blur-[50px]`}
                  />
                  <div className="h-full z-[1] absolute top-0 bottom-0 left-0 right-0 bg-artist-layout" />
               </div>
            )}
            <div className="z-10 items-start flex-c">
               <h1 className="py-12 font-bold text-7xl text-primary">{artist?.name}</h1>
               <div className="gap-6 flex-center">
                  <button
                     className="gap-2 px-6 py-2 transition-all duration-200 ease-in border rounded-full flex-center border-dandelion hover:bg-dandelion hover:text-white text-dandelion"
                     onClick={onPlayTophits}
                  >
                     <FaPlay />
                     Play
                  </button>
                  {/* <button className="gap-2 px-6 py-2 border rounded-full flex-center border-dandelion bg-dandelion">
                     <FaPlus />
                     Follow
                  </button> */}
               </div>
            </div>
            <div className="z-10 overflow-hidden rounded-full w-72 h-72 drop-shadow-sm">
               <img src={artist?.thumbnail} alt={artist?.name} className="object-cover w-full rounded-full" />
            </div>
         </header>
         <main className="w-full">
            <section className="py-5">
               <h2 className="pb-3 text-2xl font-bold text-primary">Top Hits</h2>
               <div className="flex gap-8">
                  <div className="w-full h-[285px] overflow-auto scrollbar">
                     {topHits?.map((hit) => (
                        <SongItem key={hit.id} info={hit} fullMode inPlaylist />
                     ))}
                  </div>
               </div>
            </section>
         </main>
      </div>
   );
};

export default Artist;
