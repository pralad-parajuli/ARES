# Mars Explorer — 3D Planetary Exploration & Mission Planning Platform

An interactive 3D Martian exploration, NASA Open API visualization, terrain hazard analysis, and mission route-planning dashboard built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **CesiumJS**, and an **Express** API proxy (with native **Vercel** serverless support).

The globe is configured on the **Mars 2000 IAU Sphere** (`R = 3,396,190 m`) so planetocentric coordinates, NASA Mars Trek WMTS mosaics, USGS global geology, and NASA/JPL MMGIS rover traverses align with ze# Mars Explorer — 3D Planetary Exploration & Mission Planning Platform

An interactive 3D Martian exploration, NASA Open API visualization, terrain hazard analysis, and mission route-planning dashboard built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **CesiumJS**, and an **Express** API proxy (with native **Vercel** serverless support).

The globe is configured on the **Mars 2000 IAU Sphere** (`R = 3,396,190 m`) so planetocentric coordinates, NASA Mars Trek WMTS mosaics, USGS global geology, and NASA/JPL MMGIS rover traverses align with zero latitude offset.

---

## Key Features

### 1. 3D Mars Globe & NASA Mars Trek WMTS Imagery
- **Planetary Datum**: Custom `Mars_2000_Sphere_IAU` ellipsoid and `GeographicProjection` in CesiumJS (`src/components/MarsGlobe.tsx`).
- **13 Scientific Layers** (`src/data/layers.ts`):
  - **Basemaps & Topography**: Viking MDIM 2.1 Global Color Mosaic (`232 m/px`), MOLA Color Shaded Relief (`463 m/px`), MOLA + HRSC Blended Color & Hillshade (`200 m/px`), MOLA Pulse-Width Surface Roughness.
  - **High-Resolution Jezero Sector**: MRO CTX Controlled Mosaic (`6 m/px`) and MRO HiRISE Orthomosaic (`25 cm/px`) with Martian regolith color enhancement and 3D Jezero relief heightmap.
  - **Thermal, Mineralogy, Geology & Dust**: Mars Odyssey THEMIS Day IR & Night IR (`100 m/px`), MRO CRISM mineralogical footprints, USGS SIM 3292 Global Geologic Map, MGS TES Surface Dust Cover Index, and computed Jezero Slope & Hazard grid.
- **Map Tools**: Bottom-left basemap sensor switcher, split-screen layer comparison slider, camera history (back/forward), graticule toggle, dynamic metric scale bar, and live cursor lat/lon + elevation readout.

### 2. NASA Mars Image Gallery (`images-api.nasa.gov` + `api.nasa.gov/planetary/apod`)
- Accessible from the top navigation bar (**Gallery** / **Optics**).
- Preset mission/terrain queries (Perseverance Jezero, Curiosity Gale, MRO HiRISE, Ingenuity, Canyons & Volcanoes, Global Views) plus free-text search.
- Displays title, description, ISO date, NASA center, and NASA ID with loading skeletons, error retry, empty-state reset, **Load More** pagination, optional **NASA APOD** briefing banner, and a full-resolution lightbox viewer (`/api/nasa/image-asset/:nasaId`).

### 3. Interactive Exploration Locations & Mission Telemetry
- Verified planetary landing sites, craters, canyons, volcanoes, and orbital missions rendered as interactive markers (`src/data/locations.ts`, `src/data/missions.ts`).
- Selecting a marker opens a detailed briefing in the right panel (`src/components/RightSidebar.tsx`) showing verified coordinates, MOLA elevation, geological context, source attribution, camera **Focus** control, and associated mission archive metadata.
- Live historical rover traverse lines and waypoint mosaics fetched from **NASA/JPL MMGIS** for **Perseverance (M20)** and **Curiosity (MSL)**, plus official **NASA-3D-Resources** `.glb` spacecraft/rover models.

