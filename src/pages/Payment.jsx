import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [method, setMethod] = useState("cod");

  const payNow = () => {
    const payment = {
      ...state,
      paymentMethod: method,
      paymentStatus: method === "cod" ? "Pending" : "Paid"
    };

    const old = JSON.parse(localStorage.getItem("bookings")) || [];
    old.push(payment);
    localStorage.setItem("bookings", JSON.stringify(old));

    navigate("/tracking", { state: payment });
  };
     

     const goToBilling = () => {
    navigate("/billing", {
      state: {
        customer,
        hotelName: hotel.name,
        hotelImage: hotel.image,
        total,
      },
    });
  };
    
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h3>💳 Pay ₹{state.total}</h3>

        <div className="form-check">
          <input type="radio" checked={method==="upi"} onChange={()=>setMethod("upi")} />
          UPI / Google Pay
        </div>
        <div className="form-check">
          <input type="radio" checked={method==="card"} onChange={()=>setMethod("card")} />
          Debit / Credit Card
        </div>
        <div className="form-check">
          <input type="radio" checked={method==="cod"} onChange={()=>setMethod("cod")} />
          Cash On Arrival
        </div>

        <button className="btn btn-success w-100 mt-3" onClick={payNow}>
          Confirm Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
