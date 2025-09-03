
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-12 text-center">
        School Management Portal
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Register School */}
        <Link
          href="/register"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-2xl shadow-lg font-semibold text-lg transition duration-200 text-center"
        >
          🏫 Register a School
        </Link>

        {/* Search Schools */}
        <Link
          href="/school-info"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 rounded-2xl shadow-lg font-semibold text-lg transition duration-200 text-center"
        >
          🔍 Search Schools
        </Link>
      </div>
    </div>
  );
}


