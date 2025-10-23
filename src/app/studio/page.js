"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sun,
  Moon,
} from "lucide-react";
import { anatomyData } from "../data/anatomyData.js";

const defaultModelPath = "/models/test1/scene.gltf";

export default function StudioPage() {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [tab, setTab] = useState("penjelasan");
  const [theme, setTheme] = useState("light");

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const tabsContainerRef = useRef(null);

  const checkScroll = () => {
    const el = tabsContainerRef.current;
    if (el) {
      const isScrollable = el.scrollWidth > el.clientWidth;
      
      const atStart = el.scrollLeft <= 10;
      
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

      setShowLeftArrow(isScrollable && !atStart);
      setShowRightArrow(isScrollable && !atEnd);
    }
  };

  useEffect(() => {
    const el = tabsContainerRef.current;
    if (el) {
      const timer = setTimeout(checkScroll, 100);

      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);

      return () => {
        clearTimeout(timer);
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [anatomyData]); 

  const scrollTabs = (direction) => {
    const el = tabsContainerRef.current;
    if (el) {
      const scrollAmount =
        direction === "left" ? -el.clientWidth * 0.8 : el.clientWidth * 0.8;
      el.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const selectedPart = anatomyData.find((p) => p.id === selectedPartId) || null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const clearSelection = () => {
    setSelectedPartId(null);
    setTab("penjelasan");
  };

  const mainClass = theme === 'light' 
    ? "bg-gradient-to-br from-slate-50 to-blue-50 text-slate-700"
    : "bg-gradient-to-br from-slate-900 to-blue-900 text-slate-300";

  const headerClass = theme === 'light'
    ? "bg-white border-b border-blue-100"
    : "bg-slate-800/80 backdrop-blur-sm border-b border-slate-700";

  const sceneBgClass = theme === 'light'
    ? "bg-gradient-to-br from-slate-100 to-slate-50"
    : "bg-slate-900";

  const detailBgClass = theme === 'light'
    ? "bg-white border-l border-blue-100 shadow-sm"
    : "bg-slate-800/80 backdrop-blur-sm border-l border-slate-700";

  const headerTextClass = theme === 'light' ? "text-blue-900" : "text-teal-300";
  const subheaderTextClass = theme === 'light' ? "text-slate-500" : "text-slate-400";
  const linkClass = theme === 'light' ? "text-blue-600 hover:text-blue-700" : "text-sky-400 hover:underline";

  const tabButtonClass = (partId) => {
    if (selectedPartId === partId) {
      return theme === 'light'
        ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
        : "border-b-2 border-teal-400 text-teal-400 font-semibold";
    }
    return theme === 'light'
      ? "border-b-2 border-transparent text-slate-600 hover:text-slate-800 hover:border-blue-300"
      : "border-b-2 border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600";
  };

  const subtabButtonClass = (t) => {
    if (tab === t) {
      return theme === 'light'
        ? "bg-blue-600 text-white shadow-sm"
        : "bg-teal-500 text-slate-900";
    }
    return theme === 'light'
      ? "bg-blue-50 text-slate-700 hover:bg-blue-100"
      : "bg-slate-700 text-slate-300 hover:bg-slate-600";
  };

  const resetBtnClass = theme === 'light' 
    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
    : "bg-slate-700 text-slate-300 hover:bg-slate-600";

  const proseClass = theme === 'light' ? "prose-blue text-slate-700" : "prose-invert";

  return (
    <main className={`w-full h-screen flex flex-col font-sans overflow-hidden transition-colors duration-300 ${mainClass}`}>
      <header className={`${headerClass} transition-colors duration-300`}> 
        <div className={`px-6 py-4 flex items-center justify-between border-b transition-colors duration-300 ${theme === 'light' ? 'border-blue-100' : 'border-slate-700'}`}>
          <div>
            <Link href="/" className={`flex items-center text-sm mb-2 transition-colors font-medium ${linkClass}`}>
              <ChevronLeft size={16} className="mr-1" />
              Kembali
            </Link>
            <h1 onClick={clearSelection} className={`text-3xl font-extrabold cursor-pointer ${headerTextClass}`}>
              Studio Anatomi
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-slate-700 hover:bg-slate-600'}`}
          >
            {theme === 'light' ? <Moon size={20} className="text-blue-800" /> : <Sun size={20} className="text-yellow-400" />}
          </button>
        </div>

        <div className="relative">
          
          {showLeftArrow && (
            <button
              onClick={() => scrollTabs("left")}
              className={`absolute left-0 top-0 bottom-0 z-10 flex items-center px-1 md:px-2 transition-opacity duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-r from-white via-white/90 to-transparent text-blue-700"
                  : "bg-gradient-to-r from-slate-800/90 via-slate-800/80 to-transparent backdrop-blur-sm text-sky-300"
              }`}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div
            ref={tabsContainerRef}
            className={`px-6 py-4 overflow-x-auto transition-colors duration-300 scroll-smooth ${theme === 'light' ? 'border-b border-blue-100' : 'border-b border-slate-700'}
                      scrollbar-hide`}  
          >
            <div className="flex gap-2">
              {anatomyData.map((part) => (
                <button
                  key={part.id}
                  onClick={() => {
                    setSelectedPartId(part.id);
                    setTab("penjelasan");
                  }}
                  className={`px-4 py-2 text-sm md:text-base transition-all whitespace-nowrap ${tabButtonClass(part.id)}`}
                >
                  {part.name}
                </button>
              ))}
            </div>
          </div>
          
          {showRightArrow && (
            <button
              onClick={() => scrollTabs("right")}
              className={`absolute right-0 top-0 bottom-0 z-10 flex items-center px-1 md:px-2 transition-opacity duration-300 ${
                theme === "light"
                  ? "bg-gradient-to-l from-white via-white/90 to-transparent text-blue-700"
                  : "bg-gradient-to-l from-slate-800/90 via-slate-800/80 to-transparent backdrop-blur-sm text-sky-300"
              }`}
            >
              <ChevronRight size={24} />
            </button>
          )}

        </div>

      </header>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden gap-0">
      
        <section className={`flex-1 min-h-[40vh] md:min-h-0 transition-colors duration-300 ${sceneBgClass}`}>
          {selectedPart ? (
            <iframe
              key={selectedPart.id}  
              src={selectedPart.embedUrl}  
              allow="camera; microphone; gyroscope; accelerometer; magnetometer; xr-spatial-tracking; fullscreen"
              allowFullScreen
              className="w-full h-full border-0"  
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center p-4 ${subheaderTextClass}`}>
              <p className="text-center">
                Pilih salah satu bagian untuk menampilkan model 3D dan detail.
              </p>
            </div>
          )}
        </section>

        <aside className={`w-full md:w-1/3 lg:w-1/3 p-4 md:p-6 overflow-hidden flex flex-col transition-colors duration-300 ${detailBgClass}`}>
          <div className="flex flex-col flex-grow h-full">
            <header className={`mb-4 pb-4 shrink-0 transition-colors duration-300 ${theme === 'light' ? 'border-b border-blue-100' : 'border-b border-slate-700'}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold ${headerTextClass}`}>
                    {selectedPart ? selectedPart.name : "Detail Informasi"}
                  </h2>
                  <p className={`text-sm mt-2 ${subheaderTextClass}`}>
                    {selectedPart ? selectedPart.title : "Pilih salah satu bagian untuk melihat info lengkapnya."}
                  </p>
                </div>
                {selectedPart && (
                  <button 
                    onClick={clearSelection} 
                    className={`flex items-center text-xs px-2 py-1 rounded transition-colors flex-shrink-0 ${resetBtnClass}`}
                  >
                    <RotateCcw size={12} className="mr-1.5"/>
                    Reset
                  </button>
                )}
              </div>
            </header>

            {selectedPart && (
              <nav className={`flex gap-2 mb-4 flex-wrap shrink-0 pb-4 overflow-x-auto transition-colors duration-300 ${theme === 'light' ? 'border-b border-blue-100' : 'border-b border-slate-700'}`}>
                {["penjelasan", "struktur", "fungsi", "penyakit", "perawatan"].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => setTab(t)} 
                    className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${subtabButtonClass(t)}`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </nav>
            )}

            <div className="flex-grow overflow-y-auto min-h-0 pr-2">
              <div className="h-full">
                {!selectedPart ? (
                  <div className={`flex items-center justify-center h-full ${subheaderTextClass}`}>
                    <p className="text-center">Pilih sebuah bagian untuk menampilkan model 3D dan detail.</p>
                  </div>
                ) : (
                  <div className={`prose prose-sm max-w-none ${proseClass}`}>
                    {tab === "penjelasan" && <p>{selectedPart.explanation}</p>}
                    {tab === "struktur" && <p>{selectedPart.structure}</p>}
                    {tab === "fungsi" && (
                      <ul>
                        {selectedPart.functionList.map((f, i) => (<li key={i}>{f}</li>))}
                      </ul>
                    )}
                    {tab === "penyakit" && (
                      <ul>
                        {selectedPart.commonDiseases.map((d, i) => (<li key={i}><strong>{d.name}:</strong> {d.desc}</li>))}
                      </ul>
                    )}
                    {tab === "perawatan" && (
                      <ol>
                        {selectedPart.treatments.map((tmt, i) => (<li key={i}>{tmt}</li>))}
                      </ol>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}