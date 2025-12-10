import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("resetEmail");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [counter, setCounter] = useState(30);
  const [resendActive, setResendActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendActive(true);
    }
  }, [counter]);

  // Resend OTP
  const resendOtp = async () => {
    setResendActive(false);
    setCounter(30);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      toast.success("OTP resent to your email!");
    } catch {
      toast.error("Error resending OTP");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/customers/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: data.otp }),
      });

      const result = await res.json();

      if (!res.ok) {
        setLoading(false);
        return toast.error(result.message);
      }

      sessionStorage.setItem("resetOTP", data.otp);

      toast.success("OTP Verified!");
      setTimeout(() => navigate("/reset"), 800);
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 relative isolate">
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

      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 text-center">Verify OTP</h2>
        <p className="text-sm text-gray-600 text-center mb-5">
          OTP sent to <b>{email}</b>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="w-full border rounded-lg px-4 py-3 text-center text-lg tracking-widest focus:ring-2 focus:ring-[#ffb20e] outline-none"
            {...register("otp", {
              required: true,
              minLength: 6,
              maxLength: 6,
            })}
          />
          {errors.otp && <p className="text-red-500 text-sm text-center">Enter valid 6-digit OTP</p>}

          <button className="w-full bg-[#ffb20e] text-black font-semibold py-2.5 rounded-lg hover:bg-[#e0a10d] transition disabled:opacity-70" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center text-sm">
            {!resendActive ? (
              <span>Resend OTP in <b>{counter}s</b></span>
            ) : (
              <button type="button" onClick={resendOtp} className="text-[#ffb20e] font-semibold">
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
