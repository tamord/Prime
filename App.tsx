
import React, { useState } from 'react';
import NumberInput from './components/NumberInput';
import InsightCard from './components/InsightCard';
import { getNumberInsight } from './services/geminiService';
import { NumberInsight, CalculationStatus } from './types';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [status, setStatus] = useState<CalculationStatus>(CalculationStatus.IDLE);
  const [result, setResult] = useState<{ num: number; insight: NumberInsight } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const num = parseInt(inputValue);
    if (isNaN(num)) {
      setError("Please enter a valid integer.");
      return;
    }

    if (num < 0) {
      setError("Please enter a positive number.");
      return;
    }

    if (num > 999999999999) {
      setError("That number is a bit too massive for a quick check!");
      return;
    }

    setStatus(CalculationStatus.LOADING);
    setError(null);

    try {
      const insight = await getNumberInsight(num);
      setResult({ num, insight });
      setStatus(CalculationStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch mathematical insights. Please try again.");
      setStatus(CalculationStatus.ERROR);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center">
      <header className="max-w-md w-full text-center mb-10 mt-8">
        <h1 className="text-4xl md:text-5xl font-black mb-3 gradient-text">
          Prime Guru
        </h1>
        <p className="text-slate-400 font-medium">
          Unlock the secrets of the number line.
        </p>
      </header>

      <main className="max-w-md w-full space-y-8">
        <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl shadow-black/50">
          <NumberInput 
            value={inputValue} 
            onChange={setInputValue} 
            onSubmit={handleAnalyze} 
            disabled={status === CalculationStatus.LOADING}
          />

          {error && (
            <div className="mt-4 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}
        </div>

        {status === CalculationStatus.SUCCESS && result && (
          <InsightCard number={result.num} insight={result.insight} />
        )}
        
        {status === CalculationStatus.IDLE && (
          <div className="text-center space-y-4 pt-4 opacity-50">
            <div className="flex justify-center gap-4">
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono">17</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono">131</span>
              <span className="px-3 py-1 bg-slate-800 rounded-full text-xs font-mono">104729</span>
            </div>
            <p className="text-xs text-slate-500">
              Primes are the "atoms" of mathematics. Every whole number can be uniquely factored into them.
            </p>
          </div>
        )}
      </main>

      <footer className="mt-auto py-8 text-slate-600 text-[10px] uppercase tracking-widest font-bold">
        Powered by Gemini AI • Prime Guru v1.0
      </footer>
    </div>
  );
}

export default App;
