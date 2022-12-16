import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./Modal";
import { applyTheme } from "../../../themes/utils";
import { IoCheckmarkCircle, IoCloseOutline } from "react-icons/io5";
import { updateTheme } from "../../slices/dandelionSlice";
import themes from "../../../themes/themes";

const ThemeModal = ({ ...props }) => {
   return (
      <Modal {...props} className="p-6 text-white bg-layout w-[900px] rounded-xl">
         <header className="relative flex items-center w-full pb-1 header text-primary">
            <h4 className="text-2xl font-bold">Theme Display</h4>
            <button
               className="absolute top-0 right-0 text-3xl text-right opacity-50 font-extralight text-secondary hover:text-dandelion hover:opacity-100"
               onClick={props.onClose}
            >
               <IoCloseOutline />
            </button>
         </header>
         <main className="flex-c w-full gap-4 py-3 text-primary">
            <div>
               <p className="pb-2 semibold">Dark Themes</p>
               <div className="flex flex-wrap gap-4">
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/dark.jpg"
                     themeName="Dark"
                     themeKey="darkTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/purple.jpg"
                     themeName="Purple"
                     themeKey="purpleTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue.jpg"
                     themeName="Blue"
                     themeKey="blueTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green.jpg"
                     themeName="Green"
                     themeKey="greenTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/brown.jpg"
                     themeName="Brown"
                     themeKey="brownTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink.jpg"
                     themeName="Pink"
                     themeKey="pinkTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/red.jpg"
                     themeName="Red"
                     themeKey="redTheme"
                     onClose={props.onClose}
                  />
               </div>
            </div>
            <div className="mt-2">
               <p className="pb-2 semibold">Light Themes</p>
               <div className="flex flex-wrap gap-4">
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/light.jpg"
                     themeName="Light"
                     themeKey="baseTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/gray.jpg"
                     themeName="Gray"
                     themeKey="grayTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/blue-light.jpg"
                     themeName="Blue light"
                     themeKey="blueLightTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/green-light.jpg"
                     themeName="Green light"
                     themeKey="greenLightTheme"
                     onClose={props.onClose}
                  />
                  <ThemeItem
                     img="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/theme/pink-light.jpg"
                     themeName="Pink light"
                     themeKey="pinkLightTheme"
                     onClose={props.onClose}
                  />
               </div>
            </div>
         </main>
         {/* <div className="flex items-center justify-end w-full gap-6 pt-4 pb-2">
            <button
               className="w-20 px-3 py-[6px] -mb-2 text-white bg-dandelion rounded-lg"
               onClick={props.update ? onUpdate : onCreate}
            >
               OK
            </button>
         </div> */}
      </Modal>
   );
};

const ThemeItem = ({ img, themeName, themeKey, onClose }) => {
   const dispatch = useDispatch();
   const currentTheme = useSelector((state) => state.dandelion.theme);

   return (
      <div className="rounded-md group">
         <div className="relative">
            <img src={img} alt={themeName} className="w-[126px] h-[84px] rounded-md" />
            <button
               className="absolute-center hidden px-5 py-[2px] text-sm text-white capitalize transition-all duration-100 ease-out opacity-100 rounded-3xl bg-dandelion group-hover:block hover:opacity-90"
               onClick={() => {
                  onClose();
                  applyTheme(themes[themeKey]);
                  dispatch(updateTheme(themeKey));
               }}
            >
               Apply
            </button>
            {themeKey === currentTheme?.theme && (
               <div className="absolute bottom-2 right-2">
                  <IoCheckmarkCircle className="text-2xl text-dandelion" />
               </div>
            )}
         </div>
         <p className="pt-1 text-sm">{themeName}</p>
      </div>
   );
};

export default ThemeModal;
