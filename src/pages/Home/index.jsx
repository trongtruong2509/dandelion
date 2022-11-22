import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import { playlists as tempPlaylists } from "../../tempData/playlists";
import {
   getDocumentContains,
   getLatestSongs,
} from "../../common/utils/firebaseApi";

import SongItem from "../../common/components/Song/SongItem";
import { getDocInList } from "../../common/utils/firebaseApi";
import { group } from "../../common/utils/common";
import { firebaseCollections } from "../../dataTemplate";

const Home = () => {
   const currentUser = useSelector((state) => state.user.user);

   const [newReleases, setNewReleases] = useState([]);
   const [recentPlaylist, setRecentPlaylist] = useState([]);

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

   useEffect(() => {
      if (currentUser) {
         getDocInList("playlists", currentUser.recentPlaylist)
            .then((result) => {
               const ordered = [];
               // console.log("[result]", result);

               // correct order for playlist
               currentUser.recentPlaylist?.forEach((playlistId) => {
                  ordered.push(result.find((s) => s.id === playlistId));
               });

               setRecentPlaylist(ordered);
            })
            .catch((err) => console.log(err));
      }
   }, [currentUser]);

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
      getDocumentContains(firebaseCollections.songs, "title", "Sau")
         .then((result) => {
            console.log("this is the result");
            console.log(result);
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="w-full text-primary">
         <div className="w-full h-60">Advertise</div>
         {currentUser && (
            <div className="w-full">
               <div className="flex-btw">
                  <div className="flex items-center justify-start gap-4">
                     <h1 className="text-2xl font-bold text-primary">
                        Recently Played
                     </h1>
                  </div>
                  <button className="gap-2 flex-center text-secondary hover:text-primary">
                     View All
                     <MdArrowForwardIos />
                  </button>
               </div>
               <div className="w-full my-4">
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

         <div className="pt-3">
            <div className="flex-btw">
               <div className="flex items-center justify-start gap-4">
                  <h1 className="text-2xl font-bold text-primary">
                     Your Top Mixes
                  </h1>
               </div>
               <button className="gap-2 flex-center text-secondary hover:text-primary">
                  View All
                  <MdArrowForwardIos />
               </button>
            </div>
            <div className="w-full my-4">
               <Swiper slidesPerView={5} spaceBetween={120} className="w-full">
                  {tempPlaylists.map((p) => (
                     <SwiperSlide key={p.id}>
                        <PlaylistCover info={p} />
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
         <div className="pt-3">
            <div className="flex-btw">
               <div
                  className="flex items-center justify-start gap-4"
                  onClick={() => pushArtist}
               >
                  <button className="text-2xl font-bold text-primary">
                     New Uploaded
                  </button>
               </div>
               <button className="gap-2 flex-center text-secondary hover:text-primary">
                  View All
                  <MdArrowForwardIos />
               </button>
            </div>
            <div className="w-full my-4">
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
         <p>Popular artist</p>
      </div>
   );
};

export default Home;
