
import React from 'react';
import { NumberInsight } from '../types';

interface InsightCardProps {
  number: number;
  insight: NumberInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ number, insight }) => {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-8 rounded-3xl mb-6 text-center transition-all ${insight.is_prime ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-rose-500/20 border border-rose-500/30'}`}>
        <h2 className="text-sm font-medium uppercase tracking-widest text-slate-400 mb-2">The Number {number} is</h2>
        <div className={`text-6xl font-black mb-4 ${insight.is_prime ? 'text-emerald-400' : 'text-rose-400'}`}>
          {insight.is_prime ? 'PRIME' : 'COMPOSITE'}
        </div>
        <p className="text-slate-300 italic text-sm">
          "{insight.explanation}"
        </p>
      </div>

      <div className="grid gap-4">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-3 text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.047a1 1 0 01.897.95V10l6.305 6.305a1 1 0 01-.707 1.707H2.205a1 1 0 01-.707-1.707L7.803 10V2a1 1 0 01.9-.997l2.597-.053zM9.803 10V3.018l-1.802.036L4.415 17h11.17l-3.586-3.586V10H9.803z" clipRule="evenodd" />
            </svg>
            <h3 className="font-bold text-lg">Historical Context</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{insight.historical_context}</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border-l-4 border-l-amber-500/50">
          <div className="flex items-center gap-3 mb-3 text-amber-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
            <h3 className="font-bold text-lg">Fun Fact</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">{insight.fun_fact}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
