import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import { getLatestSongs } from "../../common/utils/songs";
import { getLatestPlaylists } from "../../common/utils/playlist";

import SongItem from "../../common/components/Song/SongItem";
import { getDocInList } from "../../common/utils/firebaseApi";
import { group } from "../../common/utils/common";

const Home = () => {
   const currentUser = useSelector((state) => state.user.user);

   const [newReleases, setNewReleases] = useState([]);
   const [newPlaylists, setNewPlaylists] = useState([]);
   const [recentPlaylist, setRecentPlaylist] = useState([]);

   useEffect(() => {
      getLatestSongs()
         .then((s) => {
            setNewReleases(s);
         })
         .catch((err) => console.log(err));

      getLatestPlaylists()
         .then((s) => {
            console.log("[getLatestPlaylists]", s);
            setNewPlaylists(s);
         })
         .catch((err) => console.log(err));
   }, []);

   useEffect(() => {
      if (currentUser) {
         getDocInList("playlists", currentUser.recentPlaylist)
            .then((result) => {
               const ordered = [];

               // correct order for playlist
               currentUser.recentPlaylist?.forEach((playlistId) => {
                  ordered.push(result.find((s) => s.id === playlistId));
               });

               setRecentPlaylist(ordered);
            })
            .catch((err) => console.log(err));
      }
   }, [currentUser]);

   return (
      <div className="w-full text-primary">
         {currentUser?.recentPlaylist.length > 0 && (
            <div className="w-full mt-7">
               <div className="mb-3 flex-btw">
                  <div className="flex items-center justify-start gap-4">
                     <h1 className="text-xl font-bold text-primary">Recently Played</h1>
                  </div>
                  <button className="gap-2 flex-center text-secondary hover:text-primary">
                     View All
                     <MdArrowForwardIos />
                  </button>
               </div>
               <div className="w-full">
                  <Swiper slidesPerView={6} spaceBetween={30} className="w-full">
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
                  <h1 className="text-xl font-bold text-primary">Your Top Mixes</h1>
               </div>
               <button className="gap-2 flex-center text-secondary hover:text-primary">
                  View All
                  <MdArrowForwardIos />
               </button>
            </div>
            <div className="w-full">
               <Swiper slidesPerView={5} spaceBetween={120} className="w-full">
                  {newPlaylists?.map((p) => (
                     <SwiperSlide key={p.id}>
                        <PlaylistCover info={p} />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
         <div className="pt-5">
            <div className="mb-3 flex-btw">
               <div className="flex items-center justify-start gap-4">
                  <button className="text-xl font-bold text-primary">New Uploaded</button>
               </div>
               <button className="gap-2 flex-center text-secondary hover:text-primary">
                  View All
                  <MdArrowForwardIos />
               </button>
            </div>
            <div className="w-full">
               <Swiper slidesPerView={3} spaceBetween={20} className="flex w-full gap-3">
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
         <p className="mt-5 mb-32 text-xl font-bold text-primary">Popular artist</p>
      </div>
   );
};

export default Home;
