import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-black to-gray-800 text-white">
      <h1 className="text-5xl font-bold mb-4">RideMe 🚖</h1>
      <p className="mb-6 text-gray-300">
        Book rides across Tamil Nadu instantly
      </p>

      <Link
        to="/booking"
        className="bg-white text-black px-6 py-3 rounded font-semibold"
      >
        Book a Ride
      </Link>
    </div>
  );
}