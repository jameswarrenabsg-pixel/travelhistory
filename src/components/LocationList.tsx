import React from 'react';
import { MapPin, Calendar, FileText, Globe } from 'lucide-react';
import { TravelLocation } from '../types/travel';

interface LocationListProps {
  locations: TravelLocation[];
}

export const LocationList: React.FC<LocationListProps> = ({ locations }) => {
  if (locations.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Globe className="w-4 h-4 text-sky-500" />
          Visited Destinations ({locations.length})
        </h3>
        <span className="text-xs text-slate-400">Chronological list</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="p-3 bg-slate-50 hover:bg-sky-50/50 border border-slate-200/80 hover:border-sky-200 rounded-lg transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>{loc.city}</span>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full shrink-0">
                {loc.year}
              </span>
            </div>

            <div className="text-xs text-slate-600 mb-1.5 pl-5">
              {loc.countyState ? `${loc.countyState}, ` : ''}
              <span className="font-medium text-slate-800">{loc.country}</span>
            </div>

            {(loc.month || loc.date) && (
              <div className="flex items-center gap-1 text-[11px] text-slate-500 pl-5 mb-1.5">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{loc.date || `${loc.month} ${loc.year}`}</span>
              </div>
            )}

            {loc.notes && (
              <div className="text-xs text-slate-500 pl-5 line-clamp-2 italic flex items-start gap-1">
                <FileText className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                <span>{loc.notes}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
