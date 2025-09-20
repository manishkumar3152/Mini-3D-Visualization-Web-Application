import React, { useEffect, useState, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ✅ Component to load a GLB model
function ProductModel({ url }) {
  const gltf = useGLTF(url, true);
  return (
    <primitive
      object={gltf.scene}
      scale={[1.5, 1.5, 1.5]}
      position={[0, 0, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

export default function ProductViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`) // etch product by ID
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Viewer */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden h-[70vh]">
          <Canvas
            shadows
            camera={{ position: [0, 1.5, 4], fov: 50 }}
            gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
            style={{ background: "white" }}
          >
            <ambientLight intensity={0.3} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
            <spotLight
              position={[0, 5, 2]}
              angle={0.5}
              intensity={2.2}
              penumbra={0.4}
              castShadow
            />
            <Environment preset="studio" />

            <Suspense
              fallback={
                <Html center>
                  <div className="bg-white p-3 rounded shadow">Loading…</div>
                </Html>
              }
            >
              <ProductModel url={product.modelUrl} />
            </Suspense>

            <OrbitControls enablePan enableZoom enableRotate />
          </Canvas>
        </div>

        {/* Product Details */}
        <aside className="bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-2xl shadow-lg p-6 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-sm opacity-80">{product.category}</p>
            <p className="mt-2">{product.description}</p>
            <p className="mt-4 font-bold text-lg text-yellow-300">
              ₹{product.price}
            </p>
          </div>

          <div className="mt-6 flex gap-4">
            <button className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg shadow hover:scale-105 transition">
              Buy Now
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:scale-105 transition"
            >
              Back
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
