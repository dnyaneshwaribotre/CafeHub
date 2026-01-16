import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { hotels } from "../data/hotels";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === parseInt(id));

  // Safety check
  if (!hotel) {
    return (
      <h3 className="text-center mt-5 text-danger">
        Hotel not found 😢
      </h3>
    );
  }

  const available = hotel.totalTables - hotel.bookedTables;

  // ⭐ Rating State
  const [rating, setRating] = useState(0);

  // Load rating from localStorage
  useEffect(() => {
    const savedRating = localStorage.getItem(`rating_${hotel.id}`);
    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, [hotel.id]);

  // Save rating
  const handleRating = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${hotel.id}`, value);
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 shadow fade-in">

        {/* Image */}
        <img
          src={hotel.image}
          className="img-fluid mb-3 rounded"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />

        {/* Hotel Info */}
        <h2>{hotel.name}</h2>

        <p><b>Total Tables:</b> {hotel.totalTables}</p>
        <p><b>Booked Tables:</b> {hotel.bookedTables}</p>
        <p>
          <b>Available Tables:</b>{" "}
          <span className="text-success fw-bold">
            {available}
          </span>
        </p>

        {/* ⭐ Rating System */}
        <h5 className="mt-3">⭐ Rate this Cafe</h5>
        <div className="mb-2">
          {[1, 2, 3, 4, 5].map((r) => (
            <span
              key={r}
              style={{
                fontSize: "25px",
                cursor: "pointer",
                color: r <= rating ? "gold" : "gray",
              }}
              onClick={() => handleRating(r)}
            >
              ★
            </span>
          ))}
        </div>

        <p className="mt-2">
          Your Rating: <b>{rating || "Not rated"} / 5</b>
        </p>

        {/* Menu */}
        <h4 className="mt-4">🍽 Menu</h4>
        <ul className="list-group mb-3">
          {hotel.menu.map((m, i) => (
            <li
              key={i}
              className="list-group-item d-flex justify-content-between"
            >
              <span>{m.item}</span>
              <span>₹{m.price}</span>
            </li>
          ))}
        </ul>

        {/* Map Preview */}
        <h4 className="mt-4">📍 Location</h4>
        <iframe
          title="map"
          width="100%"
          height="250"
          style={{ border: 0 }}
          loading="lazy"
          src={`https://www.google.com/maps?q=${hotel.lat},${hotel.lng}&output=embed`}
        />

        {/* Booking Button */}
        <button
          className="btn btn-success mt-3 w-100"
          onClick={() => navigate("/bookings", { state: hotel })}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default HotelDetails;
