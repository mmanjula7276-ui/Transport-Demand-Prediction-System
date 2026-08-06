import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">RideMe 🚖</h1>

      <div className="flex gap-6 items-center">
        <Link to="/">Home</Link>
        <Link to="/booking">Book</Link>
        <Link to="/driver">Driver</Link>
        <Link to="/login">Login</Link>
        <Link
          to="/register"
          className="bg-white text-black px-3 py-1 rounded"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}