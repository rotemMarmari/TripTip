import React, { useState, useEffect } from 'react';
import axiosInstance from './API/axios.js'
import MapBox from './components/MapBox.js';

function App() {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const fetchTestMessage = async () => {
  //     try {
  //       const response = await axiosInstance.get('/api/test');
  //       setMessage(response.data.message);
  //     } catch (error) {
  //       console.error('Error connecting to backend:', error);
  //       setMessage('Failed to connect to backend');
  //     }
  //   };

  //   fetchTestMessage();
  // }, []);

  return (
    <div>
      <h1>my mapbox:</h1>
      <MapBox/>
    </div>
  );
}

export default App;