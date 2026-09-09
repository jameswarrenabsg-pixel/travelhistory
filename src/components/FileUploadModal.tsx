import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from 'lucide-react';
import { parseTravelSpreadsheet } from '../utils/excelParser';
import { TravelLocation } from '../types/travel';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataLoaded: (locations: TravelLocation[]) => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  onDataLoaded,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = async (file: File) => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const parsed = await parseTravelSpreadsheet(file);
      setSuccessMsg(`Successfully loaded ${parsed.length} travel entries from "${file.name}"!`);
      setTimeout(() => {
        onDataLoaded(parsed);
        onClose();
        setSuccessMsg(null);
      }, 1000);
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Failed to process file.');
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-sky-100 text-sky-600 rounded-xl">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Upload Travel History Data</h3>
            <p className="text-xs text-slate-500">Supports Excel (.xlsx, .xls) and CSV files</p>
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-sky-500 bg-sky-50/50'
              : 'border-slate-200 hover:border-sky-400 bg-slate-50/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".xlsx, .xls, .csv"
            className="hidden"
          />

          <div className="mx-auto w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-3">
            <Upload className="w-6 h-6" />
          </div>

          <p className="text-sm font-semibold text-slate-700 mb-1">
            {loading ? 'Parsing file...' : 'Click to browse or drag & drop file'}
          </p>
          <p className="text-xs text-slate-400 mb-3">
            Expected columns: <span className="font-mono text-slate-600">Year, City, Country, County_State, Month, Latitude, Longitude, Notes</span>
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>You can use <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">travel_history.csv</code> from this project folder.</span>
          <button
            onClick={onClose}
            className="px-3 py-1.5 font-medium text-slate-600 hover:text-slate-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
