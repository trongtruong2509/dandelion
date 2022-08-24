import React from "react";
import { MdArrowForwardIos, MdOutlineAdd } from "react-icons/md";

import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
import PlaylistDetail from "../../common/components/Playlist/PlaylistDetail";
import Header from "../../common/components/Header";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";

import { playlists as tempPlaylists } from "../../tempData/playlists";

const Home = () => {
   return (
      <div className="flex ">
         <Sidebar />
         <div className="w-full h-[calc(100vh-96px)] block overflow-auto bg-dark-4 px-12 relative">
            <div className="sticky top-0 left-0 z-[1000] w-full">
               <Header />
            </div>
            <div className="w-full text-white">
               <div className="w-full h-60">Advertise</div>
               <div className="w-full">
                  <div className="flex justify-between items-center">
                     <div className="flex gap-4 justify-start items-center">
                        <h1 className="text-lg text-white font-semibold">
                           Recently Played
                        </h1>
                     </div>
                     <button className="flex justify-center items-center gap-2 text-secondary hover:text-primary">
                        View All
                        <MdArrowForwardIos />
                     </button>
                  </div>
                  <div className="w-full flex gap-8 flex-wrap my-4">
                     {tempPlaylists.map((p) => (
                        <PlaylistCover key={p.id} playlist={p} />
                     ))}
                  </div>
               </div>
               <p>Your top mixes</p>
               <p>New release</p>
               <p>Popular artist</p>
            </div>
         </div>
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Home;
