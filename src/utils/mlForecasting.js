/**
 * Machine Learning Forecasting Utilities
 * Implements the SHARK Gaussian Model for predicting shark foraging intensity
 * Based on MODIS Chlorophyll, SST Proxy, and SSHA data
 */

/**
 * Calculate latitude-based temperature lapse rate
 * @param {number} lat - Latitude in degrees
 * @returns {number} Lapse rate in °C/m
 */
export function calculateLapseRate(lat) {
  return 0.02 + 0.01 * Math.pow(Math.sin((lat * Math.PI) / 180), 2)
}

/**
 * Normalize SSHA data to 0-100 scale
 * @param {Array} sshaData - Raw SSHA values
 * @returns {Object} Normalized data with mean and std
 */
export function normalizeSSHA(sshaData) {
  const validValues = sshaData.filter((v) => v !== null && !isNaN(v) && v !== -999)

  if (validValues.length === 0) {
    return { normalized: sshaData, mean: 0, std: 1 }
  }

  const mean = validValues.reduce((sum, v) => sum + v, 0) / validValues.length
  const variance =
    validValues.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / validValues.length
  const std = Math.sqrt(variance)

  const normalized = sshaData.map((v) => {
    if (v === null || isNaN(v) || v === -999) return null
    return ((v - mean) / std) * 50 + 50
  })

  return { normalized, mean, std }
}

/**
 * Calculate Gaussian score for a given parameter
 * @param {number} value - Input value
 * @param {number} mu - Mean/optimal value
 * @param {number} sigma - Standard deviation
 * @returns {number} Score between 0 and 1
 */
function gaussianScore(value, mu, sigma) {
  if (value === null || isNaN(value)) return 0
  return Math.exp(-Math.pow(value - mu, 2) / (2 * Math.pow(sigma, 2)))
}

/**
 * SHARK Gaussian Model - ML-based prediction of shark foraging intensity
 * @param {Object} params - Input parameters
 * @param {number} params.sst - Sea Surface Temperature (°C)
 * @param {number} params.ssha - Normalized Sea Surface Height Anomaly
 * @param {number} params.chlorophyll - Chlorophyll-a concentration (mg/m³)
 * @param {number} params.lat - Latitude
 * @param {number} params.depth - Depth adjustment in meters (50-300)
 * @param {Object} params.modelParams - Model parameters
 * @returns {number} Shark foraging intensity (0-1)
 */
export function sharkGaussianModel({
  sst,
  ssha,
  chlorophyll,
  lat,
  depth = 80,
  modelParams = {
    mu_sst: 24.0,
    sigma_sst: 2.5,
    mu_ssha: 50.0,
    sigma_ssha: 30.0,
    mu_chl: 0.5,
    sigma_chl: 0.3,
    weights: [0.4, 0.2, 0.4], // [SST, SSHA, Chlorophyll]
  },
}) {
  // Handle invalid inputs
  if (sst === null || ssha === null || chlorophyll === null) return 0
  if (isNaN(sst) || isNaN(ssha) || isNaN(chlorophyll)) return 0

  // Log-transform chlorophyll (handle very small values)
  const chl_log = Math.log(Math.max(chlorophyll, 1e-3))

  // Calculate depth-adjusted SST using lapse rate
  const lapseRate = calculateLapseRate(lat)
  const sst_adjusted = sst - lapseRate * depth

  // Arctic suppression: filter out cold waters (below 18.1°C)
  if (sst_adjusted <= 18.1) return 0

  // Calculate individual parameter scores
  const sst_score = gaussianScore(sst_adjusted, modelParams.mu_sst, modelParams.sigma_sst)
  const ssha_score = gaussianScore(ssha, modelParams.mu_ssha, modelParams.sigma_ssha)
  const chl_score = gaussianScore(chl_log, Math.log(modelParams.mu_chl), modelParams.sigma_chl)

  // Weighted combination
  const Bp =
    modelParams.weights[0] * sst_score +
    modelParams.weights[1] * ssha_score +
    modelParams.weights[2] * chl_score

  // Clip to [0, 1]
  return Math.max(0, Math.min(1, Bp))
}

