'use client';

import { useState } from 'react';
import Link from 'next/link';
import { quizData } from '../data/quizData';
import { ChevronLeft, RotateCcw, Trophy, Brain, ClipboardCheck, X } from 'lucide-react';

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleAnswerClick = (index) => {
    const isCorrect = index === selectedTopic.questions[currentQuestion].answer;
    if (isCorrect) setScore(score + 1);

    const newUserAnswers = [...userAnswers, { question: currentQuestion, selected: index, correct: isCorrect }];
    setUserAnswers(newUserAnswers);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedTopic.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setShowResult(false);
  };

  // Tampilan Pilih Topik
  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-slate-50 py-8 px-4 md:py-12 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center text-blue-600 font-semibold mb-6 hover:underline text-sm md:text-base">
            <ChevronLeft size={18} /> Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Pilih Topik Kuis</h1>
          <p className="text-slate-600 mb-8 md:mb-12 text-sm md:text-base">Uji pengetahuanmu tentang anatomi tubuh manusia.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {quizData.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleTopicSelect(topic)}
                className="p-6 md:p-8 bg-white border border-slate-200 rounded-2xl shadow-sm active:scale-95 md:hover:shadow-md transition-all text-left group"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 md:mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {topic.topic === "Gigi" ? <ClipboardCheck size={20} /> : <Brain size={20} />}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{topic.topic}</h3>
                <p className="text-slate-500 text-xs md:text-sm">{topic.questions.length} Soal Pilihan Ganda</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Hasil Akhir
  if (showResult) {
    const percentage = Math.round((score / selectedTopic.questions.length) * 100);
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden text-center p-8 md:p-12">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500 mx-auto mb-4">
            <Trophy size={40} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Kuis Selesai!</h2>
          <p className="text-slate-500 text-sm mb-6">Topik: {selectedTopic.topic}</p>
          
          <div className="text-5xl md:text-6xl font-black text-blue-600 mb-2">{percentage}%</div>
          <p className="text-base md:text-lg font-medium text-slate-700 mb-8">
            Skor: {score} / {selectedTopic.questions.length} Benar
          </p>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => handleTopicSelect(selectedTopic)}
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold active:scale-95 transition flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} /> Ulangi Kuis
            </button>
            <button 
              onClick={resetQuiz}
              className="w-full py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold active:scale-95 transition"
            >
              Pilih Topik Lain
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Sedang Mengerjakan Kuis
  const currentQ = selectedTopic.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedTopic.questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-6 px-4 md:py-12 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">{selectedTopic.topic}</h2>
            <span className="text-slate-500 text-xs md:text-sm font-medium">Soal {currentQuestion + 1} dari {selectedTopic.questions.length}</span>
          </div>
          <button 
            onClick={resetQuiz} 
            className="p-2 bg-slate-200 rounded-full text-slate-500 active:bg-slate-300 transition"
            title="Keluar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Progress Bar yang lebih clean */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 mb-6 transition-all">
          <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-8 leading-relaxed">
            {currentQ.question}
          </h3>

          <div className="grid gap-3 md:gap-4">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className="w-full p-4 md:p-5 text-left rounded-xl md:rounded-2xl border-2 border-slate-50 active:border-blue-500 active:bg-blue-50 md:hover:border-blue-500 md:hover:bg-blue-50 transition-all group flex items-center justify-between gap-4"
              >
                <span className="text-sm md:text-base text-slate-700 font-medium leading-snug">{option}</span>
                <div className="shrink-0 w-5 h-5 rounded-full border-2 border-slate-200 group-active:border-blue-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}