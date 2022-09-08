import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SongItem from "../Song/SongItem";

const PlayerQueue = () => {
   const queueState = useSelector((state) => state.queue);
   const playqueue = useSelector((state) => state.playqueue);
   const user = useSelector((state) => state.user.value);

   const activeStyle = "bg-hover-2 text-white";

   return (
      <div
         className={`${queueState.hidden ? "hidden" : "block"} ${
            queueState.animate ? "right-0" : "-right-[320px]"
         } 2xl:w-96 w-80 2xl:block flex-shrink-0 h-full bg-dark-2 px-2
            absolute top-0 2xl:right-0 2xl:relative z-[300]
            transition-all ease-out duration-500 
            `}
      >
         {/* <header className="py-[14px] flex justify-center items-center 3xl:gap-2 gap-1 w-full h-[72px]"> */}
         {/* <div className="bg-hover-1 rounded-3xl p-[3px]">
               <button className="3xl:px-3 px-2 py-1 text-sm rounded-3xl text-navigation hover:text-white">
                  Playing Queue
               </button>
               <button className="3xl:px-3 px-2 py-1 text-sm rounded-3xl bg-hover-2 text-white">
                  Recently Played
               </button>
            </div> */}
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
                  {user?.recentPlayed?.map((s) => (
                     <SongItem key={s.id} info={s} fade />
                  ))}
               </div>
               <div></div>
            </TabPanel>
            <TabPanel className="w-full">
               <p>Tab 5 works!</p>
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
