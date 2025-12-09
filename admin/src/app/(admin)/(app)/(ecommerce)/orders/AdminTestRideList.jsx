import React, { useEffect, useState } from "react";
import axios from "axios";
import { LuEye } from "react-icons/lu";

const AdminTestRideList = () => {
  const [rides, setRides] = useState([]);
  const [selectedRide, setSelectedRide] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestRides = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/test-ride`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRides(res.data.rides || []);
      } catch (error) {
        console.error("❌ Error fetching test rides:", error);
      }
    };

    fetchTestRides();
  }, []);

  const openModal = (ride) => {
    setSelectedRide(ride);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRide(null);
  };

  return (
    <div className="grid grid-cols-1 gap-5 mb-5">
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Test Ride Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-default-200 text-sm">
            <thead className="bg-default-150 text-left">
              <tr>
                <th className="px-3.5 py-3">Customer</th>
                <th className="px-3.5 py-3">Phone</th>
                <th className="px-3.5 py-3">Email</th>
                <th className="px-3.5 py-3">Model</th>
                <th className="px-3.5 py-3">City</th>
                <th className="px-3.5 py-3">Date</th>
                <th className="px-3.5 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-default-200">
              {rides.length > 0 ? (
                rides.map((ride) => (
                  <tr key={ride._id} className="text-default-800">
                    <td className="px-3.5 py-2.5 font-medium">
                      {ride.name}
                    </td>
                    <td className="px-3.5 py-2.5">{ride.phone}</td>
                    <td className="px-3.5 py-2.5">{ride.email}</td>
                    <td className="px-3.5 py-2.5">{ride.modelName}</td>
                    <td className="px-3.5 py-2.5">{ride.cityLabel}</td>
                    <td className="px-3.5 py-2.5">
                      {new Date(ride.date).toLocaleDateString()}
                    </td>

                    <td className="px-3.5 py-2.5 text-center">
                      <button
                        onClick={() => openModal(ride)}
                        className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-primary text-white rounded hover:bg-primary/80"
                      >
                        <LuEye className="size-4" /> View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-gray-500">
                    No test ride bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ MODAL */}
      {isModalOpen && selectedRide && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4 text-center">
              Test Ride Details
            </h3>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedRide.name}</p>
              <p><strong>Phone:</strong> {selectedRide.phone}</p>
              <p><strong>Email:</strong> {selectedRide.email}</p>
              <p><strong>Pincode:</strong> {selectedRide.pincode}</p>
              <p><strong>Model:</strong> {selectedRide.modelName}</p>
              <p><strong>City:</strong> {selectedRide.cityLabel}</p>
              <p><strong>Date:</strong> {selectedRide.date}</p>
              <p><strong>Time:</strong> {selectedRide.time}</p>
              <p>
                <strong>Booked On:</strong>{" "}
                {new Date(selectedRide.createdAt).toLocaleString()}
              </p>
            </div>

            <button
              className="mt-5 w-full btn bg-primary text-white"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestRideList;
