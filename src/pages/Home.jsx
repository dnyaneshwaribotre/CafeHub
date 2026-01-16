import { useState } from "react";
import CategoryBar from "../components/CategoryBar";
import HotelCard from "../components/HotelCard";
import LiveTables from "../components/LiveTables";
import { hotels } from "../data/hotels";

const Home = ({ search = "" }) => {
  const [openHotelId, setOpenHotelId] = useState(null);

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLiveTables = (id) => {
    setOpenHotelId(openHotelId === id ? null : id);
  };

  return (
    <div className="container mt-4">
      {/* ✅ CATEGORY BAR */}
      <CategoryBar />

      {/* ✅ HOTEL LIST */}
      <div className="row mt-3">
        {filteredHotels.length > 0 ? (
          filteredHotels.map((hotel) => (
            <div className="col-md-3 mb-4" key={hotel.id}>


              
              {/* HOTEL CARD */}
              <HotelCard hotel={hotel} />

              {/* BUTTON */}
              <button
                className="btn btn-outline-primary btn-sm w-100 mt-2"
                onClick={() => toggleLiveTables(hotel.id)}
              >
                {openHotelId === hotel.id
                  ? "Hide Live Tables"
                  : "View Live Tables"}
              </button>

              {/* LIVE TABLES – ONLY FOR CLICKED HOTEL */}
              {openHotelId === hotel.id && (
                <LiveTables hotel={hotel} />
              )}
            </div>
          ))
        ) :
        
        
        (
          <p className="text-muted mt-3 text-center">
            No restaurants found 😕
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
