import { addNewDoc, getDocById } from "../../../common/utils/firebaseApi";
import { firebaseCollections } from "../../../dataTemplate";
import * as zing from "../../../services/zingApi";

const songInfo = async (id, rank) => {
   try {
      const raw = await zing.getSongInfo(id);
      console.log("[songInfo]", raw);

      if (raw.streamingStatus == 2) {
         return null;
      }

      let artists = [];

      raw.artists.forEach((a) => {
         artists.push({
            id: a.alias,
            name: a.name,
            alias: a.alias,
            link: `/artist/${a.alias}`,
            thumbnail: a.thumbnail,
            thumbnailM: a.thumbnailM,
            playlistIds: [],
            topHits: [],
            album: [],
         });
      });

      const songAudio = `http://api.mp3.zing.vn/api/streaming/audio/${id}/320`;

      const info = {
         id: raw.encodeId,
         title: raw.title,
         rank,
         alias: raw.alias,
         audio: songAudio,
         isOffical: true,
         username: "dandelion",
         artistsNames: raw.artistsNames,
         artists,
         thumbnailM: raw.thumbnailM,
         link: `/track/${id}`,
         thumbnail: raw.thumbnail,
         duration: raw.duration,
         isPrivate: raw.isPrivate,
         releaseDate: raw.releaseDate,
         uploadDate: Date.now().toString(),
         uploadDate: Date.now(),
         genreIds: raw.genreIds,
         radioId: raw.radioId ?? "",
         hasLyric: false,
         genres: raw.genres,
         albumId: raw.album?.encodeId ?? null,
         radio: raw.radio ?? null,
         like: 0,
         listen: 0,
         liked: false,
      };

      return info;
   } catch (error) {
      console.log("[uploadZing] error", error);

      return null;
   }
};

export const uploadZingById = async (id, rank) => {
   const info = await songInfo(id, rank);

   try {
      if (info) {
         const result = await addNewDoc(
            firebaseCollections.songs,
            info,
            info.id
         );

         for (const artist of info?.artists) {
            const existDoc = await getDocById(
               firebaseCollections.artists,
               artist.id
            );

            if (!existDoc) {
               await addNewDoc(firebaseCollections.artists, artist, artist.id);
            }
         }

         console.log("[uploadZingById] result", result);
         // return Promise.resolve()
      } else {
         return Promise.reject("Song info is null");
      }
   } catch (error) {
      console.log("[uploadZingById] error", error);
      return Promise.reject(new Error(error));
   }
};

export const getArtistInfo = async (name) => {
   try {
      const raw = await zing.getArtistInfo(name);
      console.log("[getArtistInfo]", raw);

      return raw;
   } catch (error) {
      console.log("[getArtistInfo] error", error);

      return null;
   }
};

export const getTracksFromArtist = async (id) => {
   console.log("[getTracksFromArtist] inputId", id);

   const artist = await getArtistInfo(id);
   const songs = artist.sections[0]?.items;
   return songs;
};

export const zing_getTracks = async (category, id) => {
   let tracks = [];
   console.log("[zing_getTracks] category +  inputId", category, id);

   switch (category) {
      case "Artist":
         console.log("[switch] category +  inputId", category, id);

         tracks = await getTracksFromArtist(id);
         return tracks;

         break;

      default:
         return tracks;

         break;
   }
};
