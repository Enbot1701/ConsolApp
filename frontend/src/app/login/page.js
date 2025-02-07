"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../service/service";

export default function Login() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login({ 
        name: username,
        method: "login"
      });
      console.log(response.sucess)
      if (response.sucess) {
        localStorage.setItem("username", username);
        router.push("/"); // Redirect to Home
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">LOGIN</h1>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-xs flex flex-col gap-4"
      >
        <label className="text-lg font-medium text-blue-600 mt-6">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 bg-gray-200 rounded-lg outline-none text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
