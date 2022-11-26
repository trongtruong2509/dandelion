import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { useDispatch } from "react-redux";

import { IoMdAddCircleOutline } from "react-icons/io";
import { IoTrashSharp } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { emptyQueue } from "../../slices/playQueueSlice";
import { emptyPlayingTrack } from "../../slices/playingSlice";

const QueueMenu = () => {
   const dispatch = useDispatch();

   return (
      <Tippy
         interactive
         appendTo={() => document.body}
         delay={[0, 700]}
         trigger="click"
         placement="bottom-end"
         render={(attrs) => (
            <div
               className="w-[200px] h-auto flex flex-col bg-primary py-2 shadow-md rounded-lg -mt-2"
               tabIndex="-1"
               {...attrs}
            >
               <div className="w-full">
                  <button className="w-full hover:bg-alpha rounded-lg hover:text-dandelion-primary py-[10px] text-secondary flex justify-between items-center px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <IoMdAddCircleOutline className="text-xl" />
                        Add to playlist
                     </div>
                  </button>
                  <button
                     className="w-full hover:bg-alpha rounded-lg hover:text-dandelion-primary py-[10px] text-secondary flex justify-between items-center px-4 text-sm"
                     onClick={() => {
                        dispatch(emptyQueue());
                        dispatch(emptyPlayingTrack());
                     }}
                  >
                     <div className="flex items-center gap-3">
                        <IoTrashSharp className="text-xl" />
                        Delete queue
                     </div>
                  </button>
               </div>
            </div>
         )}
      >
         <button className="text-lg text-secondary p-[7px] rounded-full bg-alpha hover:text-dandelion-primary">
            <HiOutlineDotsHorizontal />
         </button>
      </Tippy>
   );
};

export default QueueMenu;
