import React, { useState, useEffect } from "react";
import {
   MdOutlinePlayCircle,
   MdOutlinePauseCircle,
   MdOutlineSkipNext,
   MdOutlineSkipPrevious,
   MdOutlineReplay,
   MdOutlineShuffle,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import { Progress } from "./Progress";
import { play, pause, updateAndPlay } from "../Playbar/playingSlice";
import { updateShuffle } from "../Playlist/playlistSlice";
import {
   addToQueue,
   removeASongFromQueue,
   updateQueue,
   addASongToPlayed,
   removeASongFromPlayed,
   updatePlayed,
} from "../playQueueSlice";

const Player = () => {
   const currentSong = useSelector((state) => state.playing.value);
   const currentPlaylist = useSelector((state) => state.playlist.value);
   const playqueue = useSelector((state) => state.playqueue.queue);
   const played = useSelector((state) => state.playqueue.played);
   const dispatch = useDispatch();

   const [audio, setAudio] = useState(null);
   const [playing, setPlaying] = useState(false);
   const [length, setLength] = useState(0);
   const [time, setTime] = useState(0);
   const [volume, setVolume] = useState(0.8);
   let [end, setEnd] = useState(0);

   const [slider, setSlider] = useState(0);
   const [drag, setDrag] = useState(0);

   const [looped, setLooped] = useState(false);

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
      // setPlaying(false);
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
      console.log(audio);
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
      if (playing) {
         audio?.play();

         if (!currentSong?.playing) {
            dispatch(play());
         }
      } else {
         console.log("vo day chac luon");
         audio?.pause();

         if (currentSong?.playing) {
            dispatch(pause());
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

         if (looped) {
            setTimeout(() => {
               console.log("trigger play again");
               setPlaying(true);
            }, 500);
         } else {
            nextSong();

            setTimeout(() => {
               setPlaying(true);
            }, 500);
         }
      }
   }, [end]);

   const nextSong = () => {
      if (playqueue.length > 0) {
         dispatch(updateAndPlay(playqueue[0]));
         dispatch(addASongToPlayed(playqueue[0]));
         dispatch(removeASongFromQueue(playqueue[0]));
      } else {
         const newShuffe = [...played];
         dispatch(updateAndPlay(newShuffe[0]));
         dispatch(updatePlayed([newShuffe[0]]));

         if (newShuffe.length === 1) {
            dispatch(updateQueue([]));
         } else {
            dispatch(updateQueue(newShuffe.slice(1)));
         }
      }
   };

   const prevSong = () => {
      if (played.length === 1) {
         dispatch(updateAndPlay(null));

         setTimeout(() => {
            dispatch(updateAndPlay(played[0]));
         }, 200);
         // dispatch(addToQueue(played[played.length - 1]));
         // dispatch(removeASongFromPlayed(played[played.length - 1]));
      } else {
         const lastPlay = played[played.length - 2];
         dispatch(updateAndPlay(lastPlay));
         dispatch(addToQueue(played[played.length - 1]));
         dispatch(removeASongFromPlayed(played[played.length - 1]));
      }
   };

   return (
      <div
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
               flex flex-col justify-center items-center gap-2"
      >
         <div className="flex gap-2 items-center text-xl">
            <button
               className={`p-2 hover:bg-hover-1 rounded-full ${
                  currentPlaylist?.shuffle ? "opacity-100" : "opacity-50"
               }`}
               onClick={() => {
                  //@todo: update playlist shuffle here
                  dispatch(updateShuffle(!currentPlaylist?.shuffle));
               }}
            >
               <MdOutlineShuffle />
            </button>

            <button className="p-1 hover:bg-hover-1 rounded-full">
               <MdOutlineSkipPrevious className="text-3xl" onClick={prevSong} />
            </button>

            <button onClick={() => setPlaying(!playing)}>
               {playing ? (
                  <MdOutlinePauseCircle className="text-5xl" />
               ) : (
                  <MdOutlinePlayCircle className="text-5xl" />
               )}
            </button>

            <button className="p-1 hover:bg-hover-1 rounded-full">
               <MdOutlineSkipNext className="text-3xl" onClick={nextSong} />
            </button>

            <button
               className={`p-2 hover:bg-hover-1 rounded-full ${
                  looped ? "opacity-100" : "opacity-50"
               }`}
               onClick={() => setLooped(!looped)}
            >
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
