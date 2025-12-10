import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/customers/send-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result?.message || "Failed to send OTP");
        return setLoading(false);
      }

      toast.success("OTP sent to your email!");

      sessionStorage.setItem("resetEmail", data.email);

      setTimeout(() => {
        window.location.href = "/verify";
      }, 1200);
    } catch (e) {
      toast.error("Error sending OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-10 flex items-center justify-center font-sans relative isolate">
      {/* Background pattern same as Login */}
      <div
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{
          backgroundImage: `
          linear-gradient(45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%),
          linear-gradient(-45deg, transparent 49%, #e5e7eb 49%, #e5e7eb 51%, transparent 51%)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Forgot Password?
        </h2>

        <p className="text-center text-gray-600 mb-6 text-sm">
          No worries! Enter your email and we’ll send you an OTP.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email",
                },
              })}
              className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffb20e] focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            disabled={loading}
            className="w-full bg-[#ffb20e] text-black font-semibold py-2.5 rounded-lg hover:bg-[#e0a10d] transition disabled:opacity-70"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Remember password?{" "}
            <Link
              to="/login"
              className="text-[#ffb20e] font-medium hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
