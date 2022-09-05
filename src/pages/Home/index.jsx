import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import { playlists as tempPlaylists } from "../../tempData/playlists";
import {
   getDocumentContains,
   getLatestSongs,
} from "../../common/utils/firebaseApi";
import PlaylistItem from "../../common/components/Playlist/PlaylistItem";

import { artistExample } from "../../tempData/artists";
import { addNewDoc } from "../../common/utils/firebaseApi";
import { zing } from "../../common/utils/crawlData";
// import ZingMp3 from "zingmp3-api";

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

      // pushArtist();
   }, []);

   const pushArtist = () => {
      // console.log("clicked");
      // for (const artist of artistExample) {
      //    try {
      //       setTimeout(() => {
      //          addNewDoc("Artists", artist, artist.id);
      //       }, 1000);
      //    } catch (error) {
      //       console.log(error);
      //    }
      // }
      // for crawl api testing
      // zing
      //    .get_song_info("ZW6EZDII")
      //    .then((result) => console.log(result))
      //    .catch((err) => console.log(err));
      // ZingMp3.getFullInfo("ZWBOW9CO")
      //    .then((result) => console.log(result))
      //    .then((err) => console.log(err));

      console.log("test fetch serach");
      getDocumentContains("Songs", "title", "Sau")
         .then((result) => {
            console.log("this is the result");
            console.log(result);
         })
         .catch((err) => console.log(err));
   };

   return (
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
               <Swiper slidesPerView={6} spaceBetween={30} className="w-full">
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
               <Swiper slidesPerView={5} spaceBetween={120} className="w-full">
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
               <div
                  className="flex gap-4 justify-start items-center"
                  onClick={() => pushArtist}
               >
                  <button className="text-2xl text-white font-bold">
                     New Releases
                  </button>
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
   );
};

export default Home;
