# Data Schema Specification: Travel History Web Application

## 1. Input Spreadsheet Format (Excel / CSV)

The application expects an Excel file (`.xlsx`, `.xls`) or a CSV file (`.csv`) with the following column structure:

| Column Name    | Data Type | Required | Example           | Description                                        |
| -------------- | --------- | -------- | ----------------- | -------------------------------------------------- |
| `Year`         | Integer   | Yes      | `2024`            | Travel year (between 2016 and 2026)                |
| `Date`         | String    | No       | `2024-05-15`      | Exact date or date range                           |
| `Month`        | String    | No       | `May`             | Month of travel                                    |
| `City`         | String    | Yes      | `Kyoto`           | City visited                                       |
| `County_State` | String    | No       | `Kansai`          | County, Province, or State                         |
| `Country`      | String    | Yes      | `Japan`           | Country name                                       |
| `Latitude`     | Float     | Optional | `35.0116`         | Decimal latitude (-90.0 to 90.0)                   |
| `Longitude`    | Float     | Optional | `135.7681`        | Decimal longitude (-180.0 to 180.0)                |
| `Notes`        | String    | No       | `Visited Fushimi` | Optional trip notes, activities, or recommendations |

---

## 2. Sample Dataset (JSON / CSV Reference)

```csv
Year,Date,Month,City,County_State,Country,Latitude,Longitude,Notes
2026,2026-03-10,March,Tokyo,Kanto,Japan,35.6762,139.6503,Spring cherry blossom trip
2025,2025-07-20,July,Paris,Île-de-France,France,48.8566,2.3522,Summer vacation & museums
2024,2024-09-15,September,Rome,Lazio,Italy,41.9028,12.4964,Historic sights & food tour
2023,2023-11-05,November,New York,New York,United States,40.7128,-74.0060,Autumn city break
2022,2022-06-12,June,London,Greater London,United Kingdom,51.5074,-0.1278,Family trip
2021,2021-08-18,August,Sydney,New South Wales,Australia,-33.8688,151.2093,Coastal exploration
2020,2020-02-14,February,Barcelona,Catalonia,Spain,41.3851,2.1734,Architectural tour
2019,2019-10-10,October,Seoul,Seoul Capital Area,South Korea,37.5665,126.9780,Food & culture
2018,2018-05-22,May,Vancouver,British Columbia,Canada,49.2827,-123.1207,Nature & hiking
2017,2017-12-01,December,Berlin,Berlin,Germany,52.5200,13.4050,Winter market visit
2016,2016-04-15,April,Amsterdam,North Holland,Netherlands,52.3676,4.9041,Canal cruise
```

---

## 3. Internal Application State Interface (TypeScript Data Model)

```typescript
export interface TravelLocation {
  id: string;
  year: number;
  date?: string;
  month?: string;
  city: string;
  countyState?: string;
  country: string;
  latitude: number;
  longitude: number;
  notes?: string;
}

export interface TravelDataState {
  selectedYear: number | 'ALL';
  locations: TravelLocation[];
  filteredLocations: TravelLocation[];
  isLoading: boolean;
  error?: string | null;
}
```
