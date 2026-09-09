import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { TravelLocation } from '../types/travel';

interface MapBoundsAutoFitterProps {
  locations: TravelLocation[];
}

export const MapBoundsAutoFitter = ({ locations }: MapBoundsAutoFitterProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || locations.length === 0) return;

    const validLocations = locations.filter((loc) => loc.latitude !== 0 || loc.longitude !== 0);

    if (validLocations.length === 0) return;

    if (validLocations.length === 1) {
      const { latitude, longitude } = validLocations[0];
      map.flyTo([latitude, longitude], 8, {
        duration: 1.2,
      });
    } else {
      const bounds = L.latLngBounds(validLocations.map((loc) => [loc.latitude, loc.longitude]));
      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12,
        animate: true,
        duration: 1.2,
      });
    }
  }, [locations, map]);

  return null;
};
