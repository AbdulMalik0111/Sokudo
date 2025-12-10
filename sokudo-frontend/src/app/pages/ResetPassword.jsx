import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

const CreatePassword = () => {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("resetEmail");
  const otp = sessionStorage.getItem("resetOTP");

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const password = watch("newPassword");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/customers/reset-password-otp`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
          newPassword: data.newPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setLoading(false);
        return toast.error(result.message);
      }

      toast.success("Password Reset Successful!");
      sessionStorage.clear();

      setTimeout(() => navigate("/login"), 1000);
    } catch {
      toast.error("Error resetting password");
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

      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-200 shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-5">Create New Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">New Password</label>
            <input
              type="password"
              {...register("newPassword", { required: true, minLength: 8 })}
              placeholder="Enter new password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffb20e]"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">Min 8 characters required</p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Confirm password"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#ffb20e]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            className="w-full bg-[#ffb20e] text-black py-2.5 rounded-lg font-semibold hover:bg-[#e0a10d] transition disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePassword;
