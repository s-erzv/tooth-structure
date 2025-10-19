"use client";

import React, { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Center, Bounds } from "@react-three/drei";
import { BoxSelect } from "lucide-react";

function Model({ path }) {
  const { scene } = useGLTF(path);
  const modelScene = useMemo(() => scene.clone(), [scene]);
  return <primitive object={modelScene} />;
}

function Placeholder({ theme }) {
  const isDarkMode = theme === 'dark';
  return (
    <Html center>
      <div className={`
        flex flex-col items-center justify-center
        w-64 h-48 p-6 rounded-2xl
        transition-colors duration-300
        ${isDarkMode 
          ? 'bg-slate-800/50 backdrop-blur-md text-slate-400 border border-slate-700' 
          : 'bg-white/50 backdrop-blur-md text-slate-500 border border-slate-200'}
      `}>
        <BoxSelect size={48} className={`mb-4 ${isDarkMode ? 'text-teal-400' : 'text-blue-500'}`} />
        <h2 className={`font-bold text-lg text-center ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
          Studio Anatomi
        </h2>
        <p className="text-sm text-center mt-1">
          Pilih bagian di panel samping untuk memuat model 3D.
        </p>
      </div>
    </Html>
  );
}

export default function Scene({ modelPath, theme }) {
  const isDarkMode = theme === 'dark';

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      {isDarkMode ? (
        <>
          <ambientLight intensity={1.0} />
          <directionalLight position={[10, 10, 5]} intensity={2.0} />
          <directionalLight position={[-10, -5, -5]} intensity={1.0} />
        </>
      ) : (
        <>
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -5, -5]} intensity={0.5} />
        </>
      )}
      
      <Suspense fallback={
        <Html center>
          <h2 className={isDarkMode ? "text-slate-200" : "text-slate-800"}>
            Memuat model 3D...
          </h2>
        </Html>
      }>
        {modelPath ? (
          // <Bounds fit clip observe margin={1.2}>
            <Center>
              <Model key={modelPath} path={modelPath} />
            </Center>
          //</Bounds>
        ) : (
          <Placeholder theme={theme} />
        )}
      </Suspense>

      <OrbitControls 
        makeDefault
        enablePan={true} 
        enableZoom={true} 
        minDistance={0} 
        maxDistance={2}
        autoRotate={!modelPath}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}