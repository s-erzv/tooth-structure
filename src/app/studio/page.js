"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  RotateCcw,
  Sun,
  Moon,
  BookOpen,
  Activity,
  Stethoscope,
  Info,
  Layers,
  ArrowRight,
  Brain,
  Bone,
  Sticker
} from "lucide-react";
import { anatomyData } from "../data/anatomyData.js";

export default function StudioPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="animate-pulse font-bold text-blue-600">Memuat Studio...</div>
      </div>
    }>
      <StudioContent />
    </Suspense>
  );
}

function StudioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(initialCategory || null);
  const [selectedId, setSelectedId] = useState(null);
  const [tab, setTab] = useState("penjelasan");
  const [theme, setTheme] = useState("light");
  const [sheetHeight, setSheetHeight] = useState("min");

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const categories = [
    { id: "Mulut/Gigi", label: "Mulut & Gigi", icon: <Sticker size={24} />, desc: "Anatomi rongga mulut, struktur gigi, dan jaringan gingiva." },
    { id: "System Saraf", label: "Sistem Saraf", icon: <Brain size={24} />, desc: "Eksplorasi pusat kendali, jaringan saraf tepi, dan neuron." },
    { id: "Tubuh", label: "Anatomi Tubuh", icon: <Bone size={24} />, desc: "Struktur organ dan rangka tubuh manusia secara mendalam." },
  ];

  const filteredData = anatomyData.filter(item => item.category === selectedCategory);
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

  if (!selectedCategory) {
    return (
      <main className={`min-h-screen flex flex-col p-6 overflow-y-auto ${bgMain} ${txtMain}`}>
        <header className="mb-8">
          <Link href="/" className="flex items-center text-sm font-medium text-blue-500 mb-4">
            <ChevronLeft size={16} /> Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Pilih Spesialisasi</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Silakan pilih kategori anatomi untuk memulai eksplorasi model 3D interaktif.
          </p>
        </header>

        <div className="grid gap-4 max-w-2xl mx-auto w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-5 p-5 rounded-3xl border text-left transition-all active:scale-95 ${
                isDark ? 'bg-slate-900 border-slate-800 hover:border-blue-500' : 'bg-white border-slate-200 hover:border-blue-500 shadow-sm'
              }`}
            >
              <div className={`p-4 rounded-2xl ${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                {cat.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{cat.label}</h3>
                <p className="text-xs opacity-60 leading-snug mt-1">{cat.desc}</p>
              </div>
              <ArrowRight size={18} className="text-blue-500" />
            </button>
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className={`fixed inset-0 flex flex-col overflow-hidden ${bgMain} ${txtMain}`}>
      
      <header className={`z-50 border-b ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <button 
              onClick={() => { setSelectedCategory(null); setSelectedId(null); }}
              className="flex items-center text-[11px] font-bold text-blue-500 mb-0.5"
            >
              <ChevronLeft size={14} /> Ganti Kategori
            </button>
            <h1 className="text-base font-bold tracking-tight">{selectedCategory}</h1>
          </div>
          <button 
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`p-2 rounded-xl transition-colors ${isDark ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="border-t border-black/[0.03]">
          <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
            {filteredData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedId === item.id 
                    ? (isDark ? 'bg-teal-500 text-slate-950 shadow-lg' : 'bg-blue-600 text-white shadow-md')
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
            <iframe 
              src={selectedPart.embedUrl} 
              className="w-full h-full border-0" 
              allow="autoplay; fullscreen" 
              title={selectedPart.name}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-30">
              <Layers size={48} strokeWidth={1.5} className="mb-4" />
              <p className="text-sm font-medium">Pilih bagian anatomi untuk memuat model 3D</p>
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
              onClick={() => setSheetHeight(sheetHeight === "full" ? "half" : sheetHeight === "half" ? "full" : "half")}
            >
              <div className={`w-12 h-1.5 rounded-full ${isDark ? 'bg-slate-700' : 'bg-slate-300'} mb-2`} />
              <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest">
                {sheetHeight === "full" ? "Tutup" : "Lihat Detail"}
              </div>
            </div>

            <div className="px-6 py-2 shrink-0">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{selectedPart.name}</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{selectedPart.title}</p>
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
                  { id: "penjelasan", label: "Informasi", icon: <Info size={14} /> },
                  ...(selectedPart.subSections ? [{ id: "materi", label: "Materi", icon: <BookOpen size={14} /> }] : []),
                  { id: "struktur", label: "Struktur", icon: <Layers size={14} /> },
                  { id: "fungsi", label: "Fungsi", icon: <Activity size={14} /> },
                  { id: "penyakit", label: "Patologi", icon: <Stethoscope size={14} /> },
                  { id: "perawatan", label: "Terapi", icon: <RotateCcw size={14} /> },
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

                {tab === "struktur" && (
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-blue-50/50 border-blue-100'}`}>
                    <h3 className="font-bold text-xs mb-2 text-blue-500 uppercase tracking-wider">Komposisi Organ</h3>
                    <p className="text-[13px]">{selectedPart.structure}</p>
                  </div>
                )}

                {tab === "fungsi" && (
                  <div className="space-y-3">
                    {selectedPart.functionList.map((f, i) => (
                      <div key={i} className={`flex gap-4 p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-slate-50 border border-slate-200/50'}`}>
                        <span className="text-xl font-black text-blue-500/20 italic">{i+1}</span>
                        <p className="text-[12px] font-semibold self-center">{f}</p>
                      </div>
                    ))}
                  </div>
                )}

                {tab === "penyakit" && (
                  <div className="space-y-3">
                    {selectedPart.commonDiseases.map((d, i) => (
                      <div key={i} className={`p-4 rounded-2xl border ${isDark ? 'bg-red-500/5 border-red-500/20' : 'bg-red-50 border-red-100'}`}>
                        <h4 className="font-bold text-red-600 text-[12px] mb-1">{d.name}</h4>
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

                {tab === "materi" && selectedPart.subSections && (
                  <div className="space-y-6 animate-in fade-in">
                    {selectedPart.subSections.map((sec, i) => (
                      <div key={i} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-1 bg-teal-500 rounded-full" />
                          <h3 className="font-bold text-xs tracking-wider uppercase">{sec.title}</h3>
                        </div>
                        <div className="grid gap-3">
                          {sec.parts.map((p, j) => (
                            <div key={j} className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-slate-50 border-slate-200/60'}`}>
                              <h4 className="font-bold text-xs mb-1 text-blue-500">{p.name}</h4>
                              {p.structure && <p className="text-[11px] mb-2 leading-snug">{p.structure}</p>}
                              {p.function && <p className="text-[11px] opacity-90 italic">{p.function}</p>}
                            </div>
                          ))}
                        </div>
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