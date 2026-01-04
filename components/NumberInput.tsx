
import React from 'react';

interface NumberInputProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, onSubmit, disabled }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative group">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Enter a number..."
          className="w-full bg-slate-900/50 border-2 border-slate-700 focus:border-indigo-500 text-white rounded-2xl px-6 py-4 text-2xl font-semibold transition-all outline-none mono group-hover:border-slate-600 disabled:opacity-50"
        />
        <div className="absolute inset-0 rounded-2xl bg-indigo-500/10 blur opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
      </div>
      
      <button
        onClick={onSubmit}
        disabled={disabled || !value}
        className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:scale-100 disabled:bg-slate-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 text-lg flex items-center justify-center gap-2"
      >
        {disabled ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Analyzing...
          </>
        ) : (
          "Analyze Number"
        )}
      </button>
    </div>
  );
};

export default NumberInput;
