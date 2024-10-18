// src/App.js
import React from "react";
import './App.css';
import RoomListing from './components/RoomListing';

function App() {
  return (
    <div className="App">
      <h1 style={{marginLeft:"8vw",padding:"10px"}}>Room Listings</h1>
      <RoomListing />
    </div>
  );
}

export default App;
