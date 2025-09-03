"use client";

import { useForm } from "react-hook-form";

export default function SchoolForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("schoolName", data.schoolName);
    formData.append("schoolAddress", data.schoolAddress);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("email", data.email);
    formData.append("contact", data.contact);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    const res = await fetch("/api/schools", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("School registered successfully!");
    } else {
      alert("Error saving school data");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-white p-6 mt-5 mb-5 md:p-10 rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600">
          School Registration Form
        </h2>

        {/* School Name */}
        <div className="grid gap-1">
          <label className="font-semibold">School Name</label>
          <input
            placeholder="Enter School Name"
            className="border px-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("schoolName", { required: "School name is required" })}
          />
          {errors.schoolName && (
            <p className="text-red-500 text-sm">{errors.schoolName.message}</p>
          )}
        </div>

        {/* School Address */}
        <div className="grid gap-1">
          <label className="font-semibold">School Address</label>
          <input
            placeholder="Enter School Address"
            className="border px-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("schoolAddress", {
              required: "Address is required",
            })}
          />
          {errors.schoolAddress && (
            <p className="text-red-500 text-sm">
              {errors.schoolAddress.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="grid gap-1">
          <label className="font-semibold">City</label>
          <input
            placeholder="Enter City"
            className="border px-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div className="grid gap-1">
          <label className="font-semibold">State</label>
          <input
            placeholder="Enter State"
            className="border px-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid gap-1">
          <label className="font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            className="border px-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* ✅ Contact Number */}
        <div className="grid gap-1">
          <label className="font-semibold">Contact Number</label>
          <input
            type="tel"
            placeholder="Enter Contact Number"
            className="border px-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit phone number",
              },
            })}
          />
          {errors.contact && (
            <p className="text-red-500 text-sm">{errors.contact.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="grid gap-1">
          <label className="font-semibold">Upload School Image</label>
          <input
            type="file"
            className="border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("image", { required: "School image is required" })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
