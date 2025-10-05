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
  isValidModisPoint,
  isValidSSHAPoint,
  estimateThermoclineDepth,
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

  // Load SSHA and MODIS data on mount
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
        if (isMounted && import.meta.env.DEV) {
          console.error('Error loading SSHA data:', err)
        }
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
        if (isMounted && import.meta.env.DEV) {
          console.error('Error loading MODIS data:', err)
        }
      } finally {
        loadingCount--
        if (isMounted && loadingCount === 0) {
          setLoading(false)
        }
      }
    }

    // Load both datasets in parallel
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
        <Ocean3DProfile sshaData={sshaData} modisData={modisData} seaDepth={seaDepth} />

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
  // Generate foraging probability data from REAL MODIS or SSHA data
  const hotspotData = useMemo(() => {
    try {
      // Use MODIS data if available and selected
      if (dataset === 'modis-chlorophyll' && modisData && modisData.depths) {
        const depthKey = String(seaDepth)
        if (modisData.depths[depthKey]) {
          const depthData = modisData.depths[depthKey].data

          // Filter valid data points
          const validData = depthData.filter(isValidModisPoint)

          // Sample points for the map (limit to 50 for performance)
          const sampledData = sampleData(validData, 50)

          return sampledData.map((point) => ({
            lat: point.lat,
            lon: point.lon,
            value: point.intensity,
            probability: point.probability,
            sfi: point.intensity / 2,
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
          return null // No data for this region
        }

        const validData = regionalData.filter(isValidSSHAPoint)
        const sampledData = sampleData(validData, 50)

        return sampledData.map((point) => ({
          lat: point.lat,
          lon: point.lon,
          value: point.value,
          probability: sshaToHotspotProbability(point.value),
          sfi: calculateSFI(point.value),
          depth: estimateThermoclineDepth(point.value, point.lat),
        }))
      }

      return null // No data available
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error processing hotspot data:', error)
      }
      return null
    }
  }, [region, sshaData, modisData, seaDepth, dataset])

  // Memoize ocean texture positions
  const oceanTexture = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 13) % 100,
      top: (i * 17) % 100,
      width: 50 + (i % 5) * 20,
      height: 50 + (i % 5) * 20,
      animationDelay: i * 0.3,
      animationDuration: 3 + (i % 3),
    }))
  }, [])

  if (!hotspotData || hotspotData.length === 0) {
    return (
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Foraging Hotspot Prediction</h2>
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-yellow-500/10 rounded-full">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-yellow-400 font-semibold">No Data</span>
          </div>
        </div>
        <div className="h-96 flex items-center justify-center bg-slate-900/50 rounded-lg">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-2">No data available for this region</p>
            <p className="text-gray-500 text-sm">Try selecting a different region or dataset</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Foraging Hotspot Prediction</h2>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-semibold">Real Data</span>
        </div>
      </div>

      {/* Map */}
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
        {hotspotData.slice(0, 15).map((point, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${((point.lon + 80) / 20) * 100}%`,
              top: `${(1 - (point.lat - 25) / 15) * 100}%`,
            }}
            role="button"
            tabIndex="0"
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
              <div className="text-gray-400">Depth: {Math.round(point.depth)}m</div>
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
            {hotspotData.filter((p) => p.probability > 0.7).length}
          </div>
          <div className="text-xs text-gray-400">High Confidence Zones</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-blue-400">
            {(hotspotData.reduce((sum, p) => sum + p.sfi, 0) / hotspotData.length).toFixed(2)}
          </div>
          <div className="text-xs text-gray-400">Avg SFI Score</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-cyan-400">
            {Math.floor(hotspotData.reduce((sum, p) => sum + p.depth, 0) / hotspotData.length)}m
          </div>
          <div className="text-xs text-gray-400">Avg Foraging Depth</div>
        </div>
      </div>
    </div>
  )
}

// Continue in next message due to length...
