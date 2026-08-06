import { useEffect, useState } from "react";
import { getTrips } from "../api/tripApi";

export default function History() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getTrips().then((res) => setTrips(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Ride History</h2>

      {trips.map((trip) => (
        <div key={trip._id} className="bg-white p-4 shadow mb-2 rounded">
          <p>Pickup: {trip.pickup}</p>
          <p>Drop: {trip.drop}</p>
          <p>Price: ₹{trip.price}</p>
        </div>
      ))}
    </div>
  );
}