"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sun,
  Moon,
  BookOpen,
  Activity,
  Stethoscope,
  Info,
  Layers,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { anatomyData } from "../data/anatomyData.js";

export default function StudioPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [tab, setTab] = useState("penjelasan");
  const [theme, setTheme] = useState("light");
  
  const [sheetHeight, setSheetHeight] = useState("min");

  const tabsRef = useRef(null);

  const selectedPart = anatomyData.find((p) => p.id === selectedId) || null;

  const handleSelect = (id) => {
    setSelectedId(id);
    setTab("penjelasan");
    setSheetHeight("half");  
  };

  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-slate-950" : "bg-slate-50";
  const bgCard = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const txtMain = isDark ? "text-slate-200" : "text-slate-800";

  const getSheetHeightClass = () => {
    if (sheetHeight === "min") return "h-[120px]";
    if (sheetHeight === "half") return "h-[45vh]";
    return "h-[85vh]";
  };

  return (
    <main className={`fixed inset-0 flex flex-col overflow-hidden ${bgMain} ${txtMain} selection:bg-blue-100`}>
      
      <header className={`z-50 border-b ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center text-[11px] font-medium text-blue-500 mb-0.5">
              <ChevronLeft size={14} /> Kembali
            </Link>
            <h1 className="text-lg font-bold tracking-tight">Studio Anatomi</h1>
          </div>
          <button 
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="border-t border-black/[0.03]">
          <div ref={tabsRef} className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
            {anatomyData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedId === item.id 
                    ? (isDark ? 'bg-teal-500 text-slate-950' : 'bg-blue-600 text-white shadow-md')
                    : (isDark ? 'bg-slate-800 text-slate-400' : 'bg-white border border-slate-200 text-slate-600')
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
        
        <div className="flex-1 bg-slate-200 dark:bg-black/40">
          {selectedPart ? (
            <iframe src={selectedPart.embedUrl} className="w-full h-full border-0" allow="autoplay; fullscreen" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-30">
              <Layers size={48} strokeWidth={1.5} className="mb-4" />
              <p className="text-sm font-medium">Pilih bagian anatomi untuk melihat model 3D</p>
            </div>
          )}
        </div>

        {selectedPart && (
          <aside 
            className={`
              fixed md:relative bottom-0 left-0 right-0 z-[60]
              ${bgCard} border-t md:border-t-0 md:border-l
              transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
              flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.1)]
              ${getSheetHeightClass()}
              md:h-full md:w-[400px] lg:w-[450px]
              rounded-t-[32px] md:rounded-t-none
            `}
          >
            <div 
              className="md:hidden flex flex-col items-center pt-3 pb-2 cursor-pointer touch-none"
              style={{ touchAction: 'none' }}  
              onClick={() => setSheetHeight(sheetHeight === "full" ? "half" : sheetHeight === "half" ? "full" : "half")}
            >
              <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'} mb-2`} />
              <div className="text-[10px] font-bold opacity-30 tracking-tighter">
                {sheetHeight === "full" ? "Tutup Sedikit" : "Lihat Detail"}
              </div>
            </div>

            <div className="px-6 py-2 shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedPart.name}</h2>
                  <p className="text-[10px] font-semibold text-blue-500">{selectedPart.title}</p>
                </div>
                <button 
                  onClick={() => setSelectedId(null)}
                  className={`p-2 rounded-xl ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}
                >
                  <RotateCcw size={16} />
                </button>
              </div>

              <nav className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { id: "penjelasan", label: "Info", icon: <Info size={14} /> },
                  ...(selectedPart.subSections ? [{ id: "materi", label: "Materi", icon: <BookOpen size={14} /> }] : []),
                  { id: "struktur", label: "Struktur", icon: <Layers size={14} /> },
                  { id: "fungsi", label: "Fungsi", icon: <Activity size={14} /> },
                  { id: "penyakit", label: "Penyakit", icon: <Stethoscope size={14} /> },
                  { id: "perawatan", label: "Rawat", icon: <RotateCcw size={14} /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => { setTab(t.id); setSheetHeight("full"); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                      tab === t.id 
                        ? (isDark ? 'bg-teal-500 text-slate-900' : 'bg-blue-600 text-white shadow-sm')
                        : (isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600')
                    }`}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 pb-12">
              <div className="text-sm leading-relaxed space-y-4">
                
                {tab === "penjelasan" && (
                  <div className="animate-in fade-in duration-500">
                    <p>{selectedPart.explanation}</p>
                  </div>
                )}

                {tab === "materi" && selectedPart.subSections && (
                  <div className="space-y-6 animate-in fade-in">
                    {selectedPart.subSections.map((sec, i) => (
                      <div key={i} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-1 bg-teal-500 rounded-full" />
                          <h3 className="font-bold text-xs tracking-wider">{sec.title}</h3>
                        </div>
                        {sec.content && <p className="text-xs opacity-70 italic">{sec.content}</p>}
                        <div className="grid gap-3">
                          {sec.parts.map((p, j) => (
                            <div key={j} className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200/60'}`}>
                              <h4 className="font-bold text-xs mb-1 text-blue-500">{p.name}</h4>
                              {p.location && <p className="text-[10px] opacity-50 mb-2 font-bold tracking-tighter">Lokasi: {p.location}</p>}
                              {p.structure && <p className="text-[11px] mb-2 leading-snug">{p.structure}</p>}
                              {p.function && <p className="text-[11px] opacity-90">{p.function}</p>}
                              {p.details && (
                                <ul className="mt-3 space-y-2">
                                  {p.details.map((d, k) => (
                                    <li key={k} className="flex gap-2 text-[11px] opacity-80">
                                      <span className="text-teal-500">•</span> {d}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "struktur" && (
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-blue-50/50 border-blue-100'} animate-in zoom-in-95`}>
                    <p className="text-xs md:text-sm leading-relaxed">{selectedPart.structure}</p>
                  </div>
                )}

                {tab === "fungsi" && (
                  <div className="space-y-3">
                    {selectedPart.functionList.map((f, i) => (
                      <div key={i} className={`flex gap-4 p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-100/50 border border-slate-200/50'}`}>
                        <span className="text-xl font-bold text-blue-500 italic">{i+1}</span>
                        <p className="text-xs font-medium self-center">{f}</p>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "penyakit" && (
                  <div className="space-y-3">
                    {selectedPart.commonDiseases.map((d, i) => (
                      <div key={i} className={`p-4 rounded-2xl border ${isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
                        <h4 className="font-bold text-red-500 text-xs mb-1">{d.name}</h4>
                        <p className="text-[11px] leading-relaxed opacity-80">{d.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "perawatan" && (
                  <div className="grid gap-2">
                    {selectedPart.treatments.map((t, i) => (
                      <div key={i} className={`flex gap-3 p-3 rounded-xl ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'} transition-colors`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                        <p className="text-[11px] font-medium">{t}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}