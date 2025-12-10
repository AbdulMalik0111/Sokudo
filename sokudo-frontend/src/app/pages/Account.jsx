import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  FiUser,
  FiShoppingCart,
  FiCreditCard,
  FiEdit,
  FiArrowRight,
  FiCheckCircle,
  FiXCircle,
  FiLoader,
  FiX,
  FiAlertCircle,
} from "react-icons/fi";
import Banner from "/videoimage.jpg";
import { getMyOrdersThunk } from "../features/order/OrderSlice";
import { getMyTestRidesThunk } from "../features/testRide/testRideSlice";


const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { orders, loading, error } = useSelector((state) => state.order);
  const { rides, loading: testRideLoading, error: testRideError } = useSelector((state) => state.testRide);

 useEffect(() => {
  if (activeTab === "testRides" && rides.length === 0) {
    dispatch(getMyTestRidesThunk());
  }
}, [activeTab, dispatch, rides.length]);


  useEffect(() => {
    if (activeTab === "orders" || activeTab === "transactions") {
      if (orders.length === 0) {
        dispatch(getMyOrdersThunk());
      }
    }
  }, [activeTab, dispatch, orders.length]);

  const transactions = useMemo(() => {
    if (!orders) return [];
    return orders
      .filter((order) => order.transaction)
      .map((order) => ({
        id: order.transaction.razorpay_payment_id || order.orderId,
        date: order.transaction.updatedAt || order.createdAt,
        details: `Booking for ${order.productName}`,
        amount: order.amount,
        status: order.transaction.status,
      }))
      .reverse(); // Show newest first
  }, [orders]);

  const currentTitle = useMemo(() => {
    switch (activeTab) {
      case "orders":
        return "My Orders";
      case "transactions":
        return "My Transactions";
      case "profile":
      default:
        return "My Profile";
    }
  }, [activeTab]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <FiLoader className="animate-spin text-4xl text-yellow-500" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileContent user={user} />;
      case "orders":
        return (
          <OrdersContent orders={orders} loading={loading} error={error} />
        );
      case "transactions":
        return (
          <TransactionsContent
            transactions={transactions}
            loading={loading}
            error={error}
          />
        );
        case "testRides":
  return (
    <TestRidesContent
      rides={rides}
      loading={testRideLoading}
      error={testRideError}
    />
  );

      default:
        return <ProfileContent user={user} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner Section */}
      <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
              <div
                className="absolute inset-0 -z-10 bg-center bg-cover"
                style={{ backgroundImage: `url(${Banner})` }}
              />
              <div className="absolute inset-0 -z-10 bg-black/40" />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
      
              <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="heading !text-white">{currentTitle}</h1>
              </div>
            </section>

      {/* Main Content Section */}
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <AccountNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              user={user}
            />
          </div>
          <div className="lg:col-span-3">{renderContent()}</div>
        </div>
      </section>
    </div>
  );
};

// --- Navigation Sub-Component ---

const AccountNav = ({ activeTab, setActiveTab, user }) => {
  const navItems = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "orders", label: "Orders", icon: FiShoppingCart },
    { id: "transactions", label: "Transactions", icon: FiCreditCard },
    { id: "testRides", label: "Test Rides", icon: FiCheckCircle },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-5 mb-5">
        <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-white text-2xl font-semibold ring-4 ring-yellow-100">
          {user.name ? user.name[0].toUpperCase() : <FiUser />}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600 truncate">{user.email}</p>
        </div>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
                  activeTab === item.id
                    ? "bg-yellow-50 text-yellow-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

// --- Profile Content Sub-Component ---

const ProfileContent = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Profile Details
        </h2>
        
      </div>
      <div className="p-6 sm:p-8">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
            <dd className="mt-1 text-base font-semibold text-gray-900">
              {user.name}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 text-base font-semibold text-gray-900">
              {user.email}
            </dd>
          </div>
          
          {/* Address section removed as it's not in the auth state */}
        </dl>
      </div>
    </div>
  );
};

// --- Orders Content Sub-Component ---