/**
 * Apply log-linear transformation to convert probability to intensity
 * @param {number} probability - Shark foraging probability (0-1)
 * @param {number} beta0 - Intercept
 * @param {number} beta1 - Slope
 * @returns {number} Shark intensity (lambda)
 */
export function logLinearTransform(probability, beta0 = 0.0, beta1 = 2.0) {
  if (probability === null || isNaN(probability) || probability <= 0) return 0
  // Add small random noise for realism
  const epsilon = (Math.random() - 0.5) * 0.1
  return Math.exp(beta0 + beta1 * probability + epsilon)
}

/**
 * Process grid data for visualization
 * @param {Array} gridData - Array of {lat, lon, sst, ssha, chlorophyll} objects
 * @param {number} depth - Depth in meters
 * @returns {Array} Processed grid with intensity values
 */
export function processGridData(gridData, depth = 80) {
  return gridData.map((point) => {
    const probability = sharkGaussianModel({
      sst: point.sst,
      ssha: point.ssha,
      chlorophyll: point.chlorophyll,
      lat: point.lat,
      depth: depth,
    })

    const intensity = logLinearTransform(probability)

    return {
      ...point,
      probability,
      intensity,
      depth,
    }
  })
}

/**
 * Get color for intensity value (YlOrRd colormap)
 * @param {number} intensity - Intensity value
 * @param {number} min - Minimum intensity
 * @param {number} max - Maximum intensity
 * @returns {string} RGB color string
 */
export function getIntensityColor(intensity, min, max) {
  if (intensity === null || isNaN(intensity)) return 'rgba(200, 200, 200, 0.3)'

  // Normalize to 0-1
  const normalized = (intensity - min) / (max - min)
  const clamped = Math.max(0, Math.min(1, normalized))

  // YlOrRd colormap approximation
  if (clamped < 0.25) {
    // Yellow to Orange
    const t = clamped / 0.25
    return `rgb(${Math.floor(255)}, ${Math.floor(255 - t * 100)}, ${Math.floor(
      102 - t * 102
    )})`
  } else if (clamped < 0.5) {
    // Orange to Red
    const t = (clamped - 0.25) / 0.25
    return `rgb(${Math.floor(255)}, ${Math.floor(155 - t * 60)}, ${Math.floor(0)})`
  } else if (clamped < 0.75) {
    // Red
    const t = (clamped - 0.5) / 0.25
    return `rgb(${Math.floor(255 - t * 40)}, ${Math.floor(95 - t * 40)}, ${Math.floor(0)})`
  } else {
    // Dark Red
    const t = (clamped - 0.75) / 0.25
    return `rgb(${Math.floor(215 - t * 50)}, ${Math.floor(55 - t * 30)}, ${Math.floor(0)})`
  }
}

/**
 * Calculate statistics for intensity map
 * @param {Array} data - Array of intensity values
 * @returns {Object} Statistics
 */
export function calculateIntensityStats(data) {
  const validValues = data.filter((v) => v !== null && !isNaN(v) && v > 0)

  if (validValues.length === 0) {
    return { min: 0, max: 1, mean: 0, p2: 0, p98: 1 }
  }

  const sorted = [...validValues].sort((a, b) => a - b)
  const min = sorted[0]
  const max = sorted[sorted.length - 1]
  const mean = validValues.reduce((sum, v) => sum + v, 0) / validValues.length

  // Calculate percentiles
  const p2Index = Math.floor(validValues.length * 0.02)
  const p98Index = Math.floor(validValues.length * 0.98)
  const p2 = sorted[p2Index]
  const p98 = sorted[p98Index]

  return { min, max, mean, p2, p98 }
}

/**
 * Generate depth slices for visualization
 * @param {Array} gridData - Grid data
 * @returns {Object} Depth slices (50m to 300m)
 */
export function generateDepthSlices(gridData) {
  const depths = [50, 100, 150, 200, 250, 300]
  const slices = {}

  depths.forEach((depth) => {
    slices[depth] = processGridData(gridData, depth)
  })

  return slices
}
