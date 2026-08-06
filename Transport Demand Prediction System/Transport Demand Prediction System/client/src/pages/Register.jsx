import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser(data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.msg || "Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80 space-y-3">
        <h2 className="text-xl font-bold">Register</h2>

        <input
          className="w-full p-2 border rounded"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button 
          onClick={handleRegister} 
          className="bg-black text-white w-full py-2 rounded hover:opacity-80 transition-opacity"
        >
          Register
        </button>
      </div>
    </div>
  );
}