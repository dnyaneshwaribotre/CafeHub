import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bookings from "./pages/Bookings";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import MyBookings from "./pages/MyBookings";
import Billing from "./pages/Billing";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import LiveTables from "./components/LiveTables";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      {/* ✅ Navbar OUTSIDE Routes */}
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home search={search} />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Routes – login required */}
        <Route
          path="/hotel/:id"
          element={
            <ProtectedRoute>
              <HotelDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracking"
          element={
            <ProtectedRoute>
              <Tracking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mybookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

        {/* Optional: LiveTables page if needed */}
        <Route path="/livetables" element={<LiveTables />} />
      </Routes>
    </>
  );
}

export default App;
