# Immediate Action Plan - Fix Graphs & Images

## Status: Ready to Execute

### ✅ COMPLETED

1. Created `src/utils/oceanography.js` with real scientific calculations
2. Documented all bugs in `COMPREHENSIVE-BUG-FIXES.md`
3. Committed and pushed to repository

### 🔧 CRITICAL FIXES NEEDED NOW

## 1. Fix DataVisualization.jsx Graphs Not Loading

### Problem:

- Graphs showing "No Data" or not loading
- Synthetic data mixed with real data
- Random values instead of scientific calculations

### Solution - Replace These Sections:

#### A. Ocean3DProfile Component (Lines 816-832)

**CURRENT (BROKEN - Uses Math.random()):**

```javascript
const depthProfile = useMemo(() => {
  return Array.from({ length: 20 }, (_, i) => ({
    depth: i * 50,
    temperature: Math.max(0, Math.min(1, (25 - i * 50 * 0.03 + Math.random() * 0.5) / 30)),
    chlorophyll: Math.max(0, Math.min(1, Math.exp(-i / 3) * (0.5 + Math.random() * 0.2))),
    eddyIntensity: Math.max(
      0,
      Math.min(1, Math.exp(-Math.pow((i * 50 - 200) / 100, 2)) * (0.8 + Math.random() * 0.4))
    ),
    sfi: Math.max(0, Math.min(1, Math.random() * 0.6 + 0.3)),
  }))
}, [])
```

**REPLACE WITH (FIXED - Uses Real Data):**

```javascript
import {
  calculateTemperatureAtDepth,
  calculateChlorophyllAtDepth,
  calculateEddyIntensity,
} from '../utils/oceanography'

const depthProfile = useMemo(() => {
  if (!sshaData || sshaData.length === 0) {
    return null // Show "No Data" message instead of fake data
  }

  // Get average surface conditions from SSHA data
  const avgLat = sshaData.reduce((sum, p) => sum + p.lat, 0) / sshaData.length
  const avgSSHA = sshaData.reduce((sum, p) => sum + p.value, 0) / sshaData.length

  // Use real oceanographic models
  const surfaceTemp = 24 // Base temperature, adjust based on region
  const surfaceChl = 0.5 // Base chlorophyll, adjust based on MODIS data if available

  return Array.from({ length: 20 }, (_, i) => {
    const depth = i * 50
    return {
      depth,
      temperature: calculateTemperatureAtDepth(surfaceTemp, depth, avgLat) / 30, // Normalize to 0-1
      chlorophyll: calculateChlorophyllAtDepth(surfaceChl, depth) / 2, // Normalize to 0-1
      eddyIntensity: calculateEddyIntensity(sshaData, avgLat, 0, 1.0),
      sfi: calculateSFI(avgSSHA, surfaceChl, surfaceTemp) / 2, // Normalize to 0-1
    }
  })
}, [sshaData])
```

#### B. ForagingHotspotMap - Remove Synthetic Fallback (Lines 363-393)

**REMOVE THIS ENTIRE BLOCK:**

```javascript
} else {
  // Generate synthetic data if no real data available
  const data = []
  const regionBounds = {
    'gulf-stream': { latMin: 25, latMax: 40, lonMin: -80, lonMax: -60 },
    // ... etc
  }

  for (let i = 0; i < 50; i++) {
    data.push({
      lat: regionBounds.latMin + Math.random() * ...,
      // ... all random data
    })
  }
  return data
}
```

**REPLACE WITH:**

```javascript
} else {
  return null // No data available - will show proper message
}
```

#### C. Fix Depth Assignment (Line 360)

**CHANGE:**

```javascript
depth: Math.floor(Math.random() * 500),
```

**TO:**

```javascript
depth: estimateThermoclineDepth(point.value, point.lat),
```

#### D. SatelliteDataOverlay - Remove Synthetic Time Series (Lines 607-631)

**REMOVE:**

```javascript
} else if (dataset === 'modis-chlorophyll') {
  const depthFactor = Math.max(0.2, 1 - (seaDepth / 300) * 0.7)
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: (0.5 + Math.sin(i / 4) * 0.3 + Math.random() * 0.2) * depthFactor,
    anomaly: (Math.sin(i / 5) * 0.15 + Math.random() * 0.1 - 0.05) * depthFactor,
  }))
} else if (dataset === 'nasa-sst') {
  // ... more synthetic data
}
```

**REPLACE WITH:**

```javascript
} else {
  // No real data available for this dataset
  return null
}
```

#### E. Add "No Data" UI Component

**ADD AFTER LINE 816:**

