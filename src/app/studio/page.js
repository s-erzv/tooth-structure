"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, RotateCcw, Menu, X } from "lucide-react";

import Scene from "../components/Scene.jsx";
import { anatomyData } from "../data/anatomyData.js";

export default function StudioPage() {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [tab, setTab] = useState("penjelasan");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedPart = anatomyData.find((p) => p.id === selectedPartId) || null;

  const clearSelection = () => {
    setSelectedPartId(null);
    setTab("penjelasan");
    setMobileMenuOpen(false);
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-blue-50 text-slate-700 font-sans overflow-hidden">
      <aside className={`${
        mobileMenuOpen ? "fixed inset-0 z-40 w-full" : "hidden"
      } md:flex md:static w-full md:w-1/3 lg:w-1/4 p-6 bg-white border-r border-blue-100 overflow-y-auto flex flex-col shadow-sm`}>
        
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
        >
          <X size={20} className="text-slate-600" />
        </button>

        <header className="mb-6 mt-8 md:mt-0">
          <Link href="/" className="flex items-center text-sm text-blue-600 hover:text-blue-700 mb-4 transition-colors font-medium">
            <ChevronLeft size={16} className="mr-1" />
            Kembali
          </Link>
          <h1
            onClick={clearSelection}
            className="text-3xl md:text-4xl font-extrabold cursor-pointer text-blue-900"
          >
            Studio Anatomi
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
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
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 border-2 ${
                  selectedPartId === part.id
                    ? "bg-blue-600 text-white border-blue-700 shadow-md font-bold"
                    : "bg-slate-50 hover:bg-blue-50 border-blue-200 text-slate-700 hover:border-blue-300"
                }`}
              >
                <div className="font-semibold text-sm md:text-base">{part.name}</div>
                <div className={`text-xs mt-1 ${selectedPartId === part.id ? 'text-blue-100' : 'text-slate-500'}`}>{part.title}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
        
        <section className="relative flex-1 min-h-[35vh] md:min-h-0 bg-gradient-to-br from-slate-100 to-slate-50">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden absolute top-4 left-4 z-30 p-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <Menu size={20} className="text-slate-700" />
          </button>
          <Scene selectedMeshName={selectedPart ? selectedPart.meshName : null} />
        </section>

        <aside className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 border-l border-blue-100 bg-white overflow-y-hidden flex flex-col shadow-sm">
          
          <div className="flex flex-col flex-grow h-full">
            <header className="mb-4 pb-4 border-b border-blue-100 shrink-0">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl md:text-2xl font-bold text-blue-900">
                  {selectedPart ? selectedPart.name : "Detail Informasi"}
                </h2>
                {selectedPart && (
                  <button
                    onClick={clearSelection}
                    className="flex items-center text-xs px-2 py-1 bg-blue-100 rounded text-blue-700 hover:bg-blue-200 transition-colors flex-shrink-0"
                  >
                    <RotateCcw size={12} className="mr-1.5"/>
                    Reset
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-2">
                {selectedPart ? selectedPart.title : "Pilih salah satu bagian untuk melihat info lengkapnya."}
              </p>
            </header>

            {selectedPart && (
              <nav className="flex gap-2 mb-4 flex-wrap shrink-0 pb-4 border-b border-blue-100 overflow-x-auto">
                {["penjelasan", "struktur", "fungsi", "penyakit", "perawatan"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-3 py-1.5 rounded-md text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                      tab === t ? "bg-blue-600 text-white shadow-sm" : "bg-blue-50 text-slate-700 hover:bg-blue-100"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </nav>
            )}

            <div className="flex-grow overflow-y-auto min-h-0 pr-2">
              <style>{`
                .hide-scrollbar {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .hide-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              <div className="hide-scrollbar h-full">
                {!selectedPart ? (
                  <div className="text-slate-400 flex items-center justify-center h-full">
                    <p className="text-center">Informasi akan ditampilkan di sini.</p>
                  </div>
                ) : (
                  <div className="prose prose-sm prose-blue max-w-none text-slate-700">
                    {tab === "penjelasan" && <p>{selectedPart.explanation}</p>}
                    {tab === "struktur" && <p>{selectedPart.structure}</p>}
                    {tab === "fungsi" && (
                      <ul className="list-disc list-inside space-y-2">
                        {selectedPart.functionList.map((f, i) => (
                          <li key={i} className="text-sm">{f}</li>
                        ))}
                      </ul>
                    )}
                    {tab === "penyakit" && (
                      <ul className="list-disc list-inside space-y-2">
                        {selectedPart.commonDiseases.map((d, i) => (
                          <li key={i} className="text-sm">
                            <strong className="text-slate-800">{d.name}:</strong> {d.desc}
                          </li>
                        ))}
                      </ul>
                    )}
                    {tab === "perawatan" && (
                      <ol className="list-decimal list-inside space-y-2">
                        {selectedPart.treatments.map((tmt, i) => (
                          <li key={i} className="text-sm">{tmt}</li>
                        ))}
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
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </main>
  );
}