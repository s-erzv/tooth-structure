"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw, Menu, X, Sun, Moon } from "lucide-react";

import Scene from "../components/Scene.jsx";
import { anatomyData } from "../data/anatomyData.js";

const defaultModelPath = "/models/test1/scene.gltf";

export default function StudioPage() {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [tab, setTab] = useState("penjelasan");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const selectedPart = anatomyData.find((p) => p.id === selectedPartId) || null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const clearSelection = () => {
    setSelectedPartId(null);
    setTab("penjelasan");
    setMobileMenuOpen(false);
  };
  
  const mainClass = theme === 'light' 
    ? "bg-gradient-to-br from-slate-50 to-blue-50 text-slate-700"
    : "bg-gradient-to-br from-slate-900 to-blue-900 text-slate-300";

  const asideLeftClass = theme === 'light'
    ? "bg-white border-r border-blue-100 shadow-sm"
    : "bg-slate-800/80 backdrop-blur-sm border-r border-slate-700";
    
  const asideRightClass = theme === 'light'
    ? "bg-white border-l border-blue-100 shadow-sm"
    : "bg-slate-800/80 backdrop-blur-sm border-l border-slate-700";
    
  const sceneBgClass = theme === 'light'
    ? "bg-gradient-to-br from-slate-100 to-slate-50"
    : "bg-slate-900";

  const headerTextClass = theme === 'light' ? "text-blue-900" : "text-teal-300";
  const subheaderTextClass = theme === 'light' ? "text-slate-500" : "text-slate-400";
  const linkClass = theme === 'light' ? "text-blue-600 hover:text-blue-700" : "text-sky-400 hover:underline";
  
  const buttonClass = (partId) => {
    if (selectedPartId === partId) {
      return theme === 'light'
        ? "bg-blue-600 text-white border-blue-700 shadow-md font-bold"
        : "bg-teal-500 text-slate-900 border-teal-300 shadow-lg font-bold";
    }
    return theme === 'light'
      ? "bg-slate-50 hover:bg-blue-50 border-blue-200 text-slate-700 hover:border-blue-300"
      : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300";
  };
  
  const buttonTitleClass = (partId) => {
    if (selectedPartId === partId) {
      return theme === 'light' ? 'text-blue-100' : 'text-slate-800';
    }
    return theme === 'light' ? 'text-slate-500' : 'text-slate-400';
  };
  
  const resetBtnClass = theme === 'light' 
    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
    : "bg-slate-700 text-slate-300 hover:bg-slate-600";

  const tabClass = (t) => {
    if (tab === t) {
      return theme === 'light'
        ? "bg-blue-600 text-white shadow-sm"
        : "bg-teal-500 text-slate-900";
    }
    return theme === 'light'
      ? "bg-blue-50 text-slate-700 hover:bg-blue-100"
      : "bg-slate-700 text-slate-300 hover:bg-slate-600";
  };
  
  const proseClass = theme === 'light' ? "prose-blue text-slate-700" : "prose-invert";

  return (
    <main className={`w-full h-screen flex flex-col md:flex-row font-sans overflow-hidden transition-colors duration-300 ${mainClass}`}>
      <aside className={`${
        mobileMenuOpen ? "fixed inset-0 z-50 w-full" : "hidden"
      } md:flex md:static w-full md:w-1/3 lg:w-1/4 p-6 overflow-y-auto flex flex-col transition-colors duration-300 ${asideLeftClass}`}>
        
        <button
          onClick={() => setMobileMenuOpen(false)}
          className={`md:hidden absolute top-4 right-4 p-2 rounded-lg ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-700'}`}
        >
          <X size={20} className={theme === 'light' ? 'text-slate-600' : 'text-slate-300'} />
        </button>

        <header className="mb-6 mt-8 md:mt-0">
          <Link href="/" className={`flex items-center text-sm mb-4 transition-colors font-medium ${linkClass}`}>
            <ChevronLeft size={16} className="mr-1" />
            Kembali
          </Link>
          <h1 onClick={clearSelection} className={`text-3xl md:text-4xl font-extrabold cursor-pointer ${headerTextClass}`}>
            Studio Anatomi
          </h1>
          <p className={`mt-2 text-sm ${subheaderTextClass}`}>
            Pilih bagian untuk melihat detail anatomi.
          </p>
        </header>

        <div className="flex-grow">
          <div className="grid grid-cols-2 gap-3">
            {anatomyData.map((part) => (
              <button
                key={part.id}
                onClick={() => {
                  setSelectedPartId(part.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 border-2 ${buttonClass(part.id)}`}
              >
                <div className="font-semibold text-sm md:text-base">{part.name}</div>
                <div className={`text-xs mt-1 ${buttonTitleClass(part.id)}`}>{part.title}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
            <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
                {theme === 'light' ? <Moon size={20} className="text-blue-800" /> : <Sun size={20} className="text-yellow-400" />}
            </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        <section className={`relative flex-1 min-h-[35vh] md:min-h-0 transition-colors duration-300 ${sceneBgClass}`}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden absolute top-4 left-4 z-30 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow ${theme === 'light' ? 'bg-white' : 'bg-white/10 backdrop-blur-sm'}`}
          >
            <Menu size={20} className={theme === 'light' ? "text-slate-700" : "text-slate-200"} />
          </button>
          <Scene modelPath={selectedPart ? selectedPart.modelPath : null} theme={theme} />
        </section>

        <aside className={`w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 overflow-y-hidden flex flex-col transition-colors duration-300 ${asideRightClass}`}>
          <div className="flex flex-col flex-grow h-full">
            <header className={`mb-4 pb-4 shrink-0 transition-colors duration-300 ${theme === 'light' ? 'border-b border-blue-100' : 'border-b border-slate-700'}`}>
              <div className="flex items-center justify-between gap-3">
                <h2 className={`text-xl md:text-2xl font-bold ${headerTextClass}`}>
                  {selectedPart ? selectedPart.name : "Detail Informasi"}
                </h2>
                {selectedPart && (
                  <button onClick={clearSelection} className={`flex items-center text-xs px-2 py-1 rounded transition-colors flex-shrink-0 ${resetBtnClass}`}>
                    <RotateCcw size={12} className="mr-1.5"/>
                    Reset
                  </button>
                )}
              </div>
              <p className={`text-sm mt-2 ${subheaderTextClass}`}>
                {selectedPart ? selectedPart.title : "Pilih salah satu bagian untuk melihat info lengkapnya."}
              </p>
            </header>

            {selectedPart && (
              <nav className={`flex gap-2 mb-4 flex-wrap shrink-0 pb-4 overflow-x-auto transition-colors duration-300 ${theme === 'light' ? 'border-b border-blue-100' : 'border-b border-slate-700'}`}>
                {["penjelasan", "struktur", "fungsi", "penyakit", "perawatan"].map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${tabClass(t)}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </nav>
            )}

            <div className="flex-grow overflow-y-auto min-h-0 pr-2">
              <div className="h-full">
                {!selectedPart ? (
                  <div className={`flex items-center justify-center h-full ${subheaderTextClass}`}>
                    <p className="text-center">Pilih sebuah bagian untuk menampilkan model 3D.</p>
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

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </main>
  );
}