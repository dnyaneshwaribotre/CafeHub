import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Tracking = () => {
  const { state } = useLocation();
  const [status, setStatus] = useState("Preparing");

  useEffect(() => {
    setTimeout(() => setStatus("Cooking 🔥"), 3000);
    setTimeout(() => setStatus("Almost Ready 🍽️"), 7000);
    setTimeout(() => setStatus("Ready for Pickup 🚗"), 11000);
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h3>{state.hotel}</h3>
      <h4 className="text-primary">{status}</h4>

      <div className="spinner-border text-danger mt-4" />

      <p className="mt-3">
        Payment: {state.paymentMethod.toUpperCase()} ({state.paymentStatus})
      </p>
    </div>
  );
};

export default Tracking;
