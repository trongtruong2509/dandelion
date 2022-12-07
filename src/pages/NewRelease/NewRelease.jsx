import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { paths } from "../../app/routes";
import PlaylistCover from "../../common/components/PlaylistCover/PlaylistCover";
import PlaylistCoverSkeleton from "../../common/components/PlaylistCover/PlaylistCoverSkeleton";
import SongItem from "../../common/components/Song/SongItem";
import SongSkeleton from "../../common/components/Song/SongSkeleton";
import { getLatestPlaylists } from "../../common/utils/playlist";
import { getLatestSongs } from "../../common/utils/songs";

const NewRelease = () => {
   const tabStyle = `px-3 py-2 font-semibold
   text-navigation hover:text-item-hover uppercase cursor-pointer text-center outline-none`;

   const tabChildStyle = `px-4 py-1 text-navigation hover:text-item-hover text-xs rounded-full border
      uppercase cursor-pointer text-center outline-none`;

   const navigate = useNavigate();
   const params = useParams();

   const [songFilter, setSongFilter] = useState("All");
   const [newRelease, setNewRelease] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (params.id === "song") {
         fetchSongs(songFilter);
      } else {
         fetchNewPlaylist();
      }
   }, [songFilter, params.id]);

   const fetchSongs = async (filter) => {
      setIsLoading(true);
      const songs = await getLatestSongs(filter);
      setIsLoading(false);
      setNewRelease(songs);
   };

   const fetchNewPlaylist = async () => {
      setIsLoading(true);
      const playlists = await getLatestPlaylists();
      setIsLoading(false);
      setNewRelease(playlists);
   };

   const tabActive = () => {
      return params.id === "song" ? 0 : 1;
   };

   return (
      <div className="relative">
         <header className="w-full py-4 text-3xl font-bold top-3 text-primary">New Release</header>
         <Tabs
            className="w-full pt-7 Tabs"
            selectedTabClassName="text-tab-active border-b-2 border-dandelion-primary"
            defaultIndex={tabActive()}
         >
            <TabList className="flex w-full gap-3 bg-transparent border-b border-primary">
               <Tab className={tabStyle} onClick={() => navigate(paths.newRelease.replace(":id", "song"))}>
                  SONGS
               </Tab>
               <Tab className={tabStyle} onClick={() => fetchNewPlaylist()}>
                  PLAYLISTS
               </Tab>
            </TabList>
            <TabPanel className="w-full">
               <Tabs
                  className="w-full pt-5 Tabs"
                  selectedTabClassName="text-[#fff] border-dandelion-primary bg-dandelion-primary"
                  defaultIndex={0}
               >
                  <TabList className="flex w-full gap-4 bg-transparent">
                     <Tab className={tabChildStyle} onClick={() => setSongFilter()}>
                        ALL
                     </Tab>
                     <Tab className={tabChildStyle} onClick={() => setSongFilter("IWZ9Z08I")}>
                        VIETNAM
                     </Tab>
                     <Tab className={tabChildStyle} onClick={() => setSongFilter("IWZ9Z08O")}>
                        US-UK
                     </Tab>
                     <Tab className={tabChildStyle} onClick={() => setSongFilter("IWZ9Z08W")}>
                        Kpop
                     </Tab>
                  </TabList>
                  <TabPanel className="w-full">
                     <TrackContent loading={isLoading} tracks={newRelease} />
                  </TabPanel>
                  <TabPanel className="w-full">
                     <TrackContent loading={isLoading} tracks={newRelease} />
                  </TabPanel>
                  <TabPanel className="w-full">
                     <TrackContent loading={isLoading} tracks={newRelease} />
                  </TabPanel>
                  <TabPanel className="w-full">
                     <TrackContent loading={isLoading} tracks={newRelease} />
                  </TabPanel>
               </Tabs>
            </TabPanel>
            <TabPanel className="w-full">
               <div className="grid w-full grid-cols-1 gap-6 py-2 my-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                  {isLoading
                     ? Array.from({ length: 15 }, (v, i) => i).map((loading) => <PlaylistCoverSkeleton key={loading} />)
                     : newRelease?.map((p, index) => <PlaylistCover key={index} info={p} editable />)}
               </div>
            </TabPanel>
         </Tabs>
      </div>
   );
};

const TrackContent = ({ loading, tracks }) => {
   return (
      <>
         <div className="mt-6">
            {loading
               ? Array.from({ length: 15 }, (v, i) => i).map((loading) => <SongSkeleton key={loading} />)
               : tracks?.map((s) => <SongItem info={s} fullMode key={s.id} />)}
         </div>
      </>
   );
};

export default NewRelease;
