import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const nctRequest = axios.create({
   baseURL: BASE_URL,
});

const get = async (path, params = {}) => {
   const response = await nctRequest.get(path, params);
   return response.data;
};

const post = async (path, data) => {
   const response = await nctRequest.post(path, data);
   return response;
};

export const uploadSong = async (id) => {
   return post("upload", { id, vendor: "nct" });
};

// export const getSongInfo = async (id) => {
//    const res = await get(`song/info/${id}`);
//    return res?.data;
// };

// export const getArtistInfo = async (name) => {
//    const res = await get(`artist/${name}`);
//    return res?.data;
// };
