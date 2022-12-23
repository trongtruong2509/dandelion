export const LoadingSpinner = () => {
   return (
      <svg
         className="lds-spinner"
         width="48px"
         height="48px"
         fill="var(--player-text)"
         viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid"
         style={{ background: "none" }}
      >
         <g transform="rotate(0 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.9166666666666666s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(30 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.8333333333333334s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(60 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.75s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(90 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.6666666666666666s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(120 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.5833333333333334s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(150 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.5s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(180 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.4166666666666667s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(210 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.3333333333333333s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(240 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.25s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(270 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.16666666666666666s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(300 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="-0.08333333333333333s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
         <g transform="rotate(330 50 50)">
            <rect x="47" y="24" rx="3.7600000000000002" ry="1.92" width="6" height="12">
               <animate
                  attributeName="opacity"
                  values="1;0"
                  keyTimes="0;1"
                  dur="1s"
                  begin="0s"
                  repeatCount="indefinite"
               ></animate>
            </rect>
         </g>
      </svg>
   );
};

export const SongThumbnailDefault =
   "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg";

export const playingMixIcon = "https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif";
