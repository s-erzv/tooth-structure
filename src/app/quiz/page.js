'use client';

import { useState } from 'react';
import Link from 'next/link';
import { quizData } from '../data/quizData';
import { 
  ChevronLeft, RotateCcw, Trophy, ClipboardCheck, 
  X, ChevronRight, Download, User, School, MapPin 
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function QuizPage() {
  const [userData, setUserData] = useState({ name: '', school: '', address: '' });
  const [isStarted, setIsStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});

  const handleStart = (topic) => {
    if (!userData.name || !userData.school) {
      alert("Silakan isi nama dan sekolah terlebih dahulu!");
      return;
    }
    setSelectedTopic(topic);
    setIsStarted(true);
    setCurrentQuestion(0);
    setShowResult(false);
    setUserAnswers({});
  };

  const handleAnswerSelect = (optionIndex) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestion]: optionIndex
    });
  };

  const handleSubmitQuiz = () => {
    const totalQuestions = selectedTopic.questions.length;
    const answeredCount = Object.keys(userAnswers).length;

    if (answeredCount < totalQuestions) {
      if (!confirm(`Kamu baru menjawab ${answeredCount} dari ${totalQuestions} soal. Masih ada soal yang kosong. Yakin ingin mengakhiri?`)) {
        return;
      }
    } else {
      if (!confirm("Sudah selesai mengecek semua jawaban? Klik OK untuk submit.")) {
        return;
      }
    }
    setShowResult(true);
  };

  const calculateScore = () => {
    let score = 0;
    selectedTopic.questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) score++;
    });
    return score;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const score = calculateScore();
    const totalQuestions = selectedTopic.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const date = new Date().toLocaleDateString('id-ID', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("LAPORAN HASIL KUIS", 105, 25, { align: "center" });
    
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(14);
    doc.text("Informasi Peserta", 20, 55);
    doc.line(20, 58, 190, 58);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nama Lengkap : ${userData.name}`, 20, 68);
    doc.text(`Asal Sekolah  : ${userData.school}`, 20, 75);
    doc.text(`Alamat        : ${userData.address || "-"}`, 20, 82);
    doc.text(`Skor Akhir    : ${score} / ${totalQuestions} (${percentage}%)`, 20, 89);

    const tableData = selectedTopic.questions.map((q, i) => {
      const isCorrect = userAnswers[i] === q.answer;
      return [
        i + 1,
        q.question,
        q.options[q.answer],
        userAnswers[i] !== undefined ? q.options[userAnswers[i]] : "Kosong",
        { content: isCorrect ? "Benar" : "Salah", styles: { textColor: isCorrect ? [22, 163, 74] : [220, 38, 38] } }
      ];
    });

    autoTable(doc, {
      startY: 100,
      head: [['No', 'Pertanyaan', 'Kunci Jawaban', 'Jawaban Anda', 'Status']],
      body: tableData,
      theme: 'striped',
      columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 'auto' }, 4: { halign: 'center' } },
      styles: { overflow: 'linebreak' }
    });

    doc.save(`Hasil_${userData.name}.pdf`);
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setIsStarted(false);
    setShowResult(false);
    setUserData({ name: '', school: '', address: '' });
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center text-blue-600 font-semibold mb-6 hover:underline">
            <ChevronLeft size={18} /> Kembali
          </Link>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Data Peserta</h2>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Nama Lengkap *" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})}
              />
              <input 
                type="text" placeholder="Nama Sekolah *" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.school} onChange={(e) => setUserData({...userData, school: e.target.value})}
              />
              <textarea 
                placeholder="Alamat" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                value={userData.address} onChange={(e) => setUserData({...userData, address: e.target.value})}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4 text-slate-800">Pilih Topik Kuis</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quizData.map((topic) => (
              <button key={topic.id} onClick={() => handleStart(topic)} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-500 text-left transition-all">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  <ClipboardCheck size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{topic.topic}</h3>
                <p className="text-slate-500 text-sm">{topic.questions.length} Soal</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const totalQuestions = selectedTopic.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 md:p-12 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-10%] left-[-10%] w-40 h-40 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
              {/* <div className="inline-flex p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                <Trophy className="text-yellow-300" size={48} />
              </div> */}
              <h2 className="text-3xl md:text-4xl font-black mb-2 tracking-tight">Kuis Selesai!</h2>
              <p className="text-blue-100 font-medium opacity-90">Selamat, kamu telah menyelesaikan tantangan ini.</p>
            </div>
          </div>

          <div className="p-8 md:p-12 text-center">
            <div className="inline-block px-6 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-8">
              {userData.name} • {userData.school}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Skor Akhir</span>
                <div className="text-6xl font-black text-blue-600">{percentage}%</div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Statistik</span>
                <div className="text-2xl font-bold text-slate-800">
                  <span className="text-green-600">{score}</span>
                  <span className="text-slate-400 mx-1">/</span>
                  <span>{totalQuestions}</span>
                </div>
                <p className="text-slate-500 text-xs mt-1 font-medium text-center">Jawaban Benar</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={downloadPDF} 
                className="flex-1 flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-[0.98]"
              >
                <Download size={20} />
                Download Hasil Kuis (PDF)
              </button>
              
              <button 
                onClick={resetQuiz} 
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
              >
                Kembali ke Menu
              </button>
            </div>

            <p className="mt-8 text-slate-400 text-xs font-medium">
              Topik: <span className="text-slate-600">{selectedTopic.topic}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = selectedTopic.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-900">{selectedTopic.topic}</h2>
          <button onClick={resetQuiz} className="p-2 bg-slate-200 rounded-full text-slate-500"><X size={18} /></button>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <p className="text-sm font-bold text-slate-500 mb-3">Navigasi Soal (Klik nomor untuk cek kembali):</p>
          <div className="flex flex-wrap gap-2">
            {selectedTopic.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-lg font-bold transition-all border-2 ${
                  currentQuestion === idx 
                    ? 'border-blue-600 bg-blue-600 text-white' 
                    : userAnswers[idx] !== undefined 
                      ? 'border-blue-200 bg-blue-50 text-blue-600' 
                      : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100 mb-6">
          <div className="mb-4 text-blue-600 font-bold uppercase tracking-wider text-sm">Soal {currentQuestion + 1}</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-8">{currentQ.question}</h3>

          <div className="grid gap-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-2xl border-2 transition-all flex items-center justify-between ${
                  userAnswers[currentQuestion] === index 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-50 hover:border-blue-100'
                }`}
              >
                <span className="font-medium text-slate-700">{option}</span>
                <div className={`w-5 h-5 rounded-full border-2 ${userAnswers[currentQuestion] === index ? 'border-blue-500 bg-blue-500' : 'border-slate-200'}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
          <button 
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="flex items-center gap-2 px-4 py-2 font-bold text-slate-600 disabled:opacity-20"
          >
            <ChevronLeft size={20} /> Prev
          </button>
          
          <button 
            onClick={handleSubmitQuiz}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-colors"
          >
            Submit Kuis
          </button>

          <button 
            disabled={currentQuestion === selectedTopic.questions.length - 1}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
            className="flex items-center gap-2 px-4 py-2 font-bold text-blue-600 disabled:opacity-20"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}