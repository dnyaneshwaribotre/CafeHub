import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const available = hotel.totalTables - hotel.bookedTables;

  return (
    <div
      className="card shadow-sm border-0 scale-hover"
      onClick={() => navigate(`/hotel/${hotel.id}`)}
      style={{ cursor: "pointer", borderRadius: "12px" }}
    >
      <img
        src={hotel.image}
        className="card-img-top"
        style={{ height: "200px", objectFit: "cover" }}
        alt={hotel.name}
      />

      <div className="card-body">
        <h6 className="fw-bold">{hotel.name}</h6>
        <span className="badge bg-success">
          {available} Tables Available
        </span>
      </div>
    </div>
  );
};

export default HotelCard;
