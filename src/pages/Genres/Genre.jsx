import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDocById, getDocInList } from "../../common/utils/firebaseApi";
import { firebaseCollections } from "../../dataTemplate";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { playlistBreakpoins } from "../../common/utils/common";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";

const Genre = () => {
   const params = useParams();

   const [topic, setTopic] = useState(null);
   const [playlists, setPlaylists] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getTopic = async () => {
         const topic = await getDocById(firebaseCollections.topics, params?.id);
         setTopic(topic);
      };

      getTopic();
   }, [params?.id]);

   useEffect(() => {
      const fetchPlaylist = async (ids) => {
         setLoading(true);
         const result = await getDocInList(firebaseCollections.playlists, ids);

         console.log("[getDocInList] topic?.playlist", result);
         setPlaylists(result);
         setLoading(false);
      };

      if (topic && topic?.playlist?.length) {
         fetchPlaylist(topic.playlist);
      }
   }, [topic]);

   return (
      <div>
         <header className="relative w-full h-[450px]">
            {topic?.thumbnailM && (
               <div className="overflow-hidden h-[450px] -mx-[48px] absolute top-0 bottom-0 left-0 right-0">
                  <div
                     style={{
                        backgroundImage: `url(${topic?.thumbnailM})`,
                        backgroundPosition: "50%",
                     }}
                     className={`h-full bg-no-repeat bg-cover w-full`}
                  />
                  <div className="h-full w-full z-[1] absolute top-0 bottom-0 left-0 right-0 topic-bg" />
               </div>
            )}
         </header>
         <div className="w-full -mt-2">
            {loading ? (
               <></>
            ) : (
               <div
                  className="grid w-full grid-cols-5 gap-6"
                  breakpoints={playlistBreakpoins}
               >
                  {playlists?.map((p, index) => (
                     <div key={index} className="mb-2">
                        <PlaylistCover info={p} editable />
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default Genre;
