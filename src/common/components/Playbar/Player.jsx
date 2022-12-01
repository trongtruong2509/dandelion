import React, { useState, useEffect } from "react";
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
import {
   getSuggestionToPlay,
   initQueue,
   updateQueue,
} from "../../slices/playQueueSlice";
import { updateRecentPlay } from "../../slices/userSlice";

import { Progress } from "./Progress";
import {
   updateRepeat,
   updateShuffle,
   updateVolume,
} from "../../slices/playbarSlice";
import { shuffleArray } from "../../utils/common";
import PlaybarOptions from "./PlaybarOptions";

const Player = () => {
   const dispatch = useDispatch();

   const currentSong = useSelector((state) => state.playing.value);
   const playqueue = useSelector((state) => state.playqueue.next);
   const played = useSelector((state) => state.playqueue.played);
   const playqueueSlice = useSelector((state) => state.playqueue);
   const playbarSlice = useSelector((state) => state.playbar);

   const [audio, setAudio] = useState(null);
   const [playing, setPlaying] = useState(false);
   const [length, setLength] = useState(0);
   const [time, setTime] = useState(0);
   let [end, setEnd] = useState(0);

   const [slider, setSlider] = useState(0);
   const [drag, setDrag] = useState(0);
   const [volume, setVolume] = useState(1);

   const [firstTime, setFirstTime] = useState(true);

   const fmtMSS = (s) => new Date(1000 * s).toISOString().substr(15, 4);

   useEffect(() => {
      const _audio = new Audio(currentSong?.info?.audio);
      _audio.currentTime = 0;

      const setAudioData = () => {
         setLength(_audio.duration);
         setTime(_audio.currentTime);
      };

      const setAudioTime = () => {
         const curTime = _audio.currentTime;
         setTime(curTime);
         setSlider(
            curTime ? ((curTime * 100) / _audio.duration).toFixed(1) : 0
         );
      };

      const setAudioVolume = () => setVolume(_audio.volume);

      const setAudioEnd = () => {
         setEnd((end += 1));
      };

      // events on audio object
      _audio.addEventListener("loadeddata", setAudioData);
      _audio.addEventListener("timeupdate", setAudioTime);
      _audio.addEventListener("volumechange", setAudioVolume);
      _audio.addEventListener("ended", setAudioEnd);

      setAudio(_audio);
      setSlider(0);
      _audio.pause();

      return () => {
         _audio.pause();
         _audio.removeEventListener("loadeddata", setAudioData);
         _audio.removeEventListener("timeupdate", setAudioTime);
         _audio.removeEventListener("volumechange", setAudioVolume);
         _audio.removeEventListener("ended", setAudioEnd);
      };
   }, [currentSong?.info]);

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
      if (firstTime) {
         setFirstTime(false);
      } else {
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
            dispatch(updateRecentPlay(newShuffe[0]));
            dispatch(initQueue(newShuffe));

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
      if (played.length === 1) {
         dispatch(updateAndPlay(null));

         setTimeout(() => {
            dispatch(updateAndPlay(played[0]));
         }, 200);
      } else {
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
                  onClick={() => {
                     dispatch(updateShuffle(!playbarSlice?.shuffle));
                  }}
               >
                  <IoShuffleOutline />
               </button>

               <button className="p-2 rounded-full hover:bg-alpha">
                  <IoPlaySkipBack className="text-xl" onClick={prevSong} />
               </button>

               <button onClick={() => setPlaying(!playing)}>
                  {playing ? (
                     <IoPause className="text-[40px]" />
                  ) : (
                     <IoPlay className="text-[40px]" />
                  )}
               </button>

               <button className="p-2 rounded-full hover:bg-alpha">
                  <IoPlaySkipForward className="text-xl" onClick={nextSong} />
               </button>

               {playbarSlice.repeat === 2 ? (
                  <button
                     className="p-2 rounded-full hover:bg-alpha text-dandelion-primary"
                     onClick={() => dispatch(updateRepeat(0))}
                  >
                     <MdRepeatOne />
                  </button>
               ) : playbarSlice.repeat === 1 ? (
                  <button
                     className="p-2 rounded-full hover:bg-alpha text-dandelion-primary"
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
            <div className="gap-2 font-semibold flex-center text-primary">
               <p className="w-8 text-xs text-secondary">
                  {!time ? "0:00" : fmtMSS(time)}
               </p>
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
               <p className="w-8 text-xs text-right ">
                  {!!length ? fmtMSS(length) : "0:00"}
               </p>
            </div>
         </div>
         <PlaybarOptions
            volume={volume * 100}
            onVolChange={(e) => setVolume(e.target.value / 100)}
         />
      </div>
   );
};

export default Player;
