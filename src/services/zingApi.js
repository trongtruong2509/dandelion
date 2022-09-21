import axios from "axios";

const BASE_URL = "https://apizingmp3.herokuapp.com/api/";

const zingRequest = axios.create({
   baseURL: BASE_URL,
});

const get = async (path, params = {}) => {
   const response = await zingRequest.get(path, params);
   return response.data;
};

export const getSongInfo = async (id) => {
   const res = await get(`infosong?id=${id}`);
   return res?.data;
};

export const getArtistInfo = async (name) => {
   const res = await get(`artist?name=${name}`);
   return res?.data;
};
