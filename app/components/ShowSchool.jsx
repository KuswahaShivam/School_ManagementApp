"use client";

import { useEffect, useState } from "react";

export default function SchoolInfo() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch schools from API
  const fetchSchools = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/schools?search=${query}`);
      const data = await res.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
    setLoading(false);
  };

  // Load all schools initially
  useEffect(() => {
    fetchSchools();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSchools(search);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-12 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-8">
        Search Schools
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter school name or city..."
          className="w-full md:w-1/2 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-200"
        >
          Search
        </button>
      </form>

      {/* Loading Spinner */}
      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading schools...</p>
      )}

      {/* Schools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.length > 0 ? (
          schools.map((school) => (
            <div
              key={school.id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={school.image}
                alt={school.schoolName}
                className="w-full h-48 object-cover"
              />

              {/* Details */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  {school.schoolName}
                </h2>
                <p className="text-gray-700 text-sm mb-1">
                  📍 {school.schoolAddress}, {school.city}, {school.state}
                </p>
                <p className="text-gray-600 text-sm mb-1">✉️ {school.email}</p>
                <p className="text-gray-600 text-sm">📞 {school.contact}</p>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500 text-lg col-span-3">
              No schools found
            </p>
          )
        )}
      </div>
    </div>
  );
}
