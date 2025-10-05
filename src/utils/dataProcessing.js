/**
 * Data Processing Utilities for NASA Satellite Data
 * Processes SSHA, MODIS, and other oceanographic datasets
 */

/**
 * Parse SSHA CSV data and filter valid values (optimized)
 * @param {string} csvText - Raw CSV text content
 * @returns {Array} Array of {lat, lon, value} objects
 */
export function parseSSHAData(csvText) {
  const lines = csvText.trim().split('\n')
  // Pre-allocate array for better performance
  const data = new Array(lines.length - 1)
  let validCount = 0

  // Skip header and process lines
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const parts = line.split(',')
    const lat = parseFloat(parts[0])
    const lon = parseFloat(parts[1])
    const value = parseFloat(parts[2])

    // Filter out invalid data (-999 is NoData value)
    if (!isNaN(lat) && !isNaN(lon) && !isNaN(value) && value !== -999) {
      data[validCount++] = { lat, lon, value }
    }
  }

  // Trim array to actual size
  data.length = validCount
  return data
}

/**
 * Get SSHA data for a specific region
 * @param {Array} data - Full SSHA dataset
 * @param {string} region - Region name
 * @returns {Array} Filtered data for region
 */
export function getRegionalData(data, region) {
  // Return empty array if no data provided
  if (!data || data.length === 0) {
    return []
  }

  const regions = {
    'gulf-stream': { latMin: 25, latMax: 40, lonMin: -80, lonMax: -60 },
    sargasso: { latMin: 20, latMax: 35, lonMin: -70, lonMax: -40 },
    california: { latMin: 32, latMax: 42, lonMin: -125, lonMax: -120 },
    australia: { latMin: -40, latMax: -25, lonMin: 145, lonMax: 155 },
  }

  const bounds = regions[region]
  // If region not found, return a subset of data to avoid overwhelming the UI
  if (!bounds) {
    // Silent handling for production - could implement proper logging service
    // console.warn(`Region "${region}" not found, using default subset of data`)
    return data.slice(0, Math.min(data.length, 100))
  }

  return data.filter(
    (d) =>
      d.lat >= bounds.latMin &&
      d.lat <= bounds.latMax &&
      d.lon >= bounds.lonMin &&
      d.lon <= bounds.lonMax
  )
}

/**
 * Calculate statistics for dataset
 * @param {Array} data - Dataset with value field
 * @returns {Object} Statistics object
 */
export function calculateStats(data) {
  if (!data || data.length === 0) {
    return { min: 0, max: 0, mean: 0, std: 0, count: 0 }
  }

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)

  // Prevent division by zero with empty arrays or if length is somehow 0
  const length = values.length || 1
  const mean = values.reduce((sum, v) => sum + v, 0) / length

  // Calculate variance safely
  const variance =
    values.length > 1 ? values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / length : 0
  const std = Math.sqrt(variance)

  return { min, max, mean, std, count: data.length }
}

/**
 * Bin data for time series analysis
 * @param {Array} data - Dataset
 * @param {number} bins - Number of bins
 * @returns {Array} Binned data
 */
export function binDataForTimeSeries(data, bins = 24) {
  if (!data || data.length === 0) {
    // Return empty array with proper structure for empty data
    return Array(bins)
      .fill(0)
      .map((_, i) => ({
        hour: i,
        value: 0,
        anomaly: 0,
      }))
  }

  const stats = calculateStats(data)
  const range = stats.max - stats.min
  // Prevent division by zero if all values are the same
  const binSize = range > 0 ? range / bins : 1

  const binned = Array(bins)
    .fill(0)
    .map((_, i) => ({
      bin: i,
      value: 0,
      count: 0,
    }))

  data.forEach((d) => {
    const binIndex = Math.min(Math.floor((d.value - stats.min) / binSize), bins - 1)
    if (binIndex >= 0 && binIndex < bins) {
      binned[binIndex].value += d.value
      binned[binIndex].count += 1
    }
  })

  return binned.map((bin, i) => ({
    hour: i,
    value: bin.count > 0 ? bin.value / bin.count : 0,
    anomaly: bin.count > 0 ? bin.value / bin.count - stats.mean : 0,
  }))
}

/**
 * Sample data for visualization (optimized for performance)
 * @param {Array} data - Full dataset
 * @param {number} maxPoints - Maximum points to return
 * @returns {Array} Sampled dataset
 */
export function sampleData(data, maxPoints = 1000) {
  if (!data || data.length <= maxPoints) return data

  const step = Math.floor(data.length / maxPoints)
  const result = new Array(Math.ceil(data.length / step))
  let resultIndex = 0

  for (let i = 0; i < data.length; i += step) {
    result[resultIndex++] = data[i]
  }

  result.length = resultIndex
  return result
}

/**
 * Convert SSHA data to hotspot probability
 * Higher anomalies (both positive and negative) indicate dynamic regions
 * @param {number} sshaValue - SSHA value in cm
 * @returns {number} Probability between 0 and 1
 */
export function sshaToHotspotProbability(sshaValue) {
  // Normalize: high absolute values = high probability
  const normalized = Math.abs(sshaValue) / 50 // 50cm is a significant anomaly
  return Math.min(0.2 + normalized * 0.8, 1.0) // Scale to 0.2-1.0 range
}

/**
 * Generate synthetic SFI from SSHA
 * In a real implementation, this would use the full SFI model
 * @param {number} ssha - Sea surface height anomaly
 * @param {number} chlorophyll - Chlorophyll-a concentration (optional)
 * @param {number} sst - Sea surface temperature (optional)
 * @returns {number} SFI score
 */
export function calculateSFI(ssha, chlorophyll = null, sst = null) {
  let sfi = 0.3 // Base score

  // SSHA contribution (fronts and eddies)
  const sshaContrib = (Math.abs(ssha) / 100) * 0.4 // Up to 0.4
  sfi += sshaContrib

  // Chlorophyll contribution (if available)
  if (chlorophyll !== null) {
    const chlContrib = Math.min(chlorophyll / 10, 1) * 0.3 // Up to 0.3
    sfi += chlContrib
  }

  // Temperature contribution (if available)
  if (sst !== null) {
    // Optimal range 15-25°C
    const tempContrib = sst >= 15 && sst <= 25 ? 0.3 : 0.1
    sfi += tempContrib
  }

  return Math.min(sfi, 2.0) // Cap at 2.0
}
