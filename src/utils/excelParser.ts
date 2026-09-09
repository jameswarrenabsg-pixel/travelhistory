import * as XLSX from 'xlsx';
import { TravelLocation } from '../types/travel';

export const parseTravelSpreadsheet = (file: File): Promise<TravelLocation[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const jsonRows = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
          defval: '',
        });

        if (!jsonRows || jsonRows.length === 0) {
          throw new Error('The spreadsheet appears to be empty.');
        }

        const rawLocations = jsonRows.map((row, index) => {
          // Flexible key lookup
          const getVal = (possibleKeys: string[]): string => {
            for (const key of possibleKeys) {
              const foundKey = Object.keys(row).find(
                (k) => k.trim().toLowerCase() === key.toLowerCase(),
              );
              if (foundKey && row[foundKey] !== undefined && row[foundKey] !== '') {
                return String(row[foundKey]).trim();
              }
            }
            return '';
          };

          const yearStr = getVal(['year', 'yr']);
          const yearNum = parseInt(yearStr, 10);

          const city = getVal(['city', 'town', 'location']);
          const country = getVal(['country', 'nation']);
          const countyState = getVal(['county_state', 'state', 'county', 'province', 'region']);
          const month = getVal(['month']);
          const date = getVal(['date']);
          const notes = getVal(['notes', 'note', 'details', 'description', 'comments']);

          const latStr = getVal(['latitude', 'lat']);
          const lngStr = getVal(['longitude', 'lng', 'lon', 'long']);

          const latitude = parseFloat(latStr);
          const longitude = parseFloat(lngStr);

          if (isNaN(yearNum) || (!city && !country)) {
            return null;
          }

          const item: TravelLocation = {
            id: `upload-${index}-${Date.now()}`,
            year: yearNum,
            city: city || 'Unknown City',
            countyState: countyState || undefined,
            country: country || 'Unknown Country',
            month: month || undefined,
            date: date || undefined,
            notes: notes || undefined,
            latitude: isNaN(latitude) ? 0 : latitude,
            longitude: isNaN(longitude) ? 0 : longitude,
          };
          return item;
        });

        const parsedLocations: TravelLocation[] = rawLocations.filter(
          (loc): loc is TravelLocation => loc !== null,
        );

        if (parsedLocations.length === 0) {
          throw new Error(
            'No valid travel entries found in spreadsheet. Check required columns (Year, City, Country).',
          );
        }

        resolve(parsedLocations);
      } catch (err: unknown) {
        const error = err as Error;
        reject(
          new Error(error.message || 'Failed to parse file. Please verify CSV or Excel layout.'),
        );
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading error.'));
    };

    reader.readAsArrayBuffer(file);
  });
};
