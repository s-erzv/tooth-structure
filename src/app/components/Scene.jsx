"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/test2/scene.gltf");

function DynamicModel({ gltfPath, highlightedMeshName }) {
  const { scene } = useGLTF(gltfPath);
  const originalMaterials = useRef({});
  const highlightRef = useRef(null); 

  useEffect(() => {
    originalMaterials.current = {}; 
    scene.traverse((child) => {
      if (child.isMesh) {
        originalMaterials.current[child.name] = child.material.clone();
      }
    });
  }, [scene]); 

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && originalMaterials.current[child.name]) {
        child.material = originalMaterials.current[child.name];
      }
    });

    if (highlightedMeshName) {
      const selectedObject = scene.getObjectByName(highlightedMeshName);
      if (selectedObject && selectedObject.isMesh) {
        const highlightMaterial = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#34d399"),  
          emissive: new THREE.Color("#0ea5a4"),
          emissiveIntensity: 0.6,
          roughness: 0.4,
          toneMapped: false,
        });
        selectedObject.material = highlightMaterial;
        highlightRef.current = selectedObject;  
      } else {
        highlightRef.current = null;  
      }
    } else {
      highlightRef.current = null;  
    }
  }, [highlightedMeshName, scene]);

  useFrame((state) => {
    if (highlightRef.current) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(time * 3) * 0.025;
      highlightRef.current.scale.set(scale, scale, scale);
    }
  });

  return <primitive object={scene} position={[0, -1.2, 0]} scale={1.5} />;
}


export default function Scene({ selectedPart }) {
  const modelPath = selectedPart ? selectedPart.file : "/models/test2/scene.gltf";
  const meshNameToHighlight = selectedPart ? selectedPart.meshName : null;

  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 10], fov: 28 }}
      shadows
    >
      <ambientLight intensity={0.7} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
      
      <Suspense fallback={null}>
        <Environment preset="city" />
        
        <DynamicModel
          key={modelPath}
          gltfPath={modelPath}
          highlightedMeshName={meshNameToHighlight}
        />
      </Suspense>

      <OrbitControls
        enablePan={true}
        minDistance={4}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </Canvas>
  );
}