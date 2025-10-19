'use client';

import Link from 'next/link';
import { BookOpen, Orbit, MousePointerClick, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-700 font-sans">
      <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-600">Dental Edu</h1>
          
          <Link href="/studio" className="hidden md:inline-block bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
            Mulai Belajar
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4">
            <Link href="/studio" className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 text-center">
              Mulai Belajar
            </Link>
          </div>
        )}
      </header>

      <main>
        <section className="text-center py-20 md:py-32 px-6 bg-gradient-to-b from-white to-blue-50">
          <div className="container mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              Jelajahi Anatomi Mulut <br /> Secara <span className="text-blue-600">Interaktif</span>
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 text-slate-600">
              Dental Edu adalah platform belajar visual untuk memahami setiap detail gigi dan rongga mulut melalui model 3D yang imersif dan informasi akurat.
            </p>
            <Link href="/studio" className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Masuk ke Studio Belajar 3D
            </Link>
          </div>
        </section>

        <section id="features" className="py-20 md:py-24 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Fitur Unggulan Kami</h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Kami menyediakan alat terbaik untuk membantumu belajar anatomi dengan lebih mudah dan menyenangkan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Orbit size={32} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Visualisasi 3D Interaktif</h4>
                <p className="text-slate-600">
                  Putar, perbesar, dan klik setiap bagian model 3D untuk melihat detail yang belum pernah kamu lihat sebelumnya.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={32} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Informasi Lengkap & Akurat</h4>
                <p className="text-slate-600">
                  Setiap bagian dilengkapi dengan penjelasan, fungsi, hingga info penyakit umum dan perawatannya dari sumber terpercaya.
                </p>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <MousePointerClick size={32} />
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Mode Belajar Terfokus</h4>
                <p className="text-slate-600">
                  Pilih bagian spesifik yang ingin dipelajari. Model akan menyorot bagian tersebut agar kamu bisa fokus tanpa distraksi.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 md:py-24 px-6 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-16 text-center text-slate-900">Sangat Mudah untuk Memulai</h3>
            
            <div className="grid md:grid-cols-3 gap-12 relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-8 left-0 w-full h-px">
                <svg width="100%" height="2" className="w-full">
                  <line x1="0" y1="1" x2="100%" y2="1" stroke="#bfdbfe" strokeWidth="2" strokeDasharray="8 8"/>
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white shadow-lg">
                  1
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">Masuk Studio</h4>
                <p className="text-slate-600">
                  Klik tombol "Masuk ke Studio Belajar" untuk memuat model 3D interaktif.
                </p>
              </div>

              <div className="relative z-10 text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white shadow-lg">
                  2
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">Pilih Bagian</h4>
                <p className="text-slate-600">
                  Gunakan menu atau klik langsung pada model untuk memilih bagian yang ingin dipelajari.
                </p>
              </div>

              <div className="relative z-10 text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 border-white shadow-lg">
                  3
                </div>
                <h4 className="text-xl font-bold mb-3 text-slate-900">Eksplorasi Informasi</h4>
                <p className="text-slate-600">
                  Baca penjelasan, fungsi, dan informasi lainnya yang muncul di panel samping.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-12 md:p-16 rounded-2xl shadow-xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Siap Menjadi Ahli Anatomi?</h3>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8 text-center">
                Tinggalkan cara belajar yang membosankan. Mulai petualangan visualmu di dunia anatomi gigi sekarang juga!
              </p>
              <div className="text-center">
                <Link href="/studio" className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition duration-300 ease-in-out text-lg shadow-md hover:shadow-lg transform hover:scale-105">
                  Buka Studio Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Dental Edu.</p>
        </div>
      </footer>
    </div>
  );
}