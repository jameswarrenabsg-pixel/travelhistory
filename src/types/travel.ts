export interface TravelLocation {
  id: string;
  year: number;
  month?: string;
  date?: string;
  city: string;
  countyState?: string;
  country: string;
  latitude: number;
  longitude: number;
  photoCount?: number;
  notes?: string;
}

export type SelectedYearType = number | 'ALL';

export interface TravelDataState {
  selectedYear: SelectedYearType;
  locations: TravelLocation[];
  filteredLocations: TravelLocation[];
  isLoading: boolean;
  error?: string | null;
}
