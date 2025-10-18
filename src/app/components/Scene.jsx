"use client";

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/models/scene.gltf');
  return <primitive object={scene} scale={1.5} />; 
}

export default function Scene({ groupRef }) { 
  const controlsRef = useRef();

  useEffect(() => {
    if(controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  }, []);

  return (
    <Canvas camera={{ position: [-2, 0.5, 8], fov: 30 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        
        <group ref={groupRef} position={[-2, -0.5, 0]}> 
          <Model />
        </group>
        
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          minDistance={4}
          maxDistance={15}
        />
      </Suspense>
    </Canvas>
  );
}