import React from "react";
import MainContainer from "../../common/components/MainContainer";
import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
import PlaylistDetail from "../../common/components/Playlist/PlaylistDetail";

const Home = () => {
   return (
      <div className="flex ">
         <Sidebar />
         <MainContainer children={<PlaylistDetail />} />
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Home;
