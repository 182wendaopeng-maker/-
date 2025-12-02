
import React, { useState } from 'react';
import { CURRICULUM } from './constants';
import { Tab } from './types';
import { KnowledgeSection } from './components/KnowledgeSection';
import { GoldenSentences } from './components/GoldenSentences';
import { PracticeSection } from './components/PracticeSection';
import { BookOpen, Mic, Star, ChevronRight, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.KNOWLEDGE);
  
  const currentCurriculum = CURRICULUM[currentDayIndex];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-white font-bold">
              :)
            </div>
            <h1 className="font-bold text-lg hidden sm:block">Humor Sense</h1>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Day {currentCurriculum.day}/15</span>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                    style={{ width: `${((currentDayIndex + 1) / 15) * 100}%` }}
                ></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Day Navigator */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
                {CURRICULUM.map((day, idx) => (
                    <button
                        key={day.day}
                        onClick={() => {
                            setCurrentDayIndex(idx);
                            setActiveTab(Tab.KNOWLEDGE);
                        }}
                        className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border transition-all ${
                            idx === currentDayIndex 
                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg scale-105' 
                                : 'bg-white border-slate-200 text-slate-400 hover:border-amber-300'
                        }`}
                    >
                        <span className="text-xs font-medium">Day</span>
                        <span className="text-lg font-bold">{day.day}</span>
                    </button>
                ))}
                {/* Placeholders for days 4-15 */}
                {[...Array(12)].map((_, i) => (
                     <div key={i+4} className="flex flex-col items-center justify-center w-14 h-14 rounded-xl border bg-slate-50 border-slate-100 text-slate-300 opacity-50 cursor-not-allowed">
                        <span className="text-xs">Day</span>
                        <span className="text-lg">{i + 4}</span>
                     </div>
                ))}
            </div>
        </div>

        {/* Title Section */}
        <div className="mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{currentCurriculum.title}</h2>
            <p className="text-slate-500">2 Hours • Key Concepts & Drills</p>
        </div>

        {/* Content Tabs */}
        <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
            <button 
                onClick={() => setActiveTab(Tab.KNOWLEDGE)}
                className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    activeTab === Tab.KNOWLEDGE ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
                <BookOpen size={16} /> Concept
            </button>
            <button 
                onClick={() => setActiveTab(Tab.SENTENCES)}
                className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    activeTab === Tab.SENTENCES ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
                <Star size={16} /> Golden Quotes
            </button>
            <button 
                onClick={() => setActiveTab(Tab.PRACTICE)}
                className={`flex-1 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    activeTab === Tab.PRACTICE ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-50'
                }`}
            >
                <Mic size={16} /> Live Practice
            </button>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
            {activeTab === Tab.KNOWLEDGE && (
                <KnowledgeSection data={currentCurriculum.knowledge} />
            )}
            
            {activeTab === Tab.SENTENCES && (
                <GoldenSentences sentences={currentCurriculum.sentences} />
            )}

            {activeTab === Tab.PRACTICE && (
                <div className="space-y-12">
                    {currentCurriculum.scenarios.map((scenario) => (
                        <PracticeSection key={scenario.id} scenario={scenario} />
                    ))}
                </div>
            )}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
            <button 
                disabled={currentDayIndex === 0}
                onClick={() => setCurrentDayIndex(p => Math.max(0, p - 1))}
                className="text-slate-400 font-medium hover:text-slate-600 disabled:opacity-30"
            >
                Previous Day
            </button>
            
            {activeTab !== Tab.PRACTICE ? (
                <button 
                    onClick={() => {
                        if (activeTab === Tab.KNOWLEDGE) setActiveTab(Tab.SENTENCES);
                        else if (activeTab === Tab.SENTENCES) setActiveTab(Tab.PRACTICE);
                    }}
                    className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-slate-800 transition shadow-lg shadow-slate-200"
                >
                    Next Step <ChevronRight size={18} />
                </button>
            ) : (
                <button 
                    onClick={() => {
                        if (currentDayIndex < CURRICULUM.length - 1) {
                            setCurrentDayIndex(p => p + 1);
                            setActiveTab(Tab.KNOWLEDGE);
                        }
                    }}
                    className="bg-green-600 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-700 transition shadow-lg shadow-green-100"
                >
                    Complete Day <CheckCircle2 size={18} />
                </button>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
