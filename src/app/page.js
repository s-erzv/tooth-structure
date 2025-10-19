"use client";

import React, { useState } from "react";
import Scene from "./components/Scene";
import { anatomyData } from "./data/anatomyData";

export default function Home() {
  const [selectedPartId, setSelectedPartId] = useState(null);
  const [tab, setTab] = useState("penjelasan"); // default tab
  const selectedPart = anatomyData.find((p) => p.id === selectedPartId) || null;

  const clearSelection = () => {
    setSelectedPartId(null);
    setTab("penjelasan");
  };

  return (
    <main className="w-full h-screen flex flex-col md:flex-row bg-slate-900 text-slate-100">
      {/* LEFT / CONTROLS */}
      <aside className="w-full md:w-1/3 lg:w-1/4 p-6 bg-gradient-to-b from-slate-800/80 to-slate-900/60 border-r border-slate-700 overflow-y-auto">
        <header className="mb-6">
          <h1
            onClick={clearSelection}
            className="text-3xl md:text-4xl font-playfair font-extrabold cursor-pointer text-emerald-300"
          >
            Anatomi Mulut
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Klik bagian untuk melihat detail — ada penjelasan, struktur, fungsi, penyakit, dan penyembuhan.
          </p>
        </header>

        <div className="mb-4">
          <input
            type="search"
            placeholder="Cari: lidah, gigi, amandel..."
            onChange={(e) => {
              const q = e.target.value.toLowerCase().trim();
              if (!q) return;
              const found = anatomyData.find(
                (p) => p.name.toLowerCase().includes(q) || p.title.toLowerCase().includes(q)
              );
              if (found) setSelectedPartId(found.id);
            }}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {anatomyData.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedPartId(part.id)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                selectedPartId === part.id
                  ? "bg-emerald-500/90 text-slate-900 border-emerald-300 shadow-lg"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700"
              }`}
            >
              <div className="font-semibold text-sm md:text-base">{part.name}</div>
              <div className="text-xs text-slate-400 mt-1">{part.title}</div>
            </button>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="text-sm text-slate-300 mb-2">Quick info</h3>
          <div className="text-xs text-slate-400 space-y-2">
            <p>
              • Klik judul di atas untuk reset. • Gunakan mouse / touch untuk putar/zoom 3D. • Nama mesh pada
              data harus cocok dengan node di file GLTF.
            </p>
          </div>
        </div>

        <footer className="mt-8 text-xs text-slate-500">
          Built with ❤️ — tweak colors & mesh names sesuai modelmu.
        </footer>
      </aside>

      {/* CENTER / 3D */}
      <section className="relative flex-1 min-h-[380px] md:min-h-0">
        <div className="absolute inset-0 md:inset-y-6 md:mx-6 lg:mx-12 rounded-lg overflow-hidden bg-gradient-to-b from-slate-900/40 to-transparent border border-slate-800 z-10">
          {/* overlay header small when mobile */}
          <div className="md:hidden p-3 bg-slate-900/60 flex items-center justify-between border-b border-slate-800">
            <div className="text-sm font-medium text-emerald-200">
              {selectedPart ? selectedPart.name : "Model 3D"}
            </div>
            <div className="text-xs text-slate-400">{selectedPart ? selectedPart.title : "Pilih bagian"}</div>
          </div>

          <div className="w-full h-[60vh] md:h-full">
            <Scene selectedMeshName={selectedPart ? selectedPart.meshName : null} />
          </div>
        </div>
      </section>

      {/* RIGHT / INFO PANEL */}
      <aside className="w-full md:w-1/3 lg:w-1/4 p-6 border-l border-slate-800 bg-slate-900/80 overflow-y-auto">
        <div className="max-w-xl mx-auto">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-emerald-300">
                {selectedPart ? selectedPart.name : "Pilih bagian"}
              </h2>
              <button
                onClick={clearSelection}
                className="text-xs px-2 py-1 bg-slate-800/60 rounded text-slate-300 hover:bg-slate-700"
              >
                Reset
              </button>
            </div>
            <p className="text-sm text-slate-400 mt-2">{selectedPart ? selectedPart.title : "Info singkat muncul di sini."}</p>
          </div>

          {/* Tabs */}
          <div className="mb-4">
            <nav className="flex gap-2">
              {["penjelasan", "struktur", "fungsi", "penyakit", "penyembuhan"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-2 rounded-md text-sm ${
                    tab === t ? "bg-emerald-500 text-slate-900 font-semibold" : "bg-slate-800 text-slate-300"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* CONTENT */}
          <div className="p-4 rounded-lg bg-slate-800 border border-slate-700 min-h-[220px]">
            {!selectedPart ? (
              <div className="text-slate-400">
                Pilih bagian di kiri atau di model 3D untuk melihat detail lengkap. Gunakan tab di atas untuk
                ganti kategori.
              </div>
            ) : (
              <div className="space-y-3 text-sm text-slate-200">
                {tab === "penjelasan" && <p>{selectedPart.explanation}</p>}
                {tab === "struktur" && (
                  <div>
                    <h4 className="font-semibold text-emerald-200 mb-2">Struktur</h4>
                    <p className="text-slate-300">{selectedPart.structure}</p>
                  </div>
                )}
                {tab === "fungsi" && (
                  <div>
                    <h4 className="font-semibold text-emerald-200 mb-2">Fungsi</h4>
                    <ul className="list-disc ml-5 text-slate-300">
                      {selectedPart.functionList.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {tab === "penyakit" && (
                  <div>
                    <h4 className="font-semibold text-emerald-200 mb-2">Penyakit Umum</h4>
                    <ul className="text-slate-300 list-disc ml-5">
                      {selectedPart.commonDiseases.map((d, i) => (
                        <li key={i}>
                          <span className="font-medium text-amber-300">{d.name}</span> — <span>{d.desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {tab === "penyembuhan" && (
                  <div>
                    <h4 className="font-semibold text-emerald-200 mb-2">Penanganan / Penyembuhan</h4>
                    <ol className="list-decimal ml-5 text-slate-300">
                      {selectedPart.treatments.map((tmt, i) => (
                        <li key={i}>{tmt}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* small source / tips */}
          <div className="mt-4 text-xs text-slate-500">
            Tips: ini bukan pengganti konsultasi dokter. Untuk kondisi serius, konsultasi ke tenaga medis.
          </div>
        </div>
      </aside>
    </main>
  );
}
