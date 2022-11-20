import React from "react";

const Splus = () => {
   return (
      <div className="rounded-md px-2 py-[1px] text-xs bg-[#D35400]/20 text-[#D35400] flex-center">
         S+
      </div>
   );
};

const OnlyS = () => {
   return (
      <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#3498DB]/20 text-[#3498DB] flex-center">
         S
      </div>
   );
};

const Aplus = () => {
   return (
      <div className="rounded-md px-2 py-[1px] text-xs bg-[#2ECC71]/20 text-[#2ECC71] flex-center">
         A+
      </div>
   );
};

const OnlyA = () => {
   return (
      <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#1ABC9C]/20 text-[#1ABC9C] flex-center">
         A
      </div>
   );
};

const OnlyB = () => {
   return (
      <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#795548]/20 text-[#FFF] flex-center">
         B
      </div>
   );
};

const Undefined = () => {
   return (
      <div className="rounded-md px-[10px] py-[1px] text-xs bg-[#CD6155]/20 text-[#ffffff] flex-center">
         U
      </div>
   );
};

const Rank = ({ rankName }) => {
   switch (rankName) {
      case "S+":
         return <Splus />;
      case "S":
         return <OnlyS />;
      case "A+":
         return <Aplus />;
      case "A":
         return <OnlyA />;
      case "B":
         return <OnlyB />;
      default:
         return <Undefined />;
   }
};

export default Rank;
