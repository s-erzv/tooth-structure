'use client';

import Link from 'next/link';
import { BookOpen, Orbit, MousePointerClick, Menu, X, Sun, Moon, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Dynamic classes based on theme
  const mainBgClass = theme === 'light' ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-700' : 'bg-slate-900 text-slate-300';
  const headerClass = theme === 'light' ? 'bg-white/80' : 'bg-slate-900/80 border-b border-slate-700';
  const headerTitleClass = theme === 'light' ? 'text-blue-600' : 'text-sky-400';
  const heroBgClass = theme === 'light' ? 'bg-gradient-to-b from-white to-blue-50' : 'bg-slate-900';
  const headingClass = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const subHeadingClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const featureSectionBg = theme === 'light' ? 'bg-white' : 'bg-slate-900/50';
  const featureCardClass = theme === 'light' ? 'bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-200' : 'bg-slate-800 border border-slate-700';
  const featureIconClass = theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-sky-900/50 text-sky-400';
  const howToBgClass = theme === 'light' ? 'bg-gradient-to-b from-blue-50 to-white' : 'bg-slate-800/40';
  const howToBubbleClass = theme === 'light' ? 'bg-blue-600 text-white border-white' : 'bg-sky-500 text-slate-900 border-slate-800/50';
  const ctaBgClass = theme === 'light' ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-sky-800 to-sky-900';
  const quizCtaBgClass = theme === 'light' ? 'bg-blue-600' : 'bg-sky-900';
  const footerClass = theme === 'light' ? 'bg-white border-t border-slate-200' : 'bg-slate-900 border-t border-slate-700';
  const mobileMenuBg = theme === 'light' ? 'bg-white border-t border-slate-200' : 'bg-slate-800 border-t border-slate-700';
  const themeToggleClass = theme === 'light' ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-700 hover:bg-slate-600 text-slate-300';
  const navLinkClass = theme === 'light' ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400 hover:text-sky-400';

  return (
    <div className={`font-sans transition-colors duration-300 ${mainBgClass}`}>
      <header className={`backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-colors duration-300 ${headerClass}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className={`text-3xl font-bold transition-colors duration-300 ${headerTitleClass}`}>Dental Edu</h1>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/quiz" className={`font-semibold transition-colors ${navLinkClass}`}>
              Kuis
            </Link>
            <Link href="/studio" className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
              Mulai Belajar
            </Link>
            <button onClick={toggleTheme} className={`p-2 rounded-full transition-colors ${themeToggleClass}`}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 rounded-lg transition ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-700'}`}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden px-6 py-4 transition-colors duration-300 ${mobileMenuBg}`}>
            <Link href="/quiz" className={`block py-3 font-semibold mb-2 transition-colors ${navLinkClass}`}>
              Kuis Interaktif
            </Link>
            <Link href="/studio" className="block w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 text-center mb-4">
              Mulai Belajar
            </Link>
            <button onClick={toggleTheme} className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-full transition-colors ${themeToggleClass}`}>
              {theme === 'light' ? <><Moon size={20} /> Ganti ke Mode Gelap</> : <><Sun size={20} /> Ganti ke Mode Terang</>}
            </button>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className={`text-center py-20 md:py-32 px-6 transition-colors duration-300 ${heroBgClass}`}>
          <div className="container mx-auto">
            <h2 className={`text-4xl md:text-6xl font-extrabold mb-6 leading-tight transition-colors duration-300 ${headingClass}`}>
              Jelajahi Anatomi Mulut <br /> Secara <span className={theme === 'light' ? 'text-blue-600' : 'text-sky-400'}>Interaktif</span>
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 transition-colors duration-300 ${subHeadingClass}`}>
              Dental Edu adalah platform belajar visual untuk memahami setiap detail gigi dan rongga mulut melalui model 3D yang imersif dan informasi akurat.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/studio" className="inline-block bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Masuk ke Studio Belajar 3D
              </Link>
              <Link href="/quiz" className={`inline-block font-bold py-4 px-10 rounded-full border-2 transition duration-300 text-lg ${theme === 'light' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : 'border-sky-400 text-sky-400 hover:bg-sky-900/30'}`}>
                Coba Kuis
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`py-20 md:py-24 px-6 transition-colors duration-300 ${featureSectionBg}`}>
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${headingClass}`}>Fitur Unggulan Kami</h3>
              <p className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${subHeadingClass}`}>
                Kami menyediakan alat terbaik untuk membantumu belajar anatomi dengan lebih mudah dan menyenangkan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className={`p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featureCardClass}`}>
                <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <Orbit size={32} />
                </div>
                <h4 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${headingClass}`}>Visualisasi 3D Interaktif</h4>
                <p className={subHeadingClass}>
                  Putar, perbesar, dan jelajahi setiap bagian model 3D untuk melihat detail yang belum pernah kamu lihat sebelumnya.
                </p>
              </div>

              <div className={`p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featureCardClass}`}>
                <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <BookOpen size={32} />
                </div>
                <h4 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${headingClass}`}>Informasi Lengkap</h4>
                <p className={subHeadingClass}>
                  Setiap bagian dilengkapi penjelasan, fungsi, hingga info penyakit umum dan perawatannya dari sumber terpercaya.
                </p>
              </div>

              <div className={`p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${featureCardClass}`}>
                <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <ClipboardCheck size={32} />
                </div>
                <h4 className={`text-xl md:text-2xl font-bold mb-3 transition-colors duration-300 ${headingClass}`}>Kuis Evaluasi</h4>
                <p className={subHeadingClass}>
                  Uji pemahamanmu setelah belajar dengan paket soal pilihan ganda yang dirancang khusus untuk topik Biologi dan IPA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz CTA Section */}
        <section className={`py-20 transition-colors duration-300 ${quizCtaBgClass}`}>
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Uji Pengetahuanmu!</h3>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">Selesaikan kuis interaktif untuk memastikan kamu sudah menguasai materi anatomi gigi dan sistem saraf.</p>
            <Link href="/quiz" className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition duration-300 shadow-xl transform hover:scale-105">
              Mulai Kuis Sekarang
            </Link>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className={`py-20 md:py-24 px-6 transition-colors duration-300 ${howToBgClass}`}>
          <div className="container mx-auto">
            <h3 className={`text-3xl md:text-4xl font-bold mb-16 text-center transition-colors duration-300 ${headingClass}`}>Sangat Mudah untuk Memulai</h3>
            
            <div className="grid md:grid-cols-3 gap-12 relative max-w-4xl mx-auto">
              <div className="hidden md:block absolute top-8 left-0 w-full h-px">
                <svg width="100%" height="2" className="w-full">
                  <line x1="0" y1="1" x2="100%" y2="1" stroke={theme === 'light' ? '#bfdbfe' : '#334155'} strokeWidth="2" strokeDasharray="8 8"/>
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 shadow-lg transition-colors duration-300 ${howToBubbleClass}`}>1</div>
                <h4 className={`text-xl font-bold mb-3 transition-colors duration-300 ${headingClass}`}>Masuk Studio</h4>
                <p className={subHeadingClass}>Klik tombol "Mulai Belajar" untuk memuat ruang belajar 3D yang interaktif.</p>
              </div>

              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 shadow-lg transition-colors duration-300 ${howToBubbleClass}`}>2</div>
                <h4 className={`text-xl font-bold mb-3 transition-colors duration-300 ${headingClass}`}>Pelajari Materi</h4>
                <p className={subHeadingClass}>Gunakan model 3D dan baca penjelasan detail untuk memahami struktur anatomi.</p>
              </div>

              <div className="relative z-10 text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 border-4 shadow-lg transition-colors duration-300 ${howToBubbleClass}`}>3</div>
                <h4 className={`text-xl font-bold mb-3 transition-colors duration-300 ${headingClass}`}>Selesaikan Kuis</h4>
                <p className={subHeadingClass}>Ukur kemampuanmu dengan kuis pilihan ganda untuk mendapatkan hasil evaluasi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className={`py-20 md:py-24 px-6 transition-colors duration-300 ${featureSectionBg}`}>
          <div className="container mx-auto">
            <div className={`p-12 md:p-16 rounded-2xl shadow-xl transition-colors duration-300 ${ctaBgClass}`}>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">Siap Belajar Anatomi Gigi?</h3>
              
              <div className="text-center">
                <Link href="/studio" className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition duration-300 ease-in-out text-lg shadow-md hover:shadow-lg transform hover:scale-105">
                  Buka Studio Sekarang
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`py-8 transition-colors duration-300 ${footerClass}`}>
        <div className={`container mx-auto px-6 text-center transition-colors duration-300 ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
          <p>&copy; {new Date().getFullYear()} Dental Edu.</p>
        </div>
      </footer>
    </div>
  );
}