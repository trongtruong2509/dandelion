import { useEffect, useState } from "react";

export default function useBreakPointDetect() {
   const [breakpointChanged, setBreakpointChange] = useState(1);

   useEffect(() => {
      let newWidth = window.innerWidth;
      const onResize = () => {
         newWidth = window.innerWidth;
         if (newWidth < 640) {
            setBreakpointChange(1);
         } else if (newWidth < 768) {
            setBreakpointChange(2);
         } else if (newWidth < 1024) {
            setBreakpointChange(3);
         } else if (newWidth < 1280) {
            setBreakpointChange(4);
         } else if (newWidth < 1536) {
            setBreakpointChange(5);
         } else {
            setBreakpointChange(6);
         }
      };

      onResize();

      window.addEventListener("resize", onResize);

      return () => {
         window.removeEventListener("resize", onResize);
      };
   }, []);

   return breakpointChanged;
}
