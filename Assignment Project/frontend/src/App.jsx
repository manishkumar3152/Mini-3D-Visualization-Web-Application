import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ProductGallery from "./pages/ProductGallery";
import ProductViewer from "./pages/ProductViewer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Fixed Header with Gradient */}
      <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wide">
            My<span className="text-yellow-300">3D</span>Shop
          </Link>

          {/* Nav */}
          <nav>
            <Link
              to="/"
              className="text-white font-medium hover:text-yellow-300 transition"
            >
              Gallery
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content (add padding-top so it’s not hidden under navbar) */}
      <main className="container mx-auto p-6 pt-24">
        <Routes>
          <Route path="/" element={<ProductGallery />} />
          <Route path="/product/:id" element={<ProductViewer />} />
        </Routes>
      </main>
    </div>
  );
}
