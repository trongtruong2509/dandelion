import React from "react";
import { GiSpeaker } from "react-icons/gi";
import { MdQueueMusic } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { toggleQueuebar, toggleQueuebarHidden } from "../../slices/queueSlice";
import { Progress } from "./Progress";

const PlaybarOptions = ({ volume, onVolChange }) => {
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
      <div className="relative z-40 flex-center">
         <div className="gap-4 pr-3 flex-center">
            <div className="gap-2 flex-center w-36 text-primary">
               <GiSpeaker className="text-3xl" />
               <Progress value={volume} onChange={onVolChange} />
            </div>
         </div>
         <div className="px-3 border-l 2xl:hidden border-secondary">
            <button
               className="p-[6px] rounded-md text-primary flex-center bg-alpha"
               onClick={(e) => {
                  handleToggle();
                  e.stopPropagation();
               }}
            >
               <MdQueueMusic className={`text-xl ${queueState.hidden ? "text-primary" : ""}`} />
            </button>
         </div>
      </div>
   );
};

export default PlaybarOptions;
