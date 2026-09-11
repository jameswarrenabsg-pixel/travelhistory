import React from 'react';
import { Calendar, Globe } from 'lucide-react';
import { SelectedYearType } from '../types/travel';

interface YearSelectorProps {
  selectedYear: SelectedYearType;
  onSelectYear: (year: SelectedYearType) => void;
  availableYears: number[];
  getLocationCountByYear: (year: SelectedYearType) => number;
}

export const YearSelector: React.FC<YearSelectorProps> = ({
  selectedYear,
  onSelectYear,
  availableYears,
  getLocationCountByYear,
}) => {
  return (
    <div className="bg-slate-800 border-b border-slate-700/80 px-4 py-2.5 shadow-inner">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider min-w-max">
          <Calendar className="w-4 h-4 text-sky-400" />
          Filter Year:
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1 w-full no-scrollbar">
          <button
            onClick={() => onSelectYear('ALL')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              selectedYear === 'ALL'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 ring-1 ring-sky-300'
                : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/40'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            All Years
            <span
              className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedYear === 'ALL' ? 'bg-sky-700/80 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {getLocationCountByYear('ALL')}
            </span>
          </button>

          <div className="h-5 w-px bg-slate-700 mx-1 shrink-0" />

          {availableYears.map((year) => {
            const isSelected = selectedYear === year;
            const count = getLocationCountByYear(year);

            return (
              <button
                key={year}
                onClick={() => onSelectYear(year)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20 ring-1 ring-sky-300'
                    : 'bg-slate-700/40 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-600/30'
                }`}
              >
                <span>{year}</span>
                {count > 0 && (
                  <span
                    className={`ml-1 text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-sky-700/80 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
