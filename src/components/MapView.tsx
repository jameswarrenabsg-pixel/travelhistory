import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { TravelLocation } from '../types/travel';
import { MapBoundsAutoFitter } from './MapBoundsAutoFitter';
import { MapPin, Calendar, Compass, FileText } from 'lucide-react';

// Custom MapPin SVG marker icon for Leaflet
const createCustomMarkerIcon = (color = '#0284c7') => {
  const svgHtml = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="32" height="32" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="filter drop-shadow-md">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3" fill="#ffffff"/>
    </svg>
  `;

  return L.divIcon({
    html: svgHtml,
    className: 'custom-map-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const customIcon = createCustomMarkerIcon('#0284c7');

interface MapViewProps {
  locations: TravelLocation[];
}

export const MapView: React.FC<MapViewProps> = ({ locations }) => {
  const defaultCenter: [number, number] = [20, 0];
  const defaultZoom = 2;

  const validLocations = locations.filter((loc) => loc.latitude !== 0 || loc.longitude !== 0);

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
      {validLocations.length === 0 ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 p-6 text-center z-20">
          <div className="p-4 bg-sky-50 text-sky-600 rounded-full mb-3">
            <Compass className="w-10 h-10 animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            No Travel Records For This Selection
          </h3>
          <p className="text-xs text-slate-500 max-w-sm">
            Select another year tab above or upload an Excel / CSV file containing travel details
            for this year.
          </p>
        </div>
      ) : null}

      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapBoundsAutoFitter locations={validLocations} />

        {validLocations.map((loc) => (
          <Marker key={loc.id} position={[loc.latitude, loc.longitude]} icon={customIcon}>
            <Popup className="travel-popup">
              <div className="p-1 max-w-xs">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  {loc.city}
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  {loc.countyState ? `${loc.countyState}, ` : ''}
                  {loc.country}
                </h3>

                {(loc.month || loc.date || loc.year) && (
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{loc.date ? loc.date : `${loc.month || ''} ${loc.year}`}</span>
                  </div>
                )}

                {loc.notes && (
                  <div className="bg-slate-50 p-2 rounded border border-slate-100 text-xs text-slate-600 flex items-start gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{loc.notes}</span>
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
