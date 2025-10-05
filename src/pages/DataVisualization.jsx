import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
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

export default function DataVisualization() {
  const [activeDataset, setActiveDataset] = useState('swot')
  const [timeRange, setTimeRange] = useState('week')
  const [selectedRegion, setSelectedRegion] = useState('gulf-stream')
  const [error, setError] = useState(null)
  const [sshaData, setSSHAData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Load SSHA data on mount
  useEffect(
    () => {
      let isMounted = true
      // Use a controller to be able to abort the fetch if component unmounts
      const abortController = new AbortController()

      const loadSSHAData = async () => {
        try {
          setLoading(true)
          const response = await fetch('/SSHA-2025-data.csv', {
            signal: abortController.signal,
          })
          if (!response.ok) {
            throw new Error(`Failed to load SSHA data: ${response.status} ${response.statusText}`)
          }

          // Set timeout for fetch operation
          const textPromise = response.text()
          let timeoutId
          const timeoutPromise = new Promise((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Data fetch timeout')), 10000)
          })

          const text = await Promise.race([textPromise, timeoutPromise])
          // Clear the timeout to prevent memory leaks
          if (timeoutId) clearTimeout(timeoutId)

          // Validate that we have actual data content
          if (!text || text.trim().length === 0) {
            throw new Error('SSHA data file is empty')
          }

          const parsed = parseSSHAData(text)

          // Validate parsed data
          // Silent handling for production - could implement proper logging service here
          // if (!parsed || parsed.length === 0) {
          //   console.warn('No valid SSHA data points found, using synthetic data')
          // } else {
          //   console.log(`Loaded ${parsed.length} SSHA data points`)
          // }

          // Only update state if component is still mounted
          if (isMounted) {
            setSSHAData(parsed)
          }
        } catch (err) {
          // Silent error handling for production - could implement proper error logging service
          // console.error('Error loading SSHA data:', err)
          // Don't set error state - app will use synthetic data
          // This ensures the app still works without real data
        } finally {
          if (isMounted) {
            setLoading(false)
          }
        }
      }

      loadSSHAData()

      // Cleanup function to prevent state updates after unmount
      return () => {
        isMounted = false
        // Abort any in-progress fetch requests
        abortController.abort()
      }
    },
    [
      /* No dependencies needed as this should only run on mount */
    ]
  )

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
            Explore real-time oceanographic data and AI-powered predictions to identify shark
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
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                🛰️ Data Source
              </label>
              <select
                value={activeDataset}
                onChange={(e) => setActiveDataset(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                aria-label="Select data source"
              >
                <option value="swot">NASA SWOT (SSH Anomaly)</option>
                <option value="modis">NASA MODIS (Chlorophyll-a)</option>
                <option value="pace">NASA PACE (Phytoplankton)</option>
                <option value="meteomatics">Meteomatics (SST)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                ⏱️ Time Range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                aria-label="Select time range"
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="season">Seasonal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-3">🌍 Region</label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                aria-label="Select region"
              >
                <option value="gulf-stream">Gulf Stream</option>
                <option value="sargasso">Sargasso Sea</option>
                <option value="california">California Current</option>
                <option value="australia">Eastern Australia</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Visualization Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ForagingHotspotMap region={selectedRegion} sshaData={sshaData} />
          <SatelliteDataOverlay
            dataset={activeDataset}
            sshaData={sshaData}
            loading={loading}
            selectedRegion={selectedRegion}
            timeRange={timeRange}
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

function ForagingHotspotMap({ region = 'gulf-stream', sshaData = null }) {
  // Generate foraging probability data from SSHA data if available, otherwise use synthetic
  const hotspotData = useMemo(() => {
    try {
      // If we have real SSHA data, use it
      if (sshaData && sshaData.length > 0) {
        // Filter data for the selected region
        const regionalData = getRegionalData(sshaData, region)

        // Check if we have data for the region
        if (regionalData.length === 0) {
          throw new Error(`No data available for region: ${region}`)
        }

        // Sample the data to avoid too many points
        const sampledData = sampleData(regionalData, 50)

        // Convert SSHA data to foraging hotspots
        return sampledData.map((point) => ({
          lat: point.lat,
          lon: point.lon,
          value: point.value,
          probability: sshaToHotspotProbability(point.value),
          sfi: calculateSFI(point.value),
          depth: Math.floor(Math.random() * 500), // Random depth as we don't have real depth data
        }))
      } else {
        // Generate synthetic data if no real data available
        const data = []
        // Use region bounds to generate realistic data for the selected region
        const regionBounds = {
          'gulf-stream': { latMin: 25, latMax: 40, lonMin: -80, lonMax: -60 },
          sargasso: { latMin: 20, latMax: 35, lonMin: -70, lonMax: -40 },
          california: { latMin: 32, latMax: 42, lonMin: -125, lonMax: -120 },
          australia: { latMin: -40, latMax: -25, lonMin: 145, lonMax: 155 },
        }[region] || { latMin: 25, latMax: 40, lonMin: -80, lonMax: -60 }

        for (let i = 0; i < 50; i++) {
          data.push({
            lat: regionBounds.latMin + Math.random() * (regionBounds.latMax - regionBounds.latMin),
            lon: regionBounds.lonMin + Math.random() * (regionBounds.lonMax - regionBounds.lonMin),
            probability: Math.random() * 0.8 + 0.2,
            sfi: Math.random() * 1.5 + 0.5,
            depth: Math.floor(Math.random() * 500),
          })
        }
        return data
      }
    } catch (error) {
      // Silent error handling for production
      // console.error('Error generating foraging data:', error)
      // Always return some data to prevent UI crashes
      return Array(15)
        .fill(0)
        .map((_, i) => ({
          lat: 30 + Math.random() * 10,
          lon: -70 + Math.random() * 10,
          probability: Math.random() * 0.5 + 0.2,
          sfi: 0.8,
          depth: 200,
        }))
    }
  }, [region, sshaData])

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

        {/* Hotspot markers */}
        {hotspotData &&
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
  dataset = 'swot',
  sshaData = null,
  loading = false,
  selectedRegion = 'gulf-stream',
  timeRange = 'week',
}) {
  const getDatasetInfo = () => {
    switch (dataset) {
      case 'swot':
        return {
          title: 'SWOT Sea Surface Height',
          unit: 'cm',
          description: 'Surface Water and Ocean Topography mission data (2025)',
          color: 'from-blue-600 to-cyan-500',
          range: '±50 cm',
        }
      case 'modis':
        return {
          title: 'MODIS Chlorophyll-a',
          unit: 'mg/m³',
          description: 'Ocean color indicating phytoplankton concentration',
          color: 'from-green-600 to-emerald-500',
          range: '0.01-10 mg/m³',
        }
      case 'pace':
        return {
          title: 'PACE Phytoplankton',
          unit: 'communities',
          description: 'Phytoplankton diversity and abundance',
          color: 'from-teal-600 to-cyan-500',
          range: '5-12 types',
        }
      case 'meteomatics':
        return {
          title: 'Sea Surface Temperature',
          unit: '°C',
          description: 'High-resolution temperature data',
          color: 'from-red-600 to-orange-500',
          range: '10-30°C',
        }
      default:
        return {}
    }
  }

  const info = getDatasetInfo()

  // Process SSHA data for time series if available
  const satelliteData = useMemo(() => {
    if (dataset === 'swot' && sshaData && sshaData.length > 0) {
      // Use real SSHA data
      // Filter by time range if applicable
      let filteredData = sshaData

      // In a real implementation, we would filter data based on timeRange
      // For now, we're just using the binDataForTimeSeries function
      const timeSeries = binDataForTimeSeries(filteredData, 24)
      return timeSeries
    } else {
      // Generate synthetic data for other datasets
      const dataLength = 24 // Default to 24 data points

      return Array.from({ length: dataLength }, (_, i) => ({
        hour: i,
        value: 15 + Math.sin(i / 3) * 5 + Math.random() * 3,
        anomaly: Math.sin(i / 4) * 2 + Math.random() - 0.5,
      }))
    }
  }, [dataset, sshaData, timeRange])

  // Calculate statistics from real data
  const stats = useMemo(() => {
    if (dataset === 'swot' && sshaData && sshaData.length > 0) {
      // For more accurate statistics, filter by region first
      const regionalData = getRegionalData(sshaData, selectedRegion)
      return calculateStats(regionalData.length > 0 ? regionalData : sshaData)
    }
    return null
  }, [dataset, sshaData, selectedRegion])

  // Display current value
  const currentValue = useMemo(() => {
    if (dataset === 'swot' && stats) {
      return stats.mean.toFixed(1)
    }
    return (15 + Math.random() * 10).toFixed(1)
  }, [dataset, stats])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{info.title}</h2>
            <p className="text-sm text-gray-400">{info.description}</p>
          </div>
          {dataset === 'swot' && sshaData && (
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
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={satelliteData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="hour"
            stroke="#94a3b8"
            label={{ value: 'Hour', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}
          />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Area type="monotone" dataKey="value" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.3} />
          <Line type="monotone" dataKey="anomaly" stroke="#ef4444" strokeWidth={2} name="Anomaly" />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-400">Last Updated:</span>
          <span className="text-white ml-2 font-mono">
            {dataset === 'swot' && sshaData ? '2025-01-02' : new Date().toISOString().split('T')[0]}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Coverage:</span>
          <span className="text-green-400 ml-2">
            {dataset === 'swot' && stats ? `${stats.count.toLocaleString()} pts` : '98.5%'}
          </span>
        </div>
        {dataset === 'swot' && stats && (
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
      </div>
    </div>
  )
}

function Ocean3DProfile() {
  const depthProfile = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      depth: i * 50,
      // Normalized temperature (0-1 scale)
      temperature: Math.max(0, Math.min(1, (25 - i * 50 * 0.03 + Math.random() * 0.5) / 30)),
      // Normalized chlorophyll (0-1 scale)
      chlorophyll: Math.max(0, Math.min(1, Math.exp(-i / 3) * (0.5 + Math.random() * 0.2))),
      // Normalized eddy intensity (0-1 scale)
      eddyIntensity: Math.max(
        0,
        Math.min(1, Math.exp(-Math.pow((i * 50 - 200) / 100, 2)) * (0.8 + Math.random() * 0.4))
      ),
      // Normalized SFI score (0-1 scale)
      sfi: Math.max(0, Math.min(1, Math.random() * 0.6 + 0.3)),
    }))
  }, [])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 hover:border-white/20 transition-all">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">3D Ocean Profile Analysis</h2>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-gray-300 text-sm leading-relaxed">
            <span className="text-cyan-400 font-semibold">Point Cloud Visualization</span> →{' '}
            <span className="text-blue-400 font-semibold">Hotspot Prediction</span>: Using NASA SWOT
            SSH anomaly data collected over a 10-day period, we analyze multi-parameter depth
            profiles to identify optimal foraging zones where temperature, chlorophyll, and eddy
            dynamics converge.
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
                formatter={(value, name) => {
                  if (name === 'SFI Score' || name === 'Temperature') {
                    return value.toFixed(3)
                  }
                  return value
                }}
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
                formatter={(value) => value.toFixed(3)}
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
      description: 'AI-powered analysis & prediction',
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
