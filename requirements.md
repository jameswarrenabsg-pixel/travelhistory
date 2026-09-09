# Requirements Specification: Travel History Web Application

## 1. Overview

The Travel History application is an interactive web tool that enables users to visualize their personal travel history geographically year by year. Users can navigate through travel years (2016–2026) and view corresponding travel destinations (cities, counties, and countries) on an interactive map using data loaded from an Excel file or spreadsheet table.

---

## 2. User Stories

- **US-1: Year Navigation**
  - _As a user_, I want to see year tabs/buttons from 2026 down to 2016 at the top of the app, so that I can quickly select and filter my travels for any specific year.

- **US-2: Map Visualization**
  - _As a user_, I want an interactive map underneath the year selection that highlights all locations I visited during the selected year, so that I can visually explore where I have traveled.

- **US-3: Location Details**
  - _As a user_, I want to click or hover on map markers to see details like City, County/State, Country, Date, and Notes about my trip.

- **US-4: Excel/Spreadsheet Data Loading**
  - _As a user_, I want to upload or load my travel data from an Excel (`.xlsx` / `.xls`) or CSV file, so that the map dynamically updates with my personal travel history.

- **US-5: All Years Overview**
  - _As a user_, I want an option to view all travel history across all years at once.

---

## 3. Functional Requirements

### 3.1 Year Navigation Header

- **FR-1.1**: Display a horizontal bar of year tabs/buttons ranging from **2026 down to 2016**.
- **FR-1.2**: Default selected year must be the current year (**2026**).
- **FR-1.3**: Provide an optional "All Years" toggle or tab to show the aggregated travel history.
- **FR-1.4**: Toggling a year tab must immediately update the active year state and refresh map markers.

### 3.2 Interactive Map View

- **FR-2.1**: Render a full-screen or responsive map view below the header.
- **FR-2.2**: Display custom markers for each travel location corresponding to the selected year.
- **FR-2.3**: Automatically recalculate map bounds and zoom/center to fit all markers in the active year view.
- **FR-2.4**: When a location marker is clicked, display a popup containing:
  - Location Title (City, Country)
  - Region/County/State
  - Travel Date or Month
  - Notes / Highlights

### 3.3 Data Ingestion & Processing

- **FR-3.1**: Provide a file upload modal or drop zone for `.xlsx`, `.xls`, and `.csv` files.
- **FR-3.2**: Provide built-in sample data so the application is functional out-of-the-box before the user uploads their custom file.
- **FR-3.3**: Support automatic geocoding fallback if Latitude and Longitude columns are missing or blank in the input dataset.

---

## 4. Non-Functional Requirements

- **NFR-1 (Performance)**: Year tab switching and map filtering must execute in under 100 milliseconds.
- **NFR-2 (Privacy)**: All Excel parsing and map marker rendering must occur locally in the client browser. No personal location data will be sent to external backend databases.
- **NFR-3 (Usability & Responsiveness)**: The app UI must adapt gracefully across desktop browsers, tablets, and mobile screens.

---

## 5. Edge Cases & Handling

- **EC-1**: _No travel records for a selected year_: Display a friendly banner ("No trips recorded in [Year]") and center the map to a default global view.
- **EC-2**: _Invalid or corrupted Excel file_: Display clear error message instructing user on the expected column structure.
- **EC-3**: _Missing coordinates_: Perform geocoding lookup or warn user about unmapped locations.
