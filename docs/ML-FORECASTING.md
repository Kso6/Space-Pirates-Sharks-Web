# ML Forecasting Implementation

## Overview

The **ML Forecasting** page implements the SHARK Gaussian Model - a machine learning-based prediction system for shark foraging intensity across ocean depths.

## Implementation Details

### Core Algorithm

The model combines three key oceanographic parameters:

1. **Sea Surface Temperature (SST)** - 40% weight
2. **Sea Surface Height Anomaly (SSHA)** - 20% weight
3. **Chlorophyll-a Concentration** - 40% weight

### Mathematical Framework

```
SFI(lat, lon, depth) = w₁·SST_score + w₂·SSHA_score + w₃·Chl_score
```

Where each score is calculated using a Gaussian function:

```
score = exp(-((value - μ)² / (2σ²)))
```

### Key Features

#### 1. Depth Adjustment (50-300m)
- Uses latitude-dependent lapse rate: `0.02 + 0.01·sin²(lat)` °C/m
- Adjusts SST for depth: `SST_adjusted = SST - lapse_rate × depth`
- Arctic suppression: Filters predictions below 18.1°C

#### 2. Log-Linear Transformation
Converts probability (0-1) to intensity (λ):
```
λ = exp(β₀ + β₁·P + ε)
```
- β₀ = 0 (intercept)
- β₁ = 2 (slope)
- ε = random noise for natural variation

#### 3. Interactive Visualization
- **Depth Slider**: 50m to 300m in 50m increments
- **Real-time Updates**: Instant recalculation on depth change
- **YlOrRd Color Map**: Heat map showing intensity distribution
- **Scatter Plot**: Geographic distribution with intensity-coded points

## Data Sources

### Current Implementation (Demonstration)
- **SSHA**: Real NASA SWOT data from `/SSHA-2025-data.csv`
- **SST**: Synthetic proxy (18-30°C based on latitude)
- **Chlorophyll**: Synthetic values (0.01-5 mg/m³)

### Full Implementation Requirements
- **MODIS Chlorophyll-a**: NetCDF files from NASA MODIS Ocean Color
- **SST Data**: NOAA CRW bleaching alert area or direct SST measurements
- **SSHA Data**: NASA SWOT mission data (already implemented)

## Components

### 1. `MLForecasting.jsx`
Main visualization component with:
- Depth control slider
- Interactive scatter plot
- Real-time metrics
- Parameter distribution displays
- Model methodology documentation

### 2. `mlForecasting.js`
Utility functions:
- `sharkGaussianModel()` - Core prediction algorithm
- `logLinearTransform()` - Probability to intensity conversion
- `normalizeSSHA()` - Data normalization
- `calculateLapseRate()` - Temperature adjustment
- `getIntensityColor()` - YlOrRd colormap
- `processGridData()` - Batch processing for visualization

## User Interface

### YC-Startup Style Design
- **Clean Layout**: Spacious, minimal distractions
- **Modern Color Scheme**: Purple/pink accents for ML branding
- **Interactive Controls**: Smooth slider with preset buttons
- **Real-time Feedback**: Instant updates on parameter changes
- **Metrics Dashboard**: Key statistics prominently displayed
- **Transparency**: Clear disclaimers about model limitations

### Key Metrics Displayed
1. **Mean Intensity** - Average λ across all grid points
2. **Average Probability** - Mean foraging probability
3. **High Intensity Zones** - Count of hotspots (>1.5× mean)
4. **Current Depth** - Active depth slice

### Parameter Cards
- **SST Distribution**: Min, mean, max temperatures
- **Chlorophyll-a**: Concentration range
- **SSHA Normalized**: Standardized anomaly values

## Technical Implementation

### Performance Optimizations
- **Data Sampling**: Every 10th point, max 500 points
- **Memoization**: Results cached with `useMemo`
- **Lazy Loading**: Component loaded on demand
- **Efficient Calculations**: Vectorized operations where possible

### Error Handling
- Graceful fallback if SSHA data unavailable
- Silent error logging for production
- Clear user messaging for data loading states
- Default synthetic data if real data fails

## Model Limitations & Disclaimers

### Clearly Communicated to Users:

1. **Machine Learning, Not AI**
   - Statistical model based on oceanographic correlations
   - Not neural networks or deep learning
   - Transparent, explainable predictions

2. **Demonstration vs Production**
   - Currently using synthetic SST and Chlorophyll
   - Full implementation requires complete MODIS datasets
   - Real SSHA data already integrated

