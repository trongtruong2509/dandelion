import React from "react";
import { Link } from "react-router-dom";

const TopicItem = ({ thumbnail, topic, to, className }) => {
   return (
      <div className={className}>
         <div className="relative w-full overflow-hidden rounded-lg group ">
            <Link to={to}>
               <img
                  src={thumbnail}
                  alt={topic}
                  className="object-cover w-full transition-all duration-300 ease-out group-hover:scale-105"
               />
               <p className="w-full h-full text-3xl font-bold tracking-wide text-white uppercase transition-all duration-300 ease-out absolute-center group-hover:bg-dark-alpha-50 flex-center group-hover:scale-105">
                  {topic}
               </p>
            </Link>
         </div>
      </div>
   );
};

export default TopicItem;
