import { useState } from "react";

function Switch({ init = true, onSwitchChange }) {
   const [toggle, setToggle] = useState(init);

   const toggleClass = "transform translate-x-4";

   return (
      <>
         <div className="flex flex-col items-center justify-center">
            <div
               className={`flex items-center w-10 h-[18px] p-1 rounded-full cursor-pointer
                  ${toggle ? "bg-dandelion-primary" : "bg-contrast"}`}
               onClick={() => {
                  setToggle(!toggle);
                  onSwitchChange(!toggle);
               }}
            >
               <div
                  className={
                     "bg-black h-4 w-4 rounded-full shadow-md transform duration-300 ease-in-out" +
                     (toggle ? "" : toggleClass)
                  }
               ></div>
            </div>
         </div>
      </>
   );
}

export default Switch;
