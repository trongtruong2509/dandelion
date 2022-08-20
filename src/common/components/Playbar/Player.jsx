import React, { useState, useEffect } from "react";
import {
   MdOutlinePlayCircle,
   MdOutlinePauseCircle,
   MdOutlineSkipNext,
   MdOutlineSkipPrevious,
   MdOutlineReplay,
   MdOutlineShuffle,
} from "react-icons/md";

import { Progress } from "./Progress";
import useAudio from "../../hooks/useAudio";

const Player = ({ src }) => {
   const [audio, setAudio] = useState(null);
   const [playing, setPlaying] = useState(false);
   // const [hasEnded, setHasEnded] = useState(false);
   const [length, setLength] = useState(0);
   const [time, setTime] = useState(0);
   const [volume, setVolume] = useState(0.8);
   let [end, setEnd] = useState(0);

   const [slider, setSlider] = useState(0);
   const [drag, setDrag] = useState(0);
   // const [shuffled, setShuffled] = useState(false);
   // const [looped, setLooped] = useState(false);

   const fmtMSS = (s) => new Date(1000 * s).toISOString().substr(15, 4);

   useEffect(() => {
      const _audio = new Audio(src);
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

      const setAudioEnd = () => setEnd((end += 1));

      // events on audio object
      _audio.addEventListener("loadeddata", setAudioData);
      _audio.addEventListener("timeupdate", setAudioTime);
      _audio.addEventListener("volumechange", setAudioVolume);
      _audio.addEventListener("ended", setAudioEnd);

      setAudio(_audio);
      setSlider(0);
      setPlaying(false);

      return () => {
         _audio.pause();
         _audio.removeEventListener("loadeddata", setAudioData);
         _audio.removeEventListener("timeupdate", setAudioTime);
         _audio.removeEventListener("volumechange", setAudioVolume);
         _audio.removeEventListener("ended", setAudioEnd);
      };
   }, [src]);

   useEffect(() => {
      if (audio && src) {
         setPlaying(true);
      }
   }, [audio]);

   useEffect(() => {
      playing ? audio?.play() : audio?.pause();
   }, [playing]);

   useEffect(() => {
      if (audio) {
         setPlaying(false);
         const val = Math.round((drag * audio.duration) / 100);
         audio.currentTime = val;
      }
   }, [drag]);

   return (
      <div
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               flex flex-col justify-center items-center gap-2"
      >
         <div className="flex gap-2 items-center text-xl">
            <button className="p-2 hover:bg-hover-1 rounded-full">
               <MdOutlineShuffle />
            </button>

            <button className="p-1 hover:bg-hover-1 rounded-full">
               <MdOutlineSkipPrevious className="text-3xl" />
            </button>

            <button onClick={() => setPlaying(!playing)}>
               {playing ? (
                  <MdOutlinePauseCircle className="text-5xl" />
               ) : (
                  <MdOutlinePlayCircle className="text-5xl" />
               )}
            </button>

            <button className="p-1 hover:bg-hover-1 rounded-full">
               <MdOutlineSkipNext className="text-3xl" />
            </button>

            <button className="p-2 hover:bg-hover-1 rounded-full">
               <MdOutlineReplay />
            </button>
         </div>
         <div className="flex justify-center items-center gap-2">
            <p className="w-8 text-xs">{!time ? "0:00" : fmtMSS(time)}</p>
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
            <p className="w-8 text-xs">{!!length ? fmtMSS(length) : "0:00"}</p>
         </div>
      </div>
   );
};

export default Player;
