import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { paths } from "../../app/routes";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import PlaylistCoverSkeleton from "../../common/components/Playlist/PlaylistCoverSkeleton";
import SongItem from "../../common/components/Song/SongItem";
import { fetchUserRecentPlaylist } from "../../common/slices/userSlice";
import { getLatestSongs } from "../../common/utils/songs";

const NewRelease = () => {
   const tabStyle = `px-3 py-2 text-navigation font-semibold
      hover:text-dandelion-primary uppercase cursor-pointer text-center outline-none`;

   const tabChildStyle = `px-4 py-1 text-navigation text-xs rounded-full border
      uppercase cursor-pointer text-center outline-none`;

   const dispatch = useDispatch();
   // const navigate = useNavigate();
   // const params = useParams();

   const currentUser = useSelector((state) => state.user.user);

   const [songFilter, setSongFilter] = useState("All");
   const [newRelease, setNewRelease] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      fetchSongs(songFilter);
   }, [songFilter]);

   const fetchSongs = async (filter) => {
      switch (filter) {
         case "Vietnam":
            break;

         case "All":
         default:
            setIsLoading(true);
            const songs = await getLatestSongs();
            console.log("[fetchSongs]", songs);
            setIsLoading(false);
            setNewRelease(songs);
            break;
      }
   };

   return (
      <div className="relative">
         <header className="w-full py-4 text-3xl font-bold top-3 text-primary">
            New Release
         </header>
         <Tabs
            className="w-full pt-7 Tabs"
            selectedTabClassName="text-dandelion-primary border-b-2 border-dandelion-primary"
            defaultIndex={0}
         >
            <TabList className="flex w-full gap-3 bg-transparent border-b border-primary">
               <Tab className={tabStyle}>SONGS</Tab>
               <Tab className={tabStyle}>PLAYLISTS</Tab>
            </TabList>
            <TabPanel className="w-full">
               <Tabs
                  className="w-full pt-5 Tabs"
                  selectedTabClassName="text-[#fff] border-dandelion-primary bg-dandelion-primary"
                  defaultIndex={0}
               >
                  <TabList className="flex w-full gap-4 bg-transparent">
                     <Tab className={tabChildStyle}>ALL</Tab>
                     <Tab className={tabChildStyle}>VIETNAM</Tab>
                     <Tab className={tabChildStyle}>US-UK</Tab>
                     <Tab className={tabChildStyle}>Kpop</Tab>
                  </TabList>
                  <TabPanel className="w-full">
                     <div className="mt-6">
                        {isLoading
                           ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((loading) => (
                                <PlaylistCoverSkeleton key={loading} />
                             ))
                           : newRelease.map((s) => (
                                <SongItem
                                   info={s}
                                   playlistMode
                                   canDetele
                                   key={s.id}
                                />
                             ))}
                     </div>
                  </TabPanel>
                  <TabPanel className="w-full">
                     <div className="grid w-full grid-cols-1 gap-6 py-2 my-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                        {/* {fetchPending
                     ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((loading) => (
                          <PlaylistCoverSkeleton key={loading} />
                       ))
                     : userRecentPlaylist?.map((p, index) => (
                          <PlaylistCover key={index} info={p} editable />
                       ))} */}
                     </div>
                  </TabPanel>
                  <TabPanel className="w-full">
                     <div className="mt-6">Tab 3</div>
                  </TabPanel>
                  <TabPanel className="w-full">
                     <div className="mt-6">Tab 4</div>
                  </TabPanel>
               </Tabs>
            </TabPanel>
            <TabPanel className="w-full">
               <div className="grid w-full grid-cols-1 gap-6 py-2 my-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                  {/* {fetchPending
                     ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((loading) => (
                          <PlaylistCoverSkeleton key={loading} />
                       ))
                     : userRecentPlaylist?.map((p, index) => (
                          <PlaylistCover key={index} info={p} editable />
                       ))} */}
               </div>
            </TabPanel>
         </Tabs>
      </div>
   );
};

export default NewRelease;
