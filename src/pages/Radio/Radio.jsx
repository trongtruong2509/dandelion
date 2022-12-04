import React from "react";
import { initGenres } from "../../common/utils/genres";
import { CountryGenres, TopGenres } from "../../data";
import { firebaseKeys } from "../../dataTemplate";

const Radio = () => {
   return (
      <div className="w-full">
         <div
            className="w-full h-[600px] flex-center text-primary"
            onClick={() =>
               initGenres(firebaseKeys.countryGenres, CountryGenres)
            }
         >
            NOT IMPLEMENTED YET
         </div>
      </div>
   );
};

export default Radio;
