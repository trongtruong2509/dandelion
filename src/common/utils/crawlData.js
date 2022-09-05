import axios from "axios";
// import crypto from "webcrypto";
const CryptoJS = window.CryptoJS;

class zingmp3 {
   constructor(URL, API_KEY, SECRET_KEY, CTIME, VERSION) {
      this.URL = URL;
      this.API_KEY = API_KEY;
      this.SECRET_KEY = SECRET_KEY;
      this.CTIME = CTIME;
      this.VERSION = VERSION;
   }

   // Hash signature
   async get_hash_256(str) {
      const hash = CryptoJS.SHA256(str).toString();
      return hash;
      //   return crypto.createHash("sha256").update(str).digest("hex");
   }

   get_hmac_512(str, key) {
      //   const hmac = crypto.createHmac("sha512", key);
      //   return hmac.update(Buffer.from(str, "utf-8")).digest("hex");
      const hmac = CryptoJS.HmacSHA512(str, key).toString();
      return hmac;
   }

   hash_has_id_signature(api_path, id) {
      return this.get_hmac_512(
         api_path + this.get_hash_256(`ctime=${this.CTIME}id=${id}`),
         this.SECRET_KEY
      );
   }

   // Get Cookie
   async get_cookie() {
      try {
         const response = await axios.get(`${this.URL}`);
         const cookie_jar = response.headers["set-cookie"]
            ? response.headers["set-cookie"]
            : undefined;
         const cookie = cookie_jar?.filter((_value, index) => index === 1)[0];

         return cookie;
      } catch (error) {
         return error;
      }
   }

   // Send Request
   async send_request(api_path, params, is_suggestion = false) {
      // Change base url for suggestion keyword
      const client = axios.create({
         baseURL: is_suggestion ? "https://ac.zingmp3.vn" : this.URL,
      });

      client.interceptors.response.use((response) => response.data);

      try {
         const cookie = await this.get_cookie();
         const response = await client.get(api_path, {
            headers: {
               Cookie: cookie,
            },
            params: {
               ...params,
               ctime: this.CTIME,
               version: this.VERSION,
               apiKey: this.API_KEY,
            },
         });

         return response;
      } catch (error) {
         return error;
      }
   }

   async get_song_info(id) {
      const api_path = "/api/v2/song/get/info";

      try {
         const response = await this.send_request(api_path, {
            id: id,
            sig: this.hash_has_id_signature(api_path, id),
         });

         return response;
      } catch (error) {
         return error;
      }
   }
}

const URL = "https://zingmp3.vn";
const API_KEY = "88265e23d4284f25963e6eedac8fbfa3";
const SECRET_KEY = "2aa2d1c561e809b267f3638c4a307aab";
const CTIME = String(Math.floor(Date.now() / 1000));
const VERSION = "1.6.40";

export const zing = new zingmp3(URL, API_KEY, SECRET_KEY, CTIME, VERSION);
