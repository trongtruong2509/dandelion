import React, { useEffect, useState } from "react";
import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
import Header from "../../common/components/Header";
import { MdArrowForwardIos, MdOutlineAdd } from "react-icons/md";

import { playlists as tempPlaylists } from "../../tempData/playlists";
import { songs } from "../../tempData/songs";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import PlaylistItem from "../../common/components/Playlist/PlaylistItem";

const Mymusic = () => {
   const [playlists, setPlaylists] = useState([]);

   useEffect(() => {
      setPlaylists(tempPlaylists);
   }, []);

   console.log(playlists);

   return (
      <div className="flex ">
         <Sidebar />
         <div className="w-full h-[calc(100vh-96px)] block overflow-auto bg-dark-4 px-12 relative">
            <div className="sticky top-0 left-0 z-[1000] w-full">
               <Header />
            </div>
            <div className="w-full mt-20 text-white">
               <div className="w-full">
                  <div className="flex justify-between items-center">
                     <div className="flex gap-4 justify-start items-center">
                        <h1 className="text-xl text-primary font-semibold">
                           MY PLAYLIST
                        </h1>
                        <button className="p-2 bg-hover-1 hover:text-primary rounded-full outline-none">
                           <MdOutlineAdd className="text-xl" />
                        </button>
                     </div>
                     <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                        View All
                        <MdArrowForwardIos />
                     </button>
                  </div>
                  <div className="w-full py-2 flex gap-8 flex-wrap my-6">
                     {tempPlaylists.map((p) => (
                        <PlaylistCover key={p.id} playlist={p} />
                     ))}
                  </div>
               </div>

               <div className="w-full text-white">
                  <div className="w-full border-b border-hover-1 py-2">
                     <p className="uppercase text-lg font-semibold">Songs</p>
                  </div>

                  {songs.map((song) => (
                     <PlaylistItem key={song.id} info={song} />
                  ))}
               </div>
            </div>
         </div>

         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Mymusic;
