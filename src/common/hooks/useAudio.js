import { useState, useEffect } from "react";
import * as local from "../utils/localStorage";

const useAudio = (songInfo) => {
   initVol = local.getPlaybar()?.volume ?? 1;

   const [audio, setAudio] = useState(null);
   const [length, setLength] = useState(0);
   const [time, setTime] = useState(0);
   const [volume, setVolume] = useState(initVol);
   const [slider, setSlider] = useState(0);
   const [readyState, setReadyState] = useState(0);
   const [networkState, setNetworkState] = useState(0);
   let [end, setEnd] = useState(0);

   useEffect(() => {
      const _audio = new Audio(songInfo?.audio);
      _audio.currentTime = 0;
      setTime(0);
      setReadyState(() => _audio?.readyState);
      setNetworkState(() => _audio?.networkState);

      const setAudioData = () => {
         setLength(_audio.duration);
         setTime(() => _audio.currentTime);
      };

      const setAudioTime = () => {
         const curTime = _audio.currentTime;
         setTime(curTime);
         setSlider(curTime ? ((curTime * 100) / _audio.duration).toFixed(1) : 0);
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
   }, [songInfo]);

   useEffect(() => {
      setReadyState(() => audio?.readyState);
   }, [audio?.readyState]);

   useEffect(() => {
      setNetworkState(() => audio?.networkState);
   }, [audio?.networkState]);

   return {
      audio,
      time,
      length,
      volume,
      slider,
      end,
      readyState,
      networkState,
      setVolume,
      setSlider,
   };
};

export default useAudio;
