import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";
import { MdCancel, MdCloudUpload, MdMusicNote, MdUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
// import PacmanLoader from "react-spinners/PacmanLoader";
import _ from "lodash";

import extractAudio from "../../common/utils/extractAudio";
import { update } from "./../../common/components/Playbar/playingSlice";
import { addNewDoc } from "../../common/utils/firebaseApi";

const override = {
   display: "block",
   margin: "0 auto",
   borderColor: "red",
};

const UploadComponent = () => {
   // const currentPlaying = useSelector((state) => state.playing.value);
   const dispatch = useDispatch();

   const [asset, setAsset] = useState(null);
   const [uploadedSrc, setUploadedSrc] = useState(null);
   const [uploadSong, setUploadSong] = useState(null);
   const [loading, setLoading] = useState(false);
   const [title, setTitle] = useState("");
   const [artists, setArtists] = useState([]);
   const [album, setAlbum] = useState("");
   const [genres, setGenres] = useState([]);

   const handleLoadFile = async (src) => {
      const data = await extractAudio(src);
      const uploadStatus = uploadFile(src);

      if (uploadStatus) {
         if (_.isEmpty(data)) {
            console.log("extracted data is empty");
            setAsset(null);
         } else {
            setAsset(data);
            setTitle(data.title);
            setAlbum(data.album);
            setArtists(data.artists);
         }
      }
   };

   useEffect(() => {
      const songInfo = {
         title: asset?.title,
         artists: asset?.artists.join(","),
         audio: uploadedSrc,
         time: asset?.duration,
         thumbnail: asset?.picture,
         ablum: asset?.album,
         like: false,
      };

      setUploadSong(songInfo);
   }, [asset, uploadedSrc]);

   const handleListen = () => {
      dispatch(update(uploadSong));
   };

   const uploadFile = (file) => {
      setLoading(true);
      const storageRef = ref(storage, `Songs/${file.name}`);
      let response = true;

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
         "state_changed",
         (snapshot) => {
            console.log("Uploading audio");
         },
         (err) => {
            console.log(err);
            console.log("Error while uploading. Try Again");
            setLoading(false);
            response = false;
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
               console.log("Audio uploaded successfully");
               setUploadedSrc(downloadURL);
               setLoading(false);
            });
         }
      );

      return response;
   };

   const clearFields = () => {
      setAsset(null);
      setTitle("");
      setArtists([]);
      setAlbum("");
      setGenres([]);
   };

   //@todo: validate first
   const validateInfo = () => {
      return true;
   };

   const uploadSongInfo = () => {
      setLoading(true);

      try {
         if (!validateInfo()) {
         }

         setTimeout(() => {
            addNewDoc("Songs", uploadSong);
            setLoading(false);
            clearFields();
         }, 1000);
      } catch (error) {
         setTimeout(() => {
            console.log(error);
            setLoading(false);
            clearFields();
         }, 1000);
      }
   };

   return (
      <div className="text-white flex justify-center items-center w-full h-full">
         <div className="w-[500px] min-h-[500px] flex justify-center items-center h-auto border border-hover-1 m-auto rounded-lg">
            {loading ? (
               <>
                  <SyncLoader
                     color="rgb(20, 184, 166)"
                     loading={loading}
                     cssOverride={override}
                     size={10}
                  />
               </>
            ) : !!asset ? (
               <div className="p-8 text-white w-full">
                  <div className="flex w-full items-center h-40 mb-4">
                     <div className={`drop-shadow-lg w-40 h-40 flex-shrink-0`}>
                        <img
                           src={asset?.picture}
                           className="w-full object-cover rounded-lg"
                           alt="Thumbnail"
                        />
                     </div>
                     <div className="bg-dark-2 pl-6 w-full py-2 rounded-r-xl">
                        <p className="font-semibold">{asset?.title}</p>
                        <p className="text-secondary text-sm mt-1">
                           {asset?.duration} / <span>{asset?.type}</span>
                        </p>
                     </div>
                  </div>
                  <div className="flex flex-col gap-3 text-base">
                     <div className="">
                        <label className="text-secondary">Title</label>
                        <input
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="Enter of your audio"
                           className="mt-1 w-full bg-transparent border-b border-gray-500 outline-none px-2 
                           placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                     <div className="">
                        <label className="text-secondary">Artists</label>
                        <input
                           type="text"
                           value={artists}
                           placeholder="Enter of artist(s)"
                           onChange={(e) => setArtists(e.target.value)}
                           className="mt-1 w-full bg-transparent border-b border-gray-500 outline-none px-2
                           placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                     <div className="">
                        <label className="text-secondary">Album</label>
                        <input
                           type="text"
                           value={album}
                           placeholder="Album of audio"
                           onChange={(e) => setAlbum(e.target.value)}
                           className="mt-1 w-full bg-transparent border-b border-gray-500 outline-none px-2
                           placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                     <div className="">
                        <label className="text-secondary">Genres</label>
                        <input
                           type="text"
                           // value={album}
                           placeholder="Genres of audio"
                           // onChange={(e) => setAlbum(e.target.value)}
                           className="mt-1 w-full bg-transparent border-b border-gray-500 outline-none px-2
                           placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                  </div>
                  <div className="flex justify-end items-center gap-4 mt-8 w-full">
                     <button
                        className="flex justify-center items-center gap-1 bg-gray-500 opacity-50 
                     hover:opacity-100 hover:bg-red-500 rounded-full py-2 px-3"
                     >
                        <MdCancel />
                        Cancel
                     </button>
                     <button
                        className="flex justify-center items-center gap-1 bg-amber-500 rounded-full py-2 px-3"
                        onClick={handleListen}
                     >
                        <MdMusicNote />
                        Listen
                     </button>
                     <button
                        className="flex justify-center items-center gap-1 bg-teal-500 rounded-full py-2 px-3"
                        onClick={uploadSongInfo}
                     >
                        <MdUpload />
                        Upload
                     </button>
                  </div>
               </div>
            ) : (
               <div className="w-full h-full flex items-center justify-center">
                  <label className="w-full h-full flex items-center justify-center flex-col gap-2 text-secondary text-xl opacity-50 cursor-pointer">
                     <p className="">Click here to upload</p>
                     <MdCloudUpload className="w-8 h-8" />
                     <input
                        type="file"
                        accept="audio/*"
                        className="w-0 h-0"
                        onChange={(e) => handleLoadFile(e.target.files[0])}
                     />
                  </label>
               </div>
            )}
         </div>
      </div>
   );
};

export default UploadComponent;
