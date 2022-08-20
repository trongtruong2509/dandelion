import React, { useEffect, useState } from "react";
import {
   //    deleteObject,
   getDownloadURL,
   ref,
   uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../../firebase.config";

import MainContainer from "../../common/components/MainContainer";
import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
import extractAudio from "../../common/utils/extractAudio";
import UploadComponent from "./UploadComponent";

const Upload = () => {
   return (
      <div className="flex ">
         <Sidebar />
         <MainContainer children={<UploadComponent />} />
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Upload;
