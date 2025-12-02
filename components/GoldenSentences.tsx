import React from 'react';
import { GoldenSentence } from '../types';
import { Copy } from 'lucide-react';

export const GoldenSentences: React.FC<{ sentences: GoldenSentence[] }> = ({ sentences }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real app, toast notification here
  };

  return (
    <div className="space-y-4">
      {sentences.map((item, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 transition hover:shadow-md">
          <div className="flex justify-between items-start mb-3">
            <p className="text-lg font-bold text-slate-800">{item.text}</p>
            <button 
              onClick={() => copyToClipboard(item.text)}
              className="text-slate-400 hover:text-amber-500 transition"
              title="Copy"
            >
              <Copy size={18} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 text-sm">
            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded">
              🎯 {item.context}
            </span>
            <span className="bg-amber-50 text-amber-700 px-2 py-1 rounded">
              ⚠️ {item.note}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
