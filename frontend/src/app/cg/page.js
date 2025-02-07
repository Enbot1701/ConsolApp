"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { getMyCGNames } from "@/service/service";

export default function CG() {
  const [cgList, setCgList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      fetchCGs(username);
    } else {
      console.error("No username found in localStorage");
      router.push("/login");
    }
  }, [router]);

  const fetchCGs = async (username) => {
    setLoading(true);
    try {
      const data = await getMyCGNames(username);
      setCgList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching CGs:", error);
      setCgList([]);
    }
    setLoading(false);
  };

  const handleViewCG = (cgName) => {
    router.push(`/viewCG/${cgName}`);
  };

  const handleAddCG = () => {
    router.push("/addCG"); // Navigate to add CG page
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fixed Title & Add Button */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">My CGs</h1>
        <button
          onClick={handleAddCG}
          className="text-2xl bg-white text-blue-600 py-2 hover:text-blue-700 transition"
        >
          ➕
        </button>
      </div>

      {/* Page Content */}
      <div className="flex-grow mt-24 p-6 flex flex-col items-center">
        <div className="space-y-4 max-w-lg w-full">
          {loading ? (
            <p className="text-center text-blue-600">Loading...</p>
          ) : cgList.length > 0 ? (
            cgList.map((cg, index) => (
              <div
                key={index}
                onClick={() => handleViewCG(cg)}
                className="bg-white shadow-inner rounded-lg p-4 flex justify-between items-center cursor-pointer hover:bg-blue-100 border-2 border-blue-600"
              >
                <div className="flex-grow">
                  <p className="font-bold text-black">{cg}</p>
                </div>
                <div className="ml-2 text-black">➔</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No Connect Groups available.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
