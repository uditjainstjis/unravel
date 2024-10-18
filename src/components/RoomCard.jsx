// src/components/RoomCard.js
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import hotelRoom from '../images/hotelRoom.jpg'; // Add your fallback image URL here
import Modal from './Modal'; // Import your Modal component

const RoomCard = ({ room }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [isVideoAvailable, setIsVideoAvailable] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [showModal, setShowModal] = useState(false); // Manage modal state

  useEffect(() => {
    // Check if the room has videos
    if (room.new_videos && room.new_videos.length > 0) {
      setIsVideoAvailable(true);
    }

    // Set the image source if available, otherwise set fallback image
    if (room.images && room.images.length > 0) {
      setImageSrc(room.images[0]?.twoX?.landscape || hotelRoom);
    } else {
      setImageSrc(hotelRoom);
    }
  }, [room]);

  // Toggle Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div ref={ref} className="room-card">
      <h3>{room.name}</h3>
      <p>{room?.address?.city || "City not available"}, {room?.address?.country || "Country not available"}</p>

      {/* Show video if available */}
      {isVideoAvailable && inView ? (
        <video controls autoPlay>
          <source src={room.new_videos[0]?.video_url?.med} type="video/mp4" />
        </video>
      ) : (
        // If no video, show image or fallback image, or loading if none available
        inView ? (
          imageSrc ? (
            <img src={imageSrc} alt="Room" className="hotelImage" onError={() => setImageSrc(hotelRoom)} />
          ) : (
            <div className="media-placeholder">Loading media...</div>
          )
        ) : (
          <div className="media-placeholder">Loading media...</div>
        )
      )}

      <p>{room.description || "No description available"}</p>

      {/* Show room details in the main card */}
      {room.variants && room.variants.length > 0 ? (
        <div className="room-details">
          <h4>Room Details</h4>
          <p><strong>Price:</strong> {room.variants[0].total_price?.currency} {room.variants[0].total_price?.discounted_price}</p>
          <p><strong>Bed Type:</strong> {room.variants[0].display_properties.find(prop => prop.name === "bed_type")?.value || "Not specified"}</p>
          <p><strong>Cancellation Policy:</strong> {room.variants[0].cancellation_info?.free_cancellation_info || "No free cancellation"}</p>
          <p><strong>Max Occupancy:</strong> {room.variants[0].display_properties.find(prop => prop.name === "adult_occupancy")?.value || "N/A"}</p>
        </div>
      ) : (
        <p>No room variants available</p>
      )}

      <button className="select-room-btn" onClick={toggleModal}>Show More</button>

      {/* Modal to show room variants */}
      {showModal && (
        <Modal onClose={toggleModal}>
          <h2>Room Variants for {room.name}</h2>
          {room.variants && room.variants.length > 0 ? (
            <ul className="variant-list">
              {room.variants.map((variant, index) => (
                <li key={index} className="variant-item">
                  <h3>{variant.name}</h3>
                  <p><strong>Price:</strong> {variant.total_price?.currency} {variant.total_price?.discounted_price}</p>
                  <p><strong>Bed Type:</strong> {variant.display_properties.find(prop => prop.name === "bed_type")?.value || "Not specified"}</p>
                  <p><strong>Cancellation Policy:</strong> {variant.cancellation_info?.free_cancellation_info || "No free cancellation"}</p>
                  <p><strong>Max Occupancy:</strong> {variant.display_properties.find(prop => prop.name === "adult_occupancy")?.value || "N/A"}</p>
                  
                  <button className="select-room-btn">Select Room</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No variants available</p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default RoomCard;
