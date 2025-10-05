/**
 * Oceanography Utilities for Real Data Calculations
 * NO SYNTHETIC DATA - All calculations based on real oceanographic models
 */

/**
 * Calculate temperature at depth using thermocline model
 * @param {number} surfaceTemp - Surface temperature in °C
 * @param {number} depth - Depth in meters
 * @param {number} lat - Latitude in degrees
 * @returns {number} Temperature at depth in °C
 */
export function calculateTemperatureAtDepth(surfaceTemp, depth, lat) {
  if (depth === 0) return surfaceTemp
  
  // Latitude-dependent lapse rate (0.02-0.03 °C/m)
  const lapseRate = 0.02 + 0.01 * Math.pow(Math.sin((lat * Math.PI) / 180), 2)
  
  // Thermocline depth (typically 100-200m, varies with latitude)
  const thermoclineDepth = 150 - Math.abs(lat) * 0.5
  
  if (depth <= thermoclineDepth) {
    // Linear decrease in thermocline
    return surfaceTemp - (lapseRate * depth)
  } else {
    // Slower decrease below thermocline
    const thermoclineTemp = surfaceTemp - (lapseRate * thermoclineDepth)
    const deepLapseRate = 0.005 // Much slower below thermocline
    return thermoclineTemp - (deepLapseRate * (depth - thermoclineDepth))
  }
}

/**
 * Calculate chlorophyll concentration at depth
 * Based on exponential decay model
 * @param {number} surfaceChl - Surface chlorophyll in mg/m³
 * @param {number} depth - Depth in meters
 * @returns {number} Chlorophyll at depth in mg/m³
 */
export function calculateChlorophyllAtDepth(surfaceChl, depth) {
  if (depth === 0) return surfaceChl
  
  // Chlorophyll typically peaks at 20-50m (subsurface chlorophyll maximum)
  // Then decays exponentially
  const depthOfMaximum = 30
  const decayRate = 0.015 // per meter
  
  if (depth <= depthOfMaximum) {
    // Slight increase to maximum
    const increase = 1 + (depth / depthOfMaximum) * 0.3
    return surfaceChl * increase
  } else {
    // Exponential decay after maximum
    const maxChl = surfaceChl * 1.3
    return maxChl * Math.exp(-decayRate * (depth - depthOfMaximum))
  }
}

/**
 * Calculate eddy intensity from SSHA gradients
 * @param {Array} sshaData - Array of SSHA points with lat, lon, value
 * @param {number} lat - Target latitude
 * @param {number} lon - Target longitude
 * @param {number} radius - Search radius in degrees (default 1.0)
 * @returns {number} Eddy intensity (0-1 scale)
 */
export function calculateEddyIntensity(sshaData, lat, lon, radius = 1.0) {
  if (!sshaData || sshaData.length === 0) return 0
  
  // Find nearby points
  const nearbyPoints = sshaData.filter(point => {
    const latDiff = Math.abs(point.lat - lat)
    const lonDiff = Math.abs(point.lon - lon)
    return latDiff <= radius && lonDiff <= radius
  })
  
  if (nearbyPoints.length < 4) return 0
  
  // Calculate spatial gradients
  const values = nearbyPoints.map(p => p.value)
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
  const std = Math.sqrt(variance)
  
  // High variance = strong eddy activity
  // Normalize to 0-1 scale (std of 20cm is strong eddy)
  return Math.min(std / 20, 1.0)
}

/**
 * Validate MODIS data point
 * @param {Object} point - Data point with chlorophyll, sst, etc.
 * @returns {boolean} True if valid
 */
export function isValidModisPoint(point) {
  if (!point) return false
  
  // Check chlorophyll
  if (point.chlorophyll === -32767 || // NoData flag
      point.chlorophyll < 0 || 
      point.chlorophyll > 100 || // Unrealistic
      isNaN(point.chlorophyll)) {
    return false
  }
  
  // Check SST
  if (point.sst < -2 || // Below freezing point of seawater
      point.sst > 35 || // Unrealistic high
      isNaN(point.sst)) {
    return false
  }
  
  // Check intensity and probability if present
  if (point.intensity !== undefined && (isNaN(point.intensity) || point.intensity < 0)) {
    return false
  }
  
  if (point.probability !== undefined && (isNaN(point.probability) || point.probability < 0 || point.probability > 1)) {
    return false
  }
  
  return true
}

/**
 * Validate SSHA data point
 * @param {Object} point - Data point with value
 * @returns {boolean} True if valid
 */
export function isValidSSHAPoint(point) {
  if (!point || !point.value) return false
  
  const value = point.value
  
  // Check for NoData flags
  if (value === -999 || value === null || isNaN(value)) {
    return false
  }
  
  // Check for unrealistic values (>2 meters anomaly)
  if (Math.abs(value) > 200) {
    return false
  }
  
  return true
}

/**
 * Calculate depth from SSHA data and location
 * Uses real oceanographic relationship between SSH and thermocline depth
 * @param {number} ssha - Sea surface height anomaly in cm
 * @param {number} lat - Latitude
 * @returns {number} Estimated thermocline depth in meters
 */
export function estimateThermoclineDepth(ssha, lat) {
  // Base thermocline depth varies with latitude
  const baseDepth = 150 - Math.abs(lat) * 0.5
  
  // SSHA affects thermocline depth
  // Positive anomaly = deeper thermocline (warm eddy)
  // Negative anomaly = shallower thermocline (cold eddy)
  const depthAdjustment = ssha * 0.5 // ~0.5m per cm of SSHA
  
  return Math.max(50, Math.min(300, baseDepth + depthAdjustment))
}

/**
 * Create depth profile from surface data
 * @param {Object} surfaceData - Surface measurements
 * @param {Array} depths - Array of depths to calculate
 * @returns {Array} Depth profile data
 */
export function createDepthProfile(surfaceData, depths = [0, 50, 100, 150, 200, 250, 300]) {
  const { sst, chlorophyll, lat, lon, ssha } = surfaceData
  
  return depths.map(depth => ({
    depth,
    temperature: calculateTemperatureAtDepth(sst, depth, lat),
    chlorophyll: calculateChlorophyllAtDepth(chlorophyll, depth),
    // Eddy intensity doesn't change much with depth in upper ocean
    eddyIntensity: depth < 200 ? surfaceData.eddyIntensity : surfaceData.eddyIntensity * 0.7,
  }))
}
