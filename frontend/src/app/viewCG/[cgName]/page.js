"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { getCGByName, editCGInfo, deleteCG, removeFromCGSheet } from "@/service/service";
import { FaTrash } from "react-icons/fa"; // Importing icons

export default function ViewCG() {
  const params = useParams();
  const cgName = params?.cgName;

  const [originalCG, setOriginalCG] = useState("");
  const [cgDetails, setCGDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (cgName) {
      console.log(cgName);
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch disciple details
          const cg = await getCGByName(cgName);
          setCGDetails(cg);
          console.log("CG Data:", cg);
          setOriginalCG(cg.name);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [cgName]);
  
  const handleEditInfo = async () => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editCGInfo",
        name: cgDetails.name,
        leader: cgDetails.leader,
        originalCG: originalCG
      }
      console.log(data);
      await editCGInfo(data);
      router.push(`/viewCG/${cgDetails.name}`);
    } catch (error) {
      setError("An error occurred while updating info.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = async() => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "deleteCG",
        name: cgDetails.name,
      }
      await deleteCG(data);
      router.push(`/cg`);
    } catch (error) {
      setError("An error occurred while editing cg.");
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteMember = async(cgDetails, id) => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "removeFromCGSheet",
        name: cgDetails.name,
        id: id
      }
      await removeFromCGSheet(data);
      window.location.reload();
    } catch (error) {
      setError("An error occurred while editing cg.");
    } finally {
      setLoading(false);
    }
  }
    

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-l font-sm text-blue-600">Loading...</p>
      </div>
    );
  if (!cgDetails) return (
    <div className="flex items-center justify-center h-screen bg-white">
      <p className="text-l font-sm text-blue-600">No CG details found</p>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-left text-black">{cgDetails.name}</h1>
          <div className="flex items-center space-x-4">
          <button onClick={handleDeleteClick} className="flex flex-col items-center">
            <FaTrash className="text-red-500 text-2xl" />
            <span className="text-xs text-red-500 font-semibold">Delete</span>
          </button>
          </div>
        </div>
        <p className="text-sm text-black mt">
          <span className="font-bold text-black">Leader: </span>
          <span className="text-black ">{cgDetails.leader}</span>
        </p>
      </div>

      {/* Fixed Tab Bar */}
      <div className="fixed top-24 left-0 right-0 bg-white z-10 shadow-md">
        <div className="flex border-b w-full">
          <button
            className={`flex-1 py-2 text-medium font-semibold border-b-4 ${
              activeTab === "info" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`flex-1 py-2 text-medium font-semibold border-b-4 ${
              activeTab === "members" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("members")}
          >
            Members
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-grow mt-32 p-6 pb-20">
        <div className="max-w-lg w-full mx-auto">
          {/* Info Tab */}
          {activeTab === "info" && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-m font-semibold text-black">CG Name</label>
              <input
                type="text"
                className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
                value={cgDetails.name}
                onChange={(e) => setCGDetails({ ...cgDetails, name: e.target.value })}
              />
            </div>

            <div className="relative">
            <label className="text-sm font-semibold text-black">Leader</label>
              <select
                className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
                value={cgDetails.leader || ""}
                onChange={(e) => setCGDetails({ ...cgDetails, leader: e.target.value })}
              >
                <option value="Jon">Jon</option>
                <option value="Coral">Coral</option>
                <option value="Jessica">Jessica</option>
                <option value="Nicolle">Nicolle</option>
                <option value="Hua-En">Hua-En</option>
              </select>
            <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
          </div>

            <button
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
              onClick={() => handleEditInfo(cgDetails)}
            >
              Edit Info
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
          )}

          {/* Members Tab */}
        {activeTab === "members" && (
          <div className="flex-grow mt-4 p-2 flex flex-col items-center">
            <p className="text-sm text-black mt">
              <span className="font-bold text-black text-l"> Number of Members: </span>
              <span className="text-black ">{cgDetails.members.length}</span>
            </p>
            <div className="space-y-4 max-w-lg w-full mt-4">
              {cgDetails.members.length > 0 ? (
                cgDetails.members.map((member) => (
                  <div key={member.id} className="flex items-center w-full">
                    {/* Member Entry (clickable) */}
                    <div
                      className="flex-grow bg-white shadow-inner rounded-lg p-3 flex justify-between items-center border-2 border-blue-600 cursor-pointer hover:bg-blue-100"
                      onClick={() => router.push(`/viewDisciple/${member.id}`)}
                    >
                      <div className="flex-grow">
                        <p className="font-bold text-black">{member.name}</p>
                        <p className="text-black text-sm">{member.sheet}</p>
                      </div>
                    </div>

                    {/* Delete Button (moved further right) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteMember(cgDetails, member.id);
                      }}
                      className="ml-4 mr-0 p-2 bg-red-100 rounded-full hover:bg-red-200"
                    >
                      <FaTrash className="text-red-500 text-xl" />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No members available.</p>
              )}
            </div>
          </div>
        )}
       </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