const OrdersContent = ({ orders, loading, error }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getStatusInfo = (status) => {
    if (!status) status = "processing";
    switch (status.toLowerCase()) {
      case "delivered":
        return {
          icon: FiCheckCircle,
          class: "bg-green-100 text-green-700",
        };
      case "processing":
        return { icon: FiLoader, class: "bg-blue-100 text-blue-700" };
      case "cancelled":
        return { icon: FiXCircle, class: "bg-red-100 text-red-700" };
      default:
        return { icon: FiShoppingCart, class: "bg-gray-100 text-gray-700" };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 flex justify-center items-center">
        <FiLoader className="animate-spin text-4xl text-yellow-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <FiAlertCircle className="mx-auto text-5xl text-red-500" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">
          Error Fetching Orders
        </h3>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  


  return (
    <div className="space-y-6">
      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900">
            No Orders Found
          </h3>
          <p className="text-gray-600 mt-2">
            You have not placed any orders yet.
          </p>
        </div>
      ) : (
        [...orders].map((order) => {
          // Show newest first
          const statusInfo = getStatusInfo(order.deliveryStatus);
          return (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.orderId}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {formatDate(order.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-2 ${statusInfo.class}`}
                >
                  <statusInfo.icon
                    className={`w-5 h-5 ${
                      order.deliveryStatus === "Processing"
                        ? "animate-spin"
                        : ""
                    }`}
                  />
                  <span>{order.deliveryStatus}</span>
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={"https://placehold.co/100x100/333/fff?text=Sokudo"}
                    alt={order.productName}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-800">
                      {order.productName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Payment: {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-xl font-bold text-gray-900">
                    {formatCurrency(order.amount)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all duration-200"
                >
                  <span>View Details</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })
      )}

      {showModal && selectedOrder && (
   <OrderDetailsModal
      order={selectedOrder}
      onClose={() => {
         setShowModal(false);
         setSelectedOrder(null);
      }}
   />
)}
    </div>
  );
};

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[95%] sm:w-[600px] max-h-[90vh] overflow-y-auto relative p-6 sm:p-8">
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors"
        >
          <FiX size={22} />
        </button>

        {/* 🧾 Header */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Order Details
        </h2>

        {/* Basic Info */}
        <div className="space-y-3">
          <InfoRow label="Order ID" value={order.orderId} />
          <InfoRow label="Product Name" value={order.productName} />
          <InfoRow label="Customer Name" value={order.customerName} />
          <InfoRow label="Email" value={order.email} />
        </div>

        <Section title="Booking Information">
          <div className="grid grid-cols-2 gap-3">
            <InfoRow label="Model" value={order.model} />
            <InfoRow label="Color" value={order.color} />
            <InfoRow label="State" value={order.state} />
            <InfoRow label="City" value={order.city} />
            <InfoRow label="Pincode" value={order.pincode || "N/A"} />
            <InfoRow label="Landmark" value={order.landmark || "N/A"} />
            <div className="col-span-2">
              <InfoRow label="Address" value={order.address || "N/A"} />
            </div>
          </div>
        </Section>

        <Section title="Payment Information">
          <div className="grid grid-cols-2 gap-3">
            <InfoRow label="Amount" value={`₹${order.amount}`} />
            <InfoRow label="Payment Method" value={order.paymentMethod} />
            <InfoRow
              label="Payment Status"
              value={order.paymentStatus}
              valueClass={
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : order.paymentStatus === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }
            />
          </div>
        </Section>

        <Section title="Delivery Status">
          <p
            className={`text-base font-semibold ${
              order.deliveryStatus === "Delivered"
                ? "text-green-600"
                : order.deliveryStatus === "Pending"
                ? "text-yellow-600"
                : order.deliveryStatus === "Cancelled"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {order.deliveryStatus}
          </p>
        </Section>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium text-gray-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable subcomponents
const Section = ({ title, children }) => (
  <div className="mt-6 border-t border-gray-200 pt-4">
    <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const InfoRow = ({ label, value, valueClass = "" }) => (
  <div>
    <p className="text-sm font-semibold text-gray-700">{label}:</p>
    <p className={`text-base ${valueClass}`}>{value}</p>
  </div>
);



// --- Transactions Content Sub-Component ---

const TransactionsContent = ({ transactions, loading, error }) => {
  const getStatusClass = (status) => {
    if (!status) status = "pending";
    switch (status.toLowerCase()) {
      case "success":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 flex justify-center items-center">
        <FiLoader className="animate-spin text-4xl text-yellow-500" />
      </div>
    );
  }

  // No need to show error here, as 'OrdersContent' will show it

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 sm:p-8 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900">
          Transaction History
        </h2>
      </div>
      <div className="overflow-x-auto">
        {transactions.length === 0 ? (
          <p className="p-8 text-center text-gray-600">
            {loading ? "Loading..." : "You have no transactions."}
          </p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate max-w-xs">
                    {tx.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {tx.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(tx.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                        tx.status
                      )}`}
                    >
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};


const TestRidesContent = ({ rides = [], loading, error }) => {
  const [selected, setSelected] = useState(null);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="bg-white p-10 rounded-xl shadow flex justify-center">
        <FiLoader className="animate-spin text-3xl text-yellow-500" />
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <FiAlertCircle className="mx-auto text-4xl text-red-500" />
        <p className="mt-4 text-gray-600">{error}</p>
      </div>
    );
  }

  /* ---------- EMPTY STATE ---------- */
  if (!rides.length) {
    return (
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h3 className="text-lg font-semibold">No Test Rides Booked</h3>
        <p className="text-gray-500 mt-1">
          You haven’t booked any test rides yet.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ---------- LIST ---------- */}
      <div className="space-y-6">
        {rides.map((r) => (
          <div
            key={r._id}
            className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {r.modelName}
              </h3>

              <p className="text-sm text-gray-600">
                {r.cityLabel} • {formatDate(r.date)} • {r.time}
              </p>

              <p className="text-sm mt-1">
                Status:{" "}
                <span className="font-semibold text-yellow-600">
                  {r.status}
                </span>
              </p>
            </div>

            <button
              onClick={() => setSelected(r)}
              className="self-end sm:self-auto p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100"
              title="View Details"
            >
              <FiArrowRight />
            </button>
          </div>
        ))}
      </div>

      {/* ---------- DETAILS MODAL ---------- */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <FiX />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Test Ride Details
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <strong>Model:</strong> {selected.modelName}
              </p>
              <p>
                <strong>Name:</strong> {selected.name}
              </p>
              <p>
                <strong>Phone:</strong> {selected.phone}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(selected.date)}
              </p>
              <p>
                <strong>Time:</strong> {selected.time}
              </p>
              <p>
                <strong>City:</strong> {selected.cityLabel}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="font-semibold text-yellow-600">
                  {selected.status}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};



export default AccountPage;
