import axios from "axios";

// const BASE_URL = "https://dandelion-api-two.vercel.app/";
const BASE_URL = "http://localhost:7000/";

const request = axios.create({
   baseURL: BASE_URL,
});

const get = async (path, params = {}) => {
   const response = await request.get(path, params);
   return response.data;
};

const post = async (path, data) => {
   const response = await request.post(path, data);
   return response;
};

export const fetchSong = async (id) => {
   const res = await post("upload", { id, vendor: "csn" });
   return res.status === 201 ? res.data : null;
};
