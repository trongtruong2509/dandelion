import { getArtistByName } from "../../../common/utils/artists";
import { addNewDoc, getDocById } from "../../../common/utils/firebaseApi";
import { firebaseKeys } from "../../../dataTemplate";
import * as csn from "../../../services/csnService";

const calcArtists = async (rawArtists) => {
   let artists = [];

   for (const artist of rawArtists.split(",")) {
      const artistDb = await getArtistByName(artist.trim());

      if (artistDb) {
         artists.push(artistDb);
      } else if (artist.imageUrl && artist.shortLink) {
         artists.push({
            id: artist.shortLink,
            name: artist.name,
            alias: artist.shortLink,
            link: `/artist/${artist.shortLink}`,
            thumbnail: artist.imageUrl,
            thumbnailM: artist.imageUrl,
            playlistIds: [],
            topHits: [],
            album: [],
         });
      }
   }

   return artists.length ? artists : null;
};

const fetchSongInfoByLink = async (link, rank, country) => {
   try {
      const raw = await csn.fetchSong(link);
      console.log("[fetchSongInfoByLink] cns", raw);

      if (!raw) {
         return null;
      }

      const artists = await calcArtists(raw.artists);
      // const id = link.split("/").at(-1).replace(".mp3", "");

      let thumbnail = null;
      if (raw.picture) {
         let imgData = raw.picture.data.data;
         let base64String = "";
         for (let i = 0; i < imgData.length; i++) {
            base64String += String.fromCharCode(imgData[i]);
         }

         thumbnail = `data:${raw.picture.format};base64,${window.btoa(base64String)}`;
      }

      const info = {
         id: raw.fileName,
         title: raw.title,
         rank,
         alias: link,
         audio: raw.audio,
         isOffical: true,
         username: "dandelion",
         artistsNames: raw.artists,
         artists,
         thumbnailM: thumbnail,
         link: `/track/${raw.fileName}`,
         thumbnail: thumbnail,
         duration: null,
         isPrivate: false,
         releaseDate: new Date(parseInt(raw.year), 1, 1).getTime() / 1000,
         uploadDate: Date.now(),
         genreIds: [],
         radioId: "",
         hasLyric: false,
         genres: [],
         album: null,
         radio: null,
         like: 0,
         listen: 0,
         liked: false,
         vendor: "csn",
         country,
         tags: [],
      };

      return info;
   } catch (error) {
      console.log("[uploadCsnByMp3] error", error);

      return null;
   }
};

export const uploadCsnByMp3 = async (link, rank, country) => {
   try {
      const info = await fetchSongInfoByLink(link, rank, country);
      console.log("[uploadCsnByMp3]", info);
      if (info) {
         await addNewDoc(firebaseKeys.songs, info, info.id);

         if (info.artists?.length) {
            for (const artist of info.artists) {
               const existDoc = await getDocById(firebaseKeys.artists, artist.id);
               if (!existDoc) {
                  await addNewDoc(firebaseKeys.artists, artist, artist.id);
               }
            }
         }
      } else {
         return Promise.reject("Song info is null");
      }
   } catch (error) {
      console.log("[uploadCsnByMp3] error", error);
      return Promise.reject(new Error(error));
   }
};
