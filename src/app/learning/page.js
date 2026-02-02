'use client';

import { useState, useRef } from 'react'; // Tambahkan useRef
import Link from 'next/link';
import { 
  ChevronLeft, 
  Play, 
  Youtube, 
  Clock, 
  LayoutGrid, 
  Sun, 
  Moon,
  Info
} from 'lucide-react';

export default function LearningPage() {
  const [theme, setTheme] = useState('dark'); 
  const videoRef = useRef(null); // Ref untuk player utama
  
  const [activeVideo, setActiveVideo] = useState({ 
    id: 1, 
    title: "Sistem Pencernaan: Perjalanan Makanan", 
    path: "https://lh3.googleusercontent.com/u/0/d/15BWS81rqFvgYEx9ppi4RaEOTtvkHMgBz"
  });

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const allVideos = [
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
    },
    { 
      id: 5, 
      title: "Sistem Saraf Tepi: Koneksi Tubuh", 
      duration: "02:05", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770021640/freecompress-5_wzkat5.mp4",
      description: "Bagaimana sinyal otak menyebar ke seluruh tubuh untuk merasakan sentuhan, suhu, dan tekanan hingga ke ujung jari."
    },
    { 
      id: 6, 
      title: "Gerak Refleks: Perlindungan Otomatis", 
      duration: "01:30", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770018146/6_gcizfi.mp4",
      description: "Mekanisme respons super cepat sumsum tulang belakang yang melindungi tubuh dari bahaya instan sebelum diproses oleh otak."
    },
    { 
      id: 7, 
      title: "Menjelajahi Alam Semesta Tubuh", 
      duration: "01:46", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770018152/7_lz8s0t.mp4",
      description: "Gambaran umum anatomi manusia mulai dari pusat kendali otak, paru-paru, jantung, hingga sistem pembersihan oleh hati."
    },
    { 
      id: 8, 
      title: "Sistem Saraf & Keajaiban Refleks", 
      duration: "02:18", 
      path: "https://res.cloudinary.com/dxnmgxfaf/video/upload/v1770018178/8_ncg1hp.mp4",
      description: "Fokus pada komunikasi tubuh melalui saraf, mulai dari pulpa gigi hingga aksi otomatis tubuh dalam melindungi diri."
    },
  ];

  // Fungsi aman untuk mengganti video
  const handleVideoChange = (vid) => {
    setActiveVideo(vid);
    
    // Memberikan waktu kecil bagi DOM untuk memperbarui source video
    setTimeout(() => {
        if (videoRef.current) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Play interrupted or prevented:", error);
                });
            }
        }
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bgClass = theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100';
  const cardClass = theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/50 border-slate-800 shadow-2xl';
  const subTextClass = theme === 'light' ? 'text-slate-500' : 'text-slate-400';
  const headerBtnClass = theme === 'light' ? 'bg-slate-200 hover:bg-slate-300 text-slate-700' : 'bg-slate-900 hover:bg-slate-800 text-slate-200';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgClass}`}>
      <div className="container mx-auto px-4 py-6 md:py-10">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className={`p-3 rounded-2xl transition-all ${headerBtnClass}`}>
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-black flex items-center gap-2 tracking-tight">
                <Youtube className="text-red-500" size={28} /> 
                <span className={theme === 'light' ? 'text-blue-600' : 'text-sky-400'}>Cinema</span> Anatomy Edu
              </h1>
              <p className={`text-xs md:text-sm font-medium ${subTextClass}`}>Simulasi visual materi anatomi tubuh</p>
            </div>
          </div>

          <button 
            onClick={toggleTheme}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm transition-all ${headerBtnClass}`}
          >
            {theme === 'light' ? <><Moon size={18} /> Mode Gelap</> : <><Sun size={18} /> Mode Terang</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
           <div className={`rounded-[2rem] overflow-hidden border-4 shadow-2xl ${theme === 'light' ? 'border-white' : 'border-slate-900'} aspect-video relative bg-black group`}>
              {/* Ganti tag <video> dengan <iframe> jika path mengandung google drive */}
              {activeVideo.path.includes('drive.google.com') ? (
                <iframe
                  src={activeVideo.path.replace('view?usp=sharing', 'preview').replace('uc?export=download&id=', 'file/d/') + '/preview'}
                  className="w-full h-full"
                  allow="autoplay"
                  allowFullScreen
                ></iframe>
              ) : (
                <video 
                  ref={videoRef} 
                  key={activeVideo.path}
                  className="w-full h-full shadow-inner"
                  controls
                >
                  <source src={activeVideo.path} type="video/mp4" />
                </video>
              )}
            </div>

            <div className={`p-6 md:p-8 rounded-3xl border ${cardClass}`}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[10px] font-black  tracking-widest">
                  Sedang Diputar
                </span>
                <span className={`flex items-center gap-1 text-xs font-bold ${subTextClass}`}>
                  <Clock size={14} /> Durasi: {activeVideo.duration}
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{activeVideo.title}</h2>
              
              {/* <div className={`flex gap-4 p-5 rounded-2xl border-l-4 border-blue-500 ${theme === 'light' ? 'bg-blue-50' : 'bg-blue-900/10'}`}>
                <Info className="text-blue-500 shrink-0" size={20} />
                <p className={`text-sm md:text-base leading-relaxed font-medium ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                  {activeVideo.description}
                </p>
              </div> */}
            </div>
          </div>

          <div className={`rounded-[2rem] border overflow-hidden flex flex-col h-[500px] lg:h-[750px] ${cardClass}`}>
            <div className="p-6 border-b border-inherit bg-inherit/50 backdrop-blur-md sticky top-0 z-10">
              <h3 className="font-black flex items-center gap-2 text-blue-500  tracking-wider text-sm">
                <LayoutGrid size={18} /> Playlist Materi ({allVideos.length})
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {allVideos.map((vid) => (
                <button 
                  key={vid.id}
                  onClick={() => handleVideoChange(vid)} 
                  className={`w-full flex gap-4 p-3 rounded-2xl transition-all group text-left border-2 ${
                    activeVideo.id === vid.id 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : `border-transparent ${theme === 'light' ? 'hover:bg-blue-50 hover:border-blue-100' : 'hover:bg-slate-800'}`
                  }`}
                >
                  <div className="w-24 aspect-video bg-black rounded-xl overflow-hidden shrink-0 relative shadow-md pointer-events-none">
                    <video className="w-full h-full object-cover opacity-40">
                      <source src={vid.path} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`p-1.5 rounded-full backdrop-blur-sm ${activeVideo.id === vid.id ? 'bg-white/20' : 'bg-black/40'}`}>
                        <Play size={12} fill="white" className="text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center overflow-hidden">
                    <h4 className={`text-xs md:text-sm font-bold truncate mb-1 ${activeVideo.id === vid.id ? 'text-white' : ''}`}>
                      {vid.title}
                    </h4>
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${activeVideo.id === vid.id ? 'text-blue-100' : 'opacity-60'}`}>
                      <Clock size={10} /> {vid.duration}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
      
      <footer className={`py-8 text-center border-t mt-12 ${theme === 'light' ? 'border-slate-200' : 'border-slate-900'}`}>
        <p className={`text-xs font-bold tracking-widest  ${subTextClass}`}>
          © {new Date().getFullYear()} Anatomy Edu • Learning Hub
        </p>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'light' ? '#cbd5e1' : '#1e293b'};
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}