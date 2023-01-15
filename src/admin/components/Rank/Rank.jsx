import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { useState } from "react";
import { useEffect } from "react";

const Splus = () => {
   return <div className="rounded-md px-2 py-[1px] text-xs bg-[#D35400]/30 text-[#D35400] flex-center">S+</div>;
};

const OnlyS = () => {
   return <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#3498DB]/30 text-[#3498DB] flex-center">S</div>;
};

const Aplus = () => {
   return <div className="rounded-md px-2 py-[1px] text-xs bg-[#2ECC71]/30 text-[#2ECC71] flex-center">A+</div>;
};

const OnlyA = () => {
   return <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#1ABC9C]/30 text-[#1ABC9C] flex-center">A</div>;
};

const OnlyB = () => {
   return <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#795548]/30 text-[#FFF] flex-center">B</div>;
};

const Undefined = () => {
   return <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#515A5A]/30 text-[#ffffff] flex-center">U</div>;
};

export const RankNames = {
   Splus: "S+",
   S: "S",
   Aplus: "A+",
   A: "A",
   B: "B",
   Undefined: "Undefined",
};

export const RankItem = ({ rankName }) => {
   switch (rankName) {
      case RankNames.Splus:
         return <Splus />;
      case RankNames.S:
         return <OnlyS />;
      case RankNames.Aplus:
         return <Aplus />;
      case RankNames.A:
         return <OnlyA />;
      case RankNames.B:
         return <OnlyB />;
      case RankNames.Undefined:
      default:
         return <Undefined />;
   }
};

export const RankMenu = ({ rankInput, onRankChange }) => {
   const [currentRank, setCurrentRank] = useState(rankInput);

   const onUpdate = (rank) => {
      onRankChange(rank);
      setCurrentRank(rank);
   };

   const hideOnInnerButtonPress = {
      name: "hideOnInnerButtonPress",
      defaultValue: true,
      fn(instance) {
         return {
            onCreate() {
               instance.popper.addEventListener("click", (event) => {
                  if (instance.props.hideOnInnerButtonPress && event.target.getAttribute("hide-on-press") === "false") {
                     setTimeout(() => instance.hide(), 50);
                     console.log("[hideOnInnerButtonPress]", "pressed");
                     return event;
                  }
               });
            },
         };
      },
   };

   return (
      <Tippy
         interactive
         placement="bottom"
         appendTo={() => document.body}
         delay={[0, 700]}
         plugins={[hideOnInnerButtonPress]}
         trigger="click"
         render={(attrs) => (
            <div className="w-20 gap-1 p-1 rounded-md shadow-md flex-c bg-layout" tabIndex="-1" {...attrs}>
               <button
                  className="w-full opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(RankNames.Splus)}
               >
                  <RankItem rankName={RankNames.Splus} />
               </button>
               <button
                  className="w-full opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(RankNames.S)}
               >
                  <RankItem rankName={RankNames.S} />
               </button>
               <button
                  className="w-full opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(RankNames.Aplus)}
               >
                  <RankItem rankName={RankNames.Aplus} />
               </button>
               <button
                  className="w-full opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(RankNames.A)}
               >
                  <RankItem rankName={RankNames.A} />
               </button>
               <button
                  className="w-full opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(RankNames.B)}
               >
                  <RankItem rankName={RankNames.B} />
               </button>
               <button
                  className="w-full opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(RankNames.Undefined)}
               >
                  <RankItem rankName={RankNames.Undefined} hide-on-press="false" />
               </button>
            </div>
         )}
      >
         <div className="hover:cursor-pointer">
            <RankItem rankName={currentRank} />
         </div>
      </Tippy>
   );
};

// export default RankItem;
