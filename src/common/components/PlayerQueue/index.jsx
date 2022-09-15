import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SongItem from "../Song/SongItem";

const PlayerQueue = () => {
   const queueState = useSelector((state) => state.queue);
   const playqueue = useSelector((state) => state.playqueue);
   const playingPlaylist = useSelector((state) => state.playlist.playing.value);
   const user = useSelector((state) => state.user.value);

   const activeStyle = "bg-hover-2 text-white";

   return (
      <div
         className={`${queueState.hidden ? "hidden" : "block"} ${
            queueState.animate ? "right-0" : "-right-[320px]"
         } 2xl:w-96 w-80 2xl:block flex-shrink-0 h-full bg-dark-2 px-2 overflow-y-scroll overscroll-auto scrollbar
            absolute top-0 2xl:right-0 2xl:relative z-[300]
            transition-all ease-out duration-500
            `}
      >
         <Tabs
            className="Tabs w-full"
            selectedTabClassName="text-white-custom bg-hover-2 hover:text-white"
         >
            <TabList className="w-fit bg-hover-1 rounded-3xl p-[3px] flex justify-center items-center mt-4 ml-10 mb-5">
               <Tab className="3xl:px-3 px-2 py-1 text-sm rounded-3xl text-navigation hover:text-white cursor-pointer">
                  Playing Queue
               </Tab>
               <Tab className="3xl:px-3 px-2 py-1 text-sm rounded-3xl text-navigation hover:text-white cursor-pointer">
                  Recently Played
               </Tab>
            </TabList>

            <TabPanel className="w-full">
               <div className="">
                  {playqueue?.played?.map((s) => (
                     <SongItem
                        key={s.id}
                        info={s}
                        fade
                        isPlaylist={!!playingPlaylist}
                     />
                  ))}
               </div>
               {playqueue?.next.length > 0 && !!playingPlaylist && (
                  <div className="mt-4">
                     <div className="mb-2">
                        <h2 className="flex gap-2 font-semibold text-white">
                           Next from
                           <span className="text-primary cursor-pointer hover:underline font-normal">
                              {playingPlaylist?.title}
                           </span>
                        </h2>
                     </div>
                     <div>
                        {playqueue?.next?.map((s) => (
                           <SongItem
                              key={s.id}
                              info={s}
                              isPlaylist={!!playingPlaylist}
                           />
                        ))}
                     </div>
                  </div>
               )}

               <div>
                  <div className="my-2">
                     <h2 className="flex gap-2 font-semibold text-white">
                        Suggession
                        {/* <span className="text-primary cursor-pointer hover:underline font-normal">
                           {playingPlaylist?.title}
                        </span> */}
                     </h2>
                  </div>
               </div>
            </TabPanel>
            <TabPanel className="w-full">
               <div className="">
                  {user?.recentPlayed?.map((s, index) => (
                     <SongItem key={index} info={s} />
                  ))}
               </div>
            </TabPanel>
         </Tabs>
         <div className="absolute right-4 top-4 flex gap-2 items-center justify-center">
            <button className="text-lg bg-hover-1 text-white p-[7px] rounded-full hover:bg-hover-2">
               <GiAlarmClock />
            </button>
            <button className="text-lg bg-hover-1 text-white p-[7px] rounded-full hover:bg-hover-2">
               <HiOutlineDotsHorizontal />
            </button>
         </div>
         {/* </header> */}
      </div>
   );
};

export default PlayerQueue;
