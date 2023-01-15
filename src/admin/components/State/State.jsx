import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { useState } from "react";

// State title
// 1 => happy
// 2 => lovesick
// 3 => unrequited
// 4 => inlove
// 5 => together
// 6 => distance
// 7 => breakup
// 8 => broken
// 9 => healing
// 10 => stuck

export const StateNames = {
   Happy: "State_Happy",
   Sight: "State_Sight",
   Lovesick: "State_Lovesick",
   Unrequited: "State_Unrequited",
   Inlove: "State_Inlove",
   Together: "State_Together",
   Distance: "State_Distance",
   Breakup: "State_Breakup",
   Broken: "State_Broken",
   Healing: "State_Healing",
   StuckForever: "State_Stuck",
   Undefined: "State_Unknown",
};

export const ShortStateNames = {
   Happy: "Happy",
   Sight: "Sight",
   Lovesick: "Lovesick",
   Unrequited: "Unrequited",
   Inlove: "Inlove",
   Together: "Together",
   Distance: "Distance",
   Breakup: "Breakup",
   Broken: "Broken",
   Healing: "Healing",
   StuckForever: "Stuck",
   Undefined: "Unknown",
};

export const StateItem = ({ stateName, full }) => {
   const Item = ({ bg, text, content, full = false }) => {
      return (
         <div className={`rounded-md py-[1px] text-xs flex-center ${bg} ${text} ${full == true ? "w-18" : "w-16"}`}>
            {content}
         </div>
      );
   };

   switch (stateName) {
      case ShortStateNames.Happy:
         return <Item bg="bg-[#76448A]/30" text="text-[#76448A]" content={stateName} full={full} />;
      case ShortStateNames.Sight:
         return <Item bg="bg-[#764400]/30" text="text-[#764411]" content={stateName} full={full} />;
      case ShortStateNames.Lovesick:
         return <Item bg="bg-[#1F618D]/30" text="text-[#1F618D]" content={stateName} full={full} />;
      case ShortStateNames.Unrequited:
         return <Item bg="bg-[#148F77]/30" text="text-[#148F77]" content={stateName} full={full} />;
      case ShortStateNames.Inlove:
         return <Item bg="bg-[#D4AC0D]/30" text="text-[#D4AC0D]" content={stateName} full={full} />;
      case ShortStateNames.Together:
         return <Item bg="bg-[#A04000]/30" text="text-[#A04000]" content={stateName} full={full} />;
      case ShortStateNames.Distance:
         return <Item bg="bg-[#76448A]/30" text="text-[#76448A]" content={stateName} full={full} />;
      case ShortStateNames.Breakup:
         return <Item bg="bg-[#1F618D]/30" text="text-[#1F618D]" content={stateName} full={full} />;
      case ShortStateNames.Broken:
         return <Item bg="bg-[#148F77]/30" text="text-[#148F77]" content={stateName} full={full} />;
      case ShortStateNames.Healing:
         return <Item bg="bg-[#D4AC0D]/30" text="text-[#D4AC0D]" content={stateName} full={full} />;
      case ShortStateNames.StuckForever:
         return <Item bg="bg-[#A04000]/30" text="text-[#A04000]" content={stateName} full={full} />;
      case ShortStateNames.Undefined:
      default:
         return <Item bg="bg-[#515A5A]/30" text="text-[#000]" content={ShortStateNames.Undefined} full={full} />;
   }
};

export const StateMenu = ({ stateInput, onStateChange }) => {
   // const [currentState, setCurrentState] = useState(stateInput);
   const [currentShortState, setCurrentShortState] = useState(stateInput.split("_")[1]);

   const onUpdate = (state) => {
      onStateChange(state);
      // setCurrentState(state);
      setCurrentShortState(state.split("_")[1]);
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
            <div className="w-24 gap-1 p-1 rounded-md shadow-md flex-c bg-layout" tabIndex="-1" {...attrs}>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Happy)}
               >
                  <StateItem full stateName={ShortStateNames.Happy} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Sight)}
               >
                  <StateItem full stateName={ShortStateNames.Sight} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Lovesick)}
               >
                  <StateItem full stateName={ShortStateNames.Lovesick} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Unrequited)}
               >
                  <StateItem full stateName={ShortStateNames.Unrequited} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Inlove)}
               >
                  <StateItem full stateName={ShortStateNames.Inlove} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Together)}
               >
                  <StateItem full stateName={ShortStateNames.Together} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Distance)}
               >
                  <StateItem full stateName={ShortStateNames.Distance} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Breakup)}
               >
                  <StateItem full stateName={ShortStateNames.Breakup} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Broken)}
               >
                  <StateItem full stateName={ShortStateNames.Broken} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Healing)}
               >
                  <StateItem full stateName={ShortStateNames.Healing} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.StuckForever)}
               >
                  <StateItem full stateName={ShortStateNames.StuckForever} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(StateNames.Undefined)}
               >
                  <StateItem full stateName={ShortStateNames.Undefined} hide-on-press="false" />
               </button>
            </div>
         )}
      >
         <div className="hover:cursor-pointer">
            <StateItem stateName={currentShortState} />
         </div>
      </Tippy>
   );
};
