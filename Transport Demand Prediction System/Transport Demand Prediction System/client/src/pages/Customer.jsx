import Navbar from "../components/Navbar";
import Map from "../components/Map";
import axios from "axios";

export default function Customer() {

  const bookRide = async () => {
    await axios.post("http://localhost:5000/api/trip/create", {
      pickup: "current",
      drop: "destination"
    }, {
      headers: { Authorization: localStorage.getItem("token") }
    });

    alert("Trip Requested");
  };

  return (
    <div>
      <Navbar />
      <button onClick={bookRide} className="absolute top-20 left-5 bg-black text-white p-2">
        Book Ride
      </button>
      <Map role="customer" />
    </div>
  );
}