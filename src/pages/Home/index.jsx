import React from "react";
import MainContainer from "../../common/components/MainContainer";
import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";

const Home = () => {
   return (
      <div className="flex ">
         <Sidebar />
         <MainContainer />
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Home;
