import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductGallery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products") //your backend API
      .then((res) => res.json())
      .then((data) => {
        const productsWithModels = data.map((p, i) => ({
          ...p,
          modelUrl: p.modelUrl || (i % 2 === 0 ? "/models/chair.glb" : "/models/lamp.glb"),
        }));
        setProducts(productsWithModels);
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((p) => (
        <div
          key={p._id} // MongoDB uses _id
          className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden transform hover:scale-105 flex flex-col"
        >
          {/* Product Image */}
          <div className="h-56 bg-white flex items-center justify-center">
            <img
              src={`http://localhost:5000${p.thumbnail}`}
              alt={p.name}
              className="object-contain h-full w-full p-6"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 text-white flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold truncate">{p.name}</h3>
              <p className="text-sm opacity-80">{p.category}</p>
              <p className="mt-2 text-xl font-bold text-yellow-300">
                ₹{p.price}
              </p>
            </div>

            {/* Read More Button */}
            <button
              onClick={() => navigate(`/product/${p._id}`, { state: p })}
              className="mt-4 px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:scale-105 transition"
            >
              Read More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
