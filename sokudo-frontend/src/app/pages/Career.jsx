import React, { useState } from "react";
import Banner from "/car.webp";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Career = () => {
  const [cvName, setCvName] = useState("No file chosen");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  //  ONLY UI purpose
  const handleCvChange = (e) => {
    const file = e.target.files?.[0];
    setCvName(file ? file.name : "No file chosen");
  };

  const onSubmit = async (data) => {
    try {
      toast.loading("Submitting...");

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.contact);
      formData.append("position", "");
      formData.append("message", data.message);

      //  CORRECT FILE ACCESS (FileList → File)
      const fileObj = data.cv?.[0];
      if (fileObj) {
        formData.append("cv", fileObj);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/career`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.dismiss();

      if (res.data.success) {
         navigate("/thankyou", {
      state: {
        formType: "Career",
        message: `Your Application has been submitted successfully. Our team will contact you shortly.`,
      },});
        toast.success("🎉 Application submitted successfully!");
        reset();

        setCvName("No file chosen");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Submission failed");
    }
  };

  return (
    <div
         className='min-h-screen bg-white text-gray-800'
         style={{
            backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(75, 85, 99, 0.08) 20px, rgba(75, 85, 99, 0.08) 21px),
        repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(107, 114, 128, 0.06) 30px, rgba(107, 114, 128, 0.06) 31px),
        repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(55, 65, 81, 0.05) 40px, rgba(55, 65, 81, 0.05) 41px),
        repeating-linear-gradient(150deg, transparent, transparent 35px, rgba(31, 41, 55, 0.04) 35px, rgba(31, 41, 55, 0.04) 36px)
      `,
         }}
      >
         {/* Top Banner */}
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
                 <h1 className="heading !text-white">Career</h1>
                  <h1 className="heading !text-white text-4xl md:text-5xl font-bold leading-tight">
            Build Your Career with <span className="text-[#ffb200]">SOKUDO</span>
          </h1>
          <p className="mt-4 text-sm md:text-base text-gray-200">
            Join a fast-growing EV brand that is shaping the future of
            sustainable mobility. Work with passionate teams, real impact and
            endless learning.
          </p>
               </div>
             </section>

              <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-lg mb-2">Growth & Learning</h3>
            <p className="text-sm text-gray-500">
              Work on real products, new launches and campaigns. Learn fast,
              take ownership early and grow with the brand.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-lg mb-2">Open Culture</h3>
            <p className="text-sm text-gray-500">
              Flat hierarchy, open communication and a culture that respects
              ideas more than titles.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-lg mb-2">EV Future</h3>
            <p className="text-sm text-gray-500">
              Be part of India&apos;s electric mobility wave and contribute to a
              greener tomorrow.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        <div className="relative border-2 border-gray-200 rounded-3xl p-10 bg-gradient-to-br from-white via-white to-gray-50 shadow-xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#ffb200]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Be a Part of <span className="text-[#ffb200]">SOKUDO</span>
              </h2>
              <p className="text-gray-500 text-sm">Join our team and accelerate your career</p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              noValidate
            >
              {/* NAME & CONTACT - Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-[#ffb200] focus:ring-2 focus:ring-[#ffb200]/20 outline-none transition-all"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* CONTACT */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("contact", {
                      required: "Contact number required",
                    })}
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-[#ffb200] focus:ring-2 focus:ring-[#ffb200]/20 outline-none transition-all"
                    placeholder="Enter your phone number"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {errors.contact.message}
                    </p>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email required",
                  })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-[#ffb200] focus:ring-2 focus:ring-[#ffb200]/20 outline-none transition-all"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* CV */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload CV <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    {...register("cv", { required: "CV is required" })}
                    onChange={handleCvChange}
                    className="w-full rounded-xl border-2 border-dashed border-gray-300 px-4 py-4 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#ffb200] file:text-white hover:file:bg-[#ffa000] file:cursor-pointer focus:border-[#ffb200] focus:ring-2 focus:ring-[#ffb200]/20 outline-none transition-all group-hover:border-[#ffb200] group-hover:bg-[#ffb200]/5"
                  />
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-[#ffb200]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Selected: {cvName}</span>
                    <span className="text-gray-400">•</span>
                    <span>PDF, DOC, DOCX (max 10MB)</span>
                  </div>
                </div>
                {errors.cv && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.cv.message}
                  </p>
                )}
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter / Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  {...register("message", { required: "Message required" })}
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-[#ffb200] focus:ring-2 focus:ring-[#ffb200]/20 outline-none transition-all resize-none"
                  placeholder="Tell us why you'd be a great fit for SOKUDO..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {errors.message.message}
                  </p>
                )}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-4 pt-4">
                <button
                  type="reset"
                  className="flex-1 border-2 border-gray-300 text-gray-700 rounded-full py-3.5 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all"
                  onClick={() => {
                    reset();
                    setCvName("No file chosen");
                  }}
                >
                  RESET
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#ffb200] to-[#ffa000] text-white rounded-full py-3.5 font-semibold hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  SUBMIT APPLICATION
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;