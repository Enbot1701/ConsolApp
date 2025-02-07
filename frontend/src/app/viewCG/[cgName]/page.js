"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { getCGNames, getDiscipleById } from "@/service/service";
import { FaUser, FaArchive } from "react-icons/fa"; // Importing icons

export default function Viewdisciple() {
  const params = useParams();
  const cgName = params?.cgName;

  const [cgDetails, setCgDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (cgName) {
      const fetchCGDetails = async () => {
        setLoading(true);
        try {
          const data = await (username, id);
          setdiscipleDetails(data);
          console.log(data)
        } catch (error) {
          console.error("Error fetching CG details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCGDetails();
    }
  }, [id]);

  const handleEditInfo = async (e) => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editdiscipleInfo",
        sheetName: username,
        sheetType: "disciples",
        id: discipleDetails.id,
        fullName: discipleDetails.fullName,
        poc: discipleDetails.poc,
        source: discipleDetails.source,
        discipleType: discipleDetails.discipleType,
        discipleInfo: discipleDetails.discipleInfo,
        remarks: discipleDetails.remarks
      }
      console.log(data);
      await editdiscipleInfo(data);
    } catch (error) {
      setError("An error occurred while updating info.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProgress = async () => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editdiscipleProgress",
        sheetName: username,
        sheetType: "disciples",
        id: id, 
        gospelShared: discipleDetails.gospelShared,
        saved: discipleDetails.saved,
        called: discipleDetails.called,
        meetUp: discipleDetails.meetUp,
        progressRemarks: discipleDetails.progressRemarks
      }
      console.log(data);
      await editdiscipleProgress(data);
    } catch (error) {
      setError("An error occurred while updating progress.");
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "changeToContact",
        sheetName: username,
        sheetType: "Disciples",
        id: id
      }
      await changeToDisciple(data);
    } catch (error) {
      setError("An error occurred while updating progress.");
    } finally {
      setLoading(false);
    }
  }

  const handleArchiveClick = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "archive",
        sheetName: username,
        sheetType: "disciples",
        id: id
      }
      await archivedisciple(data);
    } catch (error) {
      setError("An error occurred while updating progress.");
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
  if (!discipleDetails) return (
    <div className="flex items-center justify-center h-screen bg-white">
      <p className="text-l font-sm text-blue-600">No disciple details found</p>
    </div>
  )

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-left text-black">{discipleDetails.fullName}</h1>
          <div className="flex items-center space-x-4">
          <button onClick={handleContactClick} className="flex flex-col items-center">
            <FaUser className="text-blue-700 text-2xl" />
            <span className="text-xs text-blue-700 font-semibold">disciple</span>
          </button>
          <button onClick={handleArchiveClick} className="flex flex-col items-center">
            <FaArchive className="text-gray-700 text-2xl" />
            <span className="text-xs text-gray-700 font-semibold">Archive</span>
          </button>
          </div>
        </div>
        <p className="text-sm font-bold text-green-700">Disciple</p>
        <p className="text-sm text-gray-600 mt">
          <span className="font-bold text-black">{discipleDetails.contactType}: </span>
          <span className="text-black">{discipleDetails.contactInfo}</span>
        </p>
      </div>

      {/* Fixed Tab Bar */}
      <div className="fixed top-28 left-0 right-0 bg-white z-10 shadow-md">
        <div className="flex border-b w-full">
          <button
            className={`flex-1 py-2 text-medium font-semibold border-b-4 ${
              activeTab === "info" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Info
          </button>
          <button
            className={`flex-1 py-2 text-medium font-semibold ${
              activeTab === "progress" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("progress")}
          >
            Progress
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
          <label className="text-m font-semibold text-black">Full Name</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={discipleDetails.fullName}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, fullName: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Date Added</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={discipleDetails.date || "N/A"}
            readOnly
          />
        </div>

         {/* POC Dropdown */}
         <div className="relative">
          <label className="text-sm font-semibold text-black">POC</label>
          <select
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
            value={discipleDetails.poc || "Street Evangelism"}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, source: e.target.value })}
          >
            <option value="Jon">Jon</option>
            <option value="Coral">Coral</option>
            <option value="Jessica">Jessica</option>
            <option value="Nicolle">Nicolle</option>
            <option value="Hua-En">Hua-En</option>
          </select>
          <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
        </div>

        {/* Source Dropdown */}
        <div className="relative">
          <label className="text-sm font-semibold text-black">Source</label>
          <select
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
            value={discipleDetails.source || "Street Evangelism"}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, source: e.target.value })}
          >
            <option value="Street Evangelism">Street Evangelism</option>
            <option value="English Exchange">English Exchange</option>
            <option value="Online Platforms">Online Platforms (e.g., HelloTalk)</option>
            <option value="Others">Others</option>
          </select>
          <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
        </div>

        {/* disciple Type Dropdown */}
        <div className="relative">
          <label className="text-sm font-semibold text-black">Contact Type</label>
          <div className="relative">
            <select
              className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none pr-10"
              value={discipleDetails.contactType || "LineID"}
              onChange={(e) => setdiscipleDetails({ ...discipleDetails, discipleType: e.target.value })}
            >
              <option value="LineID">LineID</option>
              <option value="TelegramID">TelegramID</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="InstagramID">InstagramID</option>
              <option value="Others">Others</option>
            </select>
            {/* Custom Dropdown Arrow */}
            <div className="absolute right-3 top-3 pointer-events-none text-black">▼</div>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Contact Information</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={discipleDetails.contactInfo}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, discipleInfo: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Address</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={discipleDetails.address}
            onChange={(e) => setContactDetails({ ...discipleDetails, address: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Remarks</label>
          <textarea
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            rows="3"
            value={discipleDetails.remarks || ""}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, remarks: e.target.value })}
            placeholder="Enter remarks..."
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
          onClick={() => handleEditInfo(discipleDetails)}
        >
          Edit Info
        </button>
      </div>
      )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
          <div className="mt-4 space-y-4 max-w-lg w-full">
            {/* Gospel Shared */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.gospelShared ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, gospelShared: !discipleDetails.gospelShared })}
            >
              <p className="font-bold text-black">Gospel Shared</p>
              <span className={`text-2xl ${discipleDetails.gospelShared ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.gospelShared ? "✔" : "✖"}
              </span>
            </div>

            {/* Saved */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.saved ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, saved: !discipleDetails.saved })}
            >
              <p className="font-bold text-black">Saved</p>
              <span className={`text-2xl ${discipleDetails.saved ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.saved ? "✔" : "✖"}
              </span>
            </div>

            {/* Called */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.called ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, called: !discipleDetails.called })}
            >
              <p className="font-bold text-black">Called</p>
              <span className={`text-2xl ${discipleDetails.called ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.called ? "✔" : "✖"}
              </span>
            </div>

            {/* Meet Up */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.meetUp ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, meetUp: !discipleDetails.meetUp })}
            >
              <p className="font-bold text-black">Meet Up</p>
              <span className={`text-2xl ${discipleDetails.meetUp ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.meetUp ? "✔" : "✖"}
              </span>
            </div>

            {/* Progress Remarks Title (Moved Outside the Box) */}
            <p className="font-bold text-black">Progress Remarks</p>
            {/* Progress Remarks */}
            <textarea 
              className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
              rows="6"
              value={discipleDetails.progressRemarks || ""}
              onChange={(e) => setdiscipleDetails({ ...discipleDetails, progressRemarks: e.target.value })}
              placeholder="Enter progress remarks..."
            ></textarea>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Edit Progress Button (Sends Data to API) */}
            <button
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
              onClick={async () => {handleEditProgress}}>
              Edit Progress
            </button>
          </div>
        )}
       </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
