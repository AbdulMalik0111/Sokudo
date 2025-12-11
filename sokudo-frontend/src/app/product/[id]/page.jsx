// src/pages/ProductDetails.jsx
"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import toast from "react-hot-toast";
import {
  FiZap,
  FiBatteryCharging,
  FiCpu,
  FiX,
  FiDownload,
  FiLoader,
  FiMapPin,
  FiSettings,
  FiMaximize,
  FiDisc,
} from "react-icons/fi";
import BookNow from "../../components/BookNow";

// Modal.setAppElement("#root");

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);

const COLOR_MAP = {
  Red: "#FF0000",
  Blue: "#0066FF",
  Black: "#000000",
  White: "#FFFFFF",
  Grey: "#808080",
  Yellow: "#FFD500",
  Green: "#00A651",
  Orange: "#FF7A00",
  Silver: "#C0C0C0",
  Maroon: "#800000",
};

const DEFAULT_COLORS = ["Red", "Blue", "Black", "White", "Grey", "Yellow"];
const DEFAULT_MODELS = ["Sokudo Plus", "Sokudo Ultra", "Sokudo X"];
const DEFAULT_STATES = [
  "Delhi",
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Rajasthan",
  "Gujarat",
  "West Bengal",
];
const DEFAULT_CITIES = {
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur"],
  Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur"],
};

