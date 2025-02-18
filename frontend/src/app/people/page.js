"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { getAllContacts, getAllDisciples } from "@/service/service";

export default function People() {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState("contacts");
  const [loading, setLoading] = useState(false); // New loading state
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      fetchData(username);
    } else {
      console.error("No username found in localStorage");
      router.push("/login");
    }
  }, [activeTab, router]);

  const fetchData = async (username) => {
    setLoading(true); // Start loading
    try {
      let data = activeTab === "contacts" ? await getAllContacts(username) : await getAllDisciples(username);
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setContacts([]);
    }
    setLoading(false); // Stop loading
  };

  const handleViewContact = (contact) => {
    const {id } = contact;
    if (activeTab === "contacts"){
      router.push(`/viewContact/${id}`);
    } else {
      router.push(`/viewDisciple/${id}`);
    }
  }
   
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fixed Title & Tabs */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-8">
      <h1 className="text-2xl font-bold text-left text-black">My People</h1>
        
        {/* Tabs */}
        <div className="flex border-b mt-4">
          <button
            className={`flex-1 py-2 text-medium font-semibold ${activeTab === "contacts" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("contacts")}
          >
            Contacts
          </button>
          <button
            className={`flex-1 py-2 text-medium font-semibold ${activeTab === "disciples" ? "border-b-4 border-blue-600 text-blue-600" : "text-gray-500"}`}
            onClick={() => setActiveTab("disciples")}
          >
            Disciples
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-grow mt-36 p-6 flex flex-col items-center">
        <div className="space-y-4 max-w-lg w-full">
          {loading ? (
            <p className="text-center text-blue-600">Loading...</p> // Show loading indicator
          ) : contacts.length > 0 ? (
            contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleViewContact(contact)}
                className="bg-white shadow-inner rounded-lg p-3 flex justify-between items-center cursor-pointer hover:bg-blue-100 border-2 border-blue-600"
              >
                <div className="flex-grow">
                  <p className="font-bold text-black">{contact.fullName}</p>
                  <p className="font-sm text-gray-500 text-sm">
                    <span className="font-bold text-black">{contact.contactType}: </span> 
                    <span className="text-gray-800">{contact.contactInfo}</span>
                  </p>
                </div>

                {/* Right arrow */}
                <div className="ml-2 text-black mr-2">➔</div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No {activeTab} available.</p>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
