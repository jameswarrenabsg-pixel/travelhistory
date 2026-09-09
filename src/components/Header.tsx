import React from 'react';
import { Plane, Upload, RefreshCw } from 'lucide-react';

interface HeaderProps {
  onOpenUploadModal: () => void;
  onResetData: () => void;
  isUsingSampleData: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenUploadModal,
  onResetData,
  isUsingSampleData,
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-md border-b border-slate-800 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="bg-sky-500/20 p-2.5 rounded-xl border border-sky-400/30 text-sky-400">
            <Plane className="w-6 h-6 transform -rotate-45" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              My Travel History
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                2016 – 2026
              </span>
            </h1>
            <p className="text-xs text-slate-400">Interactive geographical visualization of travels</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {!isUsingSampleData && (
            <button
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
              title="Reset to sample data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          )}

          <button
            onClick={onOpenUploadModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-lg shadow-sm shadow-sky-900/20 border border-sky-500/30 transition-all"
          >
            <Upload className="w-4 h-4" />
            Upload Excel / CSV
          </button>
        </div>
      </div>
    </header>
  );
};