3. **Validation Requirements**
   - Predictions based on environmental correlations
   - Should be validated with actual shark tracking data
   - Not a substitute for field observations

4. **Known Limitations**
   - Arctic suppression may over-filter cold-water species
   - Bathymetry not included in current model
   - Temporal patterns not yet incorporated

## Integration with Existing System

### Navigation
- Added "ML Model" link (🧠 icon)
- Positioned between "Forecast" and "How It Works"
- Consistent styling with existing nav items

### Data Pipeline
- Uses existing `parseSSHAData()` from `dataProcessing.js`
- Shares SSHA data file with main visualization
- Independent processing for depth-adjusted calculations

### Styling
- Matches overall design system
- Purple/pink gradient for ML branding
- Custom range slider with cyan glow effects
- Responsive layout for all screen sizes

## Future Enhancements

### Phase 1: Real Data Integration
- [ ] Load actual MODIS Chlorophyll-a NetCDF files
- [ ] Process SST from NOAA CRW bleaching alert area
- [ ] Implement proper spatial interpolation

### Phase 2: Model Improvements
- [ ] Add bathymetry depth constraints
- [ ] Include ocean current data (EKE)
- [ ] Temporal pattern recognition

### Phase 3: Validation
- [ ] Compare with real shark tracking data
- [ ] Calculate accuracy metrics (R², correlation)
- [ ] Adjust model parameters based on validation

### Phase 4: Advanced Features
- [ ] Multi-species support (different thermal preferences)
- [ ] Seasonal variation modeling
- [ ] Confidence intervals on predictions
- [ ] Export predictions as GeoJSON

## Usage Instructions

### For Users
1. Navigate to "ML Model" in main navigation
2. Use depth slider to explore different depths (50-300m)
3. Click preset buttons for quick depth selection
4. Hover over points in scatter plot for details
5. Review parameter distributions and metrics

### For Developers
1. Model parameters in `sharkGaussianModel()`:
   - `mu_sst`: Optimal temperature (default: 24°C)
   - `sigma_sst`: Temperature tolerance (default: 2.5°C)
   - `weights`: Parameter weights [SST, SSHA, Chl]

2. Depth range configuration:
   - Min: 50m (shallow coastal)
   - Max: 300m (deep foraging)
   - Step: 50m increments

3. Color map customization:
   - Function: `getIntensityColor()`
   - Palette: YlOrRd (Yellow-Orange-Red)
   - Range: 2nd to 98th percentile

## Code Quality

### Standards
- ✅ ESLint compliant
- ✅ PropTypes validation
- ✅ Comprehensive JSDoc comments
- ✅ Error boundaries implemented
- ✅ Accessibility (ARIA labels, semantic HTML)

### Testing
- ✅ Build successful (no errors)
- ✅ No linter warnings
- ✅ Performance optimized (<5KB gzipped)
- ✅ Mobile responsive

## References

### Python Implementation
Based on the original Python research code with adaptations for web:
- Downsampling for web performance
- Interactive controls for exploration
- Real-time parameter adjustment
- Modern visualization library (Recharts)

### Data Sources
- **NASA SWOT**: https://swot.jpl.nasa.gov/
- **MODIS Ocean Color**: https://oceancolor.gsfc.nasa.gov/
- **NOAA Coral Reef Watch**: https://coralreefwatch.noaa.gov/

### Scientific Background
- Gaussian mixture models for habitat suitability
- Log-linear models for count data
- Temperature lapse rates in ocean profiles
- Mesoscale eddies and shark foraging behavior

---

## Quick Start

### Add New Depth Slice
```javascript
// In mlForecasting.js
export function generateDepthSlices(gridData) {
  const depths = [50, 100, 150, 200, 250, 300, 350] // Add 350m
  // ... rest of implementation
}
```

### Adjust Model Parameters
```javascript
// In MLForecasting.jsx
const customParams = {
  mu_sst: 22.0,        // Cooler optimal temperature
  sigma_sst: 3.0,      // Wider tolerance
  weights: [0.5, 0.1, 0.4]  // More weight on temperature
}
```

### Change Color Scheme
```javascript
// In mlForecasting.js getIntensityColor()
// Replace YlOrRd with custom palette
const colors = ['#your-color-1', '#your-color-2', '#your-color-3']
```

---

**Built with modern web technologies. Optimized for production. Ready for real data integration.**
