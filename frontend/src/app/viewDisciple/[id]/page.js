"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BottomNavigation from "@/components/BottomNavigation";
import { changeToContact, getDiscipleById, editDiscipleInfo, editDiscipleProgress, getCGNames, archiveContact, editCG, editPOC } from "@/service/service";
import { FaUser, FaArchive } from "react-icons/fa"; // Importing icons

export default function Viewdisciple() {
  const params = useParams();
  const id = params?.id;

  const [discipleDetails, setdiscipleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [cgNames, setCGNames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const username = localStorage.getItem("username");
      setUsername(username);
  
      const fetchData = async () => {
        setLoading(true);
        try {
          // Fetch disciple details
          const discipleData = await getDiscipleById(username, id);
          setdiscipleDetails(discipleData);
          console.log("Disciple Data:", discipleData);
  
          // Fetch CG Names
          const cgNamesResponse = await getCGNames();
          setCGNames(Array.isArray(cgNamesResponse) ? cgNamesResponse : []); // Ensure it's an array
          console.log("CG Names:", cgNamesResponse);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id]);
  
  const handleEditInfo = async (e) => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editDiscipleInfo",
        sheetName: username,
        sheetType: "Disciples",
        id: discipleDetails.id,
        fullName: discipleDetails.fullName,
        source: discipleDetails.source,
        contactType: discipleDetails.contactType,
        contactInfo: discipleDetails.contactInfo,
        remarks: discipleDetails.remarks,
      }
      console.log(data);
      await editDiscipleInfo(data);
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
        method: "editDiscipleProgress",
        sheetName: username,
        sheetType: "Disciples",
        id: id, 
        gospelShared: discipleDetails.gospelShared,
        saved: discipleDetails.saved,
        called: discipleDetails.called,
        meetUp: discipleDetails.meetUp,
        progressRemarks: discipleDetails.progressRemarks,
        coreTeam: discipleDetails.coreTeam,
        nextStep: discipleDetails.nextStep,
        waterBaptism: discipleDetails.waterBaptism,
        hsBaptism: discipleDetails.hsBaptism,
        gt1: discipleDetails.gt1,
        gt2: discipleDetails.gt2,
        gt3: discipleDetails.gt3,
        gt4: discipleDetails.gt4,
        cglt: discipleDetails.cglt
      }
      await editDiscipleProgress(data);
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
      await changeToContact(data);
      router.push(`/viewContact/${id}`);
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
        sheetType: "Disciples",
        id: id
      }
      await archiveContact(data);
      router.push('/people')
    } catch (error) {
      setError("An error occurred while updating progress.");
    } finally {
      setLoading(false);
    }
  }

  const handleEditCG = async() => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editCG",
        sheetName: username,
        sheetType: "Disciples",
        id: id,
        cg:discipleDetails.cg
      }
      await editCG(data);
    } catch (error) {
      setError("An error occurred while editing cg.");
    } finally {
      setLoading(false);
    }
  }

  const handleEditPOC = async() => {
    setError("");
    setLoading(true);
    try {
      const data = {
        method: "editPOC",
        sheetName: username,
        sheetType: "Disciples",
        id: id,
        poc:discipleDetails.poc
      }
      await editPOC(data);
    } catch (error) {
      setError("An error occurred while editing poc.");
    } finally {
      setLoading(false);
    }
  }

    const handleRemoveFromCG = async () => {
      setError("");
      setLoading(true);
      try {
        const data = {
          method: "removeFromCG",
          sheetName: username,
          sheetType: "Disciples",
          id: id,
        };
        await removeFromCG(data);
        
        // Refresh the page after successful removal
        window.location.reload();
      } catch (error) {
        setError("An error occurred while removing entry from CG.");
      } finally {
        setLoading(false);
      }
    };
    

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
            <span className="text-xs text-blue-700 font-semibold">Contact</span>
          </button>
          <button onClick={handleArchiveClick} className="flex flex-col items-center">
            <FaArchive className="text-gray-700 text-2xl" />
            <span className="text-xs text-gray-700 font-semibold">Archive</span>
          </button>
          </div>
        </div>
        <p className="text-sm font-bold text-green-700">Disciple</p>
        <p className="text-sm text-black mt">
          <span className="font-bold text-black">{discipleDetails.contactType}: </span>
          <span className="text-black">{discipleDetails.contactInfo}</span>
        </p>
      </div>

            {/* Fixed Tab Bar */}
            <div className="fixed top-28 left-0 right-0 bg-white z-10 shadow-md">
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
              activeTab === "progress" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("progress")}
          >
            Progress
          </button>
          <button
            className={`flex-1 py-2 text-medium font-semibold border-b-4 ${
              activeTab === "network" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab("network")}
          >
            Network
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
              onChange={(e) => setdiscipleDetails({ ...discipleDetails, contactType: e.target.value })}
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
            value={discipleDetails.contactInfo}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, contactInfo: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-black">Address</label>
          <input
            type="text"
            className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600"
            value={discipleDetails.address}
            onChange={(e) => setdiscipleDetails({ ...discipleDetails, address: e.target.value })}
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

            {/* Core Team */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.coreTeam ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, coreTeam: !discipleDetails.coreTeam })}
            >
              <p className="font-bold text-black">Core Team</p>
              <span className={`text-2xl ${discipleDetails.coreTeam ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.coreTeam ? "✔" : "✖"}
              </span>
            </div>

            {/* Next Step */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.nextStep ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, nextStep: !discipleDetails.nextStep })}
            >
              <p className="font-bold text-black">Next Step</p>
              <span className={`text-2xl ${discipleDetails.nextStep ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.nextStep ? "✔" : "✖"}
              </span>
            </div>

            {/* Water Baptism */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.waterBaptism ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, waterBaptism: !discipleDetails.waterBaptism })}
            >
              <p className="font-bold text-black">Water Baptism</p>
              <span className={`text-2xl ${discipleDetails.waterBaptism ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.waterBaptism ? "✔" : "✖"}
              </span>
            </div>

            {/* Encounter */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.encounter ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, encounter: !discipleDetails.encounter })}
            >
              <p className="font-bold text-black">Encounter</p>
              <span className={`text-2xl ${discipleDetails.encounter ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.encounter ? "✔" : "✖"}
              </span>
            </div>

            {/* Holy Spirit Baptism */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.hsBaptism ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, hsBaptism: !discipleDetails.hsBaptism })}
            >
              <p className="font-bold text-black">Holy Spirit Baptism</p>
              <span className={`text-2xl ${discipleDetails.hsBaptism ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.hsBaptism ? "✔" : "✖"}
              </span>
            </div>

             {/* GT1 */}
             <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.gt1 ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, gt1: !discipleDetails.gt1 })}
            >
              <p className="font-bold text-black">GT1</p>
              <span className={`text-2xl ${discipleDetails.gt1 ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.gt1 ? "✔" : "✖"}
              </span>
            </div>

             {/* GT2 */}
             <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.gt2 ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, gt2: !discipleDetails.gt2 })}
            >
              <p className="font-bold text-black">GT2</p>
              <span className={`text-2xl ${discipleDetails.gt2 ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.gt2 ? "✔" : "✖"}
              </span>
            </div>

             {/* GT3 */}
             <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.gt3 ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, gt3: !discipleDetails.gt3 })}
            >
              <p className="font-bold text-black">GT3</p>
              <span className={`text-2xl ${discipleDetails.gt3 ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.gt3 ? "✔" : "✖"}
              </span>
            </div>

             {/* GT4 */}
             <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.gt4 ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, gt4: !discipleDetails.gt4 })}
            >
              <p className="font-bold text-black">GT4</p>
              <span className={`text-2xl ${discipleDetails.gt4 ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.gt4 ? "✔" : "✖"}
              </span>
            </div>

            {/* CGLT */}
            <div 
              className={`flex justify-between items-center bg-white shadow-inner rounded-lg p-2 border-2 cursor-pointer ${discipleDetails.cglt ? "border-green-600" : "border-red-600"}`}
              onClick={() => setdiscipleDetails({ ...discipleDetails, cglt: !discipleDetails.cglt })}
            >
              <p className="font-bold text-black">CGLT</p>
              <span className={`text-2xl ${discipleDetails.cglt ? "text-green-600" : "text-red-600"}`}>
                {discipleDetails.cglt ? "✔" : "✖"}
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
              onClick={() => handleEditProgress(discipleDetails)}>
              Edit Progress
            </button>
          </div>
        )}

        {/* Network Tab */}
        {activeTab === "network" && (
        <div className="mt-4 space-y-3">
          <div className="relative">
            <label className="text-m font-semibold text-black">CG</label>
            <select
              className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
              value={discipleDetails.cg}
              onChange={(e) =>
                setdiscipleDetails({ ...discipleDetails, cg: e.target.value })
              }
            >
              <option value="" disabled>Select a CG</option>
              {(cgNames ?? []).map((cg, index) => (
                <option key={index} value={cg}>
                  {cg}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-9 pointer-events-none text-black">▼</div>
          </div>

          <button
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
            onClick={() => handleEditCG(discipleDetails)}
          >
            Edit CG
          </button>
          <button
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-red-700 transition duration-200"
            onClick={() => handleRemoveFromCG(discipleDetails)}
          >
            Remove from CG
          </button>

          {/* POC Dropdown */}
          <div className="relative">
            <label className="text-sm font-semibold text-black">POC</label>
            <select
              className="w-full p-2 bg-white rounded-lg text-black border-2 border-blue-600 appearance-none"
              value={discipleDetails.poc || ""}
              onChange={(e) => setdiscipleDetails({ ...discipleDetails, poc: e.target.value })}
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
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-2 hover:bg-blue-700 transition duration-200"
            onClick={() => handleEditPOC(discipleDetails)}
          >
            Edit POC
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
