import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
   IoPlaySkipForward,
   IoPlaySkipBack,
   IoPlay,
   IoPause,
   IoShuffleOutline,
   IoRepeatOutline,
} from "react-icons/io5";
import { MdRepeatOne } from "react-icons/md";

import { play, pause, updateAndPlay } from "../../slices/playingSlice";
import { getSuggestionToPlay, initQueue, updateQueue } from "../../slices/playQueueSlice";
import { updateRecentPlay } from "../../slices/userSlice";

import useAudio from "../../hooks/useAudio";
import { Progress } from "./Progress";
import { updateRepeat, updateShuffle, updateVolume } from "../../slices/playbarSlice";
import { shuffleArray } from "../../utils/common";
import PlaybarOptions from "./PlaybarOptions";

const Player = () => {
   const dispatch = useDispatch();

   const currentSong = useSelector((state) => state.playing.value);
   const playqueue = useSelector((state) => state.playqueue.next);
   const played = useSelector((state) => state.playqueue.played);
   const playqueueSlice = useSelector((state) => state.playqueue);
   const playbarSlice = useSelector((state) => state.playbar);

   const [playing, setPlaying] = useState(false);
   const [drag, setDrag] = useState(0);
   const { audio, length, time, volume, slider, end, setVolume, setSlider } = useAudio(
      currentSong?.info
   );
   const isMounted = useRef(false);

   const fmtMSS = (s) => new Date(1000 * s).toISOString().substr(15, 4);

   // start playing audio when audio src has been changed
   useEffect(() => {
      if (audio && currentSong?.info?.audio && currentSong?.playing) {
         setPlaying(true);
      }
   }, [audio]);

   // update current state base on redux global state
   useEffect(() => {
      setPlaying(currentSong?.playing);
   }, [currentSong?.playing]);

   // update audio play/pause and update redux state
   useEffect(() => {
      if (isMounted.current) {
         if (playing) {
            audio?.play();

            if (!currentSong?.playing) {
               dispatch(play());
            }
         } else {
            audio?.pause();

            if (currentSong?.playing) {
               dispatch(pause());
            }
         }
      } else {
         isMounted.current = true;
      }
   }, [playing, audio]);

   useEffect(() => {
      if (audio) {
         setPlaying(false);
         const val = Math.round((drag * audio.duration) / 100);
         audio.currentTime = val;
      }
   }, [drag]);

   useEffect(() => {
      if (audio) {
         setPlaying(false);

         if (playbarSlice.repeat === 2) {
            setTimeout(() => {
               setPlaying(true);
            }, 500);
         } else {
            changeTrack();
         }
      }
   }, [end]);

   const changeTrack = () => {
      if (playqueue.length) {
         dispatch(updateAndPlay(playqueue[0]));
         dispatch(updateRecentPlay(playqueue[0]));
         dispatch(updateQueue(playqueue[0]));

         setTimeout(() => {
            setPlaying(true);
         }, 500);
      } else {
         if (playbarSlice.repeat === 0 && playqueueSlice?.autoplay) {
            const suggestion = playqueueSlice?.suggestion;

            if (suggestion?.length) {
               dispatch(getSuggestionToPlay());
               dispatch(updateAndPlay(suggestion[0]));
               dispatch(updateRecentPlay(suggestion[0]));

               setTimeout(() => {
                  setPlaying(true);
               }, 500);
            }
         } else if (playbarSlice.repeat === 1) {
            const newShuffe = [...played];
            shuffleArray(newShuffe);

            dispatch(updateAndPlay(newShuffe[0]));
            dispatch(initQueue(newShuffe));
            dispatch(updateRecentPlay(newShuffe[0]));

            setTimeout(() => {
               setPlaying(true);
            }, 500);
         }
      }
   };

   const nextSong = () => {
      changeTrack();

      // click nextSong button will force reset repeat state
      if (playbarSlice.repeat === 2) {
         dispatch(updateRepeat(0));
      }
   };

   const prevSong = () => {
      if (played.length > 1) {
         const lastPlay = played.at(-2);
         dispatch(updateAndPlay(lastPlay));
         dispatch(updateRecentPlay(lastPlay));
         dispatch(updateQueue(lastPlay));
      }
   };

   useEffect(() => {
      if (audio) {
         audio.volume = volume;
      }

      dispatch(updateVolume(volume));
   }, [volume]);

   return (
      <div>
         <div className="absolute flex-col gap-2 transform -translate-x-1/2 -translate-y-1/2 flex-center top-1/2 left-1/2">
            <div className="flex items-center gap-4 text-xl text-player">
               <button
                  className={`p-2 hover:bg-alpha rounded-full ${
                     playbarSlice?.shuffle
                        ? "text-dandelion-primary"
                        : "text-secondary hover:text-primary"
                  }`}
                  onClick={(e) => {
                     dispatch(updateShuffle(!playbarSlice?.shuffle));
                     e.stopPropagation();
                  }}
               >
                  <IoShuffleOutline />
               </button>

               <button
                  className={`p-2 text-xl rounded-full hover:bg-alpha ${
                     played.length <= 1 ? "opacity-20 cursor-not-allowed" : ""
                  }`}
                  onClick={(e) => {
                     prevSong();
                     e.stopPropagation();
                  }}
               >
                  <IoPlaySkipBack />
               </button>

               <button
                  onClick={(e) => {
                     setPlaying(!playing);
                     e.stopPropagation();
                  }}
               >
                  {playing ? (
                     <IoPause className="text-[40px]" />
                  ) : (
                     <IoPlay className="text-[40px]" />
                  )}
               </button>

               <button
                  className="p-2 text-xl rounded-full hover:bg-alpha"
                  onClick={(e) => {
                     nextSong();
                     e.stopPropagation();
                  }}
               >
                  <IoPlaySkipForward />
               </button>

               {playbarSlice.repeat === 2 ? (
                  <button
                     className="p-2 rounded-full hover:bg-alpha text-dandelion-primary"
                     onClick={(e) => {
                        dispatch(updateRepeat(0));
                        e.stopPropagation();
                     }}
                  >
                     <MdRepeatOne />
                  </button>
               ) : playbarSlice.repeat === 1 ? (
                  <button
                     className="p-2 rounded-full hover:bg-alpha text-dandelion-primary"
                     onClick={(e) => {
                        dispatch(updateRepeat(2));
                        e.stopPropagation();
                     }}
                  >
                     <IoRepeatOutline />
                  </button>
               ) : (
                  <button
                     className="p-2 rounded-full hover:bg-alpha opacity-70 hover:opacity-100"
                     onClick={(e) => {
                        dispatch(updateRepeat(1));
                        e.stopPropagation();
                     }}
                  >
                     <IoRepeatOutline />
                  </button>
               )}
            </div>
            <div className="gap-2 font-semibold flex-center text-primary">
               <p className="w-8 text-xs text-secondary">{!time ? "0:00" : fmtMSS(time)}</p>
               <div className="w-[600px]">
                  <Progress
                     value={slider}
                     onChange={(e) => {
                        setSlider(e.target.value);
                        setDrag(e.target.value);
                     }}
                     onMouseUp={() => setPlaying(true)}
                     onTouchEnd={() => setPlaying(true)}
                  />
               </div>
               <p className="w-8 text-xs text-right ">{!!length ? fmtMSS(length) : "0:00"}</p>
            </div>
         </div>
         <PlaybarOptions
            volume={volume * 100}
            onVolChange={(e) => {
               setVolume(e.target.value / 100);
               e.stopPropagation();
            }}
         />
      </div>
   );
};

export default Player;