### 4. Environmental, Climate & Live Space Weather Data
- **Climate** tab in `src/components/LeftSidebar.tsx` clearly separates:
  1. **Live NASA DONKI Heliospheric & Radiation Context** (`/api/nasa/space-weather`): 30-day rolling CME count, SEP count, Mars-directed CME screening, and recent CCMC DONKI alerts.
  2. **Historical Surface Meteorology Archives**: Documented NASA PDS ranges from Perseverance MEDA, Curiosity REMS, and InSight TWINS.
  3. **Modeled / Regional Estimates**: MOLA/MCD seasonal surface pressure and elevation references.

### 5. Terrain Hazard Analysis, Route Planner & 3D Simulators
- **Jezero Elevation & Traversability Analysis** (`src/analysis/`): Horn gradient slope calculation, terrain risk scoring, and A* multi-objective route planning (`Low Difficulty`, `Avoid Slopes`, `Avoid Hazards`, `Visit Science`, `Shortest`).
- **Elevation Profile & Report Export**: Interactive route elevation chart (`src/components/BottomPanel.tsx`) and mission briefing export to **PDF** (`jspdf`) or **JSON** (`src/services/reportExport.ts`).
- **60 fps 3D Simulators**:
  - **Flight Simulator** (`FlightSimulatorHUD.tsx`): Ingenuity / Mars Aero flight over Jezero Crater.
  - **Rover Traverse Simulator** (`RoverSimulatorHUD.tsx`): 6-wheel rocker-bogie surface drive along planned routes or free exploration.
  - **Satellite Transit Simulator** (`SatelliteSimulatorHUD.tsx`): Orbital pass and ground-swath scanning simulation.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, CesiumJS 1.147, Lucide React, Motion, jsPDF
- **Backend / Proxy**: Node.js, Express 4 (`tsx`), `dotenv`
- **Deployment**: Local Express server (`server.ts`) or Vercel Static + Serverless Catch-All (`api/[...path].ts` + `vercel.json`)

---

## Project Structure

```text
├── api/
│   └── [...path].ts            # Vercel Serverless Function catch-all for /api/*
├── public/
│   └── assets/                 # Static UI assets
├── server/
│   └── createApiApp.ts         # Shared Express API routes, caching & NASA proxies
├── src/
│   ├── analysis/               # Elevation sampling, Horn slope, risk score, A* pathfinding
│   ├── components/             # MarsGlobe, LeftSidebar, RightSidebar, BottomPanel,
│   │                           # MarsGallery, TopNav, Modals, Simulator HUDs
│   ├── data/                   # Verified layers, locations, missions, geology, simulator courses
│   ├── services/               # nasaImageService, nasaMarsService, marsMapService, marsApi, reportExport
│   ├── types/                  # TypeScript domain interfaces (mars.ts)
│   ├── utils/                  # Mars coordinate math & procedural surface synthesis
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx                # Sets window.CESIUM_BASE_URL = '/cesiumStatic/'
├── index.html
├── package.json
├── server.ts                   # Local/Node Express server (API + Cesium static + Vite/dist)
├── tsconfig.json
├── vercel.json                 # Vercel build output, headers & SPA rewrites
└── vite.config.ts              # Vite + Tailwind + Cesium static asset copy config
```

---

## Prerequisites

