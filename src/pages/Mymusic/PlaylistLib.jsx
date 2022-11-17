import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import PlaylistModal from "../../common/components/Modal/PlaylistModal";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";
import PlaylistCoverSkeleton from "../../common/components/Playlist/PlaylistCoverSkeleton";
import { fetchUserPlaylist, initPlaylist } from "../../common/slices/userSlice";
import { fetchUserPlaylists } from "../../common/utils/user";

const PlaylistLib = () => {
   const tabStyle = `3xl:px-3 px-2 py-[5px] w-32 text-sm rounded-3xl text-navigation 
      hover:text-dandelion-primary uppercase cursor-pointer text-center outline-none`;

   const currentUser = useSelector((state) => state.user.value);
   const userPlaylist = useSelector((state) => state.user.playlist);
   const fetchPending = useSelector((state) => state.user.pending);
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);

   useEffect(() => {
      dispatch(fetchUserPlaylist(currentUser));
   }, [currentUser?.playlists]);

   return (
      <div>
         <PlaylistModal show={show} onClose={() => setShow(false)} />
         <header className="w-full py-4 text-4xl font-bold text-primary">
            Playlists
         </header>
         <Tabs
            className="w-full Tabs"
            selectedTabClassName="text-dandelion-primary bg-tab-active"
         >
            <TabList className="w-fit bg-alpha rounded-3xl p-[3px] flex-center mx-auto mb-5">
               <Tab className={tabStyle}>ALL</Tab>
               <Tab className={tabStyle}>CREATED</Tab>
            </TabList>
            <TabPanel className="w-full">
               <div className="grid w-full grid-cols-1 gap-6 py-2 my-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                  <div
                     className="flex-col col-span-1 gap-2 border rounded-md cursor-pointer border-primary flex-center hover:text-dandelion-primary text-primary min-w-[180px] min-h-[250px]"
                     onClick={() => setShow(true)}
                  >
                     <IoAddCircleOutline className="text-4xl" />
                     <p className="text-lg">Add new playlist</p>
                  </div>
                  {fetchPending
                     ? [1, 2, 3, 4].map((loading) => (
                          <PlaylistCoverSkeleton key={loading} />
                       ))
                     : userPlaylist?.map((p, index) => (
                          <PlaylistCover key={index} info={p} editable />
                       ))}
               </div>
            </TabPanel>
            <TabPanel className="w-full">
               <div className="grid w-full grid-cols-1 gap-6 py-2 my-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3">
                  <div
                     className="flex-col col-span-1 gap-2 border rounded-md cursor-pointer border-primary flex-center hover:text-dandelion-primary text-primary min-w-[180px] min-h-[250px]"
                     onClick={() => setShow(true)}
                  >
                     <IoAddCircleOutline className="text-4xl" />
                     <p className="text-lg">Add new playlist</p>
                  </div>
                  {fetchPending
                     ? [1, 2, 3, 4].map((loading) => (
                          <PlaylistCoverSkeleton key={loading} />
                       ))
                     : userPlaylist
                          ?.filter((p) => p?.createdBy === currentUser?.id)
                          .map((p, index) => (
                             <PlaylistCover key={index} info={p} editable />
                          ))}
               </div>
            </TabPanel>
         </Tabs>
      </div>
   );
};

export default PlaylistLib;
