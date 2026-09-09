import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { YearSelector } from './components/YearSelector';
import { TravelStats } from './components/TravelStats';
import { MapView } from './components/MapView';
import { LocationList } from './components/LocationList';
import { FileUploadModal } from './components/FileUploadModal';
import { sampleTravelLocations } from './data/sampleTravelData';
import { SelectedYearType, TravelLocation } from './types/travel';

export function App() {
  const [locations, setLocations] = useState<TravelLocation[]>(sampleTravelLocations);
  const [selectedYear, setSelectedYear] = useState<SelectedYearType>(2026);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isUsingSampleData, setIsUsingSampleData] = useState(true);

  // Extract unique available years from loaded location data
  const availableYears = useMemo(() => {
    const yearsSet = new Set(locations.map((loc) => loc.year));
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [locations]);

  // Filter locations by selected year or show all
  const filteredLocations = useMemo(() => {
    if (selectedYear === 'ALL') {
      return locations;
    }
    return locations.filter((loc) => loc.year === selectedYear);
  }, [locations, selectedYear]);

  // Count helper for year buttons
  const getLocationCountByYear = (year: SelectedYearType) => {
    if (year === 'ALL') {
      return locations.length;
    }
    return locations.filter((loc) => loc.year === year).length;
  };

  const handleDataLoaded = (newLocations: TravelLocation[]) => {
    setLocations(newLocations);
    setIsUsingSampleData(false);

    // Auto-select latest year from loaded data if 2026 is empty
    const has2026 = newLocations.some((loc) => loc.year === 2026);
    if (!has2026 && newLocations.length > 0) {
      const maxYear = Math.max(...newLocations.map((loc) => loc.year));
      setSelectedYear(maxYear);
    } else {
      setSelectedYear(2026);
    }
  };

  const handleResetData = () => {
    setLocations(sampleTravelLocations);
    setSelectedYear(2026);
    setIsUsingSampleData(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Header
        onOpenUploadModal={() => setIsUploadModalOpen(true)}
        onResetData={handleResetData}
        isUsingSampleData={isUsingSampleData}
      />

      <YearSelector
        selectedYear={selectedYear}
        onSelectYear={setSelectedYear}
        availableYears={availableYears}
        getLocationCountByYear={getLocationCountByYear}
      />

      <div className="bg-slate-100 flex-1 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <TravelStats selectedYear={selectedYear} locations={filteredLocations} />

          <MapView locations={filteredLocations} />

          <LocationList locations={filteredLocations} />
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-center text-xs py-3">
        <div className="max-w-7xl mx-auto px-4">
          Personal Travel History App &bull; Powered by React, Leaflet &amp; OpenStreetMap
        </div>
      </footer>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onDataLoaded={handleDataLoaded}
      />
    </div>
  );
}

export default App;
