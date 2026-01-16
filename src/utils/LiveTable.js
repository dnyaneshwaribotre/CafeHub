import API from "../api/api";

export const getLiveTableStatus = async (hotelName, totalTables) => {
  const res = await API.get("/bookings");
  const bookings = res.data;
  const now = new Date();

  const active = bookings.filter((b) => {
    if (b.hotel !== hotelName) return false;

    const start = new Date(`${b.date} ${b.fromTime}`);
    const end = new Date(`${b.date} ${b.endTime}`);

    return now >= start && now <= end;
  });

  return {
    occupied: active.length,
    available: totalTables - active.length,
  };
};
