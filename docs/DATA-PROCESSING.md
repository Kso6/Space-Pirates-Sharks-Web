# 📊 Data Processing Pipeline - Sharks from Space

> **ETL Workflow & Visualization Architecture**  
> From Raw NASA Data to Interactive 3D Visualizations

---

## 🔄 Overview

This document details the complete data processing pipeline that transforms raw NASA satellite data into the interactive visualizations and predictions shown on the Sharks from Space platform.

**Key Components:**

1. Data Acquisition (NASA APIs)
2. Preprocessing & Quality Control
3. SFI Model Calculation
4. Visualization Generation
5. Real-Time Updates

---

## 📥 Data Acquisition

### NASA Data Sources

#### SWOT (Sea Surface Height Anomaly)

**File Format:** NetCDF (.nc)  
**Example:** `ct5km_baa5_v3.1_20250101.nc` (682 KB)  
**Alternative:** CSV export (`SSHA.10-day.20250102.bbox=85,2,-85,-3.csv`, 60,878 rows)

**Key Variables:**

- `ssha` - Sea Surface Height Anomaly (meters)
- `latitude`, `longitude` - Geolocation
- `time` - Timestamp (UTC)
- `quality_flag` - Data quality indicator

#### MODIS (Chlorophyll-a)

**File Format:** NetCDF (.nc)  
**Example:** `AQUA_MODIS.*.20231201_20231231.L3m.MO.CHL.chlor_a.4km.nc` (10 MB)

**Key Variables:**

- `chlor_a` - Chlorophyll-a concentration (mg/m³)
- `lat`, `lon` - Geographic coordinates (4km resolution)
- `palette` - Color palette for visualization

#### PACE (Phytoplankton Functional Types)

**File Format:** NetCDF (.nc)  
**Status:** Framework ready, using MODIS for validation

**Key Variables:**

- `chlor_a` - Enhanced chlorophyll estimate
- `pft` - Phytoplankton functional types
- `poc` - Particulate organic carbon

---

## 🧹 Preprocessing & Quality Control

### Step 1: File Reading

**JavaScript/Node.js (Browser):**

```javascript
// See src/utils/dataProcessing.js

export async function loadSSHAData(filePath) {
  const response = await fetch(filePath)
  const text = await response.text()

  // Parse CSV
  const lines = text.split('\n')
  const headers = lines[0].split(',')

  const data = lines.slice(1).map((line) => {
    const values = line.split(',')
    return {
      time: new Date(values[0]),
      latitude: parseFloat(values[1]),
      longitude: parseFloat(values[2]),
      ssha: parseFloat(values[3]),
      quality: values[4],
    }
  })

  return data
}
```

### Step 2: Quality Control

**Filters Applied:**

1. **Remove invalid data:** Invalid values, missing coordinates
2. **Outlier detection:** |SSHA| > 2.0 m removed (likely errors)
3. **Spatial bounds:** Keep only study region
4. **Temporal range:** Last 30 days for predictions

**Code:**

```javascript
export function qualityControlFilter(data) {
  return data.filter((point) => {
    // Valid SSHA range: ±2.0 meters
    if (Math.abs(point.ssha) > 2.0) return false

    // Valid latitude/longitude
    if (isNaN(point.latitude) || isNaN(point.longitude)) return false

    // Quality flag must be 'good' or 'acceptable'
    if (!['good', 'acceptable'].includes(point.quality)) return false

    // Within study bounds
    const inBounds =
      point.latitude >= -90 &&
      point.latitude <= 90 &&
      point.longitude >= -180 &&
      point.longitude <= 180

    return inBounds
  })
}
```

### Step 3: Spatial Interpolation

**Purpose:** Fill gaps in satellite coverage (clouds, gaps between passes)

**Method:** Inverse Distance Weighting (IDW)

**Code:**

```javascript
export function interpolateGrid(data, resolution = 0.1) {
  // Create regular grid
  const latRange = [-5, 5] // Adjust to region
  const lonRange = [-90, -80]

  const grid = []

  for (let lat = latRange[0]; lat <= latRange[1]; lat += resolution) {
    for (let lon = lonRange[0]; lon <= lonRange[1]; lon += resolution) {
      const value = idwInterpolation(data, lat, lon, (radius = 0.5))
      grid.push({ lat, lon, value })
    }
  }

  return grid
}

function idwInterpolation(data, targetLat, targetLon, radius) {
  // Find nearby points within radius
  const nearby = data.filter((p) => {
    const dist = haversineDistance(p.latitude, p.longitude, targetLat, targetLon)
    return dist <= radius
  })

  if (nearby.length === 0) return null

  // IDW formula: value = Σ(wi * vi) / Σ(wi), where wi = 1/di²
  let sumWeightedValues = 0
  let sumWeights = 0

  nearby.forEach((p) => {
    const dist = haversineDistance(p.latitude, p.longitude, targetLat, targetLon)
    const weight = dist === 0 ? 1e10 : 1 / (dist * dist)
    sumWeightedValues += weight * p.ssha
    sumWeights += weight
  })

  return sumWeightedValues / sumWeights
}
```

