import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { useState } from "react";

export const GenNames = {
   First: "Gen_1",
   Second: "Gen_2",
   Third: "Gen_3",
   Fourth: "Gen_4",
   Fifth: "Gen_5",
   Undefined: "Gen_0",
};

export const GenDisplayNames = {
   First: "Gen-1",
   Second: "Gen-2",
   Third: "Gen-3",
   Fourth: "Gen-4",
   Fifth: "Gen-5",
   Undefined: "Gen-0",
};

export const GenItem = ({ genName, full }) => {
   const Item = ({ bg, text, content, full = false }) => {
      return (
         <div className={`rounded-md py-[1px] text-xs flex-center ${bg} ${text} ${full == true ? "w-18" : "w-12"}`}>
            {content}
         </div>
      );
   };

   switch (genName) {
      case GenDisplayNames.First:
         return <Item bg="bg-[#76448A]/30" text="text-[#fff]" content={genName} full={full} />;
      case GenDisplayNames.Second:
         return <Item bg="bg-[#1F618D]/30" text="text-[#fff]" content={genName} full={full} />;
      case GenDisplayNames.Third:
         return <Item bg="bg-[#148F77]/30" text="text-[#fff]" content={genName} full={full} />;
      case GenDisplayNames.Fourth:
         return <Item bg="bg-[#D4AC0D]/30" text="text-[#fff]" content={genName} full={full} />;
      case GenDisplayNames.Fifth:
         return <Item bg="bg-[#A04000]/30" text="text-[#fff]" content={genName} full={full} />;
      case GenDisplayNames.Undefined:
      default:
         return <Item bg="bg-[#515A5A]/30" text="text-[#fff]" content={GenDisplayNames.Undefined} full={full} />;
   }
};

export const GenMenu = ({ genInput, onGenChange }) => {
   const [currentDisplayGen, setCurrentDisplayGen] = useState(genInput.replace("_", "-"));

   const onUpdate = (gen) => {
      onGenChange(gen);
      setCurrentDisplayGen(gen.replace("_", "-"));
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
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(GenNames.First)}
               >
                  <GenItem full genName={GenDisplayNames.First} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(GenNames.Second)}
               >
                  <GenItem full genName={GenDisplayNames.Second} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(GenNames.Third)}
               >
                  <GenItem full genName={GenDisplayNames.Third} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(GenNames.Fourth)}
               >
                  <GenItem full genName={GenDisplayNames.Fourth} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(GenNames.Fifth)}
               >
                  <GenItem full genName={GenDisplayNames.Fifth} />
               </button>
               <button
                  className="w-18 opacity-70 hover:opacity-100"
                  hide-on-press="false"
                  onClick={() => onUpdate(GenNames.Undefined)}
               >
                  <GenItem full genName={GenDisplayNames.Undefined} hide-on-press="false" />
               </button>
            </div>
         )}
      >
         <div className="hover:cursor-pointer">
            <GenItem genName={currentDisplayGen} />
         </div>
      </Tippy>
   );
};
