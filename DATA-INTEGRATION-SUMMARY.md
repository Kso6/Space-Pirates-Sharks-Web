# Data Integration Summary

## Overview

This document describes the integration of real NASA satellite data into the GlobalSharks visualization platform.

## Data Files Integrated

### 1. SSHA (Sea Surface Height Anomaly) Data

**File:** `SSHA.10-day.20250102.bbox=85,2,-85,-3.csv`

- **Source:** NASA SWOT Mission (Surface Water and Ocean Topography)
- **Date:** January 2, 2025 (10-day composite)
- **Coverage:** Global ocean (bounding box: 85°N to -85°S, 2°E to -3°E)
- **Format:** CSV with columns: Latitude, Longitude, Data Value
- **Size:** ~60,000 data points
- **Units:** Centimeters (cm)
- **Data Range:** -34 to +28 cm (typical for SSH anomalies)
- **NoData Value:** -999

**Processing:**

- Parsed and filtered to remove NoData values (-999)
- Binned for time series visualization
- Statistical analysis (mean, std, min, max) calculated in real-time
- Displayed with "Real Data" badge in the satellite overlay

### 2. MODIS Data (Pending Integration)

**File:** `AQUA_MODIS.yXjCjfcS.20231201_20231231.L3m.MO.CHL.chlor_a.4km.nc.part`

- **Source:** NASA MODIS (Moderate Resolution Imaging Spectroradiometer)
- **Date:** December 2023 (monthly composite)
- **Parameter:** Chlorophyll-a concentration
- **Resolution:** 4km
- **Status:** File available, integration pending

### 3. Ocean Current Data (Pending Integration)

**File:** `ct5km_baa5_v3.1_20250101.nc`

- **Format:** NetCDF
- **Date:** January 1, 2025
- **Resolution:** 5km
- **Status:** File available, integration pending

## Changes Made to Satellite Page

### Removed Components

The following graphs were removed as they relied on unavailable shark activity and feeding event data:

1. **Temporal Trend Analysis** - Required feeding events over time
2. **SFI vs Shark Activity Correlation** - Required shark activity measurements
3. **Statistical Correlation Heatmap** - Required multi-variable correlation data
4. **Real-Time Data Feed** - Required streaming sensor data

### New Components Added

#### 1. Hypothetical Framework Component

Replaced the removed graphs with a comprehensive pipeline visualization showing:

- **4-Stage Pipeline:**

  1. Data Collection (Satellites & Sensors)
  2. Data Processing (QC & Feature Extraction)
  3. Model Integration (AI Analysis)
  4. Output & Validation (Results & Verification)

- **Conceptual Data Flow Diagram:**

  - Input Sources: Satellite Data, Tag Sensors, Environmental DB
  - Processing Layer: Ocean Conditions, Shark Behavior, SFI Score, Activity Level
  - Output Products: Feeding Hotspots, Probability Maps, Correlation Analysis, Time Series

- **Data Requirements Note:**
  Clear documentation of what additional data would be needed for full implementation:
  - Shark tag data (GPS, depth, acceleration, feeding timestamps)
  - Ground truth observations (sightings, fishing records)
  - Temporal coverage (multi-year datasets)
  - Environmental context (currents, prey abundance, bathymetry)

### UI Improvements

1. **Coordinate Text Color:** Changed from gray to white for better visibility on dark backgrounds
2. **Real Data Badge:** Added green "Real Data" indicator when actual SSHA data is displayed
3. **Enhanced Statistics:** Added real-time statistics display for SSHA data:
   - Data point count
   - Value range (min to max)
   - Standard deviation
   - Updated date

## Technical Implementation

### New Utility Functions

Created `src/utils/dataProcessing.js` with functions for:

- `parseSSHAData()` - Parse CSV and filter valid values
- `calculateStats()` - Compute statistical measures
- `binDataForTimeSeries()` - Bin data for time series visualization
- `sampleData()` - Sample large datasets for performance
- `sshaToHotspotProbability()` - Convert SSHA to foraging probability
- `calculateSFI()` - Compute Shark Foraging Index from environmental data

### Data Loading

- SSHA data loaded asynchronously on component mount
- Fallback to synthetic data if real data unavailable
- Loading state indicator during data fetch
- Error handling with console logging (non-blocking)

### Performance Optimizations

- Large dataset sampled to max 1000 points for rendering
- Data processing memoized with `useMemo`
- Async loading prevents UI blocking

## Data Quality Notes

### SSHA Data Quality

- **Valid Data Coverage:** ~20% of grid points have valid values
- **Spatial Distribution:** Valid data concentrated in latitudes 60-82°N
- **NoData Regions:** Polar regions and some coastal areas show -999 values
- **Typical for:** Satellite altimetry data with orbital coverage gaps

### Future Data Needs

For a complete operational system, the following data streams would be required:

1. **Real-time Shark Telemetry:**

   - Acoustic tags with depth/temperature sensors
   - Satellite tags with GPS positions
   - Accelerometer data for behavior classification
   - Feeding event detection algorithms

2. **Historical Observations:**

   - Multi-year shark tracking datasets
   - Visual survey data
   - Fishing/bycatch records
   - Known foraging locations

3. **Additional Environmental Layers:**
   - Sea surface temperature (SST)
   - Chlorophyll-a concentration
   - Ocean currents (U/V components)
   - Eddy kinetic energy (EKE)
   - Bathymetry and seafloor features

## Deployment Notes

- SSHA CSV file copied to `public/` folder for web access
- File also copied to `dist/` folder for production build
- Vite automatically serves files from public folder at root URL
- Total deployment size increase: ~955 KB

## Usage in Application

Users can now:

1. Select "NASA SWOT (SSH Anomaly)" from the data source dropdown
2. View real 2025 SSHA data with statistical information
3. See time series visualization of actual satellite measurements
4. Explore the hypothetical framework to understand full system architecture
5. Understand what additional data would enable complete implementation

## References

- NASA SWOT Mission: https://swot.jpl.nasa.gov/
- MODIS Ocean Color: https://oceancolor.gsfc.nasa.gov/
- Sea Surface Height Anomaly: Standard oceanographic measurement of deviation from mean sea level
- Shark Foraging Index (SFI): Custom metric developed for this project

## Contact

For questions about data integration or to contribute additional datasets, please see CONTRIBUTING.md
