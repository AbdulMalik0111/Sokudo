const TestRidesContent = ({ rides, loading, error }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-10 flex justify-center">
        <FiLoader className="animate-spin text-3xl text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <FiAlertCircle className="mx-auto text-4xl text-red-500" />
        <p className="mt-4 text-gray-600">{error}</p>
      </div>
    );
  }

  if (!rides.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h3 className="text-xl font-semibold">No Test Rides Booked</h3>
        <p className="text-gray-600 mt-2">
          You haven’t booked any test rides yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rides.map((ride) => (
        <div
          key={ride._id}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {ride.modelName}
            </h3>
            <p className="text-sm text-gray-600">
              {ride.cityLabel} • {formatDate(ride.date)} • {ride.time}
            </p>
            <p className="text-sm mt-1">
              Payment:{" "}
              <span className="font-semibold text-green-600">
                {ride.payment.status}
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Booking Amount</p>
            <p className="text-xl font-bold text-gray-900">
              ₹{ride.bookingAmount.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