### Step 4: Temporal Binning

**Purpose:** Create time series from irregular satellite passes

**Code:**

```javascript
export function binDataForTimeSeries(data, bins = 24) {
  // Bin by day (for 10-day period, bins=10)
  const timeRange = [
    Math.min(...data.map((d) => d.time.getTime())),
    Math.max(...data.map((d) => d.time.getTime())),
  ]

  const binSize = (timeRange[1] - timeRange[0]) / bins

  const binned = Array.from({ length: bins }, (_, i) => {
    const binStart = timeRange[0] + i * binSize
    const binEnd = binStart + binSize

    // Find all data points in this bin
    const pointsInBin = data.filter((d) => {
      const t = d.time.getTime()
      return t >= binStart && t < binEnd
    })

    // Calculate mean for this bin
    const meanValue =
      pointsInBin.length > 0
        ? pointsInBin.reduce((sum, p) => sum + p.ssha, 0) / pointsInBin.length
        : null

    return {
      day: i + 1,
      time: new Date(binStart),
      value: meanValue,
      count: pointsInBin.length,
    }
  })

  return binned
}
```

---

## 🧮 SFI Model Calculation

### Component Functions

**Prey Availability Component (45%):**

```javascript
function calculatePreyComponent(chlorophyll, depth, mixedLayerDepth = 100) {
  // Depth-scaled chlorophyll with trophic transfer
  const depthScale = Math.exp(-depth / mixedLayerDepth)
  const trophicAdjustment = 1 - 0.8 * (1 - Math.exp(-depth / 200))

  return chlorophyll * depthScale * trophicAdjustment
}
```

**Temperature Suitability Component (30%):**

```javascript
function calculateTempComponent(temperature, optimalTemp = 23, sigma = 5) {
  // Gaussian thermal preference
  const diff = temperature - optimalTemp
  return Math.exp(-(diff * diff) / (2 * sigma * sigma))
}
```

**Eddy Energy Component (25%):**

```javascript
function calculateEddyComponent(ssha, depth, eddyDepth = 100, sigmaZ = 150) {
  // Eddy kinetic energy with vertical structure
  const eke = Math.abs(ssha) // Proportional to SSHA magnitude
  const verticalDecay = Math.exp(-Math.pow(depth - eddyDepth, 2) / (2 * sigmaZ * sigmaZ))

  return eke * verticalDecay
}
```

**Combined SFI:**

```javascript
export function calculateSFI(params) {
  const { chlorophyll, temperature, ssha, depth } = params

  const preyComponent = calculatePreyComponent(chlorophyll, depth)
  const tempComponent = calculateTempComponent(temperature)
  const eddyComponent = calculateEddyComponent(ssha, depth)

  // Weighted combination
  const sfi = 0.45 * preyComponent + 0.3 * tempComponent + 0.25 * eddyComponent

  return {
    sfi,
    components: {
      prey: preyComponent,
      temperature: tempComponent,
      eddy: eddyComponent,
    },
  }
}
```

### Normalization

**Purpose:** Scale all values to 0-1 range for visualization

```javascript
export function normalize(values, min = null, max = null) {
  // Auto-detect min/max if not provided
  if (min === null) min = Math.min(...values)
  if (max === null) max = Math.max(...values)

  const range = max - min
  if (range === 0) return values.map(() => 0.5)

  return values.map((v) => (v - min) / range)
}

// Example usage:
const depthProfile = Array.from({ length: 20 }, (_, i) => {
  const depth = i * 50 // 0-1000m
  const temp = 25 - depth * 0.02 // Decreases with depth
  const chl = 5 * Math.exp(-depth / 100) // Exponential decay
  const eddy = Math.exp(-Math.pow(depth - 100, 2) / 10000) // Peak at 100m

  return {
    depth,
    temperature: normalize([temp], 0, 30)[0], // Normalize to 0-1
    chlorophyll: normalize([chl], 0, 10)[0],
    eddyIntensity: normalize([eddy], 0, 1)[0],
    sfi: calculateSFI({ chlorophyll: chl, temperature: temp, ssha: eddy, depth }).sfi,
  }
})
```

