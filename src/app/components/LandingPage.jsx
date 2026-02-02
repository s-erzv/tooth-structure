'use client';

import Link from 'next/link';
import { 
  BookOpen, 
  Orbit, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ClipboardCheck, 
  ChevronDown, 
  Sticker, 
  Brain, 
  Bone,
  Play,
  ArrowRight, Youtube
} from 'lucide-react';
import { useState } from 'react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studioMenuOpen, setStudioMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const studioCategories = [
    { id: "Mulut/Gigi", label: "Mulut & Gigi", icon: <Sticker size={18} />, href: "/studio?category=Mulut/Gigi" },
    { id: "System Saraf", label: "Sistem Saraf", icon: <Brain size={18} />, href: "/studio?category=System Saraf" },
    { id: "Tubuh", label: "Anatomi Tubuh", icon: <Bone size={18} />, href: "/studio?category=Tubuh" },
  ];

  const previewVideos = [
    { 
      id: 1, 
      title: "Sistem Pencernaan: Perjalanan Makanan", 
      duration: "01:44", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770018186/1_dfrjxe.mp4",
      description: "Proses pencernaan manusia secara berurutan mulai dari mulut, lambung, hingga penyerapan nutrisi di usus halus dan pembuangan sisa makanan."
    },
    { 
      id: 2, 
      title: "Sistem Pernapasan & Sirkulasi", 
      duration: "03:45", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770020407/freecompress-2_ttnott.mp4",
      description: "Kolaborasi paru-paru dan jantung dalam mengambil oksigen dan memompa darah ke seluruh tubuh untuk menjaga kelangsungan hidup."
    },
    { 
      id: 3, 
      title: "Anatomi Gigi & Sistem Peringatan Nelly", 
      duration: "01:46", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770018750/3_y0qhyn.mp4",
      description: "Membedah struktur email, dentin, dan pulpa gigi, serta peran sel saraf Nelly sebagai sistem peringatan rasa sakit di dalam gigi."
    },
    { 
      id: 4, 
      title: "Sistem Saraf Pusat: Pusat Kendali", 
      duration: "02:01", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770018205/4_ccepqg.mp4",
      description: "Menjelaskan peran otak (serebrum, serebelum, batang otak) sebagai pengatur pikiran dan gerakan melalui sumsum tulang belakang."
    }
  ];

  const mainBgClass = theme === 'light' ? 'bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-700' : 'bg-slate-900 text-slate-300';
  const headerClass = theme === 'light' ? 'bg-white/80' : 'bg-slate-900/80 border-b border-slate-700';
  const headerTitleClass = theme === 'light' ? 'text-blue-600' : 'text-sky-400';
  const heroBgClass = theme === 'light' ? 'bg-gradient-to-b from-white to-blue-50' : 'bg-slate-900';
  const headingClass = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const subHeadingClass = theme === 'light' ? 'text-slate-600' : 'text-slate-400';
  const featureSectionBg = theme === 'light' ? 'bg-white' : 'bg-slate-900/50';
  const featureCardClass = theme === 'light' ? 'bg-gradient-to-br from-slate-50 to-blue-50 border border-blue-200' : 'bg-slate-800 border border-slate-700';
  const featureIconClass = theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-sky-900/50 text-sky-400';
  const footerClass = theme === 'light' ? 'bg-white border-t border-slate-200' : 'bg-slate-900 border-t border-slate-700';
  const navLinkClass = theme === 'light' ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400 hover:text-sky-400';
  const dropdownClass = theme === 'light' ? 'bg-white border border-slate-200 shadow-xl' : 'bg-slate-800 border border-slate-700 shadow-2xl text-slate-200';

  return (
    <div className={`font-sans transition-colors duration-300 ${mainBgClass}`}>
      <header className={`backdrop-blur-lg shadow-sm sticky top-0 z-50 transition-colors duration-300 ${headerClass}`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className={`text-3xl font-bold transition-colors duration-300 ${headerTitleClass}`}>Anatomy Edu</Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/quiz" className={`font-semibold transition-colors ${navLinkClass}`}>
              Kuis Interaktif
            </Link>

            <div className="relative group">
              <button 
                onMouseEnter={() => setStudioMenuOpen(true)}
                className={`flex items-center gap-1 font-semibold transition-colors ${navLinkClass}`}
              >
                Studio Belajar <ChevronDown size={16} />
              </button>
              
              {studioMenuOpen && (
                <div 
                  onMouseLeave={() => setStudioMenuOpen(false)}
                  className={`absolute top-full -left-4 w-56 mt-2 py-3 rounded-2xl animate-in fade-in zoom-in-95 duration-200 ${dropdownClass}`}
                >
                  {studioCategories.map((cat) => (
                    <Link 
                      key={cat.id} 
                      href={cat.href}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${theme === 'light' ? 'hover:bg-blue-50 text-slate-700' : 'hover:bg-slate-700 text-slate-200'}`}
                    >
                      <span className="text-blue-500">{cat.icon}</span>
                      <span className="text-sm font-bold">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/studio" className="bg-blue-600 text-white font-bold py-2.5 px-7 rounded-full hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg">
              Mulai Eksplorasi
            </Link>

            <button onClick={toggleTheme} className={`p-2.5 rounded-full transition-colors ${theme === 'light' ? 'bg-slate-100 text-slate-600' : 'bg-slate-700 text-yellow-400'}`}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`md:hidden p-2 rounded-lg transition ${theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-700'}`}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden px-6 py-6 border-t ${theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-800 border-slate-700'}`}>
             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Menu Utama</p>
             <Link href="/quiz" className={`block py-3 font-bold border-b transition-colors ${theme === 'light' ? 'border-slate-50' : 'border-slate-700'}`}>
              Kuis Interaktif
            </Link>
            
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-6 mb-2">Spesialisasi Studio</p>
            <div className="grid gap-2">
              {studioCategories.map((cat) => (
                <Link key={cat.id} href={cat.href} className={`flex items-center gap-3 py-3 font-semibold ${navLinkClass}`}>
                  {cat.icon} {cat.label}
                </Link>
              ))}
            </div>

            <button onClick={toggleTheme} className={`w-full mt-6 flex items-center justify-center gap-2 font-bold py-4 rounded-2xl transition-colors ${theme === 'light' ? 'bg-slate-100' : 'bg-slate-700'}`}>
              {theme === 'light' ? <><Moon size={20} /> Mode Gelap</> : <><Sun size={20} /> Mode Terang</>}
            </button>
          </div>
        )}
      </header>

      <main>
        <section className={`text-center py-20 md:py-32 px-6 transition-colors duration-300 ${heroBgClass}`}>
          <div className="container mx-auto">
            <h2 className={`text-4xl md:text-6xl font-extrabold mb-6 leading-tight transition-colors duration-300 ${headingClass}`}>
              Eksplorasi Anatomi <br /> Secara <span className={theme === 'light' ? 'text-blue-600' : 'text-sky-400'}>Interaktif</span>
            </h2>
            <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-12 transition-colors duration-300 ${subHeadingClass}`}>
              Pelajari detail struktur tubuh manusia melalui visualisasi 3D imersif. Dari rongga mulut hingga jaringan saraf pusat, semua tersedia dalam satu platform.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {studioCategories.map((cat) => (
                <Link 
                  key={cat.id} 
                  href={cat.href}
                  className={`group flex flex-col items-center p-6 rounded-3xl transition-all hover:scale-105 shadow-sm hover:shadow-xl border ${
                    theme === 'light' ? 'bg-white border-slate-100' : 'bg-slate-800 border-slate-700'
                  }`}
                >
                  <div className={`mb-4 p-4 rounded-2xl transition-colors ${theme === 'light' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : 'bg-slate-700 text-sky-400 group-hover:bg-sky-500 group-hover:text-slate-900'}`}>
                    {cat.icon}
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wide">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-20 md:py-24 px-6 transition-colors duration-300 ${featureSectionBg}`}>
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${headingClass}`}>Fitur Unggulan</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              
              <div className={`p-8 rounded-3xl transition-all duration-300 ${featureCardClass}`}>
                <div className={`rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <Orbit size={32} />
                </div>
                <h4 className={`text-xl font-bold mb-3 ${headingClass}`}>Visualisasi 3D</h4>
                <p className={`text-sm leading-relaxed ${subHeadingClass}`}>
                  Interaksi penuh dengan model anatomi. Putar, zoom, dan identifikasi setiap lapisan organ secara mendalam.
                </p>
              </div>

              <div className={`p-8 rounded-3xl transition-all duration-300 ${featureCardClass}`}>
                <div className={`rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <BookOpen size={32} />
                </div>
                <h4 className={`text-xl font-bold mb-3 ${headingClass}`}>Kurikulum Terpadu</h4>
                <p className={`text-sm leading-relaxed ${subHeadingClass}`}>
                  Materi disusun secara sistematis meliputi penjelasan, fungsi, patologi, hingga langkah perawatan medis.
                </p>
              </div>

              <div className={`p-8 rounded-3xl transition-all duration-300 ${featureCardClass}`}>
                <div className={`rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <Youtube size={32} /> {/* Pastikan sudah import { Youtube } from 'lucide-react' */}
                </div>
                <h4 className={`text-xl font-bold mb-3 ${headingClass}`}>Video Belajar</h4>
                <p className={`text-sm leading-relaxed ${subHeadingClass}`}>
                  Simulasi visual materi anatomi melalui video berkualitas tinggi untuk pemahaman yang lebih nyata.
                </p>
              </div>

              {/* Evaluasi Kuis */}
              <div className={`p-8 rounded-3xl transition-all duration-300 ${featureCardClass}`}>
                <div className={`rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 transition-colors duration-300 ${featureIconClass}`}>
                  <ClipboardCheck size={32} />
                </div>
                <h4 className={`text-xl font-bold mb-3 ${headingClass}`}>Evaluasi Kuis</h4>
                <p className={`text-sm leading-relaxed ${subHeadingClass}`}>
                  Uji pemahamanmu setelah belajar dengan paket soal yang dirancang sesuai standar kompetensi pendidikan.
                </p>
              </div>

            </div>
          </div>
        </section>

        <section className={`py-20 px-6 ${theme === 'light' ? 'bg-slate-100/50' : 'bg-slate-800/20'}`}>
          <div className="container mx-auto">
            <div className="flex justify-between flex-wrap items-end mb-12">
              <div>
                <h3 className={`text-3xl font-bold mb-2 ${headingClass}`}>Materi Visual</h3>
                <p className={subHeadingClass}>Lihat simulasi anatomi dalam video berkualitas tinggi.</p>
              </div>
              <Link href="/learning" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                Lihat Semua Video <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {previewVideos.map((vid) => (
                <div key={vid.id} className={`rounded-2xl overflow-hidden shadow-md group ${featureCardClass}`}>
                  <div className="aspect-video bg-black relative">
                    <video className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" muted loop onMouseEnter={e => e.target.play()} onMouseLeave={e => {e.target.pause(); e.target.currentTime = 0;}}>
                      <source src={vid.path} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Play size={24} className="text-white opacity-80" fill="white" />
                    </div>
                  </div>
                  <div className="p-4 font-bold text-sm">{vid.title}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`py-16 ${theme === 'light' ? 'bg-blue-600' : 'bg-sky-900'}`}>
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Siap Menguji Pengetahuanmu?</h3>
            <Link href="/quiz" className="inline-block bg-white text-blue-600 font-bold py-4 px-12 rounded-full hover:shadow-2xl transition duration-300 transform hover:-translate-y-1">
              Mulai Kuis Sekarang
            </Link>
          </div>
        </section>
      </main>

      <footer className={`py-12 transition-colors duration-300 ${footerClass}`}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <h4 className={`text-xl font-bold ${headerTitleClass}`}>Anatomy Edu</h4>
            <p className="text-xs mt-1 opacity-50 italic">Pusat Belajar Anatomi Digital & Interaktif</p>
          </div>
          <p className={`text-sm ${theme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
            &copy; {new Date().getFullYear()} Anatomy Edu. 
          </p>
        </div>
      </footer>
    </div>
  );
}