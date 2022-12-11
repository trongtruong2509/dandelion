import { getArtistByName } from "../../../common/utils/artists";
import { convertStrToTime } from "../../../common/utils/common";
import { addNewDoc, getDocById } from "../../../common/utils/firebaseApi";
import { firebaseKeys } from "../../../dataTemplate";
import * as nct from "../../../services/nctService";

const fetchSongInfo = async (id, rank) => {
   try {
      const raw = await nct.fetchSong(id);
      console.log("[fetchSongInfo] nct", raw);

      if (!raw?.streamUrls.length) {
         return null;
      }

      const artists = await calcArtists(raw.artists);
      // console.log("[calcArtists]", artists);
      const artistsNames = raw.artists.map((a) => a.name).join(", ");

      let audio = "";
      if (raw.streamUrls.length === 2 && raw.streamUrls[1].streamUrl !== "") {
         audio = raw.streamUrls[1].streamUrl;
      } else {
         audio = raw.streamUrls[0].streamUrl;
      }

      const duration = convertStrToTime(raw.duration);

      const info = {
         id: raw.key,
         title: raw.title,
         rank,
         alias: raw.key,
         audio,
         isOffical: true,
         username: "dandelion",
         artistsNames,
         artists,
         thumbnailM: raw?.thumbnail !== "" ? raw.thumbnail : artists[0]?.thumbnail ?? null,
         link: `/track/${id}`,
         thumbnail: raw?.thumbnail !== "" ? raw.thumbnail : artists[0]?.thumbnail ?? null,
         duration,
         isPrivate: false,
         releaseDate: raw.dateRelease,
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
      };

      return info;
   } catch (error) {
      console.log("[uploadNct] error", error);

      return null;
   }
};

const calcArtists = async (rawArtists) => {
   let artists = [];

   for (const artist of rawArtists) {
      const artistDb = await getArtistByName(artist.name);

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

export const uploadNctById = async (id, rank) => {
   try {
      const info = await fetchSongInfo(id, rank);
      console.log("[uploadNctById]", info);
      if (info) {
         const result = await addNewDoc(firebaseKeys.songs, info, info.id);
         for (const artist of info?.artists) {
            const existDoc = await getDocById(firebaseKeys.artists, artist.id);
            if (!existDoc) {
               await addNewDoc(firebaseKeys.artists, artist, artist.id);
            }
         }
      } else {
         return Promise.reject("Song info is null");
      }
   } catch (error) {
      console.log("[uploadNctById] error", error);
      return Promise.reject(new Error(error));
   }
};
