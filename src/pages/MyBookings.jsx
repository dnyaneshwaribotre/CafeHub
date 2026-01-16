import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    customer: "",
    hotel: "",
    date: "",
    total: ""
  });

  // Load Bookings
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  // Delete Booking
  const deleteBooking = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  // Start Edit
  const startEdit = (index) => {
    const b = bookings[index];
    setEditIndex(index);
    setForm({
      customer: b.customer,
      hotel: b.hotel,
      date: b.date,
      total: b.total
    });
  };

  // Save Edit
  const updateBooking = () => {
    const updated = [...bookings];
    updated[editIndex] = {
      ...updated[editIndex],
      customer: form.customer,
      hotel: form.hotel,
      date: form.date,
      total: form.total
    };

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
    setEditIndex(null);
    setForm({ customer: "", hotel: "", date: "", total: "" });
  };

  // Clear form
  const clearForm = () => {
    setEditIndex(null);
    setForm({ customer: "", hotel: "", date: "", total: "" });
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">Cafe Booking Records</h2>

      {/* TOP INPUT BAR */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-2">
          <input
            placeholder="Customer"
            className="form-control"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            placeholder="Hotel"
            className="form-control"
            value={form.hotel}
            onChange={(e) => setForm({ ...form, hotel: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="col-md-2">
          <input
            placeholder="Total ₹"
            className="form-control"
            value={form.total}
            onChange={(e) => setForm({ ...form, total: e.target.value })}
          />
        </div>

        <div className="col-md-1">
          <button
            className="btn btn-primary w-100"
            disabled={editIndex === null}
            onClick={updateBooking}
          >
            Update
          </button>
        </div>

        <div className="col-md-1">
          <button className="btn btn-danger w-100" onClick={clearForm}>
            Clear
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <table className="table table-bordered text-center shadow-sm">

        <thead className="table-dark">
          <tr>
            <th>Sr.No</th>
            <th>ID</th>
            <th>Customer</th>
            <th>Hotel</th>
            <th>Date</th>
            <th>Total (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-muted">
                No bookings found 😢
              </td>
            </tr>
          ) : (
            bookings.map((b, i) => (
              <tr key={b.id}>
                <td>{i + 1}</td>
                <td>{b.id}</td>
                <td>{b.customer}</td>
                <td>{b.hotel}</td>
                <td>{b.date}</td>
                <td className="fw-bold">₹{b.total}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => deleteBooking(b.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => startEdit(i)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>

      </table>
    </div>
  );
};

export default MyBookings;
