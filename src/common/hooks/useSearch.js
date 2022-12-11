import { useState, useEffect } from "react";
import { removeAccents } from "../utils/common";

const useSearch = (searchTerm) => {
   if (searchTerm) {
   }
};

const getTop5Matches = (input, search) => {
   let matches = input.filter((s) =>
      removeAccents(s.title).toLowerCase().includes(removeAccents(search.toLowerCase()))
   );

   return matches.slice(0, 5);
};

export default useSearch;