---

## 📊 Visualization Generation

### 3D Ocean Profile

**Left Graph: SFI Score with Bubble Size**

```jsx
<ScatterChart>
  <XAxis dataKey="depth" label="Depth (m)" />
  <YAxis dataKey="sfi" label="SFI Score (0-1)" domain={[0, 1]} />
  <ZAxis dataKey="sfi" range={[50, 500]} /> {/* Bubble size */}
  <Scatter name="SFI Score" data={depthProfile} fill="#8884d8" />
</ScatterChart>
```

**Right Graph: 3 Indicators Combined**

```jsx
<ComposedChart data={depthProfile}>
  <XAxis dataKey="depth" label="Depth (m)" />
  <YAxis label="Normalized Value (0-1)" domain={[0, 1]} />

  <Area type="monotone" dataKey="chlorophyll" fill="#10b981" fillOpacity={0.3} />
  <Line type="monotone" dataKey="temperature" stroke="#3b82f6" strokeWidth={2} />
  <Line type="monotone" dataKey="eddyIntensity" stroke="#8b5cf6" strokeWidth={2} />

  <Legend />
  <Tooltip />
</ComposedChart>
```

### Foraging Hotspot Map

**Point Cloud Visualization:**

```jsx
// See src/pages/DataVisualization.jsx

// Process SSHA data into point cloud
const pointCloudData = sshaData.map(point => ({
  x: point.longitude,
  y: point.latitude,
  value: Math.abs(point.ssha), // Magnitude for color
  size: 5 // Point size
}))

// Render with Recharts
<ScatterChart>
  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
  <XAxis
    dataKey="x"
    label="Longitude"
    domain={['dataMin', 'dataMax']}
  />
  <YAxis
    dataKey="y"
    label="Latitude"
    domain={['dataMin', 'dataMax']}
  />
  <ZAxis dataKey="value" range={[20, 200]} />

  <Tooltip
    content={({payload}) => {
      if (!payload || !payload.length) return null
      const point = payload[0].payload
      return (
        <div className="bg-slate-800 p-3 rounded border border-white/20">
          <p>Lat: {point.y.toFixed(2)}°</p>
          <p>Lon: {point.x.toFixed(2)}°</p>
          <p>SSHA: {point.value.toFixed(3)} m</p>
        </div>
      )
    }}
  />

  <Scatter
    name="SWOT SSHA Data"
    data={pointCloudData}
    fill="#3b82f6"
    fillOpacity={0.6}
  />
</ScatterChart>
```

### Time Series

**Day-Based (Not Year-Based):**

```jsx
const timeSeriesData = binDataForTimeSeries(sshaData, 10) // 10 days

<LineChart data={timeSeriesData}>
  <XAxis
    dataKey="day"
    label="Day"
    domain={[1, 10]}
  />
  <YAxis label="SSHA (m)" />

  <Line
    type="monotone"
    dataKey="value"
    stroke="#3b82f6"
    strokeWidth={2}
    dot={{r: 4}}
  />

  <Tooltip
    labelFormatter={(day) => `Day ${day}`}
    formatter={(value) => [`${value.toFixed(3)} m`, 'SSHA']}
  />
</LineChart>
```

---

## 🚀 Real-Time Updates

### Data Refresh Workflow

**Every 6 Hours:**

1. Check NASA APIs for new data
2. Download updated NetCDF files
3. Run preprocessing pipeline
4. Recalculate SFI model
5. Update visualizations
6. Cache results (Redis/localStorage)

**Implementation (Pseudo-code):**

```javascript
// Automated data refresh (server-side)
setInterval(async () => {
  console.log('Checking for new NASA data...')

  // Check SWOT
  const newSWOTData = await fetchLatestSWOTData()
  if (newSWOTData.timestamp > lastUpdate.swot) {
    console.log('New SWOT data available!')
    await processSWOTData(newSWOTData)
    lastUpdate.swot = newSWOTData.timestamp
  }

  // Check MODIS
  const newMODISData = await fetchLatestMODISData()
  if (newMODISData.timestamp > lastUpdate.modis) {
    console.log('New MODIS data available!')
    await processMODISData(newMODISData)
    lastUpdate.modis = newMODISData.timestamp
  }

  // Recalculate SFI
  console.log('Recalculating SFI predictions...')
  const updatedPredictions = await calculateGlobalSFI()

  // Update cache
  await updateCache(updatedPredictions)

  console.log('Data refresh complete!')
}, 6 * 60 * 60 * 1000) // 6 hours in milliseconds
```

