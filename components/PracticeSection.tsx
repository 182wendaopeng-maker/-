
import React, { useState, useRef, useEffect } from 'react';
import { PracticeScenario, FeedbackData } from '../types';
import { GeminiLiveService } from '../services/geminiLiveService';
import { Mic, Square, Volume2, AlertCircle, Star, MessageSquareQuote, Lightbulb } from 'lucide-react';

export const PracticeSection: React.FC<{ scenario: PracticeScenario }> = ({ scenario }) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState<string>("Ready");
  const [error, setError] = useState<string | null>(null);
  const [isTalking, setIsTalking] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const liveServiceRef = useRef<GeminiLiveService | null>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, [scenario.id]); 

  const startSession = async () => {
    setError(null);
    setFeedback(null);
    setStatus("Connecting...");
    
    liveServiceRef.current = new GeminiLiveService({
      scenarioContext: `Role Description: ${scenario.description}\nTarget Technique: ${scenario.targetTechnique}\n${scenario.roleplayContext}`,
      onAudioData: () => {
        setIsTalking(true);
        setTimeout(() => setIsTalking(false), 200); 
      },
      onFeedback: (data) => {
        setFeedback(data);
      },
      onClose: () => {
        setIsActive(false);
        setStatus("Session ended");
      },
      onError: (err) => {
        console.error(err);
        setError("Connection failed. Please check permissions.");
        setIsActive(false);
        setStatus("Error");
      }
    });

    await liveServiceRef.current.start();
    setIsActive(true);
    setStatus("Live");
  };

  const stopSession = () => {
    if (liveServiceRef.current) {
      liveServiceRef.current.stop();
      liveServiceRef.current = null;
    }
    setIsActive(false);
    setStatus("Ready");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="p-6 bg-slate-900 text-white">
        <h3 className="text-xl font-bold mb-2">{scenario.title}</h3>
        <p className="text-slate-300 mb-4">{scenario.description}</p>
        <div className="inline-block bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">
          Target: {scenario.targetTechnique}
        </div>
      </div>

      <div className="p-8">
        
        {/* Interaction Area */}
        <div className="flex flex-col items-center justify-center min-h-[200px] mb-8 relative">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${
            isActive 
                ? isTalking 
                ? 'bg-amber-400 scale-110 shadow-[0_0_30px_rgba(251,191,36,0.6)]' 
                : 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] animate-pulse' 
                : 'bg-slate-200'
            }`}>
            {isActive ? <Volume2 size={48} className="text-white" /> : <Mic size={48} className="text-slate-400" />}
            </div>

            <div className="text-center">
            <p className="text-2xl font-medium text-slate-800 mb-2">
                {isActive ? (isTalking ? "AI is speaking..." : "Listening...") : "Start Practice"}
            </p>
            <p className="text-slate-500 text-sm">
                {status}
            </p>
            </div>
        </div>

        {/* Feedback Card */}
        {feedback && (
            <div className="mb-8 animate-fade-in bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-black text-xl">
                        {feedback.score}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">AI Coach Feedback</h4>
                        <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                                <Star 
                                    key={i} 
                                    size={12} 
                                    className={i < feedback.score ? "fill-amber-400 text-amber-400" : "text-slate-300"} 
                                />
                            ))}
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex gap-3 items-start">
                        <MessageSquareQuote className="text-slate-400 mt-1 shrink-0" size={18} />
                        <p className="text-slate-700 text-sm">{feedback.analysis}</p>
                    </div>
                    <div className="flex gap-3 items-start bg-white p-3 rounded-lg border border-slate-100">
                        <Lightbulb className="text-amber-500 mt-1 shrink-0" size={18} />
                        <div>
                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Better Response</span>
                            <p className="text-slate-800 text-sm font-medium mt-1">"{feedback.goldenResponse}"</p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-4 py-2 rounded-lg mb-6 justify-center">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className="flex justify-center">
            <button
            onClick={isActive ? stopSession : startSession}
            className={`px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 transition-all transform hover:scale-105 ${
                isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200 shadow-xl' 
                : 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200 shadow-xl'
            }`}
            >
            {isActive ? (
                <>
                <Square fill="currentColor" size={20} /> End Session
                </>
            ) : (
                <>
                <Mic fill="currentColor" size={20} /> Start Roleplay
                </>
            )}
            </button>
        </div>
        
        {!isActive && !feedback && (
            <p className="mt-6 text-xs text-slate-400 text-center mx-auto max-w-xs">
                Speak your response. The AI will reply in character, then display a rating and advice here.
            </p>
        )}
      </div>
    </div>
  );
};
