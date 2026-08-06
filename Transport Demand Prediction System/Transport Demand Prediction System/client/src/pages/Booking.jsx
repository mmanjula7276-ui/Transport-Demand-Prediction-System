import Map from "../components/Map";
import { useState } from "react";

export default function Booking() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(null);
  const [steps, setSteps] = useState([]);

  const getCoords = async (place) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
    );
    const data = await res.json();

    if (data.length > 0) {
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    }
    return null;
  };

  const handleRoute = async () => {
    const pick = await getCoords(pickup);
    const drp = await getCoords(drop);

    if (!pick || !drp) {
      alert("Location not found ❌");
      return;
    }

    setPickupCoords(pick);
    setDropCoords(drp);
  };

  const handlePrice = () => {
    const total = distance * 15;
    setPrice(total.toFixed(2));
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {/* LEFT PANEL */}
      <div className="w-[350px] bg-white shadow-lg p-5 flex flex-col">

        <h2 className="text-2xl font-bold mb-4">🚖 Book Ride</h2>

        <input
          type="text"
          placeholder="Pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="p-2 border rounded mb-2"
        />

        <input
          type="text"
          placeholder="Drop location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          className="p-2 border rounded mb-4"
        />

        <button
          onClick={handleRoute}
          className="bg-blue-600 text-white py-2 rounded mb-2"
        >
          Show Route
        </button>

        <button
          onClick={handlePrice}
          className="bg-black text-white py-2 rounded mb-3"
        >
          Calculate Price
        </button>

        {/* DISTANCE + PRICE */}
        {distance > 0 && (
          <div className="text-sm text-gray-700 mb-2">
            📏 Distance: <b>{distance} km</b>
          </div>
        )}

        {price && (
          <div className="text-lg font-semibold text-green-600 mb-3">
            💰 ₹{price}
          </div>
        )}

        {/* 🔥 ROUTE STEPS (CLEAN UI) */}
        {steps.length > 0 && (
          <div className="flex-1 overflow-y-auto border-t pt-2">
            <h3 className="font-semibold mb-2">Route Steps</h3>

            <ul className="space-y-2 text-sm text-gray-600">
              {steps.map((step, i) => (
                <li
                  key={i}
                  className="bg-gray-100 p-2 rounded shadow-sm"
                >
                  ➤ {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* MAP */}
      <div className="flex-1">
        <Map
          pickupCoords={pickupCoords}
          dropCoords={dropCoords}
          setDistance={setDistance}
          setSteps={setSteps}
        />
      </div>
    </div>
  );
}