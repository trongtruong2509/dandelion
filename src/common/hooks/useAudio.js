import { useState, useEffect } from "react";

const useAudio = (url) => {
   const [audio, setAudio] = useState(null);
   const [length, setLength] = useState(0);
   const [time, setTime] = useState(0);
   const [volume, setVolume] = useState(0.8);
   let [end, setEnd] = useState(0);

   useEffect(() => {
      const _audio = new Audio(url);

      //   console.log(_audio);
      const setAudioData = () => {
         setLength(_audio.duration);
         setTime(_audio.currentTime);
      };

      const setAudioTime = () => setTime(_audio.currentTime);
      const setAudioVolume = () => setVolume(_audio.volume);
      const setAudioEnd = () => setEnd((end += 1));

      // events on audio object
      _audio.addEventListener("loadeddata", setAudioData);
      _audio.addEventListener("timeupdate", setAudioTime);
      _audio.addEventListener("volumechange", setAudioVolume);
      _audio.addEventListener("ended", setAudioEnd);

      setAudio(audio);

      return () => {
         _audio.pause();

         _audio.removeEventListener("loadeddata", setAudioData);
         _audio.removeEventListener("timeupdate", setAudioTime);
         _audio.removeEventListener("volumechange", setAudioVolume);
         _audio.removeEventListener("ended", setAudioEnd);
      };
   }, []);

   return {
      audio,
      time,
      length,
   };
};

export default useAudio;
