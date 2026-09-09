# Technical Design Specification: Travel History Web Application

## 1. Architecture & Tech Stack

- **Framework**: React 18+ with TypeScript (using Vite for fast development and bundling)
- **Styling**: Tailwind CSS (clean, modern responsive styling)
- **Map Engine**: Leaflet + React-Leaflet with OpenStreetMap tiles (lightweight, interactive, open-source, no mandatory API key required)
- **Spreadsheet Parser**: `xlsx` (SheetJS) for client-side parsing of Excel (`.xlsx`, `.xls`) and CSV files
- **Icons**: Lucide-React (clean UI iconography)

---

## 2. Component Architecture Hierarchy

```
App
├── Header Component
│   ├── App Title & Logo
│   ├── FileUploadButton (Opens Excel Upload Modal)
│   └── YearSelector (Tabs: 2026, 2025, ..., 2016, "All Years")
├── Main Content Area
│   ├── TravelStatsBar (Total locations visited in selected year/overall)
│   ├── MapView (React-Leaflet container)
│   │   ├── MapTileLayer (OpenStreetMap)
│   │   ├── MapBoundsAutoFitter (Auto re-center on year change)
│   │   └── MarkerCluster / MarkerList
│   │       └── LocationMarker Popup (City, County, Country, Date, Notes)
│   └── LocationListDrawer / Sidebar (Collapsible list of cities for active year)
└── Modals & Notifications
    ├── UploadDataModal (Drag-and-drop Excel file, column mapper)
    └── SampleDataNotification
```

---

## 3. UI/UX Wireframe Concept

```
+-----------------------------------------------------------------------+
|  ✈️ Personal Travel History                                 [ Upload Excel ] |
+-----------------------------------------------------------------------+
|  [2026]* [2025] [2024] [2023] [2022] [2021] [2020] [2019] [2018] [2017] [2016] [All] |
+-----------------------------------------------------------------------+
|  Showing 3 locations visited in 2026                                  |
+-----------------------------------------------------------------------+
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | [ + ]                                                           |  |
|  | [ - ]                    📍 Tokyo                               |  |
|  |                       (March 2026)                              |  |
|  |                                                                 |  |
|  |           📍 Kyoto                                              |  |
|  |                                                                 |  |
|  |                                                                 |  |
|  +-----------------------------------------------------------------+  |
|                                                                       |
+-----------------------------------------------------------------------+
```

---

## 4. Key Implementation Mechanisms

### A. Dynamic Year Filtering

When a user clicks a year button (e.g. `2024`):

1. `selectedYear` state updates to `2024`.
2. `filteredLocations = locations.filter(loc => loc.year === 2024)`.
3. React-Leaflet re-renders markers.
4. `useMap()` recalculates bounds based on `filteredLocations` coordinates and triggers smooth pan/zoom.

### B. Client-side Excel File Processing

1. User drops or selects `.xlsx` / `.csv` file via `<input type="file">`.
2. FileReader reads array buffer.
3. SheetJS (`xlsx.read`) parses worksheet into JSON rows.
4. Column mapping normalizes variations (e.g. "County", "State", "County_State", "Lat", "Latitude").
5. Locations are loaded into application state.
