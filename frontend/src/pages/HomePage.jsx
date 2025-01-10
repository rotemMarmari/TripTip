import React, { useState } from "react";
import { backendCheck } from "../API/axios";
import Map from "../components/Map";
import "../styles/HomePageStyle.css";

const HomePage = () => {
  const [connect, setConnect] = useState("Not connected");

  const handleConnect = async () => {
    try {
      const response = await backendCheck();
      console.log(response.data.message);
      setConnect(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>HomePage</h1>
      </div>
      <button onClick={handleConnect}>Connect</button>
      <h3>{connect}</h3>
      <Map />
    </div>
  );
};

export default HomePage;
