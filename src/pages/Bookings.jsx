import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Bookings.css";

/* 📍 Distance Calculator */
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

/* 💾 Save Booking */
const saveBooking = (booking) => {
  const old = JSON.parse(localStorage.getItem("bookings")) || [];
  old.push(booking);
  localStorage.setItem("bookings", JSON.stringify(old));
};

const Booking = () => {
  const { state: hotel } = useLocation();
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  /* ⏰ Table Booking */
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [advancePaid, setAdvancePaid] = useState(false);

  /* 🍽 Order */
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");

  /* 📍 Location */
  const [distance, setDistance] = useState(null);

  /* 📅 Check future booking */
  const isFutureBooking = () => {
    if (!date) return false;
    const selected = new Date(date);
    const diff =
      (selected - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 10;
  };

  /* 🔔 Notification */
  const scheduleNotification = () => {
    const endTime = new Date(`${date} ${toTime}`);
    endTime.setMinutes(endTime.getMinutes() - 30);

    const delay = endTime - new Date();

    if (delay > 0) {
      setTimeout(() => {
        if (Notification.permission === "granted") {
          new Notification("🍽️ Table Reminder", {
            body: `Your table at ${hotel.name} will end at ${toTime}. Please arrive on time!`,
          });
        }
        alert(`⏰ Reminder: Table ends at ${toTime}`);
      }, delay);
    }
  };

  /* 📍 Track location */
  useEffect(() => {
    if (!hotel?.lat) return;

    navigator.geolocation.getCurrentPosition((pos) => {
      const d = getDistance(
        pos.coords.latitude,
        pos.coords.longitude,
        hotel.lat,
        hotel.lng
      );
      setDistance(d.toFixed(2));
    });
  }, [hotel]);

  /* 🔔 Ask notification permission */
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  /* 🛒 Cart */
  const addItem = (item) => setCart([...cart, item]);
  const removeItem = (i) =>
    setCart(cart.filter((_, index) => index !== i));

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  /* ✅ FINAL CONFIRM */
  const handleConfirm = () => {
    if (!name || !date || !fromTime || !toTime || cart.length === 0) {
      alert("Please complete all details");
      return;
    }

    if (isFutureBooking() && !advancePaid) {
      alert("Advance payment required");
      return;
    }

    scheduleNotification();

    const bookingData = {
      id: Date.now(),
      hotel: hotel.name,
      customer: name,
      email: userEmail,
      date,
      fromTime,
      toTime,
      items: cart,
      total,
      advancePaid,
    };

    saveBooking(bookingData);

    navigate("/billing", { state: bookingData });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4">

        <h2 className="text-center mb-3">{hotel.name}</h2>

        {/* 📧 EMAIL */}
        <p className="text-center text-success">
          Booking as <b>{userEmail}</b>
        </p>

        {/* ⏰ TIME */}
        <div className="row">
          <div className="col-md-4">
            <input type="date" className="form-control"
              onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="col-md-4">
            <input type="time" className="form-control"
              onChange={(e) => setFromTime(e.target.value)} />
          </div>
          <div className="col-md-4">
            <input type="time" className="form-control"
              onChange={(e) => setToTime(e.target.value)} />
          </div>
        </div>

        {/* ⚠️ ADVANCE */}
        {isFutureBooking() && (
          <div className="alert alert-warning mt-3">
            Future booking requires advance payment
            <button
              className="btn btn-sm btn-success ms-3"
              onClick={() => setAdvancePaid(true)}
            >
              Pay ₹100
            </button>
          </div>
        )}

        {/* 📍 DISTANCE */}
        {distance && (
          <div className="alert alert-info mt-3 text-center">
            You are <b>{distance} km</b> away <br />
            {distance < 2 ? "🔥 Cooking Started" : "🚗 Cooking will start soon"}
          </div>
        )}

        {/* 🍽 MENU */}
        <h5 className="mt-3">🍽 Select Menu</h5>
        {hotel.menu.map((m, i) => (
          <div key={i} className="d-flex justify-content-between border p-2 rounded mb-2">
            <span>{m.item}</span>
            <span>₹{m.price}</span>
            <button className="btn btn-sm btn-success" onClick={() => addItem(m)}>+</button>
          </div>
        ))}

        {/* 🛒 CART */}
        <h5 className="mt-3">🛒 Your Order</h5>
        {cart.map((c, i) => (
          <div key={i} className="d-flex justify-content-between">
            {c.item} ₹{c.price}
            <button className="btn btn-sm btn-danger" onClick={() => removeItem(i)}>x</button>
          </div>
        ))}

        <h4 className="text-end mt-3">Total: ₹{total}</h4>

        {/* 👤 NAME */}
        <input
          className="form-control mt-2"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-success w-100 mt-4" onClick={handleConfirm}>
          ✅ Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Booking;
