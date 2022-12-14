import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

import { getDocById, getDocInList } from "../../common/utils/firebaseApi";
import { firebaseKeys } from "../../dataTemplate";

import { playlistBreakpoints } from "../../common/utils/common";
import PlaylistCover from "../../common/components/PlaylistCover/PlaylistCover";

const Genre = () => {
   const params = useParams();

   const [topic, setTopic] = useState(null);
   const [playlists, setPlaylists] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const getTopic = async () => {
         setLoading(true);
         const topic = await getDocById(firebaseKeys.topics, params?.id);
         setTopic(topic);
         setLoading(false);
      };

      getTopic();
   }, [params?.id]);

   useEffect(() => {
      const fetchPlaylist = async (ids) => {
         const result = await getDocInList(firebaseKeys.playlists, ids);
         setPlaylists(result);
      };

      if (topic && topic?.playlist?.length) {
         fetchPlaylist(topic.playlist);
      }
   }, [topic]);

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
                     <div className="grid w-full grid-cols-5 gap-6" breakpoints={playlistBreakpoints}>
                        {playlists?.map((p, index) => (
                           <div key={index} className="mb-2">
                              <PlaylistCover info={p} editable />
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </>
         )}
      </div>
   );
};

export default Genre;
