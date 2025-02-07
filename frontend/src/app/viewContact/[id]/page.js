"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { getContactById, changeToDisciple, archiveContact, editContactInfo, editContactProgress } from "@/service/service";
import { FaUserCheck, FaArchive } from "react-icons/fa"; // Importing icons

export default function ViewContact() {
  const params = useParams();
  const id = params?.id;

  const [contactDetails, setContactDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      const username = localStorage.getItem("username");
      setUsername(username);

      const fetchContactDetails = async () => {
        setLoading(true);
        try {
          const data = await getContactById(username, id);
          if (data.message === "Contact not found"){
            
          } else {
            setContactDetails(data);
          }
        } catch (error) {
          console.error("Error fetching contact details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchContactDetails();
    }
  }, [id]);

  const handleEditInfo = async (e) => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editContactInfo",
        sheetName: username,
        sheetType: "Contacts",
        id: contactDetails.id,
        fullName: contactDetails.fullName,
        poc: contactDetails.poc,
        source: contactDetails.source,
        contactType: contactDetails.contactType,
        contactInfo: contactDetails.contactInfo,
        remarks: contactDetails.remarks
      }
      console.log(data);
      await editContactInfo(data);
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
        method: "editContactProgress",
        sheetName: username,
        sheetType: "Contacts",
        id: id, 
        gospelShared: contactDetails.gospelShared,
        saved: contactDetails.saved,
        called: contactDetails.called,
        meetUp: contactDetails.meetUp,
        progressRemarks: contactDetails.progressRemarks
      }
      console.log(data);
      await editContactProgress(data);
    } catch (error) {
      setError("An error occurred while updating progress.");
    } finally {
      setLoading(false);
    }
  };

  const handleDiscipleClick = async(e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "changeToDisciple",
        sheetName: username,
        sheetType: "Contacts",
        id: id
      }
      await changeToDisciple(data);
      router.push(`/viewDisciple/${id}`);
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
        sheetType: "Contacts",
        id: id
      }
      await archiveContact(data);
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
  

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header Section */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-left text-black">{contactDetails.fullName}</h1>
          <div className="flex items-center space-x-4">
          <button onClick={handleDiscipleClick} className="flex flex-col items-center">
            <FaUserCheck className="text-green-700 text-2xl" />
            <span className="text-xs text-green-700 font-semibold">Disciple</span>
          </button>
          <button onClick={handleArchiveClick} className="flex flex-col items-center">
            <FaArchive className="text-gray-700 text-2xl" />
            <span className="text-xs text-gray-700 font-semibold">Archive</span>
          </button>
          </div>
        </div>
        <p className="text-sm font-bold text-blue-700">Contact</p>
        <p className="text-sm text-gray-600 mt">
          <span className="font-bold text-black">{contactDetails.contactType}: </span>
          <span className="text-black">{contactDetails.contactInfo}</span>
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
            value={contactDetails.fullName}
            onChange={(e) => setContactDetails({ ...contactDetails, fullName: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Date Added</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={contactDetails.date || "N/A"}
            readOnly
          />
        </div>

        <div className="relative">
          <label className="text-sm font-semibold text-black">POC</label>
          <select
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
            value={contactDetails.poc || "Street Evangelism"}
            onChange={(e) => setContactDetails({ ...contactDetails, source: e.target.value })}
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
            value={contactDetails.source || "Street Evangelism"}
            onChange={(e) => setContactDetails({ ...contactDetails, source: e.target.value })}
          >
            <option value="Street Evangelism">Street Evangelism</option>
            <option value="English Exchange">English Exchange</option>
            <option value="Online Platforms">Online Platforms (e.g., HelloTalk)</option>
            <option value="Others">Others</option>
          </select>
          <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
        </div>

        {/* Contact Type Dropdown */}
        <div className="relative">
          <label className="text-sm font-semibold text-black">Contact Type</label>
          <div className="relative">
            <select
              className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none pr-10"
              value={contactDetails.contactType || ""}
              onChange={(e) => setContactDetails({ ...contactDetails, contactType: e.target.value })}
            >
              <option value="LineID">LineID</option>
              <option value="TelegramID">TelegramID</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="InstagramID">InstagramID</option>
              <option value="HelloTalkID">HelloTalkID</option>
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
            value={contactDetails.contactInfo}
            onChange={(e) => setContactDetails({ ...contactDetails, contactInfo: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Address</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={contactDetails.address}
            onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Remarks</label>
          <textarea
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            rows="3"
            value={contactDetails.remarks || ""}
            onChange={(e) => setContactDetails({ ...contactDetails, remarks: e.target.value })}
            placeholder="Enter remarks..."
          />
        </div>
        

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
          onClick={() => handleEditInfo(contactDetails)}
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
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${contactDetails.gospelShared ? "border-green-600" : "border-red-600"}`}
              onClick={() => setContactDetails({ ...contactDetails, gospelShared: !contactDetails.gospelShared })}
            >
              <p className="font-bold text-black">Gospel Shared</p>
              <span className={`text-2xl ${contactDetails.gospelShared ? "text-green-600" : "text-red-600"}`}>
                {contactDetails.gospelShared ? "✔" : "✖"}
              </span>
            </div>

            {/* Saved */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${contactDetails.saved ? "border-green-600" : "border-red-600"}`}
              onClick={() => setContactDetails({ ...contactDetails, saved: !contactDetails.saved })}
            >
              <p className="font-bold text-black">Saved</p>
              <span className={`text-2xl ${contactDetails.saved ? "text-green-600" : "text-red-600"}`}>
                {contactDetails.saved ? "✔" : "✖"}
              </span>
            </div>

            {/* Called */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${contactDetails.called ? "border-green-600" : "border-red-600"}`}
              onClick={() => setContactDetails({ ...contactDetails, called: !contactDetails.called })}
            >
              <p className="font-bold text-black">Called</p>
              <span className={`text-2xl ${contactDetails.called ? "text-green-600" : "text-red-600"}`}>
                {contactDetails.called ? "✔" : "✖"}
              </span>
            </div>

            {/* Meet Up */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${contactDetails.meetUp ? "border-green-600" : "border-red-600"}`}
              onClick={() => setContactDetails({ ...contactDetails, meetUp: !contactDetails.meetUp })}
            >
              <p className="font-bold text-black">Meet Up</p>
              <span className={`text-2xl ${contactDetails.meetUp ? "text-green-600" : "text-red-600"}`}>
                {contactDetails.meetUp ? "✔" : "✖"}
              </span>
            </div>

            {/* Progress Remarks Title (Moved Outside the Box) */}
            <p className="font-bold text-black">Progress Remarks</p>
            {/* Progress Remarks */}
            <textarea 
              className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
              rows="6"
              value={contactDetails.progressRemarks || ""}
              onChange={(e) => setContactDetails({ ...contactDetails, progressRemarks: e.target.value })}
              placeholder="Enter progress remarks..."
            ></textarea>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Edit Progress Button (Sends Data to API) */}
            <button
              className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
              onClick={() => handleEditProgress(contactDetails)}>
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
