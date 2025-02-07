"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "../../components/BottomNavigation";
import { addContact } from "@/service/service";

export default function AddContact() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    method: "addContact",
    sheetType: "Contacts",
    sheetName: "",
    poc: "",
    fullName: "",
    contactType: "",
    contactInfo: "",
    address: "",
    source: "",
    gospelShared: false,
    saved: false,
    remarks: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) {
      router.push("/login");
    } else {
      setUsername(storedUsername);
      setContactData((prevData) => ({
        ...prevData,
        sheetName: storedUsername,
        poc: storedUsername,
      }));
    }
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactData({
      ...contactData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      console.log("Contact Data:", contactData);
      // Call the API to add the contact
      await addContact(contactData);
      // Show success message
      alert("Contact added successfully!");
    } catch (error) {
      setError("An error occurred while adding the contact.");
      console.error("Error adding contact:", error);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-8">
        <h1 className="text-2xl font-bold text-left text-black ml-[-px]">Add Contact</h1>
      </div>

      <div className="flex-grow mt-16 px-2 py-4 flex flex-col items-center max-w-2xl w-full">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
          <label className="text-sm font-semibold text-black">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="w-full p-2 bg-white rounded-lg outline-none text-black mt-[-10px] border-2 border-blue-600"
            value={contactData.fullName}
            onChange={handleInputChange}
            required
          />

          <div className="relative w-full">
            <label className="text-sm font-semibold text-black">Contact Type</label>
            <select
              name="contactType"
              className="w-full p-2 bg-white rounded-lg outline-none text-black appearance-none border-2 border-blue-600"
              value={contactData.contactType}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>Select Contact Type</option>
              <option value="LineID">LineID</option>
              <option value="TelegramID">TelegramID</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="InstagramID">InstagramID</option>
              <option value="Others">Others</option>
            </select>
            <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
          </div>

          <label className="text-sm font-semibold text-black">Contact Information</label>
          <input
            type="text"
            name="contactInfo"
            className="w-full p-2 bg-white rounded-lg outline-none text-black mt-[-10px] border-2 border-blue-600"
            value={contactData.contactInfo}
            onChange={handleInputChange}
            required
          />

          <label className="text-sm font-semibold text-black">Address</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 bg-white rounded-lg outline-none text-black mt-[-10px] border-2 border-blue-600"
            value={contactData.address}
            onChange={handleInputChange}
          />

          <div className="relative w-full">
            <label className="text-sm font-semibold text-black">Source</label>
            <select
              name="source"
              className="w-full p-2 bg-white rounded-lg outline-none text-black appearance-none border-2 border-blue-600"
              value={contactData.source}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>Select Source</option>
              <option value="Street Evangelism">Street Evangelism</option>
              <option value="English Exchange">English Exchange</option>
              <option value="Online Platforms">Online Platforms (e.g., HelloTalk)</option>
              <option value="Others">Others</option>
            </select>
            <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
          </div>

          <div className="flex items-center gap-8 ">
            <label className="flex items-center gap-1">
              <span className="text-m font-semibold text-black">Gospel Shared</span>
              <input
                type="checkbox"
                name="gospelShared"
                checked={contactData.gospelShared}
                onChange={handleInputChange}
              />
            </label>

            <label className="flex items-center gap-1">
              <span className="text-m font-semibold text-black">Saved</span>
              <input
                type="checkbox"
                name="saved"
                checked={contactData.saved}
                onChange={handleInputChange}
              />
            </label>
          </div>

          <label className="text-sm font-semibold text-black mt-[-7px]">Remarks</label>
          <textarea
            name="remarks"
            rows="3"
            className="w-full p-2 bg-white rounded-lg outline-none text-black mt-[-12px] border-2 border-blue-600"
            value={contactData.remarks}
            onChange={handleInputChange}
          />

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Adding Contact..." : "Add Contact"}
          </button>
        </form>
      </div>

      <BottomNavigation />
    </div>
  );
}
