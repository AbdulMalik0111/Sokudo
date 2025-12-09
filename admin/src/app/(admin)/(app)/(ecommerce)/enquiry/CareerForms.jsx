import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuEye, LuFileText } from "react-icons/lu";

const CareerForms = () => {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Fetch Career Data
  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/career`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCareers(res.data.careers || []);
      } catch (error) {
        console.error("❌ Error fetching careers:", error);
      }
    };

    fetchCareers();
  }, []);

  // 🔹 Modal Controls
  const openModal = (career) => {
    setSelectedCareer(career);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCareer(null);
  };

  // ✅ DIRECT GOOGLE DOCS PREVIEW (FULLSCREEN + SAVE TO DRIVE)
  const handlePreviewCV = (cvUrl) => {
     console.log("CV URL =>", cvUrl);
    if (!cvUrl) {
      alert("CV not available");
      return;
    }

    const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
      cvUrl
    )}`;

    window.open(googleDocsUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="grid grid-cols-1 gap-5 mb-5">
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold">All Career Enquiries</h2>
        </div>

        {/* 🔹 Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-default-200 text-sm">
            <thead className="bg-default-150 text-left">
              <tr>
                <th className="px-3.5 py-3">Name</th>
                <th className="px-3.5 py-3">Email</th>
                <th className="px-3.5 py-3">Phone</th>
                <th className="px-3.5 py-3">Message</th>
                <th className="px-3.5 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default-200">
              {careers.length > 0 ? (
                careers.map((career) => (
                  <tr key={career._id}>
                    <td className="px-3.5 py-2.5">{career.name}</td>
                    <td className="px-3.5 py-2.5">{career.email}</td>
                    <td className="px-3.5 py-2.5">{career.phone}</td>
                    <td className="px-3.5 py-2.5">
                      {career.message?.length > 40
                        ? career.message.slice(0, 40) + "..."
                        : career.message}
                    </td>
                    <td className="px-3.5 py-2.5 text-center">
                      <button
                        onClick={() => openModal(career)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded hover:bg-primary/90"
                      >
                        <LuEye size={16} /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-5 text-center text-gray-400"
                  >
                    No career enquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔹 DETAILS MODAL */}
      {isModalOpen && selectedCareer && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl w-full max-w-md p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-center">
              Career Details
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                <b>Name:</b> {selectedCareer.name}
              </p>
              <p>
                <b>Email:</b> {selectedCareer.email}
              </p>
              <p>
                <b>Phone:</b> {selectedCareer.phone}
              </p>
              <p>
                <b>Message:</b> {selectedCareer.message}
              </p>

              <div className="mt-4">
                <button
                  onClick={() => handlePreviewCV(selectedCareer.cv)}
                  className="flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <LuFileText size={18} />
                  Preview CV (Google Docs)
                </button>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="btn w-full mt-5"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerForms;
