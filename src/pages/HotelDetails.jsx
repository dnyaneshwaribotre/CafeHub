import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hotels } from "../data/hotels";
import LiveTables from "../components/LiveTables";
import "./HotelDetails.css";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === parseInt(id));

  if (!hotel) {
    return (
      <h3 className="text-center mt-5 text-danger">
        Hotel not found 😢
      </h3>
    );
  }

  const availableTables = hotel.totalTables - hotel.bookedTables;

  /* ⭐ Rating */
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`rating_${hotel.id}`);
    if (saved) setRating(Number(saved));
  }, [hotel.id]);

  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${hotel.id}`, value);
  };

  return (
    <div className="hotel-page">

      {/* 🌟 HERO SECTION */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${hotel.image})` }}
      >
        <div className="hero-overlay">
          <h1 className="fade-in">{hotel.name}</h1>
          <p className="fade-in delay-1">
            Taste • Comfort • Vibes
          </p>
        </div>
      </div>

      <div className="container mt-4">

        {/* 📊 TABLE STATS */}
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <div className="stat-card">
              <h4>{hotel.totalTables}</h4>
              <p>Total Tables</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card red">
              <h4>{hotel.bookedTables}</h4>
              <p>Booked</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card green">
              <h4>{availableTables}</h4>
              <p>Available</p>
            </div>
          </div>
        </div>

        {/* 🪑 LIVE TABLE STATUS */}
        <LiveTables hotel={hotel} />

        {/* ⭐ RATING */}
        <div className="rating-card mb-4 text-center">
          <h5>⭐ Rate this Cafe</h5>
          {[1, 2, 3, 4, 5].map((r) => (
            <span
              key={r}
              className="star"
              style={{ color: r <= rating ? "gold" : "#ccc" }}
              onClick={() => handleRating(r)}
            >
              ★
            </span>
          ))}
          <p className="mt-2">
            Your Rating: <b>{rating || "Not rated"} / 5</b>
          </p>
        </div>

        {/* 🍽 MENU */}
        <div className="menu-card mb-5">
          <h4>🍽 Menu</h4>
          {hotel.menu.map((item, i) => (
            <div key={i} className="menu-item">
              <span>{item.item}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
        </div>

        {/* 📍 LOCATION */}
        <div className="location-card mb-5">
          <h4>📍 Location</h4>
          <iframe
            title="map"
            width="100%"
            height="300"
            style={{ borderRadius: "12px", border: 0 }}
            loading="lazy"
            src={`https://www.google.com/maps?q=${hotel.lat},${hotel.lng}&output=embed`}
          />
        </div>
      </div>

      {/* 🔥 STICKY BOOK BUTTON */}
      <div className="book-bar">
        <button
          className="btn btn-success book-btn"
          onClick={() => navigate("/bookings", { state: hotel })}
        >
          Book Now 🍽️
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
