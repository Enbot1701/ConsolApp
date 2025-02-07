"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome, FaPlusCircle, FaUsers, FaChurch } from "react-icons/fa";

export default function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  // Update activeTab when pathname changes
  useEffect(() => {
    if (pathname === "/") setActiveTab("home");
    else if (pathname === "/addContact") setActiveTab("add-contact");
    else if (pathname === "/people") setActiveTab("people");
    else if (pathname === "/cg") setActiveTab("cg");
  }, [pathname]);

  const navigate = (path) => {
    router.push(path);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 shadow-md z-50">
      <div className="flex justify-around items-center py-3 gap-2">
        {/* Home Tab */}
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center ${
            activeTab === "home" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <FaHome size={36} />
        </button>

        {/* Add Contact Tab */}
        <button
          onClick={() => navigate("/addContact")}
          className={`flex flex-col items-center ${
            activeTab === "add-contact" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <FaPlusCircle size={32} />
        </button>

        {/* People Tab */}
        <button
          onClick={() => navigate("/people")}
          className={`flex flex-col items-center ${
            activeTab === "people" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <FaUsers size={32} />
        </button>

        {/* CG Tab */}
        <button
          onClick={() => navigate("/cg")}
          className={`flex flex-col items-center ${
            activeTab === "cg" ? "text-blue-600" : "text-gray-700"
          }`}
        >
          <FaChurch size={32} />
        </button>
      </div>
    </div>
  );
}
