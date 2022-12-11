import axios from "axios";

const BASE_URL = "https://dandelion-api-two.vercel.app/";

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

export const fetchSong = async (id) => {
   const res = await post("upload", { id, vendor: "nct" });
   return res.status === 201 ? res.data : null;
};

// export const getSongInfo = async (id) => {
//    const res = await get(`song/info/${id}`);
//    return res?.data;
// };

// export const getArtistInfo = async (name) => {
//    const res = await get(`artist/${name}`);
//    return res?.data;
// };
