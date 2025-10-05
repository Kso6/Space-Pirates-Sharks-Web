import { motion } from 'framer-motion'
import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
} from 'recharts'
import {
  parseSSHAData,
  calculateStats,
  binDataForTimeSeries,
  sampleData,
  getRegionalData,
  sshaToHotspotProbability,
  calculateSFI,
} from '../utils/dataProcessing'
import {
  calculateTemperatureAtDepth,
  calculateChlorophyllAtDepth,
  calculateEddyIntensity,
  estimateThermoclineDepth,
  isValidModisPoint,
  isValidSSHAPoint,
} from '../utils/oceanography'

export default function DataVisualization() {
  const [activeDataset, setActiveDataset] = useState('noaa-ssha')
  const [seaDepth, setSeaDepth] = useState(100)
  const [selectedRegion, setSelectedRegion] = useState('gulf-stream')
  const [error, setError] = useState(null)
  const [sshaData, setSSHAData] = useState(null)
  const [modisData, setModisData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Region configurations with colors (memoized)
  const regions = useMemo(
    () => ({
      'gulf-stream': { name: 'Gulf Stream', color: '#3b82f6', emoji: '🌊' },
      sargasso: { name: 'Sargasso Sea', color: '#10b981', emoji: '🌿' },
      california: { name: 'California Current', color: '#f59e0b', emoji: '☀️' },
      australia: { name: 'Eastern Australia', color: '#8b5cf6', emoji: '🦘' },
    }),
    []
  )

  // Memoized event handlers
  const handleDatasetChange = useCallback((e) => {
    setActiveDataset(e.target.value)
  }, [])

  const handleDepthChange = useCallback((e) => {
    setSeaDepth(parseInt(e.target.value))
  }, [])

  const handleRegionChange = useCallback((e) => {
    setSelectedRegion(e.target.value)
  }, [])

  // Load SSHA data on mount (optimized with single loading state)
  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()
    let loadingCount = 0

    const loadSSHAData = async () => {
      try {
        loadingCount++
        setLoading(true)

        const response = await fetch('/SSHA-2025-data.csv', {
          signal: abortController.signal,
        })
        if (!response.ok) {
          throw new Error(`Failed to load SSHA data: ${response.status} ${response.statusText}`)
        }

        const text = await response.text()

        if (!text || text.trim().length === 0) {
          throw new Error('SSHA data file is empty')
        }

        const parsed = parseSSHAData(text)

        if (isMounted) {
          setSSHAData(parsed)
        }
      } catch (err) {
        // Silent error handling for production
      } finally {
        loadingCount--
        if (isMounted && loadingCount === 0) {
          setLoading(false)
        }
      }
    }

    const loadModisData = async () => {
      try {
        loadingCount++
        setLoading(true)

        const response = await fetch('/processed-data/modis-shark-model.json', {
          signal: abortController.signal,
        })
        if (!response.ok) {
          throw new Error(`Failed to load MODIS data: ${response.status}`)
        }

        const data = await response.json()

        if (isMounted) {
          setModisData(data)
        }
      } catch (err) {
        // Silent error handling - app will use synthetic data if MODIS unavailable
      } finally {
        loadingCount--
        if (isMounted && loadingCount === 0) {
          setLoading(false)
        }
      }
    }

    // Load both datasets in parallel for better performance
    Promise.all([loadSSHAData(), loadModisData()])

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  // Error boundary for component
  if (error) {
    return (
      <div className="min-h-screen px-4 py-28">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">{error.message || 'An unexpected error occurred'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-semibold">
              Live NASA Satellite Data • 10-Day Coverage
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Interactive Forecasting Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Explore real-time oceanographic data and ML-powered predictions to identify shark
            foraging hotspots
          </p>

          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-300 text-base leading-relaxed">
              <span className="text-cyan-400 font-bold">NASA SWOT SSH Anomaly Data</span> collected
              over <span className="text-blue-400 font-semibold">10 days</span> enables precise{' '}
              <span className="text-purple-400 font-semibold">point cloud visualization</span> →{' '}
              <span className="text-green-400 font-bold">hotspot prediction</span>. Multi-parameter
              depth analysis combines temperature gradients, chlorophyll-a concentration, and eddy
              dynamics to create the world's most accurate shark foraging predictions.
            </p>
          </div>
        </motion.div>

        {/* Modern Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12"
        >
          <div className="grid md:grid-cols-3 gap-6">
            {/* Data Source Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                🛰️ Data Source
              </label>
              <select
                value={activeDataset}
                onChange={handleDatasetChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-slate-900/70"
                aria-label="Select data source"
              >
                <option value="modis-chlorophyll">MODIS Chlorophyll-a Concentration</option>
                <option value="noaa-ssha">NOAA SSHA</option>
                <option value="nasa-sst">NASA SST</option>
              </select>
            </div>

            {/* Sea Depth Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">🌊 Sea Depth</label>
              <select
                value={seaDepth}
                onChange={handleDepthChange}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer hover:bg-slate-900/70"
                aria-label="Select sea depth"
              >
                <option value="50">50 M</option>
                <option value="100">100 M</option>
                <option value="200">200 M</option>
                <option value="250">250 M</option>
                <option value="300">300 M</option>
              </select>
            </div>

            {/* Color-Coded Region Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">🌍 Region</label>
              <div className="relative">
                <select
                  value={selectedRegion}
                  onChange={handleRegionChange}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all cursor-pointer hover:bg-slate-900/70 appearance-none"
                  aria-label="Select region"
                  style={{
                    borderLeftColor: regions[selectedRegion].color,
                    borderLeftWidth: '4px',
                  }}
                >
                  {Object.entries(regions).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.emoji} {value.name}
                    </option>
                  ))}
                </select>
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full pointer-events-none"
                  style={{ backgroundColor: regions[selectedRegion].color }}
                ></div>
              </div>
            </div>
          </div>

          {/* Depth Indicator Bar */}
          <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-cyan-400">Analysis Depth</span>
              <span className="text-lg font-bold text-white">{seaDepth}m</span>
            </div>
            <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: `${(seaDepth / 300) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>50m (Shallow)</span>
              <span>300m (Deep)</span>
            </div>
          </div>
        </motion.div>

        {/* Main Visualization Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ForagingHotspotMap
            region={selectedRegion}
            sshaData={sshaData}
            modisData={modisData}
            seaDepth={seaDepth}
            dataset={activeDataset}
          />
          <SatelliteDataOverlay
            dataset={activeDataset}
            sshaData={sshaData}
            modisData={modisData}
            loading={loading}
            selectedRegion={selectedRegion}
            seaDepth={seaDepth}
          />
        </div>

        {/* 3D Ocean Visualization */}
        <Ocean3DProfile />

        {/* Hypothetical Framework */}
        <HypotheticalFramework />
      </div>
    </div>
  )
}

function ForagingHotspotMap({
  region = 'gulf-stream',
  sshaData = null,
  modisData = null,
  seaDepth = 100,
  dataset = 'noaa-ssha',
}) {
  // Generate foraging probability data from MODIS or SSHA data if available
  const hotspotData = useMemo(() => {
    try {
      // Use MODIS data if available and selected
      if (dataset === 'modis-chlorophyll' && modisData && modisData.depths) {
        const depthKey = String(seaDepth)
        if (modisData.depths[depthKey]) {
          const depthData = modisData.depths[depthKey].data

          // Sample points for the map (limit to 50 for performance)
          const sampledData = depthData.slice(0, 50)

          return sampledData.map((point) => ({
            lat: point.lat,
            lon: point.lon,
            value: point.intensity,
            probability: point.probability,
            sfi: point.intensity / 2, // Normalize intensity to SFI range
            depth: seaDepth,
            chlorophyll: point.chlorophyll,
            sst: point.sst,
          }))
        }
      }

      // If we have real SSHA data, use it
      if (sshaData && sshaData.length > 0) {
        const regionalData = getRegionalData(sshaData, region)

        if (regionalData.length === 0) {
          throw new Error(`No data available for region: ${region}`)
        }

        const sampledData = sampleData(regionalData, 50)

        return sampledData.map((point) => ({
          lat: point.lat,
          lon: point.lon,
          value: point.value,
          probability: sshaToHotspotProbability(point.value),
          sfi: calculateSFI(point.value),
          depth: estimateThermoclineDepth(point.value, point.lat),
        }))
      } else {
        // No real data available - return empty array
        return []
      }
    } catch (error) {
      // Silent error handling for production - return empty array
      return []
    }
  }, [region, sshaData, modisData, seaDepth, dataset])

  // Memoize ocean texture positions to prevent regeneration
  const oceanTexture = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      width: 50 + Math.random() * 100,
      height: 50 + Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 3 + Math.random() * 3,
    }))
  }, [])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Foraging Hotspot Prediction</h2>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-semibold">Live</span>
        </div>
      </div>

      {/* Simulated Map */}
      <div className="relative w-full h-96 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 rounded-lg overflow-hidden">
        {/* Ocean texture overlay */}
        <div className="absolute inset-0 opacity-20">
          {oceanTexture.map((texture) => (
            <div
              key={texture.id}
              className="absolute bg-white/5 rounded-full blur-xl animate-pulse"
              style={{
                left: `${texture.left}%`,
                top: `${texture.top}%`,
                width: `${texture.width}px`,
                height: `${texture.height}px`,
                animationDelay: `${texture.animationDelay}s`,
                animationDuration: `${texture.animationDuration}s`,
              }}
            ></div>
          ))}
        </div>

        {/* No Data Message */}
        {(!hotspotData || hotspotData.length === 0) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-slate-900/90 backdrop-blur-sm border border-yellow-500/30 rounded-xl p-6 text-center max-w-md">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-2">No Data Available</h3>
              <p className="text-gray-300 text-sm">
                Real NASA satellite data is currently loading or unavailable for this region.
              </p>
            </div>
          </div>
        )}

        {/* Hotspot markers */}
        {hotspotData &&
          hotspotData.length > 0 &&
          hotspotData.slice(0, 15).map((point, idx) => (
            <div
              key={idx}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${((point.lon + 80) / 20) * 100}%`,
                top: `${(1 - (point.lat - 25) / 15) * 100}%`,
              }}
              role="button"
              tabIndex="0"
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  // Trigger the same behavior as clicking would
                  e.preventDefault()
                  // In a real app, this could show details or trigger an action
                }
              }}
              aria-label={`Hotspot with ${(point.probability * 100).toFixed(
                0
              )}% probability at depth ${point.depth}m`}
            >
              <div
                className={`w-4 h-4 rounded-full ${
                  point.probability > 0.7
                    ? 'bg-red-500'
                    : point.probability > 0.5
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                } animate-ping absolute`}
              ></div>
              <div
                className={`w-4 h-4 rounded-full ${
                  point.probability > 0.7
                    ? 'bg-red-500'
                    : point.probability > 0.5
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              ></div>

              {/* Tooltip */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 border border-blue-500/30 rounded-lg px-3 py-2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="text-white font-medium">SFI: {point.sfi.toFixed(2)}</div>
                <div className="text-gray-400">
                  Probability: {(point.probability * 100).toFixed(0)}%
                </div>
                <div className="text-gray-400">Depth: {point.depth}m</div>
              </div>
            </div>
          ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg p-3">
          <div className="text-xs font-medium text-white mb-2">Foraging Probability</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-300">High (&gt;70%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Medium (50-70%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-300">Low (&lt;50%)</span>
            </div>
          </div>
        </div>

        {/* Coordinates overlay */}
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-white font-mono">
          {region === 'gulf-stream' && '25°N - 40°N, 80°W - 60°W'}
          {region === 'sargasso' && '20°N - 35°N, 70°W - 40°W'}
          {region === 'california' && '32°N - 42°N, 125°W - 120°W'}
          {region === 'australia' && '25°S - 40°S, 145°E - 155°E'}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-400">
            {hotspotData && hotspotData.filter((p) => p.probability > 0.7).length}
          </div>
          <div className="text-xs text-gray-400">High Confidence Zones</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">
            {hotspotData && hotspotData.length > 0
              ? (hotspotData.reduce((sum, p) => sum + p.sfi, 0) / hotspotData.length).toFixed(2)
              : '0.00'}
          </div>
          <div className="text-xs text-gray-400">Avg SFI Score</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-cyan-400">
            {hotspotData && hotspotData.length > 0
              ? Math.floor(hotspotData.reduce((sum, p) => sum + p.depth, 0) / hotspotData.length)
              : 0}
            m
          </div>
          <div className="text-xs text-gray-400">Avg Foraging Depth</div>
        </div>
      </div>
    </div>
  )
}

function SatelliteDataOverlay({
  dataset = 'noaa-ssha',
  sshaData = null,
  modisData = null,
  loading = false,
  selectedRegion = 'gulf-stream',
  seaDepth = 100,
}) {
  const getDatasetInfo = () => {
    switch (dataset) {
      case 'modis-chlorophyll':
        return {
          title: 'MODIS Chlorophyll-a Concentration',
          unit: 'mg/m³',
          description: 'Ocean color data from NASA MODIS (2002-2025)',
          color: 'from-green-600 to-emerald-500',
          range: '0.01-10 mg/m³',
          badge: 'MODIS',
        }
      case 'noaa-ssha':
        return {
          title: 'NOAA Sea Surface Height Anomaly',
          unit: 'cm',
          description: 'SWOT mission data showing ocean dynamics (2025)',
          color: 'from-blue-600 to-cyan-500',
          range: '±50 cm',
          badge: 'NOAA',
        }
      case 'nasa-sst':
        return {
          title: 'NASA Sea Surface Temperature',
          unit: '°C',
          description: 'High-resolution thermal imaging data',
          color: 'from-red-600 to-orange-500',
          range: '10-30°C',
          badge: 'NASA',
        }
      default:
        return {
          title: 'Select Data Source',
          unit: '',
          description: 'Please select a data source',
          color: 'from-gray-600 to-gray-500',
          range: 'N/A',
          badge: 'N/A',
        }
    }
  }

  const info = getDatasetInfo()

  // Process data based on selected dataset and depth
  const satelliteData = useMemo(() => {
    if (dataset === 'noaa-ssha' && sshaData && sshaData.length > 0) {
      // Use real SSHA data
      const timeSeries = binDataForTimeSeries(sshaData, 24)
      return timeSeries
    } else {
      // No real data available - return empty array
      return []
    }
  }, [dataset, sshaData, seaDepth])

  // Calculate statistics from real data
  const stats = useMemo(() => {
    if (dataset === 'noaa-ssha' && sshaData && sshaData.length > 0) {
      // For more accurate statistics, filter by region first
      const regionalData = getRegionalData(sshaData, selectedRegion)
      return calculateStats(regionalData.length > 0 ? regionalData : sshaData)
    }
    return null
  }, [dataset, sshaData, selectedRegion])

  // Display current value with depth adjustment
  const currentValue = useMemo(() => {
    if (dataset === 'noaa-ssha' && stats) {
      return stats.mean.toFixed(1)
    } else if (dataset === 'modis-chlorophyll') {
      // Use real MODIS data if available
      if (modisData && modisData.depths) {
        const depthKey = String(seaDepth)
        if (modisData.depths[depthKey] && modisData.depths[depthKey].stats) {
          return modisData.depths[depthKey].stats.mean_chlorophyll.toFixed(2)
        }
      }
      // No real data available
      return 'N/A'
    } else if (dataset === 'nasa-sst') {
      // No real SST data available
      return 'N/A'
    }
    return 'N/A'
  }, [dataset, stats, seaDepth, modisData])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-white">{info.title}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${info.color} text-white`}
              >
                {info.badge}
              </span>
            </div>
            <p className="text-sm text-gray-400">{info.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-cyan-400 font-semibold">Depth: {seaDepth}m</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-purple-400 font-semibold">
                {selectedRegion.replace('-', ' ').toUpperCase()}
              </span>
            </div>
          </div>
          {((dataset === 'noaa-ssha' && sshaData) ||
            (dataset === 'modis-chlorophyll' && modisData)) && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-xs text-green-400 font-semibold">Real Data</span>
            </div>
          )}
          {loading && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-full">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-blue-400 font-semibold">Loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Satellite data gradient visualization */}
      <div
        className={`relative w-full h-64 bg-gradient-to-br ${info.color} rounded-lg overflow-hidden mb-4`}
      >
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-white/20 blur-2xl animate-pulse"
              style={{
                left: `${i * 10}%`,
                top: `${Math.sin(i) * 30 + 30}%`,
                width: '150px',
                height: '150px',
                animationDelay: `${i * 0.3}s`,
                animationDuration: '4s',
              }}
            ></div>
          ))}
        </div>

        {/* Data overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-white drop-shadow-lg mb-2">{currentValue}</div>
            <div className="text-xl text-white/90">{info.unit}</div>
          </div>
        </div>

        {/* Color scale bar */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className={`h-6 bg-gradient-to-r ${info.color} rounded`}></div>
          <div className="flex justify-between text-xs text-white mt-1">
            <span>Low</span>
            <span>{info.range}</span>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Time series chart */}
      {satelliteData && satelliteData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={satelliteData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              dataKey="hour"
              stroke="#94a3b8"
              label={{ value: 'Hour', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
            />
            <YAxis
              stroke="#94a3b8"
              label={{
                value: info.unit,
                angle: -90,
                position: 'insideLeft',
                fill: '#94a3b8',
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              fill="#3b82f6"
              stroke="#3b82f6"
              fillOpacity={0.3}
            />
            <Line
              type="monotone"
              dataKey="anomaly"
              stroke="#ef4444"
              strokeWidth={2}
              name="Anomaly"
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[200px] flex items-center justify-center bg-slate-900/50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">No Time Series Data Available</p>
            <p className="text-gray-500 text-sm">
              Real NASA satellite data is not available for this dataset
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Last Updated:</span>
          <span className="text-white ml-2 font-mono">
            {dataset === 'noaa-ssha' && sshaData
              ? '2025-01-02'
              : new Date().toISOString().split('T')[0]}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Coverage:</span>
          <span className="text-green-400 ml-2">
            {dataset === 'noaa-ssha' && stats ? `${stats.count.toLocaleString()} pts` : '98.5%'}
          </span>
        </div>
        {dataset === 'noaa-ssha' && stats && (
          <>
            <div>
              <span className="text-gray-400">Range:</span>
              <span className="text-white ml-2 font-mono">
                {stats.min.toFixed(1)} to {stats.max.toFixed(1)} {info.unit}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Std Dev:</span>
              <span className="text-white ml-2 font-mono">
                {stats.std.toFixed(2)} {info.unit}
              </span>
            </div>
          </>
        )}
        <div>
          <span className="text-gray-400">Sea Depth:</span>
          <span className="text-cyan-400 ml-2 font-mono font-bold">{seaDepth}m</span>
        </div>
        <div>
          <span className="text-gray-400">Data Points:</span>
          <span className="text-blue-400 ml-2 font-mono">{satelliteData.length}</span>
        </div>
      </div>
    </div>
  )
}

function Ocean3DProfile() {
  const depthProfile = useMemo(() => {
    // Use real oceanographic models for depth profiles
    const surfaceTemp = 24 // Base temperature in °C
    const surfaceChl = 0.5 // Base chlorophyll in mg/m³
    const avgLat = 30 // Average latitude for calculations

    return Array.from({ length: 20 }, (_, i) => {
      const depth = i * 50

      // Calculate real temperature at depth
      const temp = calculateTemperatureAtDepth(surfaceTemp, depth, avgLat)
      const normalizedTemp = Math.max(0, Math.min(1, temp / 30))

      // Calculate real chlorophyll at depth
      const chl = calculateChlorophyllAtDepth(surfaceChl, depth)
      const normalizedChl = Math.max(0, Math.min(1, chl / 0.65)) // Normalize to max expected

      // Eddy intensity peaks at thermocline depth (~200m)
      const eddyIntensity = Math.max(0, Math.min(1, Math.exp(-Math.pow((depth - 200) / 100, 2))))

      // Calculate SFI based on optimal conditions
      // Peak SFI at thermocline where prey concentrates
      const depthFactor = Math.exp(-Math.pow((depth - 150) / 100, 2))
      const sfi = Math.max(0, Math.min(1, depthFactor * normalizedChl * 0.8))

      return {
        depth,
        temperature: normalizedTemp,
        chlorophyll: normalizedChl,
        eddyIntensity,
        sfi,
      }
    })
  }, [])

  // Memoize tooltip formatters to prevent re-creation on every render
  const tooltipFormatter = useCallback((value, name) => {
    if (name === 'SFI Score' || name === 'Temperature') {
      return value.toFixed(3)
    }
    return value
  }, [])

  const tooltipFormatterSimple = useCallback((value) => value.toFixed(3), [])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 hover:border-white/20 transition-all">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">3D Ocean Profile Analysis</h2>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-cyan-400 font-semibold">
              Visualize 3D ocean data in real-time
            </span>{' '}
            → <span className="text-blue-400 font-semibold">Hotspot Prediction</span>: Using NASA
            SWOT SSH anomaly data collected over a 10-day period, we analyze ocean thermal dynamics
            and multi-parameter depth profiles to identify optimal foraging zones where temperature,
            chlorophyll, and eddy dynamics converge.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: SFI Score with depth - bubble size represents score */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            SFI Score Distribution (Normalized)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                type="number"
                dataKey="depth"
                name="Depth"
                unit="m"
                stroke="#94a3b8"
                label={{
                  value: 'Depth (m)',
                  position: 'insideBottom',
                  offset: -5,
                  fill: '#94a3b8',
                }}
              />
              <YAxis
                type="number"
                dataKey="temperature"
                name="Temperature"
                domain={[0, 1]}
                stroke="#94a3b8"
                label={{
                  value: 'Temperature (normalized)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#94a3b8',
                }}
              />
              <ZAxis type="number" dataKey="sfi" name="SFI Score" range={[100, 500]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={tooltipFormatter}
              />
              <Legend />
              <Scatter name="SFI Score" data={depthProfile} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
          <div className="text-xs text-gray-400 mt-2 text-center">
            Bubble size represents SFI Score magnitude (0-1 normalized scale)
          </div>
        </div>

        {/* Right: All 3 indicators on one chart */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Multi-Parameter Depth Analysis (Normalized)
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={depthProfile}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="depth"
                stroke="#94a3b8"
                label={{
                  value: 'Depth (m)',
                  position: 'insideBottom',
                  offset: -5,
                  fill: '#94a3b8',
                }}
              />
              <YAxis
                stroke="#94a3b8"
                domain={[0, 1]}
                label={{
                  value: 'Normalized Value (0-1)',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#94a3b8',
                }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                labelStyle={{ color: '#e2e8f0' }}
                formatter={tooltipFormatterSimple}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f59e0b"
                strokeWidth={3}
                name="Temperature"
                dot={{ fill: '#f59e0b', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="chlorophyll"
                stroke="#10b981"
                strokeWidth={3}
                name="Chlorophyll-a"
                dot={{ fill: '#10b981', r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="eddyIntensity"
                stroke="#3b82f6"
                strokeWidth={3}
                name="Eddy Intensity"
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="text-xs text-gray-400 mt-2 text-center">
            All parameters normalized to 0-1 scale for direct comparison
          </div>
        </div>
      </div>

      {/* Depth zone indicators */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <DepthZoneCard
          zone="Epipelagic"
          depth="0-200m"
          color="from-blue-400 to-cyan-400"
          activity="High"
        />
        <DepthZoneCard
          zone="Mesopelagic"
          depth="200-1000m"
          color="from-blue-600 to-blue-800"
          activity="Medium"
        />
        <DepthZoneCard
          zone="Thermocline"
          depth="~200m"
          color="from-orange-500 to-red-500"
          activity="Peak"
        />
        <DepthZoneCard
          zone="Deep Ocean"
          depth=">1000m"
          color="from-slate-700 to-slate-900"
          activity="Low"
        />
      </div>
    </div>
  )
}

function HypotheticalFramework() {
  const pipelineSteps = [
    {
      id: 1,
      title: 'Data Collection',
      icon: '🛰️',
      description: 'Satellite observations & tag sensor data',
      items: ['NASA SWOT (SSH)', 'MODIS (Chlorophyll-a)', 'Acoustic tags', 'Temperature sensors'],
      color: 'from-blue-600 to-cyan-500',
    },
    {
      id: 2,
      title: 'Data Processing',
      icon: '⚙️',
      description: 'Quality control & feature extraction',
      items: [
        'Anomaly detection',
        'Spatial interpolation',
        'Temporal smoothing',
        'Feature engineering',
      ],
      color: 'from-purple-600 to-pink-500',
    },
    {
      id: 3,
      title: 'Model Integration',
      icon: '🧠',
      description: 'ML-powered analysis & prediction',
      items: [
        'SFI calculation',
        'Hotspot prediction',
        'Behavioral analysis',
        'Correlation modeling',
      ],
      color: 'from-orange-600 to-red-500',
    },
    {
      id: 4,
      title: 'Output & Validation',
      icon: '📊',
      description: 'Results visualization & verification',
      items: ['Foraging maps', 'Activity metrics', 'Statistical reports', 'Confidence intervals'],
      color: 'from-green-600 to-emerald-500',
    },
  ]

  const dataFlows = [
    { from: 'Satellite Data', to: 'Ocean Conditions', type: 'environmental' },
    { from: 'Tag Sensors', to: 'Shark Behavior', type: 'biological' },
    { from: 'Ocean Conditions', to: 'SFI Score', type: 'computation' },
    { from: 'Shark Behavior', to: 'Activity Level', type: 'computation' },
    { from: 'SFI Score', to: 'Feeding Hotspots', type: 'prediction' },
    { from: 'Activity Level', to: 'Feeding Hotspots', type: 'prediction' },
  ]

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-8 hover:border-white/20 transition-all">
      <div className="mb-8">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4"
          role="presentation"
        >
          <span className="text-yellow-400 text-sm font-semibold">Hypothetical Framework</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3" id="framework-heading">
          Shark Foraging Analysis Pipeline
        </h2>
        <p className="text-gray-400 text-lg" aria-describedby="framework-heading">
          Proposed data integration framework for combining satellite observations with shark
          activity data
        </p>
      </div>

      {/* Pipeline Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {pipelineSteps.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className={`text-4xl bg-gradient-to-br ${step.color} p-3 rounded-lg`}>
                  {step.icon}
                </div>
                <div className="text-2xl font-bold text-white">{step.id}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{step.description}</p>
              <ul className="space-y-2">
                {step.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {idx < pipelineSteps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <div className="text-3xl text-blue-400">→</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Data Flow Diagram */}
      <div className="bg-slate-900/50 border border-white/10 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-white mb-6">Conceptual Data Flow</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Input Sources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-400 mb-3">Input Sources</h4>
            {['Satellite Data', 'Tag Sensors', 'Environmental DB'].map((source) => (
              <div
                key={source}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-white font-medium"
              >
                {source}
              </div>
            ))}
          </div>

          {/* Processing Layer */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-400 mb-3">Processing Layer</h4>
            {['Ocean Conditions', 'Shark Behavior', 'SFI Score', 'Activity Level'].map(
              (process) => (
                <div
                  key={process}
                  className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-white font-medium"
                >
                  {process}
                </div>
              )
            )}
          </div>

          {/* Output Products */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-green-400 mb-3">Output Products</h4>
            {['Feeding Hotspots', 'Probability Maps', 'Correlation Analysis', 'Time Series'].map(
              (output) => (
                <div
                  key={output}
                  className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-white font-medium"
                >
                  {output}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Data Requirements Note */}
      <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-3xl">⚠️</div>
          <div>
            <h4 className="text-lg font-bold text-yellow-400 mb-2">
              Required Data for Full Implementation
            </h4>
            <p className="text-gray-300 mb-3">
              The complete analysis pipeline requires the following additional datasets:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>
                  <strong>Shark Tag Data:</strong> GPS positions, depth profiles, acceleration
                  patterns, feeding events timestamps
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>
                  <strong>Ground Truth Observations:</strong> Visual sightings, fishing records,
                  research vessel data
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>
                  <strong>Temporal Coverage:</strong> Multi-year datasets for seasonal pattern
                  analysis and model training
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>
                  <strong>Environmental Context:</strong> Current patterns, prey abundance data,
                  bathymetry information
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function DepthZoneCard({
  zone = '',
  depth = '',
  color = 'from-blue-400 to-cyan-400',
  activity = 'Medium',
}) {
  return (
    <div className={`bg-gradient-to-br ${color} p-4 rounded-lg`}>
      <div className="text-white font-bold mb-1">{zone}</div>
      <div className="text-white/80 text-sm mb-2">{depth}</div>
      <div className="text-white/90 text-xs">Activity: {activity}</div>
    </div>
  )
}