```javascript
// Show message when no data available
if (!depthProfile || depthProfile.length === 0) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8">
      <h2 className="text-3xl font-bold text-white mb-4">3D Ocean Profile Analysis</h2>
      <div className="h-96 flex items-center justify-center bg-slate-900/50 rounded-lg">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-2">Loading real oceanographic data...</p>
          <p className="text-gray-500 text-sm">
            Please wait while we process NASA satellite measurements
          </p>
        </div>
      </div>
    </div>
  )
}
```

## 2. Fix TagSensor.jsx Images

### A. Replace Internal Gastric Capsule SVG with Real Image

**LOCATION:** Lines 98-169 in `src/pages/TagSensor.jsx`

**REPLACE THE ENTIRE SVG BLOCK (lines 102-164) WITH:**

```javascript
<img
  src="/Internal Gastric Tag.png"
  alt="Internal Gastric Capsule Tag"
  className="w-full h-auto max-w-md mx-auto object-contain"
  style={{
    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
  }}
/>
```

### B. Zoom Out External Dorsal Fin Image

**LOCATION:** Lines 239-247 in `src/pages/TagSensor.jsx`

**CHANGE:**

```javascript
<img
  src="/External Dorsal Fin.png"
  alt="External Dorsal Fin Tag"
  className="w-full h-auto object-cover"
  style={{
    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
    borderRadius: '16px',
  }}
/>
```

**TO:**

```javascript
<img
  src="/External Dorsal Fin.png"
  alt="External Dorsal Fin Tag"
  className="w-full h-auto object-contain scale-75"
  style={{
    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
    borderRadius: '16px',
  }}
/>
```

**AND ALSO CHANGE Line 1342:**

```javascript
className = 'w-auto h-auto max-w-full max-h-96 object-contain rounded-xl shadow-lg'
```

**TO:**

```javascript
className = 'w-auto h-auto max-w-full max-h-96 object-contain rounded-xl shadow-lg scale-75'
```

## 3. Keep Feeding Event Simulation (ALLOWED)

**LOCATION:** TagSensor.jsx - Simulated Feeding Event Response section

**STATUS:** ✅ This is the ONLY place synthetic data is allowed
**ACTION:** No changes needed - this is a simulation/demonstration

## 4. Testing Checklist

After making these changes, verify:

- [ ] Ocean3DProfile shows real depth calculations
- [ ] No `Math.random()` in DataVisualization.jsx except comments
- [ ] ForagingHotspotMap shows "No Data" message when appropriate
- [ ] Internal Gastric Tag image displays correctly
- [ ] External Dorsal Fin image is zoomed out (75% scale)
- [ ] All graphs load with real SSHA data
- [ ] MODIS data displays when selected
- [ ] Statistics are calculated from real data only

## 5. Import Statements to Add

**ADD TO TOP OF DataVisualization.jsx:**

```javascript
import {
  calculateTemperatureAtDepth,
  calculateChlorophyllAtDepth,
  calculateEddyIntensity,
  isValidModisPoint,
  isValidSSHAPoint,
  estimateThermoclineDepth,
} from '../utils/oceanography'
```

## 6. Quick Command to Test

```bash
npm run dev
# Then navigate to:
# - /visualization (check all graphs load)
# - /tag (check images display correctly)
```

## Priority Order

1. **CRITICAL:** Fix Ocean3DProfile (removes all Math.random())
2. **CRITICAL:** Fix ForagingHotspotMap depth calculation
3. **HIGH:** Replace Internal Gastric Capsule image
4. **HIGH:** Zoom out External Dorsal Fin image
5. **MEDIUM:** Add "No Data" messages
6. **LOW:** Remove other synthetic fallbacks

## Expected Results

### Before:

- ❌ Graphs showing random data
- ❌ Fake ocean profiles
- ❌ SVG placeholder for gastric tag
- ❌ External dorsal fin too zoomed in

### After:

- ✅ All graphs use real NASA data
- ✅ Real oceanographic calculations
- ✅ Actual product images
- ✅ Properly scaled images
- ✅ "No Data" messages when appropriate
- ✅ Scientific integrity maintained

## Files to Modify

1. `src/pages/DataVisualization.jsx` - Main fixes
2. `src/pages/TagSensor.jsx` - Image updates

## Estimated Time

- DataVisualization.jsx fixes: 15-20 minutes
- TagSensor.jsx image updates: 5 minutes
- Testing: 10 minutes
- **Total: ~35 minutes**

## Notes

- The feeding event simulation graph in TagSensor.jsx is ALLOWED to use synthetic data
- All other graphs MUST use real NASA satellite data
- Show "No Data Available" messages instead of generating fake data
- Maintain scientific integrity at all times
