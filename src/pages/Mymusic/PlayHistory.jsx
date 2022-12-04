import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { paths } from "../../app/routes";
import PlaylistCover from "../../common/components/PlaylistCover/PlaylistCover";
import PlaylistCoverSkeleton from "../../common/components/PlaylistCover/PlaylistCoverSkeleton";
import SongItem from "../../common/components/Song/SongItem";
import { fetchUserRecentPlaylist } from "../../common/slices/userSlice";

const PlayHistory = () => {
   const tabStyle = `3xl:px-3 px-2 py-[5px] w-32 text-sm rounded-3xl 
   text-navigation hover:text-item-hover uppercase cursor-pointer text-center outline-none`;

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const params = useParams();

   const currentUser = useSelector((state) => state.user.user);
   const userRecentPlaylist = useSelector(
      (state) => state.user.recentPlaylists
   );
   const fetchPending = useSelector((state) => state.user.pending);

   useEffect(() => {
      dispatch(fetchUserRecentPlaylist(currentUser));
   }, [currentUser]);

   const tabActive = () => {
      return params.id === "songs" ? 0 : 1;
   };

   return (
      <div className="relative">
         <header className="absolute left-0 w-full py-4 text-3xl font-bold top-3 text-primary -z-10">
            Recently Played
         </header>
         <Tabs
            className="w-full pt-7 Tabs"
            selectedTabClassName="text-item-hover bg-tab-active outline-none"
            defaultIndex={tabActive()}
         >
            <TabList className="w-fit bg-alpha rounded-3xl p-[3px] flex-center mx-auto mb-5">
               <Tab
                  className={tabStyle}
                  onClick={() =>
                     navigate(paths.playHistoryId.replace(":id", "songs"))
                  }
               >
                  SONGS
               </Tab>
               <Tab
                  className={tabStyle}
                  onClick={() =>
                     navigate(paths.playHistoryId.replace(":id", "playlists"))
                  }
               >
                  PLAYLISTS
               </Tab>
            </TabList>
            <TabPanel className="w-full">
               <div className="mt-6">
                  {currentUser?.recentPlayed?.map((s) => (
                     <SongItem info={s} playlistMode canDetele key={s.id} />
                  ))}
               </div>
            </TabPanel>
            <TabPanel className="w-full">
               <div className="grid w-full grid-cols-1 gap-6 py-2 my-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                  {fetchPending
                     ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((loading) => (
                          <PlaylistCoverSkeleton key={loading} />
                       ))
                     : userRecentPlaylist?.map((p, index) => (
                          <PlaylistCover key={index} info={p} editable />
                       ))}
               </div>
            </TabPanel>
         </Tabs>
      </div>
   );
};

export default PlayHistory;
