import React from "react";
import { GiMicrophone, GiSpeaker } from "react-icons/gi";
import { MdQueueMusic } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { Progress } from "./Progress";
import {
   toggleQueuebar,
   toggleQueuebarHidden,
} from "../../Reducers/queueSlice";

const PlaybarOptions = () => {
   const queueState = useSelector((state) => state.queue);
   const dispatch = useDispatch();

   const handleToggle = () => {
      if (queueState.hidden) {
         dispatch(toggleQueuebarHidden(false));
      } else {
         setTimeout(() => {
            dispatch(toggleQueuebarHidden(true));
         }, 500);
      }

      if (queueState.animate) {
         dispatch(toggleQueuebar(false));
      } else {
         setTimeout(() => {
            dispatch(toggleQueuebar(true));
         }, 50);
      }
   };

   return (
      <div className="flex justify-center items-center">
         <div className="flex justify-center items-center gap-4 pr-3">
            <button>
               <GiMicrophone />
            </button>
            <div className="w-36 flex gap-2 justify-center items-center">
               <GiSpeaker className="text-3xl" />
               {/* <Progress value={10} /> */}
            </div>
         </div>
         <div className="2xl:hidden px-3 border-l border-hover-1">
            <button
               className="p-[6px] rounded-md text-white flex items-center justify-center bg-hover-1"
               onClick={handleToggle}
            >
               <MdQueueMusic
                  className={`text-xl ${
                     queueState.hidden ? "text-primary" : ""
                  }`}
               />
            </button>
         </div>
      </div>
   );
};

export default PlaybarOptions;
