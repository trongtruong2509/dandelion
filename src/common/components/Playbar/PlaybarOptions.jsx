import React from "react";
import { GiMicrophone, GiSpeaker } from "react-icons/gi";
import { Progress } from "./Progress";

const PlaybarOptions = () => {
   return (
      <div className="flex justify-center items-center">
         <div className="flex justify-center items-center gap-4">
            <button>
               <GiMicrophone />
            </button>
            <div className="w-36 flex gap-2 justify-center items-center">
               <GiSpeaker className="text-3xl" />
               <Progress value={10} />
            </div>
         </div>
      </div>
   );
};

export default PlaybarOptions;
