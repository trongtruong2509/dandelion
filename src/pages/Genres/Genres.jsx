import React from "react";
import { useState } from "react";

import { paths } from "../../app/routes";
import { CountryGenres, TopicGenres } from "../../data";
import TopicItem from "./TopicItem";
import CountryItem from "./CountryItem";

const Genres = () => {
   const [displayAll, setDisplayAll] = useState(false);

   return (
      <div className="w-full text-primary">
         <div className="py-5">
            <div className="mb-5 flex-btw">
               <div className="flex items-center justify-start gap-4">
                  <h1 className="text-xl font-bold text-primary">
                     Mood and Activity
                  </h1>
               </div>
            </div>
            <div className="grid w-full grid-cols-4 gap-6">
               {displayAll ? (
                  TopicGenres.map((t, index) => (
                     <TopicItem
                        key={index}
                        className="col-span-1"
                        thumbnail={t.thumbnail}
                        topic={t.name}
                        to={paths.genre.replace(":id", t.name)}
                     />
                  ))
               ) : (
                  <>
                     {TopicGenres.slice(0, 8).map((t, index) => (
                        <TopicItem
                           key={index}
                           className="col-span-1"
                           thumbnail={t.thumbnail}
                           topic={t.name}
                           to={paths.genre.replace(":id", t.id)}
                        />
                     ))}

                     {!displayAll && (
                        <div className="w-full col-span-4 pb-3 flex-center">
                           <button
                              className="px-5 py-[6px] transition-all duration-150 ease-out border rounded-3xl text-primary border-primary hover:text-dandelion-primary"
                              onClick={() => setDisplayAll(true)}
                           >
                              Show All
                           </button>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">By Country</h1>
            <div className="grid w-full grid-cols-4 gap-6">
               {CountryGenres.map((t, index) => (
                  <CountryItem
                     key={index}
                     className="col-span-1 "
                     thumbnail={t.thumbnail}
                     topic={t.name}
                     to={paths.genre.replace(":id", t.id)}
                  />
               ))}
            </div>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">
               Trữ Tình & Bolero
            </h1>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">
               Acoustic & Cover
            </h1>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">Indie</h1>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">EDM</h1>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">Hip-Hop</h1>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">R&B</h1>
         </div>
         <div className="pt-7">
            <h1 className="mb-5 text-xl font-bold text-primary">Nhạc Phim</h1>
         </div>

         <div className="pt-40"></div>
      </div>
   );
};

export default Genres;
