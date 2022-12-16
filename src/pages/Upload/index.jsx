import React, { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.config";
import { MdCancel, MdCloudUpload, MdMusicNote, MdUpload } from "react-icons/md";
import { useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import _ from "lodash";

import extractAudio from "../../common/utils/extractAudio";
import { update } from "./../../common/slices/playingSlice";
import { addNewDoc } from "../../common/utils/firebaseApi";
import { firebaseKeys } from "../../dataTemplate";

const override = {
   display: "block",
   margin: "0 auto",
   borderColor: "red",
};

const Upload = () => {
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
         id: Date.now(),
         title: asset?.title,
         artists: [],
         artistNames: asset?.artists,
         audio: uploadedSrc,
         time: asset?.duration,
         thumbnail: asset?.picture,
         album: asset?.album,
         like: false,
         genreIds: [],
         releaseDate: Date.now(),
         userId: "",
         isOfficial: true,
      };

      setUploadSong(songInfo);
   }, [asset, uploadedSrc, genres]);

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

         uploadSong["genreIds"] = genres.split(",");

         setTimeout(() => {
            addNewDoc(firebaseKeys.songs, uploadSong.id.toString(), uploadSong);
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
      <div className="w-full h-full text-white flex-center">
         <div className="w-[500px] min-h-[500px] flex-center h-auto border border-secondary m-auto rounded-lg">
            {loading ? (
               <>
                  <SyncLoader color="rgb(20, 184, 166)" loading={loading} cssOverride={override} size={10} />
               </>
            ) : !!asset ? (
               <div className="w-full p-8 text-white">
                  <div className="flex items-center w-full h-40 mb-4">
                     <div className={`drop-shadow-lg w-40 h-40 flex-shrink-0`}>
                        <img src={asset?.picture} className="object-cover w-full rounded-lg" alt="Thumbnail" />
                     </div>
                     <div className="w-full py-2 pl-6 bg-dark-2 rounded-r-xl">
                        <p className="semibold">{asset?.title}</p>
                        <p className="mt-1 text-sm text-secondary">
                           {asset?.duration} / <span>{asset?.type}</span>
                        </p>
                     </div>
                  </div>
                  <div className="flex-c gap-3 text-base">
                     <div className="">
                        <label className="text-secondary">Title</label>
                        <input
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="Enter of your audio"
                           className="w-full px-2 mt-1 bg-transparent border-b border-gray-500 outline-none placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                     <div className="">
                        <label className="text-secondary">Artists</label>
                        <input
                           type="text"
                           value={artists}
                           placeholder="Enter of artist(s)"
                           onChange={(e) => setArtists(e.target.value)}
                           className="w-full px-2 mt-1 bg-transparent border-b border-gray-500 outline-none placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                     <div className="">
                        <label className="text-secondary">Album</label>
                        <input
                           type="text"
                           value={album}
                           placeholder="Album of audio"
                           onChange={(e) => setAlbum(e.target.value)}
                           className="w-full px-2 mt-1 bg-transparent border-b border-gray-500 outline-none placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                     <div className="">
                        <label className="text-secondary">Genres</label>
                        <input
                           type="text"
                           value={genres}
                           placeholder="Genres of audio"
                           onChange={(e) => setGenres(e.target.value)}
                           className="w-full px-2 mt-1 bg-transparent border-b border-gray-500 outline-none placeholder:text-base placeholder:opacity-50"
                        />
                     </div>
                  </div>
                  <div className="flex items-center justify-end w-full gap-4 mt-8">
                     <button className="gap-1 px-3 py-2 bg-gray-500 rounded-full opacity-50 flex-center hover:opacity-100 hover:bg-red-500">
                        <MdCancel />
                        Cancel
                     </button>
                     <button className="gap-1 px-3 py-2 rounded-full flex-center bg-amber-500" onClick={handleListen}>
                        <MdMusicNote />
                        Listen
                     </button>
                     <button className="gap-1 px-3 py-2 bg-teal-500 rounded-full flex-center" onClick={uploadSongInfo}>
                        <MdUpload />
                        Upload
                     </button>
                  </div>
               </div>
            ) : (
               <div className="w-full h-full flex-center">
                  <label className="flex-col w-full h-full gap-2 text-xl opacity-50 cursor-pointer flex-center text-secondary">
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

export default Upload;
