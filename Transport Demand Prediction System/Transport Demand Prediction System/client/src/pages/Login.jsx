import { useState } from "react";

export default function Login() {
  const [role, setRole] = useState("customer");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 shadow rounded w-80 space-y-3">
        <h2 className="text-xl font-bold">Login</h2>

        <select
          className="w-full p-2 border"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="driver">Driver</option>
        </select>

        <input className="w-full p-2 border" placeholder="Email" />
        <input className="w-full p-2 border" type="password" placeholder="Password" />

        <button
          className="bg-black text-white w-full py-2"
          onClick={() => {
            localStorage.setItem("role", role);
            window.location.href = role === "driver" ? "/driver" : "/booking";
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}