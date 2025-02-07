"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "../../components/BottomNavigation";
import { addCG } from "@/service/service";

export default function AddCG() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [CGData, setCGData] = useState({
    method: "addCG",
    name: "",
    cgl: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.push("/login");
    } else {
      setUsername(storedUsername);
      setCGData((prevData) => ({
        ...prevData,
        sheetName: storedUsername,
        poc: storedUsername,
      }));
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCGData({
      ...CGData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      console.log("CG Data:", CGData);
      // Call the API to add the CG
      await addCG(CGData);
      // Show success message
      alert("CG added successfully!");
      router.push(`/cg`)
    } catch (error) {
      setError("An error occurred while adding the CG.");
      console.error("Error adding CG:", error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-8">
        <h1 className="text-2xl font-bold text-left text-black ml-[-px]">Add CG</h1>
      </div>

      <div className="flex-grow mt-16 px-2 py-4 flex flex-col items-center max-w-2xl w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <label className="text-sm font-semibold text-black">CG Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 bg-white rounded-lg outline-none text-black mt-[-10px] border-2 border-blue-600"
            value={CGData.name}
            onChange={handleInputChange}
            required
          />

        <div className="relative">
          <label className="text-sm font-semibold text-black">CGL</label>
          <select
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
            value={CGData.cgl || ""}
            onChange={(e) => setCGData({ ...CGData, source: e.target.value })}
          >
            <option value="Jon">Jon</option>
            <option value="Coral">Coral</option>
            <option value="Jessica">Jessica</option>
            <option value="Nicolle">Nicolle</option>
            <option value="Hua-En">Hua-En</option>
          </select>
          <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
        </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding CG..." : "Add CG"}
          </button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
}
