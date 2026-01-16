import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Billing = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");

  // ✅ Safety check (direct access protection)
  if (!state) {
    return (
      <div className="container mt-5 text-center">
        <h4>No billing data found</h4>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    );
  }

  const confirmPayment = () => {
    navigate("/tracking", {
      state: {
        ...state,
        paymentMethod: method,
        paymentStatus: method === "cod" ? "Pending" : "Paid",
      },
    });
  };

  return (
    <div className="container mt-5 slide-up">
      <div className="card shadow p-4">

        {/* ✅ CAFE IMAGE */}
        {state.hotelImage && (
          <img
            src={state.hotelImage}
            alt={state.hotel}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        )}

        <h3 className="text-center mb-4">🧾 Billing</h3>

        <p><b>Name:</b> {state.customer}</p>
        <p><b>Cafe:</b> {state.hotel}</p>

        <h4 className="text-success">
          Total Amount: ₹{state.total}
        </h4>

        <hr />

        <h5>Select Payment Method</h5>

        {["upi", "card", "cod"].map((m) => (
          <div className="form-check" key={m}>
            <input
              className="form-check-input"
              type="radio"
              checked={method === m}
              onChange={() => setMethod(m)}
            />
            <label className="form-check-label text-capitalize">
              {m === "cod" ? "Cash on Arrival" : m}
            </label>
          </div>
        ))}

        <button
          className="btn btn-success w-100 mt-4"
          onClick={confirmPayment}
        >
          Pay & Continue
        </button>
      </div>
    </div>
  );
};



export default Billing;
