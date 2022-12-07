import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ScaleLoader from "react-spinners/ScaleLoader";

import {
   clearSuggestion,
   fetchSuggested,
   updateAutoplay,
   updateNoShuffle,
   updateShuffle,
} from "../../slices/playQueueSlice";
import SongItem from "../Song/SongItem";
import Switch from "../Kits/Switch";
import QueueMenu from "../Popers/QueueMenu";
import { Link } from "react-router-dom";
import { IoPlay } from "react-icons/io5";
import { useState } from "react";

const PlayerQueue = () => {
   const dispatch = useDispatch();

   const queueState = useSelector((state) => state.queue);
   const playingTrack = useSelector((state) => state.playing.value);
   const playqueue = useSelector((state) => state.playqueue);
   const shuffle = useSelector((state) => state.playbar.shuffle);
   const playingPlaylist = useSelector((state) => state.playlist.playing.value);
   const currentUser = useSelector((state) => state.user.user);
   const nonUser = useSelector((state) => state.user.noLogged);
   const isMounted = useRef(false);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (playingPlaylist && playingPlaylist.songs?.length && playingTrack?.info) {
         if (isMounted.current) {
            if (shuffle) {
               dispatch(
                  updateShuffle({
                     tracks: playingPlaylist.songs,
                     chosen: playingTrack.info,
                  })
               );
            } else {
               dispatch(
                  updateNoShuffle({
                     tracks: playingPlaylist.songs,
                     chosen: playingTrack.info,
                  })
               );
            }
         } else {
            isMounted.current = true;
         }
      }
   }, [shuffle]);

   useEffect(() => {
      if (playqueue.next.length < 25) {
         dispatch(fetchSuggested(playingTrack.info));
      } else {
         dispatch(clearSuggestion());
      }
   }, [playingTrack?.info, dispatch]);

   const onTriggerNewUpload = () => {
      setLoading(true);
   };

   const isInPlaylist = () => playingPlaylist?.songs?.find((t) => t.id === playingTrack?.info.id);
   const user = () => currentUser ?? nonUser;
   const queueEmpty = () => !playqueue?.played.length && !playqueue?.next.length;

   return (
      <div
         className={`${queueState.hidden ? "hidden" : "block"} ${
            queueState.animate ? "right-0" : "-right-[320px]"
         } 2xl:w-96 w-80 2xl:block flex-shrink-0 h-full bg-layout border-l border-secondary px-2 overflow-y-scroll overscroll-auto scrollbar
            absolute top-0 2xl:right-0 2xl:relative z-[300]
            transition-all ease-out duration-500
            `}
      >
         <Tabs
            className="w-full Tabs"
            selectedTabClassName="text-item-hover bg-tab-active outline-none"
         >
            <TabList className="w-fit bg-alpha rounded-3xl p-[3px] flex-center mt-4 mb-5 lg:ml-0 -ml-3 2xl:ml-7">
               <Tab className="px-[10px] py-1 text-sm cursor-pointer 3xl:px-3 rounded-3xl text-navigation hover:text-item-hover outline-none">
                  Playing Queue
               </Tab>
               <Tab className="px-[10px] py-1 text-sm cursor-pointer 3xl:px-3 rounded-3xl text-navigation hover:text-item-hover outline-none">
                  Recently Played
               </Tab>
            </TabList>

            <TabPanel className="w-full">
               {queueEmpty() ? (
                  <div className="flex-col w-full gap-3 h-[calc(100vh-72px)] flex-center text-primary">
                     <p>Explore new releases of Dandelion</p>
                     {loading ? (
                        <div className="py-1 w-[170px] flex-center bg-dandelion-primary rounded-3xl">
                           <ScaleLoader
                              color="#fff"
                              loading={loading}
                              cssOverride={{
                                 display: "block",
                                 margin: "0 auto",
                                 borderColor: "red",
                                 marginTop: "1px",
                                 marginBottom: "-2px",
                              }}
                              height={14}
                           />
                        </div>
                     ) : (
                        <button
                           className="py-[6px] w-[170px] bg-dandelion-primary rounded-3xl text-white flex-center text-sm gap-2"
                           onClick={onTriggerNewUpload}
                        >
                           <IoPlay className="text-lg" />
                           Play New Upload
                        </button>
                     )}
                  </div>
               ) : (
                  <>
                     <div className="">
                        {playqueue?.played?.map((s) => (
                           <SongItem key={s.id} info={s} fade isPlaylist={!!playingPlaylist} />
                        ))}
                     </div>
                     {playqueue?.next.length > 0 && (
                        <div className="mt-4">
                           <div className="pl-2 mb-1">
                              <h2 className="flex gap-2 font-semibold text-primary">Play next</h2>
                              {isInPlaylist() && playingPlaylist.id !== "hidden" && (
                                 <p className="text-sm text-secondary">
                                    From playlist{" "}
                                    <Link
                                       className="font-semibold cursor-pointer text-dandelion-primary hover:underline"
                                       to={playingPlaylist.link}
                                    >
                                       {playingPlaylist?.title}
                                    </Link>
                                 </p>
                              )}
                           </div>
                           <div>
                              {playqueue?.next?.map((s) => (
                                 <SongItem key={s.id} info={s} isPlaylist={!!playingPlaylist} />
                              ))}
                           </div>
                        </div>
                     )}

                     {playqueue?.suggestion?.length > 0 && (
                        <div
                           className={`mt-4 ${playqueue?.autoplay ? "opacity-100" : "opacity-50"}`}
                        >
                           <div className="flex items-center justify-between pr-3">
                              <div className="pl-2 mb-1">
                                 <h2 className="flex gap-2 font-semibold text-primary">Autoplay</h2>
                                 <p className="text-sm text-secondary">
                                    Suggestion based on playing
                                 </p>
                              </div>
                              <Switch
                                 init={playqueue?.autoplay}
                                 onSwitchChange={() => {
                                    dispatch(updateAutoplay(!playqueue?.autoplay));
                                 }}
                              />
                           </div>
                           <div>
                              {playqueue?.suggestion?.map((s) => (
                                 <SongItem
                                    key={s.id}
                                    info={s}
                                    addPlayQueue
                                    activeDots
                                    like={false}
                                    isPlaylist={!!playingPlaylist}
                                 />
                              ))}
                           </div>
                        </div>
                     )}
                  </>
               )}
            </TabPanel>
            <TabPanel className="w-full">
               <div className="">
                  {user()?.recentPlayed?.map(
                     (s, index) =>
                        (!playingTrack?.info || playingTrack?.info?.id !== s?.id) && (
                           <SongItem key={index} info={s} />
                        )
                  )}
               </div>
            </TabPanel>
         </Tabs>
         <div className="absolute gap-2 flex-center 2xl:right-5 right-4 top-4">
            <QueueMenu />
         </div>
      </div>
   );
};

export default PlayerQueue;
