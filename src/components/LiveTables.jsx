import { useEffect, useState } from "react";

const LiveTables = ({ hotel }) => {
  const [booked, setBooked] = useState(hotel.bookedTables);

  useEffect(() => {
    const interval = setInterval(() => {
      setBooked((prev) =>
        prev < hotel.totalTables ? prev + 1 : prev
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [hotel]);

  return (
    <div className="card p-3 mb-4 text-center">
      <h5>🪑 Live Table Availability</h5>
      <p>Total Tables: <b>{hotel.totalTables}</b></p>
      <p>Booked: <b className="text-danger">{booked}</b></p>
      <p>
        Available:{" "}
        <b className="text-success">
          {hotel.totalTables - booked}
        </b>
      </p>
    </div>
  );
};

export default LiveTables;