---

## 🎯 Performance Optimization

### Client-Side

**useMemo for Expensive Calculations:**

```jsx
const depthProfile = useMemo(() => {
  console.log('Calculating depth profile...')
  return Array.from({ length: 20 }, (_, i) => {
    // ... calculations ...
  })
}, []) // Empty deps = calculate once
```

**Lazy Loading:**

```jsx
const DataVisualization = lazy(() => import('./pages/DataVisualization'))

// In router:
<Suspense fallback={<LoadingSpinner />}>
  <DataVisualization />
</Suspense>
```

**Throttle Updates:**

```javascript
import { throttle } from 'lodash'

const handleChartHover = throttle((event) => {
  // Update tooltip
}, 100) // Max 10 updates/second
```

### Server-Side

**Caching Strategy:**

- Raw data: Cache for 6 hours (Redis)
- Processed data: Cache for 1 hour
- SFI predictions: Cache for 30 minutes
- Static assets: CDN (Netlify), cache forever

**Compression:**

- NetCDF → CSV conversion (smaller file size)
- Gzip compression for API responses
- Image optimization (WebP format)

---

## 📁 Data Storage

### File Organization

```
data/
├── raw/
│   ├── swot/
│   │   ├── ct5km_baa5_v3.1_20250101.nc
│   │   └── SSHA.10-day.20250102.csv (exported)
│   ├── modis/
│   │   └── AQUA_MODIS.20231201_20231231.L3m.MO.CHL.chlor_a.4km.nc
│   └── pace/
│       └── [future PACE data]
├── processed/
│   ├── ssha_grid_20250102.json
│   ├── chlor_interpolated_20231201.json
│   └── sfi_predictions_20250105.json
└── cache/
    ├── hotspots_20250105.json
    └── time_series_20250105.json
```

### Database Schema (Future Enhancement)

```sql
-- Satellite data table
CREATE TABLE satellite_data (
  id SERIAL PRIMARY KEY,
  mission VARCHAR(10), -- 'SWOT', 'MODIS', 'PACE'
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  timestamp TIMESTAMP,
  parameter VARCHAR(50), -- 'ssha', 'chlor_a', 'sst'
  value DECIMAL(10,4),
  quality_flag VARCHAR(20)
);

-- SFI predictions table
CREATE TABLE sfi_predictions (
  id SERIAL PRIMARY KEY,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  depth INTEGER,
  timestamp TIMESTAMP,
  sfi_score DECIMAL(4,3),
  prey_component DECIMAL(4,3),
  temp_component DECIMAL(4,3),
  eddy_component DECIMAL(4,3)
);

-- Spatial index for fast queries
CREATE INDEX idx_spatial ON sfi_predictions
USING GIST (ST_MakePoint(longitude, latitude));
```

---

## 🛠️ Utility Functions

All data processing utilities are located in:
**`src/utils/dataProcessing.js`**

**Key Functions:**

- `loadSSHAData(filePath)` - Load and parse SSHA CSV
- `qualityControlFilter(data)` - Remove invalid data
- `binDataForTimeSeries(data, bins)` - Create time series
- `calculateSFI(params)` - Compute Shark Foraging Index
- `normalize(values, min, max)` - Normalize to 0-1 range
- `haversineDistance(lat1, lon1, lat2, lon2)` - Geographic distance

---

## 📚 References

**Geospatial Processing:**

- GeoJSON specification: https://geojson.org/
- NetCDF documentation: https://www.unidata.ucar.edu/software/netcdf/
- GDAL tools: https://gdal.org/

**Visualization Libraries:**

- Recharts: https://recharts.org/
- Three.js: https://threejs.org/
- D3.js: https://d3js.org/

**NASA Data APIs:**

- PO.DAAC: https://podaac.jpl.nasa.gov/
- Ocean Color: https://oceancolor.gsfc.nasa.gov/
- Earthdata: https://www.earthdata.nasa.gov/

---

<div align="center">

## 📊 From Raw Data to Predictions: The Pipeline That Saves Sharks 🦈

**Made with ❤️ by Team Space Pirates**  
NASA Space Apps Challenge 2025

[🌐 Live Demo](https://sharks-from-space.netlify.app) • [📋 Documentation](./DOCUMENTATION.md) • [🛰️ NASA Integration](./NASA-DATA-INTEGRATION.md)

</div>