const ProductDetails = () => {
  const navigate = useRouter();
  const { id } = useParams();

  const userState = useSelector((state) => state.user) || {};
  const { userInfo = {}, isLoggedIn = false } = userState;

  const allProducts = useSelector((state) => state.product?.items || []);
  const product = allProducts.find((p) => p._id === id);

  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImages, setCurrentImages] = useState(product?.images || []);
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.[0] ?? ""
  );

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(
    product?.sections ? Object.keys(product.sections)[0] : ""
  );

  useEffect(() => {
    if (!product) return;
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      const firstWithImages =
        product.colors.find((c) => Array.isArray(c.images) && c.images.length > 0) ??
        product.colors[0];

      setSelectedColor(firstWithImages);
      setCurrentImages(firstWithImages.images ?? product.images ?? []);
      setSelectedImage(
        (firstWithImages.images && firstWithImages.images[0]) ?? (product.images && product.images[0]) ?? ""
      );
    } else {
      setCurrentImages(product.images ?? []);
      setSelectedImage(product.images?.[0] ?? "");
      setSelectedColor(null);
    }
  }, [product]);

  const findSpec = (sectionName, keyName) => {
    try {
      const section = product.sections?.[sectionName];
      if (!section) return "N/A";
      const spec = section.find((item) =>
        item.key.toLowerCase().includes(keyName.toLowerCase())
      );
      return spec ? spec.value.trim() : "N/A";
    } catch (error) {
      console.log("Error finding spec:", error);
      return "N/A";
    }
  };

  const keySpecs = useMemo(
    () => ({
      range: findSpec("engineAndTransmission", "range"),
      topSpeed: findSpec("electricals", "top speed"),
      battery: findSpec("electricals", "battery type"),
      motor: findSpec("engineAndTransmission", "moter type"),
    }),
    [product]
  );

  const specificationTabs = useMemo(() => {
    if (!product?.sections) return [];

    const iconMap = {
      engineAndTransmission: FiSettings,
      dimensionsAndCapacity: FiMaximize,
      electricals: FiZap,
      tyresAndBrakes: FiDisc,
    };

    return Object.entries(product.sections).map(([key, value]) => ({
      id: key,
      label: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace("And", "&"),
      specs: value,
      icon: iconMap[key] || FiSettings,
    }));
  }, [product?.sections]);

  const activeTabData = specificationTabs.find((tab) => tab.id === activeTab);

  const bookingAmount = useMemo(() => {
  if (!product) return 0;

  const onRoadPrice =
    product.onRoadePrice ||
    product.onRoadPrice ||
    product.netExShowroomPrice ||
    0;

  const gst = Math.round(onRoadPrice * 0.05); // ✅ 5% GST
  return 999 + gst; // ✅ FINAL BOOKING AMOUNT
}, [product]);


  const bookingDefaults = useMemo(() => {
    return {
      name: userInfo?.name ?? "",
      email: userInfo?.email ?? "",
      contact: userInfo?.contactNumber ?? userInfo?.phone ?? "",
      model: product?.name ?? "",
      color: selectedColor?.name ?? "",
    };
  }, [userInfo, product, selectedColor]);

  const handleBookNowClick = () => {
    // if (!isLoggedIn) {
    //   toast.error("You must be logged in to book.");
    //   return;
    // }
    setIsBookModalOpen(true);
  };

  const handleColorSelect = (col) => {
    setSelectedColor(col);
    const imgs = Array.isArray(col.images) && col.images.length ? col.images : product.images || [];
    setCurrentImages(imgs);
    setSelectedImage(imgs[0] ?? product.images?.[0] ?? "");
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Product Not Found
          </h2>
          <button
            onClick={() => navigate.push("/our-models")}
            className="text-[#ffb200] font-medium hover:underline"
          >
            Go back to models
          </button>
        </div>
      </div>
    );
  }

  const swatchColor = (col) => {
    if (!col) return "#999";
    return col.hex ?? COLOR_MAP[col.name] ?? "#999";
  };

  return (
    <div className="bg-gray-50 text-gray-800">
     <section
        className="relative isolate h-[420px] flex flex-col justify-center items-center text-center transition-all duration-300"
        style={{
          marginTop: "calc(var(--announcement-offset) ",
        }}
      >
              <div
                className="absolute inset-0 -z-10 bg-center bg-cover"
                style={{ backgroundImage: 'url("/pd1.webp")' }}
              />
              <div className="absolute inset-0 -z-10 bg-black/40" />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.20),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.12),transparent_40%)]" />
      
              <div className="page-width mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <h1 className="heading !text-white">{product.name}</h1>
              </div>
            </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 lg:gap-16 items-start">
          <ProductGallery
            images={currentImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            onImageClick={() => setIsImageModalOpen(true)}
          />

          <ProductInfo
            product={product}
            keySpecs={keySpecs}
            onBookNow={handleBookNowClick}
            colors={product.colors}
            selectedColor={selectedColor}
            onColorSelect={handleColorSelect}
            swatchColor={swatchColor}
          />
        </div>

        <SpecificationSection
          tabs={specificationTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeTabData={activeTabData}
        />
      </main>

      {/* ------------------- BOOKING MODAL ------------------- */}
      <BookingModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        productName={product.name}
        bookingAmount={bookingAmount}
        defaultValues={bookingDefaults}
        colors={product.colors?.map(c => c.name) ?? DEFAULT_COLORS} // 🔥 FIXED
        models={allProducts.map((p) => p.name) ?? DEFAULT_MODELS}
        states={DEFAULT_STATES}
        citiesByState={DEFAULT_CITIES}
      />

      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        image={selectedImage}
      />
    </div>
  );
};

