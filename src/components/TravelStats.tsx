import React from 'react';
import { MapPin, Globe2, Navigation, Calendar } from 'lucide-react';
import { SelectedYearType, TravelLocation } from '../types/travel';

interface TravelStatsProps {
  selectedYear: SelectedYearType;
  locations: TravelLocation[];
}

export const TravelStats: React.FC<TravelStatsProps> = ({ selectedYear, locations }) => {
  const uniqueCities = new Set(locations.map((loc) => loc.city)).size;
  const uniqueCountries = new Set(locations.map((loc) => loc.country)).size;
  const uniqueStates = new Set(locations.map((loc) => loc.countyState).filter(Boolean)).size;

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-sky-100 text-sky-700 rounded-lg">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800">
              {selectedYear === 'ALL'
                ? 'Overall Travel History (2016 - 2026)'
                : `Travel Destinations in ${selectedYear}`}
            </h2>
            <p className="text-xs text-slate-500">
              Showing {locations.length} {locations.length === 1 ? 'trip' : 'trips'} on the map
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span className="font-semibold text-slate-700">{uniqueCities}</span>
            <span className="text-slate-500">{uniqueCities === 1 ? 'City' : 'Cities'}</span>
          </div>

          {uniqueStates > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
              <Navigation className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-slate-700">{uniqueStates}</span>
              <span className="text-slate-500">
                {uniqueStates === 1 ? 'Region/State' : 'Regions/States'}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
            <Globe2 className="w-4 h-4 text-emerald-500" />
            <span className="font-semibold text-slate-700">{uniqueCountries}</span>
            <span className="text-slate-500">
              {uniqueCountries === 1 ? 'Country' : 'Countries'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
