import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { MdRepeatOne } from "react-icons/md";
import { IoPlaySkipForward, IoPlaySkipBack, IoPlay, IoPause, IoShuffleOutline, IoRepeatOutline } from "react-icons/io5";

import { updateRecentPlay } from "../../slices/userSlice";
import { play, pause, updateAndPlay } from "../../slices/playingSlice";
import { updateRepeat, updateShuffle, updateVolume } from "../../slices/playbarSlice";
import { getSuggestionToPlay, initQueue, updateQueue } from "../../slices/playQueueSlice";

import useAudio from "../../hooks/useAudio";
import { Progress } from "./Progress";
import PlaybarOptions from "./PlaybarOptions";
import { shuffleArray } from "../../utils/common";
import { LoadingSpinner } from "./../../../assets";

const fmtMSS = (s) => new Date(1000 * s).toISOString().substr(15, 4);

const Player = () => {
   const dispatch = useDispatch();

   const currentSong = useSelector((state) => state.playing.value.info);
   const playing = useSelector((state) => state.playing.value.playing);
   const playqueue = useSelector((state) => state.playqueue.next);
   const played = useSelector((state) => state.playqueue.played);
   const playqueueSlice = useSelector((state) => state.playqueue);
   const playbarSlice = useSelector((state) => state.playbar);

   const isMounted = useRef(false);
   const [playingState, setPlayingState] = useState(playing); // still use local state to manage user dragging progress bar. it will prevent lagging play/pause
   const [drag, setDrag] = useState(0);
   const { audio, length, time, volume, slider, end, readyState, setVolume, setSlider } = useAudio(currentSong);

   // start playing audio when audio src has been changed
   useEffect(() => {
      if (audio && currentSong?.audio && playing) {
         dispatch(play());
      }
   }, [audio]);

   // update audio play/pause and update redux state
   useEffect(() => {
      if (isMounted.current) {
         if (playingState) {
            audio?.play();

            if (!playing) {
               dispatch(play());
            }
         } else {
            audio?.pause();

            if (playing) {
               dispatch(pause());
            }
         }
      } else {
         isMounted.current = true;
      }
   }, [playingState, audio]);

   // update current state base on redux global state
   useEffect(() => {
      setPlayingState(playing);
   }, [playing]);

   useEffect(() => {
      if (audio) {
         audio.currentTime = Math.round((drag * audio.duration) / 100);
         setPlayingState(false); // pause when draging
      }
   }, [drag]);

   useEffect(() => {
      if (audio) {
         if (playbarSlice.repeat === 2) {
            dispatch(play());
         } else {
            changeTrack();
         }
      }
   }, [end]);

   useEffect(() => {
      if (audio) {
         audio.volume = volume;
         dispatch(updateVolume(volume));
      }
   }, [volume]);

   const triggerTrack = (track, updateToQueue = false) => {
      dispatch(updateAndPlay(track));
      dispatch(updateRecentPlay(track));

      if (updateToQueue) {
         dispatch(updateQueue(track));
      }
   };

   const changeTrack = () => {
      if (playqueue.length) {
         triggerTrack(playqueue[0], true);
      } else {
         if (playbarSlice.repeat === 0 && playqueueSlice?.autoplay) {
            const suggestion = playqueueSlice?.suggestion;

            if (suggestion?.length) {
               dispatch(getSuggestionToPlay());
               triggerTrack(suggestion[0]);
            }
         } else if (playbarSlice.repeat === 1) {
            const newShuffe = [...played];
            shuffleArray(newShuffe);
            triggerTrack(newShuffe[0]);
            dispatch(initQueue(newShuffe));
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
         triggerTrack(lastPlay, true);
      }
   };

   return (
      <>
         <div className="flex-col gap-2 absolute-center flex-center">
            <div className="flex items-center gap-4 text-xl text-player" onClick={(e) => e.stopPropagation()}>
               <button
                  className={`p-2 hover:bg-alpha rounded-full ${
                     playbarSlice?.shuffle ? "text-dandelion" : "text-secondary hover:text-primary"
                  }`}
                  onClick={() => {
                     dispatch(updateShuffle(!playbarSlice?.shuffle));
                  }}
               >
                  <IoShuffleOutline />
               </button>

               <button
                  className={`p-2 text-xl rounded-full hover:bg-alpha ${
                     played.length <= 1 ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                  onClick={prevSong}
               >
                  <IoPlaySkipBack />
               </button>

               {readyState === 4 ? (
                  <button className="text-[40px]" onClick={() => dispatch(playing ? pause() : play())}>
                     {playing ? <IoPause /> : <IoPlay />}
                  </button>
               ) : (
                  <div className="-m-1 flex-center">
                     <LoadingSpinner />
                  </div>
               )}

               <button className="p-2 text-xl rounded-full hover:bg-alpha" onClick={nextSong}>
                  <IoPlaySkipForward />
               </button>

               {playbarSlice.repeat === 2 ? (
                  <button
                     className="p-2 rounded-full hover:bg-alpha text-dandelion"
                     onClick={() => dispatch(updateRepeat(0))}
                  >
                     <MdRepeatOne />
                  </button>
               ) : playbarSlice.repeat === 1 ? (
                  <button
                     className="p-2 rounded-full hover:bg-alpha text-dandelion"
                     onClick={() => dispatch(updateRepeat(2))}
                  >
                     <IoRepeatOutline />
                  </button>
               ) : (
                  <button
                     className="p-2 rounded-full hover:bg-alpha opacity-70 hover:opacity-100"
                     onClick={() => dispatch(updateRepeat(1))}
                  >
                     <IoRepeatOutline />
                  </button>
               )}
            </div>
            <div className="gap-2 semibold flex-center text-primary">
               <p className="w-8 text-xs text-secondary">{!time ? "0:00" : fmtMSS(time)}</p>
               <div className="w-[600px]">
                  <Progress
                     value={slider}
                     onChange={(e) => {
                        setSlider(e.target.value);
                        setDrag(e.target.value);
                     }}
                     onMouseUp={() => setPlayingState(true)}
                     onTouchEnd={() => setPlayingState(true)}
                     readyState={readyState}
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
      </>
   );
};

export default Player;
