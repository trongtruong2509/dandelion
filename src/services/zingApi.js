import axios from "axios";

const BASE_URL = "https://zing-mp3-api.vercel.app/api/";

const zingRequest = axios.create({
   baseURL: BASE_URL,
});

const get = async (path, params = {}) => {
   const response = await zingRequest.get(path, params);
   return response.data;
};

export const getSongInfo = async (id) => {
   const res = await get(`song/info/${id}`);
   return res?.data;
};

export const getArtistInfo = async (name) => {
   const res = await get(`artist/${name}`);
   return res?.data;
};
