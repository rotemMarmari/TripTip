import React from "react";
import travel from "../assets/travel.svg";

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-white text-white p-11 flex flex-col items-center">
      <img src={travel} alt="Travel" className="w-20 h-20" />
      <h1 className="text-7xl font-bold text-white drop-shadow-lg">TripTip</h1>
    </div>
  );
};

export default Header;
