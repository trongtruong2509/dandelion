import { useState, useEffect } from "react";

const useAudio = (songInfo) => {
   const [audio, setAudio] = useState(null);
   const [length, setLength] = useState(0);
   const [time, setTime] = useState(0);
   const [volume, setVolume] = useState(1);
   const [slider, setSlider] = useState(0);
   let [end, setEnd] = useState(0);

   useEffect(() => {
      const _audio = new Audio(songInfo?.audio);
      _audio.currentTime = 0;

      const setAudioData = () => {
         setLength(_audio.duration);
         setTime(_audio.currentTime);
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

   return {
      audio,
      time,
      length,
      volume,
      slider,
      end,
      setVolume,
      setSlider,
   };
};

export default useAudio;
