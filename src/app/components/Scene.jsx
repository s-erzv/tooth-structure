"use client";

import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, FlyControls, Center } from "@react-three/drei";
import * as THREE from "three";

function Model({ selectedMeshName }) {
  const { scene } = useGLTF("/models/test1/scene.gltf");

  const defaultMaterial = new THREE.MeshStandardMaterial({
    color: "#e0e0e0",
    metalness: 0.5,
    roughness: 0.6,
  });

  const selectedMaterial = new THREE.MeshStandardMaterial({
    color: "#00ff88", 
    metalness: 0.6,
    roughness: 0.4,
    emissive: "#00ff00", 
    emissiveIntensity: 0.5,
  });

  const modelScene = useMemo(() => scene.clone(), [scene]);

  modelScene.traverse((child) => {
    if (child.isMesh) {
      child.material =
        child.name === selectedMeshName ? selectedMaterial : defaultMaterial;
    }
  });

  return <primitive object={modelScene} scale={1.2} />;  
}


export default function Scene({ selectedMeshName }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={1} />
      
      <Suspense fallback={<Html center><h2>Memuat model...</h2></Html>}>
       <Center>
          <Model selectedMeshName={selectedMeshName} />
        </Center>
      </Suspense>

      <OrbitControls 
        enablePan={true} 
        enableZoom={true} 
        minDistance={1} 
        maxDistance={1}
      />

      {/* <FlyControls 
        dragToLook={true}  
        movementSpeed={0.5}  
        rollSpeed={0.5}   
      /> */}
    </Canvas>
  );
}