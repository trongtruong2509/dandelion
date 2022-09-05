import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PlaylistItem from "../../common/components/Playlist/PlaylistItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { getDocById, getDocInList } from "../../common/utils/firebaseApi";
import { getArtistDb } from "../../common/utils/user";
import AlbumDefault from "./../../assets/album_default.png";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";

import { playlists as tempPlaylists } from "../../tempData/playlists";

const Artist = () => {
   const params = useParams();

   const [artist, setArtist] = useState(null);
   const [topHits, setTopHits] = useState(null);
   // const [tab, setTab] = useState(<Overview />);
   // const [tabIndex, setTabIndex] = useState(0);

   const tabStyle = `3xl:px-3 px-2 py-[5px] w-32 text-sm rounded-3xl text-navigation 
                     hover:text-white uppercase cursor-pointer text-center`;

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
      getDocInList("Songs", artist?.topHits).then((result) => {
         setTopHits(result);
      });
   }, [artist]);

   const onOverview = () => {
      const topHits = [];

      // setTab(<Overview />);
   };

   return (
      <div className="w-full mt-8 text-white px-3 relative">
         <header className="w-full flex justify-between items-center py-8 relative">
            {artist?.thumbnail && (
               <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden -mx-[60px] -mt-8 z-[1]">
                  <div
                     style={{
                        backgroundImage: `url(${artist.thumbnail})`,
                        backgroundPosition: "50%",
                     }}
                     className={`h-full bg-no-repeat bg-cover 
                                 absolute top-0 bottom-0 left-0 right-0 blur-[50px]`}
                  />
                  <div className="h-full z-[1] absolute top-0 bottom-0 left-0 right-0 bg-[rgba(12,3,3,0.8)]" />
               </div>
            )}
            <div className="flex flex-col items-start z-10">
               <h1 className="text-7xl font-bold py-12">{artist?.name}</h1>
               <div className="flex gap-4 justify-center items-center">
                  <button className="px-6 py-2 bg-primary rounded-full flex gap-2 justify-center items-center">
                     <FaPlay />
                     Play
                  </button>
                  <button className="px-6 py-2 bg-primary rounded-full flex gap-2 justify-center items-center">
                     <FaPlus />
                     Follow
                  </button>
               </div>
            </div>
            <div className="w-72 h-72 rounded-full overflow-hidden drop-shadow-lg shadow-lg z-10">
               <img
                  src={artist?.thumbnail}
                  alt={artist?.name}
                  className="object-cover w-full rounded-full"
               />
            </div>
         </header>
         <main className="w-full">
            <Tabs
               className="Tabs w-full"
               selectedTabClassName="text-white-custom bg-hover-2 hover:text-white"
            >
               <TabList className="w-fit bg-hover-1 rounded-3xl p-[3px] flex justify-center items-center mx-auto mt-10 mb-5">
                  <Tab className={tabStyle}>OVERVIEW</Tab>
                  <Tab className={tabStyle}>SONGS</Tab>
                  <Tab className={tabStyle}>ALBUM</Tab>
                  <Tab className={tabStyle}>SINGLE & EP</Tab>
                  <Tab className={tabStyle}>RADIO</Tab>
               </TabList>
               <TabPanel className="w-full">
                  <section className="py-5">
                     <h2 className="text-2xl font-bold pb-6">Top Hits</h2>
                     <div className="flex gap-8 ">
                        <div className="w-60 flex-shrink-0">
                           <img
                              className="w-60 h-60 rounded-md object-cover"
                              src={AlbumDefault}
                              alt="Album Thumbnail"
                           />
                        </div>

                        <div className="w-full h-[285px] overflow-auto scrollbar">
                           {topHits?.map((hit) => (
                              <PlaylistItem info={hit} />
                           ))}
                        </div>
                     </div>
                  </section>
                  <section className="py-5">
                     <div className="flex justify-between items-center pb-6">
                        <div className="flex gap-4 justify-start items-center">
                           <h1 className="text-2xl text-white font-bold">
                              Albums
                           </h1>
                        </div>
                        <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                           View All
                           <MdArrowForwardIos />
                        </button>
                     </div>

                     <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        className="w-full"
                     >
                        {tempPlaylists.map((p) => (
                           <SwiperSlide key={p.id}>
                              <PlaylistCover playlist={p} />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </section>
                  <section className="py-5">
                     <div className="flex justify-between items-center pb-6">
                        <div className="flex gap-4 justify-start items-center">
                           <h1 className="text-2xl text-white font-bold">
                              Collections
                           </h1>
                        </div>
                        <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                           View All
                           <MdArrowForwardIos />
                        </button>
                     </div>

                     <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        className="w-full"
                     >
                        {tempPlaylists.map((p) => (
                           <SwiperSlide key={p.id}>
                              <PlaylistCover playlist={p} />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </section>
                  <section className="py-5">
                     <div className="flex justify-between items-center pb-6">
                        <div className="flex gap-4 justify-start items-center">
                           <h1 className="text-2xl text-white font-bold">
                              Appear On
                           </h1>
                        </div>
                        <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                           View All
                           <MdArrowForwardIos />
                        </button>
                     </div>

                     <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        className="w-full"
                     >
                        {tempPlaylists.map((p) => (
                           <SwiperSlide key={p.id}>
                              <PlaylistCover playlist={p} />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </section>
                  <section className="w-full h-32 py-5">
                     <h1 className="text-2xl text-white font-bold">
                        Maybe You Like
                     </h1>
                  </section>
               </TabPanel>
               <TabPanel className="w-full">
                  <p>Tab 2 works!</p>
               </TabPanel>
               <TabPanel className="w-full">
                  <p>Tab 3 works!</p>
               </TabPanel>
               <TabPanel>
                  <p>Tab 4 works!</p>
               </TabPanel>
               <TabPanel>
                  <p>Tab 5 works!</p>
               </TabPanel>
            </Tabs>
         </main>
      </div>
   );
};

const Overview = (
   <div className="w-full">
      <div>
         <h2 className="text-3xl font-semibold capitalize py-6 ">Top Hits</h2>
         {}
      </div>
   </div>
);

export default Artist;
