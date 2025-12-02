
import React from 'react';
import { KnowledgePoint } from '../types';

export const KnowledgeSection: React.FC<{ data: KnowledgePoint }> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg shadow-sm">
        <h3 className="text-2xl font-bold text-amber-900 mb-3">{data.title}</h3>
        <p className="text-amber-800 text-lg leading-relaxed">{data.definition}</p>
      </div>

      {data.coreLogic && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Core Logic Formula</h4>
            <p className="text-slate-900 font-medium text-lg border-l-2 border-slate-800 pl-4">{data.coreLogic}</p>
        </div>
      )}

      {data.steps && (
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Step-by-Step Guide</h4>
            <ul className="space-y-3">
                {data.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-slate-200">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i+1}</span>
                        <span>{step}</span>
                    </li>
                ))}
            </ul>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Classic Example</div>
          <p className="text-slate-800 italic font-medium text-lg">"{data.example}"</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-amber-200 transition">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Where to Apply</div>
          <p className="text-slate-700">{data.application}</p>
        </div>
      </div>
    </div>
  );
};
