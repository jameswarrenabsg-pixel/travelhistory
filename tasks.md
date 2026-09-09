# Development Tasks: Travel History Web Application

## Phase 1: Project Initialization & Specs

- [x] Create core specifications ([requirements.md](requirements.md), [data-schema.md](data-schema.md), [design.md](design.md), [tasks.md](tasks.md))
- [x] Initialize React + TypeScript + Vite project in the workspace
- [x] Install dependencies (`leaflet`, `react-leaflet`, `xlsx`, `lucide-react`, `tailwindcss`)
- [x] Configure Tailwind CSS and Leaflet styles

## Phase 2: Data Model & Mock Data

- [x] Define TypeScript types in `src/types/travel.ts` based on [data-schema.md](data-schema.md)
- [x] Create default sample travel dataset spanning 2016 to 2026 in `src/data/sampleTravelData.ts`
- [x] Create utility service for client-side Excel/CSV parsing using SheetJS in `src/utils/excelParser.ts`

## Phase 3: Year Selection Header & State Management

- [x] Build `YearSelector` component rendering year tabs from 2026 down to 2016 plus "All Years" option
- [x] Implement active tab styling and selection state handler
- [x] Build application header and top summary bar displaying location counts

## Phase 4: Interactive Map Component

- [x] Create `MapView` component with Leaflet tile layer setup
- [x] Render location markers on map with custom popups showing City, County/State, Country, Date, and Notes
- [x] Implement `MapBoundsAutoFitter` component to dynamically re-center and auto-fit map view when year selection changes

## Phase 5: Excel Data Upload & Integration

- [x] Create `FileUploadModal` component supporting drag-and-drop for `.xlsx` and `.csv` files
- [x] Connect uploaded data parser to application state so map and year tabs dynamically update with custom user data
- [x] Implement fallback notification/geocoding error handling for records missing coordinates

## Phase 6: Polish & Responsive Layout

- [x] Add collapsible sidebar/drawer showing a text list of visited locations for the selected year
- [x] Ensure mobile and tablet responsive layout
- [x] Verify year filtering and map re-centering across all years (2016–2026)
