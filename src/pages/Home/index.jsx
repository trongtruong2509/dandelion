import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
// import { Pagination } from "swiper";

import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
// import PlaylistDetail from "../../common/components/Playlist/PlaylistDetail";
import Header from "../../common/components/Header";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";

import { playlists as tempPlaylists } from "../../tempData/playlists";
import { getLatestSongs } from "../../common/utils/firebaseApi";
// import SongInfo from "../../common/components/SongInfo";
import PlaylistItem from "../../common/components/Playlist/PlaylistItem";

const group = (items, n) =>
   items.reduce((acc, x, i) => {
      const idx = Math.floor(i / n);
      acc[idx] = [...(acc[idx] || []), x];
      return acc;
   }, []);

const Home = () => {
   const [newReleases, setNewReleases] = useState([]);

   useEffect(() => {
      getLatestSongs()
         .then((s) => {
            setNewReleases(s);
            console.log(s);
            console.log(group(s, 4));
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <div className="flex ">
         <Sidebar />
         <div className="w-full h-[calc(100vh-96px)] block overflow-auto bg-dark-4 px-12 relative overflow-y-scroll scrollbar">
            <div className="sticky top-0 left-0 z-[1000] w-full">
               <Header />
            </div>
            <div className="w-full text-white">
               <div className="w-full h-60">Advertise</div>
               <div className="w-full">
                  <div className="flex justify-between items-center">
                     <div className="flex gap-4 justify-start items-center">
                        <h1 className="text-2xl text-white font-bold">
                           Recently Played
                        </h1>
                     </div>
                     <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                        View All
                        <MdArrowForwardIos />
                     </button>
                  </div>
                  <div className="w-full my-4">
                     <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        // pagination={{
                        //    clickable: true,
                        // }}
                        // modules={[Pagination]}
                        className="w-full"
                     >
                        {tempPlaylists.map((p) => (
                           <SwiperSlide key={p.id}>
                              <PlaylistCover playlist={p} sm={true} />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className="pt-3">
                  <div className="flex justify-between items-center">
                     <div className="flex gap-4 justify-start items-center">
                        <h1 className="text-2xl text-white font-bold">
                           Your Top Mixes
                        </h1>
                     </div>
                     <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                        View All
                        <MdArrowForwardIos />
                     </button>
                  </div>
                  <div className="w-full my-4">
                     <Swiper
                        slidesPerView={5}
                        spaceBetween={120}
                        // pagination={{
                        //    clickable: true,
                        // }}
                        // modules={[Pagination]}
                        className="w-full"
                     >
                        {tempPlaylists.map((p) => (
                           <SwiperSlide key={p.id}>
                              <PlaylistCover playlist={p} />
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <div className="pt-3">
                  <div className="flex justify-between items-center">
                     <div className="flex gap-4 justify-start items-center">
                        <h1 className="text-2xl text-white font-bold">
                           New Releases
                        </h1>
                     </div>
                     <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                        View All
                        <MdArrowForwardIos />
                     </button>
                  </div>
                  <div className="w-full my-4">
                     <Swiper
                        slidesPerView={3}
                        spaceBetween={20}
                        className="w-full flex gap-3"
                     >
                        {group(newReleases, 4).map((songs, index) => (
                           <SwiperSlide key={index}>
                              {songs.map((s) => (
                                 <div className="my-1" key={s.id}>
                                    <PlaylistItem info={s} simple />
                                 </div>
                              ))}
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
               </div>
               <p>Popular artist</p>
            </div>
         </div>
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Home;
