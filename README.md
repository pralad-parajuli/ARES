# Mars Explorer

An interactive 3D Martian planetary exploration, NASA dataset visualization, terrain hazard analysis, and mission-planning web application built with React, TypeScript, CesiumJS, and Express.

Centered on **Jezero Crater** with full global coverage, Mars Explorer combines NASA Mars Trek WMTS mosaics, USGS Astrogeology overlays, NASA/JPL MMGIS rover traverse archives, official NASA 3D GLB spacecraft models, terrain-aware A* pathfinding, and three real-time 3D mission simulators (Flight, Rover, and Orbital Satellite).

> **Scientific Disclaimer:** Terrain analysis and route planning are intended for exploration, research, and mission-planning prototyping. They are **not** certified for operational astronaut or robotic navigation.

---

## Features

### 3D Mars Globe & Scientific Data Layers
- **CesiumJS Planetary Globe** configured for the Mars 2000 IAU datum ($R = 3{,}396{,}190\text{ m}$) with optional 3D terrain, coordinate graticule, split-screen layer comparison, and camera history (back/forward).
- **13 Scientific & Imagery Layers** served through a CORS-safe Express proxy with in-memory tile caching:
  - **Basemaps & High-Res Imagery:** Viking MDIM 2.1 Global Color Mosaic (232 m/px), MRO CTX Jezero Crater Mosaic (6 m/px), MRO HiRISE Jezero Crater Orthomosaic (25 cm/px)
  - **Topography:** MOLA Color Shaded Relief (463 m/px), MOLA + MEX HRSC Blended Color & Shaded Relief (200 m/px), MOLA Pulse-Width Surface Roughness
  - **Thermal:** Mars Odyssey THEMIS Daytime & Nighttime Infrared Controlled Mosaics (100 m/px)
  - **Mineralogy & Geology:** MRO CRISM Mineralogical & Aqueous Detections (smectite clays, Mg-carbonate, olivine, pyroxene), USGS SIM 3292 Global Geologic Map of Mars
  - **Atmosphere & Analysis:** MGS TES Surface Dust Cover Index, computed Jezero Slope & Terrain Hazard Classification

### Historical Missions & 3D Spacecraft Models
- Tracks **14 Mars missions** across rovers, helicopters, landers, and orbiters:
  - *Rovers & Rotorcraft:* Perseverance (Mars 2020), Ingenuity Mars Helicopter, Curiosity (MSL), Zhurong (Tianwen-1), Opportunity (MER-B), Spirit (MER-A), Mars Pathfinder & Sojourner
  - *Landers:* InSight, Phoenix, Viking 1, Viking 2
  - *Orbiters:* Mars Reconnaissance Orbiter (MRO), 2001 Mars Odyssey, Mars Global Surveyor (MGS)
- Live proxy integration with **NASA/JPL MMGIS** historical waypoints and traverses for **Perseverance (M20)** and **Curiosity (MSL)**.
- Official `.glb` 3D spacecraft and rover models fetched and cached via `/api/models/:modelKey` from `NASA-3D-Resources`.

### Terrain-Aware Mission Route Planner & Export
- **Jezero Crater Elevation Grid (`/api/elevation/jezero-grid`):** $140 \times 112$ topographic grid combining regional MOLA/HiRISE Jezero DTM features (Delta Scarp, Belva Crater, Séítah, Neretva Vallis, Kodiak Butte, Western Rim) with Gaussian-tapered IDW blending of measured NASA M20 Perseverance waypoint elevations and explicit data-quality flagging.
- **Terrain-Aware A\* Pathfinding:** Generates and compares routes across 5 optimization modes:
  - `low_difficulty` (balanced distance, slope, roughness, and hazards)
  - `avoid_slopes`
  - `avoid_hazards` (buffers around Belva Crater walls, Séítah dunes, delta scarps, and crater rims)
  - `visit_science` (rewards proximity to cataloged Scientific POIs)
  - `shortest`
- **Interactive Elevation Profile & Reports:** Inspect elevation, slope, roughness, and risk along any route, then export mission plans as **GeoJSON**, **CSV**, or **PDF** (via `jsPDF`).

### Interactive 3D Simulators
1. **Mars Flight Simulator:** Fly the **Ingenuity Mars Scout** (coaxial rotorcraft) or **Ares Supersonic Wing** over Jezero Crater in chase or cockpit view with keyboard/touch flight controls, telemetry HUD, and Web Audio cues.
2. **Astronaut Rover Simulator:** Drive the **Perseverance Utility Chassis** along planned A\* corridors in Autopilot or Manual mode (`1x`, `5x`, `20x` time scale), monitoring slope, wheel RPM, power draw, battery/oxygen reserves, and UHF relay link status across presets or custom globe-picked endpoints.
3. **Satellite Orbital Transit Simulator:** Simulate sun-synchronous reconnaissance passes with **MRO**, **2001 Mars Odyssey**, or **Mars Global Surveyor** (`1x`–`200x` time scale) with chase, nadir, and horizon cameras, swath scanning, solar power, and downlink telemetry.

### NASA Imagery & Space Weather Integration
- **Mars Gallery:** Searchable photo browser powered by the **NASA Image and Video Library** (`images-api.nasa.gov`) with high-resolution asset manifest resolution and optional **NASA APOD** highlights.
- **Space Weather Context:** 30-day heliospheric CME, SEP, and notification alerts via **NASA DONKI** (`api.nasa.gov`).
- **Mars Trek Nomenclature Search:** Search planetary features via the NASA Mars Trek Solr index.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, CesiumJS (`cesium`), Lucide Icons, Motion, jsPDF
- **Backend:** Node.js, Express (`server.ts` serving Vite middleware in dev and static `dist/` in production)
- **External APIs Proxied by Server:**
  - NASA Mars Trek WMTS & Solr Index (`trek.nasa.gov`)
  - USGS Astrogeology Mars WMS (`planetarymaps.usgs.gov`)
  - NASA/JPL MMGIS Archives (`mars.nasa.gov/mmgis-maps`)
  - NASA Image and Video Library (`images-api.nasa.gov`)
  - NASA Open APIs — DONKI & APOD (`api.nasa.gov`)
  - NASA 3D Resources GLB Repository (`github.com/nasa/NASA-3D-Resources`)

---

## Project Structure

```text
├── server.ts                  # Express server, NASA/USGS proxies, caching & Cesium static assets
├── vite.config.ts             # Vite + Tailwind + Cesium static copy configuration
├── index.html                 # App entry HTML & font imports
├── src/
│   ├── App.tsx                # Main state orchestration, globe, drawers & simulator modes
│   ├── analysis/              # Elevation sampling, Horn slope/roughness, risk scoring & A* routing
│   ├── components/            # TopNav, MarsGlobe, Sidebars, BottomPanel, HUDs, Gallery & Modals
│   ├── data/                  # Layer configs, missions, locations, geology/POIs & simulator presets
│   ├── services/              # API clients (NASA images, DONKI, MMGIS, Trek) & PDF/CSV/GeoJSON export
│   ├── types/                 # TypeScript interfaces for Mars terrain, routes & simulators
│   └── utils/                 # Mars spherical coordinates, distance/bearing & surface synthesis
└── public/assets/             # Static assets
