// src/components/RoomListing.js
import React, { useState, useEffect } from "react";
import RoomCard from "./RoomCard";

const RoomListing = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  // Function to fetch rooms data
  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await fetch("/sample.json"); // Fetch from the public folder
      const data = await response.json();
      setRooms(data.rooms_by_serial_no[0].rooms); // Update based on the JSON structure
      setLoading(false);
    } catch (error) {
      setError("Error fetching rooms");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="room-listing">
      {rooms.map((room) => (
        <RoomCard key={room.serial_no} room={room} />
      ))}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </div>
  );
};

export default RoomListing;
