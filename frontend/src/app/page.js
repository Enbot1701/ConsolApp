"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { countActive, countActiveContacts, countDisciples } from "../service/service";
import BottomNavigation from "../components/BottomNavigation";

export default function Home() {
  const [contactsCount, setContactsCount] = useState(0);
  const [disciplesCount, setDisciplesCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [loading, setLoading] = useState(true); // 👈 Added loading state
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (!username) {
      router.push("/login");
    } else {
      const fetchCounts = async () => {
        setLoading(true); // 👈 Set loading to true before fetching

        try {
          const contacts = await countActiveContacts(username);
          const disciples = await countDisciples(username);
          const active = await countActive(username);

          setContactsCount(contacts);
          setDisciplesCount(disciples);
          setActiveCount(active);
        } catch (error) {
          console.error("Error fetching counts:", error);
        } finally {
          setLoading(false); // 👈 Set loading to false after fetching
        }
      };

      fetchCounts();
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Fixed Title */}
      <div className="fixed top-0 left-0 right-0 bg-white z-10 p-8">
        <h1 className="text-2xl font-bold text-left text-black">Home Page</h1>
      </div>

      {/* Page Content */}
      <div className="flex-grow mt-20 p-4 flex flex-col items-center">
        <div className="space-y-4 max-w-lg w-full px-2">
          {/* Contacts Count */}
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border-blue-600 border-2">
            <h2 className="text-lg font-bold text-black">Contacts</h2>
            <p className="text-lg font-semibold text-black pr-2">
              {loading ? "Loading..." : contactsCount}
            </p>
          </div>

          {/* Disciples Count */}
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border-blue-600 border-2">
            <h2 className="text-lg font-bold text-black">Disciples</h2>
            <p className="text-lg font-semibold text-black pr-2">
              {loading ? "Loading..." : disciplesCount}
            </p>
          </div>

          {/* All Active Count */}
          <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center border-blue-600 border-2">
            <h2 className="text-lg font-bold text-black">All Active</h2>
            <p className="text-lg font-semibold text-black pr-2">
              {loading ? "Loading..." : activeCount}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
