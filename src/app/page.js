"use client";

import React, { useRef } from 'react';
// Make sure these import paths are correct for your project structure
import Scene from "./components/Scene"; 
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/SectionTwo";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Home() {
  const container = useRef();
  const sceneGroupRef = useRef(); 

  useGSAP(() => {
    // Add this check!
    if (sceneGroupRef.current) {
      gsap.to(sceneGroupRef.current.position, {
        x: 2,
        y: 0.5,
        duration: 2,
        scrollTrigger: {
          trigger: "#sectionTwo",
          start: "top 80%",
          end: "center center",
          scrub: 1,
        }
      });

      gsap.to(sceneGroupRef.current.rotation, {
        y: Math.PI * 0.5,
        duration: 2,
        scrollTrigger: {
          trigger: "#sectionTwo",
          start: "top 80%",
          end: "center center",
          scrub: 1,
        }
      }, "<"); 
    }
    
  }, { scope: container }); 

  return (
    <main ref={container} className="w-full relative">
      <div className="fixed top-0 left-0 w-screen h-screen z-10">
        <Scene groupRef={sceneGroupRef} /> 
      </div>

      <div className="relative z-20">
        <SectionOne />
        <SectionTwo />
        <div className="h-screen bg-transparent"></div>
      </div>
    </main>
  );
}