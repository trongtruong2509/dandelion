import * as mmb from "music-metadata-browser";

const parseFile = async (file) => {
   console.log(`Parsing file "${file.name}" of type ${file.type}`);

   return mmb.parseBlob(file, { native: true }).then((metadata) => {
      console.log(`Completed parsing of ${file.name}:`, metadata);
      return metadata;
   });
};

const fmtMSS = (s) => new Date(1000 * s).toISOString().substr(15, 4);

const extractAudio = async (src) => {
   let data = {
      fileName: src.name,
      src,
   };

   try {
      const metadata = await parseFile(src);
      data["album"] = metadata.common.album;
      data["artists"] = metadata.common.artists;
      data["title"] = metadata.common.title;
      data["duration"] = fmtMSS(metadata.format.duration);
      data["type"] = metadata.format.codec;
      data["lossless"] = metadata.format.lossless;

      if (metadata.format.codec === "MPEG 1 Layer 3") {
         data["type"] = "MP3";
      }

      let imgData = metadata.common.picture[0].data;
      const imgFormat = metadata.common.picture[0].format;

      let base64String = "";
      for (let i = 0; i < imgData.length; i++) {
         base64String += String.fromCharCode(imgData[i]);
      }

      data["picture"] = `data:${imgFormat};base64,${window.btoa(base64String)}`;
   } catch (error) {
      console.log(error);
   }

   console.log(data);

   return data;
};

export default extractAudio;