- **Node.js** `>= 20.x` (uses built-in global `fetch` and `AbortSignal.timeout`)
- **npm** (or **bun**; a `bun.lock` is included)
- A free **NASA API Key** from [https://api.nasa.gov/](https://api.nasa.gov/) (required for `/api/nasa/space-weather` and `/api/nasa/apod`; Mars Trek tiles, MMGIS telemetry, elevation grid, and NASA Image Library work without a key)

---

## Running Locally

### 1. Install dependencies
```bash
npm install
```
*(Or with Bun: `bun install`)*

### 2. Configure environment variables
Create a `.env` file in the project root based on `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` and add your NASA API key:
```env
NASA_API_KEY="your_nasa_api_key_here"
```
> **Security note**: `.env*` files are gitignored. `NASA_API_KEY` is only read server-side in `server/createApiApp.ts` and is never exposed to frontend client bundles.

### 3. Start the development server
```bash
npm run dev
```
This runs `tsx server.ts`, starting the Express API proxy, `/cesiumStatic` asset server, and Vite dev middleware on:
- **App URL**: `http://localhost:3000`
- **Health check**: `http://localhost:3000/api/health`

*(Optional custom port)*:
```bash
PORT=3000 npm run dev
```

### 4. Production build & local production preview
Build the client bundle and copy Cesium static assets (`Assets`, `ThirdParty`, `Widgets`, `Workers`) into `dist/cesiumStatic/`:
```bash
npm run build
```

Run the compiled production app locally with Express serving both `dist/` and `/api/*`:
```bash
NODE_ENV=production npm run start
```
Then open `http://localhost:3000`.

### 5. Typecheck & clean
```bash
# TypeScript typecheck (tsc --noEmit)
npm run lint

# Remove dist/ and build artifacts
npm run clean
```

---

## Backend API Endpoints

All external NASA/USGS requests go through the Express app (`server/createApiApp.ts`) with in-memory TTL caching and CORS-safe headers:

| Endpoint | Upstream Source | Purpose |
| --- | --- | --- |
| `GET /api/health` | Local server | Service status & `nasaApiConfigured` boolean flag |
| `GET /api/tiles/trek/:layer/:z/:y/:file` | `trek.nasa.gov` | CORS-safe WMTS & ArcGIS REST (`SIM3292_Global_Geology`) tile proxy (1h cache) |
| `GET /api/tiles/usgs` | `planetarymaps.usgs.gov` | USGS Astrogeology Mars WMS proxy |
| `GET /api/models/:modelKey` | `github.com/nasa/NASA-3D-Resources` | Official NASA rover/orbiter `.glb` models (302 redirect on Vercel) |
| `GET /api/missions/:missionId/telemetry` | `mars.nasa.gov/mmgis-maps` | Historical waypoints & traverse paths (`perseverance`, `curiosity`) |
| `GET /api/trek/search?q=` | `trek.nasa.gov` Solr index | Mars Trek nomenclature & dataset search |
| `GET /api/nasa/images` | `images-api.nasa.gov/search` | Paginated Mars image archive search (HTTPS-normalized URLs) |
| `GET /api/nasa/image-asset/:nasaId` | `images-api.nasa.gov/asset` | High-resolution (`~orig` / `~large`) image manifest lookup |
| `GET /api/nasa/space-weather` | `api.nasa.gov/DONKI` | Rolling 30-day CME, SEP, notification alerts & Mars impact screening |
| `GET /api/nasa/apod` | `api.nasa.gov/planetary/apod` | NASA Astronomy Picture of the Day highlight |
| `GET /api/elevation/jezero-grid` | NASA M20 MMGIS + MOLA model | 140×112 Jezero Crater elevation & data-quality grid |

---

## Deploying to Vercel

The repository includes `vercel.json` and `api/[...path].ts` so both the CesiumJS static assets and `/api/*` backend work out of the box on Vercel:

1. Import the repository into Vercel (Framework Preset: **Vite**).
2. Keep the default build configuration (already specified in `vercel.json`):
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. In Vercel **Project Settings → Environment Variables**, add:
   - `NASA_API_KEY` = your key from `https://api.nasa.gov/`
4. Deploy. `api/[...path].ts` handles all `/api/*` routes as a Vercel Serverless Function, while `dist/cesiumStatic/` serves Cesium Web Workers, WASM decoders, and IAU orientation tables directly from the CDN.

---

## Troubleshooting

- **Globe is blank or tiles fail locally**:
  - Make sure you run `npm run dev` (or `NODE_ENV=production npm run start` after `npm run build`) rather than `vite preview` alone, because `vite preview` does not mount the `/api/*` proxy routes.
  - Check `http://localhost:3000/api/health` to confirm the Express backend is running.
- **DONKI Space Weather or APOD returns 503**:
  - Verify `NASA_API_KEY` is set in `.env` (local) or Vercel **Environment Variables** (production), then restart the dev server / redeploy.
- **Cesium assets 404 after custom build edits**:
  - Run `npm run clean && npm run build` and verify `dist/cesiumStatic/Workers/`, `dist/cesiumStatic/Assets/`, `dist/cesiumStatic/ThirdParty/`, and `dist/cesiumStatic/Widgets/` exist directly under `dist/cesiumStatic/`.