/* --------------------------- GALLERY --------------------------- */
const ProductGallery = ({ images, selectedImage, setSelectedImage, onImageClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:sticky md:top-30">
    <div className="hidden md:flex flex-col gap-3">
      {images?.map((img, i) => (
        <button
          key={i}
          onClick={() => setSelectedImage(img)}
          className={`w-20 h-20 rounded-lg p-1 border-2 transition-all duration-200 overflow-hidden focus:outline-none ${
            selectedImage === img ? "border-[#ffb200]" : "border-gray-200 hover:border-gray-400"
          }`}
        >
          <img src={img} alt={`variant-${i}`} className="w-full h-full object-cover " />
        </button>
      ))}
    </div>

    <div className="w-full">
      <div
  className="bg-white rounded-xl border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden"
  onClick={onImageClick}
>
  {/* 🔥 Background pattern image */}
  <img
    src="/productbg.png"
    alt="bg-pattern"
    className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
  />

  {/* 🔥 Actual selected image (on top of bg) */}
  <img
  src={selectedImage}
  alt="Selected product view"
  className="
    relative z-10 w-full aspect-square object-contain
    transition-transform duration-300 ease-in-out
    hover:scale-110
  "
/>

</div>


      <div className="md:hidden flex flex-wrap gap-3 mt-4">
        {images?.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(img)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg p-1 border-2 transition-all duration-200 ${
              selectedImage === img ? "border-[#ffb200]" : "border-gray-200"
            }`}
          >
            <img src={img} alt={`variant-sm-${i}`} className="w-full h-full object-contain" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

/* --------------------------- PRODUCT INFO + COLORS --------------------------- */
const ProductInfo = ({ product, keySpecs, onBookNow, colors, selectedColor, onColorSelect, swatchColor }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    const link = document.createElement("a");
    link.href = "/Product Info.pdf";
    link.download = "Sokudo-Brochure.pdf";
    link.click();
    setTimeout(() => setIsDownloading(false), 1500);
  };

  return (
    <div className="mt-8 lg:mt-0">
      <h2 className="heading text-3xl lg:text-4xl font-semibold text-gray-900 tracking-tight">{product.name}</h2>

     {/* ---------- PRICE BLOCK (PREMIUM STYLE) ---------- */}
{/* ---------- PRICE BLOCK (HALF WIDTH CARDS + COMPACT) ---------- */}
<div className="mt-4 space-y-3">

  {/* CENTERED HALF WIDTH WRAPPER */}
  <div className=" w-full sm:w-1/2">

    {/* EX-SHOWROOM PRICE (Half Width) */}
    <div className="bg-white p-3 rounded-md shadow-sm border border-gray-200">
      <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">
        Ex-Showroom Price
      </p>
      <p className="text-[24px] sm:text-[28px] font-bold text-gray-900 leading-tight">
        {formatPrice(product.netExShowroomPrice)}
      </p>
    </div>

  </div>

  {/* —— CALCULATION CARDS (remain full width & compact) —— */}
  <div className="grid grid-cols-3 gap-2">

    <div className="bg-gray-100 p-2 rounded-md border border-gray-200">
      <p className="text-[10px] text-gray-500 uppercase tracking-wide">RTO</p>
      <p className="text-sm font-semibold text-gray-800">
        {formatPrice(product.rto)}
      </p>
    </div>

    <div className="bg-gray-100 p-2 rounded-md border border-gray-200">
      <p className="text-[10px] text-gray-500 uppercase tracking-wide">
        Handling
      </p>
      <p className="text-sm font-semibold text-gray-800">
        {formatPrice(product.handlingCharge)}
      </p>
    </div>

    <div className="bg-gray-100 p-2 rounded-md border border-gray-200">
      <p className="text-[10px] text-gray-500 uppercase tracking-wide">
        Insurance
      </p>
      <p className="text-sm font-semibold text-gray-800">
        {formatPrice(product.Insurance)}
      </p>
    </div>

  </div>

  {/* ON-ROAD PRICE (Half Width) */}
  <div className=" w-full sm:w-1/2">
    <div className="bg-[#fff7d1] p-3 rounded-md border border-[#ffd56a] shadow-sm">
      <p className="text-[10px] font-medium text-gray-700 uppercase tracking-wide">
        On-Road Price
      </p>
      <p className="text-[22px] sm:text-[26px] font-bold text-[#b67200] leading-tight">
        {formatPrice(product.onRoadePrice)}
      </p>
    </div>
  </div>

</div>



      {/* COLOR SELECTOR: shown below price */}
      {Array.isArray(colors) && colors.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600 mb-2">Available Colors</p>
          <div className="flex items-center gap-3">
            {colors.map((col, i) => {
              const colorHex = swatchColor(col);
              const isActive = selectedColor && selectedColor.name === col.name;
              return (
                <button
                  key={i}
                  onClick={() => onColorSelect(col)}
                  title={col.name}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                    isActive ? "ring-2 ring-[#ffb200]" : "border-gray-300"
                  }`}
                  style={{ backgroundColor: colorHex }}
                />
              );
            })}
            <div className="ml-3 text-sm text-gray-700">
              <span className="font-medium">Selected:</span> {selectedColor?.name ?? "Default"}
            </div>
          </div>
        </div>
      )}

      <p className={`mt-6 text-base text-gray-600 leading-relaxed ${!showFullDesc ? "truncate-mobile" : "show-full"}`}>
        {product.description}
      </p>

      {product.description?.length > 150 && (
        <button className="text-[#ffb200] font-medium text-sm mt-2 block" onClick={() => setShowFullDesc(!showFullDesc)}>
          {showFullDesc ? "Less" : "More"}
        </button>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4">
        <KeySpecItem icon={FiMapPin} label="Range" value={keySpecs.range} />
        <KeySpecItem icon={FiZap} label="Top Speed" value={keySpecs.topSpeed} />
        <KeySpecItem icon={FiBatteryCharging} label="Battery" value={keySpecs.battery} />
        <KeySpecItem icon={FiCpu} label="Motor" value={keySpecs.motor} />
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
  <button
    onClick={onBookNow}
    className="
      flex-1 inline-flex items-center justify-center
      px-[22px] py-[10px]     /* smaller padding */
      rounded-[24px]          /* slightly smaller rounded */
      bg-[#ffb200] 
      text-black 
      font-medium 
      uppercase
      text-[13px]             /* smaller font */
      tracking-wide
      transition-all duration-200
      hover:bg-[#e6a100]
    "
  >
    Book Now
  </button>

  <button
    onClick={handleDownload}
    disabled={isDownloading}
    className="
      flex-1 inline-flex items-center justify-center
      px-[22px] py-[10px]     /* smaller padding */
      rounded-[24px]
      bg-white 
      text-black
      font-medium 
      uppercase
      text-[13px]
      border border-gray-300
      tracking-wide
      transition-all duration-200
      hover:bg-gray-100
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  >
    {isDownloading ? (
      <FiLoader className="animate-spin mr-2" size={18} />
    ) : (
      <FiDownload className="mr-2" size={18} />
    )}
    {isDownloading ? "Downloading..." : "Download Brochure"}
  </button>
</div>

    </div>
  );
};

/* --------------------------- REUSABLE SPEC ITEM --------------------------- */
const KeySpecItem = ({ icon: Icon, label, value }) => (
  <div className="p-4 bg-white rounded-lg border border-gray-200">
    <div className="flex items-center gap-3">
      <Icon className="text-[#ffb200]" size={24} />
      <div>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

/* --------------------------- SPECS TABS --------------------------- */
const SpecificationSection = ({ tabs, activeTab, setActiveTab, activeTabData }) => (
  <div className="mt-20">
    <h2 className="heading text-3xl font-semibold text-gray-900 mb-8 text-center">Technical Specifications</h2>
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none border ${
                activeTab === tab.id ? "bg-[#ffb200] text-white border-[#ffb200] shadow-md" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 pt-6 border-t border-gray-100">
        {activeTabData?.specs.map((spec, idx) => (
          <div key={idx} className="py-3 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{spec.key}</p>
            <p className="text-base font-semibold text-gray-900 mt-1">{spec.value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* --------------------------- BOOKING MODAL --------------------------- */
const BookingModal = ({ isOpen, onClose, productName, bookingAmount, defaultValues, colors, models, states, citiesByState }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    overlayClassName="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
    className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl outline-none max-h-[90vh] overflow-y-auto"
  >
    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white">
      <h3 className="text-xl font-semibold text-gray-900">Book Your {productName}</h3>
      <button onClick={onClose}  aria-label='closes' className="p-1 rounded-full hover:bg-gray-100">
        <FiX size={24} className="text-gray-600" />
      </button>
    </div>

    <div className="p-6 sm:p-8">
      <BookNow
        showTitle={false}
        productName={productName}
        bookingAmount={bookingAmount}
        defaultValues={defaultValues}
        colors={colors}
        models={models}
        states={states}
        citiesByState={citiesByState}
        onSubmit={onClose}
      />
    </div>
  </Modal>
);

/* --------------------------- IMAGE MODAL --------------------------- */
const ImageModal = ({ isOpen, onClose, image }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <img src={image} alt="Zoomed product view" className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
      <button className="absolute top-4 right-4 text-white text-3xl hover:opacity-80 transition" onClick={onClose}>
        <FiX size={32} />
      </button>
    </div>
  );
};

export default ProductDetails;
