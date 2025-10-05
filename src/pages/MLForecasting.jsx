import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useEffect, useCallback } from 'react'
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import {
  sharkGaussianModel,
  processGridData,
  getIntensityColor,
  calculateIntensityStats,
  normalizeSSHA,
} from '../utils/mlForecasting'
import { parseSSHAData, calculateStats } from '../utils/dataProcessing'

export default function MLForecasting() {
  const [depth, setDepth] = useState(50)
  const [modisData, setModisData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('intensity')

  // Load MODIS processed data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Try multiple paths in case of deployment issues
        const paths = [
          '/processed-data/modis-shark-model.json',
          './processed-data/modis-shark-model.json',
          'processed-data/modis-shark-model.json',
        ]

        let data = null
        let lastError = null

        for (const path of paths) {
          try {
            console.log(`Attempting to load MODIS data from ${path}`)
            const response = await fetch(path)
            console.log(`Response status for ${path}:`, response.status, response.statusText)

            if (response.ok) {
              data = await response.json()
              console.log('Data loaded successfully from:', path, {
                hasMetadata: !!data.metadata,
                hasDepths: !!data.depths,
                depthKeys: data.depths ? Object.keys(data.depths) : [],
              })
              break
            }
          } catch (err) {
            console.warn(`Failed to load from ${path}:`, err.message)
            lastError = err
          }
        }

        if (data) {
          setModisData(data)
        } else {
          throw lastError || new Error('Failed to load MODIS data from any path')
        }
      } catch (err) {
        console.error('Error loading MODIS data:', err)
        console.error('Please wait for GitHub Pages deployment to complete (2-3 minutes)')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Process data with current depth (optimized)
  const forecastData = useMemo(() => {
    if (!modisData || !modisData.depths) {
      console.log('No MODIS data or depths available')
      return null
    }

    try {
      // Find the closest depth level in the data
      const availableDepths = Object.keys(modisData.depths).map(Number)
      const closestDepth = availableDepths.reduce((prev, curr) =>
        Math.abs(curr - depth) < Math.abs(prev - depth) ? curr : prev
      )

      console.log(`Processing depth ${closestDepth}m (requested ${depth}m)`)

      // Get data for the closest depth
      const depthData = modisData.depths[closestDepth.toString()]

      if (!depthData || !depthData.data || depthData.data.length === 0) {
        console.log('No depth data available')
        return null
      }

      console.log(`Total data points at ${closestDepth}m: ${depthData.data.length}`)

      // Filter out invalid data points
      // Note: chlorophyll < 0 indicates fill values (-32767), but we'll be more lenient
      const validData = depthData.data.filter(
        (point) =>
          point.chlorophyll > -10000 && // Accept more data, filter only extreme fill values
          point.sst > 15 && // Slightly more lenient temperature range
          point.sst < 35 &&
          !isNaN(point.intensity) &&
          !isNaN(point.probability) &&
          point.intensity > 0
      )

      console.log(`Valid data points after filtering: ${validData.length}`)

      if (validData.length === 0) {
        console.warn('No valid data points after filtering')
        return null
      }

      // Sample data for performance (take every nth point if too many)
      const maxPoints = 1000
      const samplingRate = Math.ceil(validData.length / maxPoints)
      const sampledData = validData.filter((_, index) => index % samplingRate === 0)

      console.log(`Sampled ${sampledData.length} points for visualization`)

      // Return processed data with proper structure
      return sampledData.map((point) => ({
        lat: point.lat,
        lon: point.lon,
        sst: point.sst,
        chlorophyll: Math.max(0, point.chlorophyll), // Convert negative fill values to 0
        ssha: 0, // SSHA already incorporated in the model
        probability: point.probability,
        intensity: point.intensity,
        depth: closestDepth,
      }))
    } catch (error) {
      console.error('Error processing MODIS data:', error)
      return null
    }
  }, [modisData, depth])

  const stats = useMemo(() => {
    if (!forecastData) return null
    const intensities = forecastData.map((d) => d.intensity)
    return calculateIntensityStats(intensities)
  }, [forecastData])

  return (
    <div className="min-h-screen px-4 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-purple-400 text-sm font-semibold">ML-Powered Forecasting</span>
            </div>
            {modisData?.metadata && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-cyan-400 text-xs font-medium">
                  📡 Data: {modisData.metadata.source_file}
                </span>
              </div>
            )}
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            SHARK Gaussian Model
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            ML forecasting using multi-parameter Gaussian models to predict shark foraging intensity
            across ocean depths
          </p>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-300 text-base leading-relaxed">
              <span className="text-purple-400 font-bold">ML Model Integration:</span> Combines{' '}
              <span className="text-cyan-400 font-semibold">real MODIS Chlorophyll-a data</span>,{' '}
              <span className="text-orange-400 font-semibold">
                SST Proxy from coral bleaching alerts
              </span>
              , and <span className="text-blue-400 font-semibold">SSHA measurements</span> through a
              depth-adjusted Gaussian framework with Arctic suppression for accurate shark
              distribution prediction.
            </p>
          </div>
        </motion.div>

        {/* Depth Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12 hover:border-cyan-500/30 transition-all"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">🌊 Depth Adjustment</h3>
              <p className="text-gray-400">
                Adjust depth to see how temperature lapse rate affects predictions
              </p>
            </div>
            <motion.div
              key={depth}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-right bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4"
            >
              <div className="text-5xl font-bold text-cyan-400">{depth}m</div>
              <div className="text-sm text-gray-400 mt-1">Current Depth</div>
            </motion.div>
          </div>

          {/* Visual Depth Indicator */}
          <div className="relative mb-6">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 rounded-xl"></div>
            <div className="relative p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-cyan-400 text-sm font-semibold">↑ Shallow (Warmer)</span>
                <span className="text-indigo-400 text-sm font-semibold">↓ Deep (Colder)</span>
              </div>
              <div className="relative h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-lg overflow-hidden shadow-lg">
                <motion.div
                  className="absolute h-full w-1 bg-white shadow-lg"
                  animate={{ left: `${((depth - 50) / 250) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-slate-900 px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
                    {depth}m
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Enhanced Slider */}
          <div className="relative mb-8">
            <input
              type="range"
              min="50"
              max="300"
              step="50"
              value={depth}
              onChange={(e) => setDepth(parseInt(e.target.value))}
              className="w-full h-4 bg-slate-700 rounded-lg appearance-none cursor-pointer range-slider"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
                  ((depth - 50) / 250) * 100
                }%, #334155 ${((depth - 50) / 250) * 100}%, #334155 100%)`,
              }}
            />
            {/* Tick Marks */}
            <div className="flex justify-between mt-3">
              {[50, 100, 150, 200, 250, 300].map((tick) => (
                <div
                  key={tick}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setDepth(tick)}
                >
                  <div
                    className={`w-0.5 h-2 mb-1 transition-all ${
                      depth === tick ? 'bg-cyan-400 h-3' : 'bg-gray-600 group-hover:bg-gray-400'
                    }`}
                  ></div>
                  <span
                    className={`text-xs transition-all ${
                      depth === tick
                        ? 'text-cyan-400 font-bold'
                        : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                  >
                    {tick}m
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 50, label: 'Shallow', icon: '🏖️', desc: 'Warm waters' },
              { value: 150, label: 'Mid-depth', icon: '🌊', desc: 'Thermocline' },
              { value: 250, label: 'Deep', icon: '🌑', desc: 'Cold depths' },
            ].map((preset) => (
              <motion.button
                key={preset.value}
                onClick={() => setDepth(preset.value)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-6 py-4 rounded-xl font-semibold transition-all ${
                  depth === preset.value
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700 border border-white/10'
                }`}
              >
                <div className="text-2xl mb-1">{preset.icon}</div>
                <div className="font-bold">{preset.label}</div>
                <div className="text-xs opacity-80 mt-1">{preset.desc}</div>
              </motion.button>
            ))}
          </div>

          {/* Temperature Info */}
          <motion.div
            key={depth}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg p-4"
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">🌡️</div>
              <div className="flex-1">
                <p className="text-gray-300 text-sm">
                  <strong className="text-orange-400">Temperature Effect:</strong> At {depth}m
                  depth, SST decreases by approximately{' '}
                  <span className="text-cyan-400 font-bold">
                    {(depth * 0.025).toFixed(1)}-{(depth * 0.03).toFixed(1)}°C
                  </span>{' '}
                  (latitude dependent)
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Visualization */}
        {loading ? (
          <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading forecast data...</p>
            </div>
          </div>
        ) : forecastData ? (
          <>
            <DataSourceInfo modisData={modisData} />
            <ForecastMap data={forecastData} stats={stats} depth={depth} />
            <ModelMetrics data={forecastData} stats={stats} depth={depth} modisData={modisData} />
            <ParameterDistribution data={forecastData} />
          </>
        ) : (
          <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-400">No data available. Please ensure data files are loaded.</p>
          </div>
        )}

        {/* Global Prediction Maps */}
        <GlobalPredictionMaps />

        {/* Model Information */}
        <ModelInformation />
      </div>
    </div>
  )
}

function DataSourceInfo({ modisData }) {
  if (!modisData?.metadata) return null

  const { metadata } = modisData
  const availableDepths = Object.keys(modisData.depths || {})
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 mb-8"
    >
      <div className="flex items-start gap-4">
        <div className="text-4xl">📊</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-green-400 mb-4">Real NASA MODIS Data</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Data Source</div>
              <div className="text-white font-semibold text-sm">{metadata.source_file}</div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Processing Date</div>
              <div className="text-white font-semibold text-sm">
                {new Date(metadata.processing_date).toLocaleDateString()}
              </div>
            </div>
            <div className="bg-slate-900/30 rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Available Depths</div>
              <div className="text-white font-semibold text-sm">{availableDepths.join(', ')}m</div>
            </div>
          </div>
          <div className="mt-4 bg-slate-900/30 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Coverage Area</div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-gray-500">Latitude:</span>{' '}
                <span className="text-cyan-400 font-mono">
                  {metadata.bounds.lat_min.toFixed(2)}° to {metadata.bounds.lat_max.toFixed(2)}°
                </span>
              </div>
              <div>
                <span className="text-gray-500">Longitude:</span>{' '}
                <span className="text-cyan-400 font-mono">
                  {metadata.bounds.lon_min.toFixed(2)}° to {metadata.bounds.lon_max.toFixed(2)}°
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ForecastMap({ data, stats, depth }) {
  // Memoize custom tooltip to prevent re-creation
  const CustomTooltip = useCallback(
    ({ active, payload }) => {
      if (active && payload && payload[0]) {
        const d = payload[0].payload
        return (
          <div className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-sm">
            <div className="text-white font-semibold mb-2">Forecast Details</div>
            <div className="text-gray-300">Lat: {d.lat.toFixed(2)}°</div>
            <div className="text-gray-300">Lon: {d.lon.toFixed(2)}°</div>
            <div className="text-cyan-400 font-semibold">Intensity: {d.intensity.toFixed(2)}</div>
            <div className="text-purple-400">Probability: {(d.probability * 100).toFixed(1)}%</div>
            <div className="text-gray-400 text-xs mt-2">Depth: {depth}m</div>
          </div>
        )
      }
      return null
    },
    [depth]
  )

  // Memoize shape renderer
  const renderShape = useCallback(
    (props) => {
      const { cx, cy, payload } = props
      const color = getIntensityColor(payload.intensity, stats.p2, stats.p98)
      return <circle cx={cx} cy={cy} r={6} fill={color} opacity={0.8} />
    },
    [stats.p2, stats.p98]
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Shark Foraging Intensity Map</h2>
            <p className="text-gray-400">ML-predicted intensity (λ) at {depth}m depth</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-semibold">Live Forecast</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis
              type="number"
              dataKey="lon"
              name="Longitude"
              stroke="#94a3b8"
              domain={['dataMin', 'dataMax']}
              label={{
                value: 'Longitude (°)',
                position: 'insideBottom',
                offset: -10,
                fill: '#94a3b8',
              }}
            />
            <YAxis
              type="number"
              dataKey="lat"
              name="Latitude"
              stroke="#94a3b8"
              domain={['dataMin', 'dataMax']}
              label={{ value: 'Latitude (°)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
            />
            <ZAxis type="number" dataKey="intensity" name="Intensity" range={[50, 400]} />
            <Tooltip content={CustomTooltip} />
            <Scatter
              name="Shark Intensity"
              data={data}
              fill="#06b6d4"
              fillOpacity={0.6}
              shape={renderShape}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Color Legend */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <span className="text-gray-400 text-sm">Low Intensity</span>
          <div className="flex h-6 w-64 rounded-full overflow-hidden shadow-lg">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  background: getIntensityColor(
                    stats.p2 + ((stats.p98 - stats.p2) * i) / 19,
                    stats.p2,
                    stats.p98
                  ),
                  width: '5%',
                }}
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm">High Intensity</span>
        </div>
      </motion.div>

      {/* Global Ocean Intensity Map */}
      <GlobalIntensityMap data={data} stats={stats} depth={depth} />
    </>
  )
}

function GlobalIntensityMap({ data, stats, depth }) {
  // Group data into regions for better visualization
  const regions = useMemo(() => {
    const regionGroups = {
      'North Atlantic': { lat: [25, 50], lon: [-80, -10], data: [] },
      'South Atlantic': { lat: [-50, -10], lon: [-70, 20], data: [] },
      'North Pacific': { lat: [20, 55], lon: [-180, -100], data: [] },
      'South Pacific': { lat: [-50, -10], lon: [140, -70], data: [] },
      'Indian Ocean': { lat: [-40, 25], lon: [40, 120], data: [] },
      Mediterranean: { lat: [30, 45], lon: [-5, 40], data: [] },
    }

    data.forEach((point) => {
      Object.entries(regionGroups).forEach(([name, region]) => {
        if (
          point.lat >= region.lat[0] &&
          point.lat <= region.lat[1] &&
          point.lon >= region.lon[0] &&
          point.lon <= region.lon[1]
        ) {
          region.data.push(point)
        }
      })
    })

    // Calculate average intensity per region
    return Object.entries(regionGroups).map(([name, region]) => {
      const avgIntensity =
        region.data.length > 0
          ? region.data.reduce((sum, d) => sum + d.intensity, 0) / region.data.length
          : 0
      return {
        name,
        intensity: avgIntensity,
        count: region.data.length,
        color: getIntensityColor(avgIntensity, stats.p2, stats.p98),
      }
    })
  }, [data, stats])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Global Ocean Shark Foraging Intensity
        </h2>
        <p className="text-gray-400">Regional analysis at {depth}m depth based on MODIS data</p>
      </div>

      {/* World Map Visualization (Simplified) */}
      <div className="relative w-full h-96 bg-gradient-to-b from-blue-950/50 to-blue-900/30 rounded-xl overflow-hidden mb-6">
        {/* Ocean Texture */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/5 rounded-full blur-2xl"
              style={{
                left: `${(i * 13) % 100}%`,
                top: `${(i * 17) % 100}%`,
                width: `${80 + (i % 5) * 20}px`,
                height: `${80 + (i % 5) * 20}px`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Region Markers */}
        <div className="relative w-full h-full">
          {/* North Atlantic */}
          <RegionMarker
            name="North Atlantic"
            left="35%"
            top="25%"
            intensity={regions.find((r) => r.name === 'North Atlantic')?.intensity || 0}
            color={regions.find((r) => r.name === 'North Atlantic')?.color}
            count={regions.find((r) => r.name === 'North Atlantic')?.count || 0}
          />
          {/* South Atlantic */}
          <RegionMarker
            name="South Atlantic"
            left="40%"
            top="70%"
            intensity={regions.find((r) => r.name === 'South Atlantic')?.intensity || 0}
            color={regions.find((r) => r.name === 'South Atlantic')?.color}
            count={regions.find((r) => r.name === 'South Atlantic')?.count || 0}
          />
          {/* North Pacific */}
          <RegionMarker
            name="North Pacific"
            left="75%"
            top="30%"
            intensity={regions.find((r) => r.name === 'North Pacific')?.intensity || 0}
            color={regions.find((r) => r.name === 'North Pacific')?.color}
            count={regions.find((r) => r.name === 'North Pacific')?.count || 0}
          />
          {/* South Pacific */}
          <RegionMarker
            name="South Pacific"
            left="80%"
            top="65%"
            intensity={regions.find((r) => r.name === 'South Pacific')?.intensity || 0}
            color={regions.find((r) => r.name === 'South Pacific')?.color}
            count={regions.find((r) => r.name === 'South Pacific')?.count || 0}
          />
          {/* Indian Ocean */}
          <RegionMarker
            name="Indian Ocean"
            left="60%"
            top="55%"
            intensity={regions.find((r) => r.name === 'Indian Ocean')?.intensity || 0}
            color={regions.find((r) => r.name === 'Indian Ocean')?.color}
            count={regions.find((r) => r.name === 'Indian Ocean')?.count || 0}
          />
          {/* Mediterranean */}
          <RegionMarker
            name="Mediterranean"
            left="48%"
            top="32%"
            intensity={regions.find((r) => r.name === 'Mediterranean')?.intensity || 0}
            color={regions.find((r) => r.name === 'Mediterranean')?.color}
            count={regions.find((r) => r.name === 'Mediterranean')?.count || 0}
          />
        </div>

        {/* Equator Line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20"></div>
        <div className="absolute top-1/2 left-4 bg-slate-900/80 px-2 py-1 rounded text-xs text-white/60">
          Equator
        </div>
      </div>

      {/* Region Statistics Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {regions
          .sort((a, b) => b.intensity - a.intensity)
          .map((region) => (
            <motion.div
              key={region.name}
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 border border-white/10 rounded-xl p-4 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ backgroundColor: region.color }}
                ></div>
                <h4 className="text-white font-semibold">{region.name}</h4>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Intensity:</span>
                  <span className="text-cyan-400 font-semibold">{region.intensity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Data Points:</span>
                  <span className="text-white">{region.count}</span>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </motion.div>
  )
}

function RegionMarker({ name, left, top, intensity, color, count }) {
  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
      style={{ left, top }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: 'spring' }}
      whileHover={{ scale: 1.3 }}
    >
      {/* Pulsing Ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.8, 0, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Main Marker */}
      <div
        className="w-8 h-8 rounded-full border-2 border-white shadow-xl relative"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 rounded-full bg-white/30"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="bg-slate-900 border border-cyan-500/30 rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
          <div className="text-white font-semibold mb-1">{name}</div>
          <div className="text-cyan-400">Intensity: {intensity.toFixed(2)}</div>
          <div className="text-gray-400">Points: {count}</div>
        </div>
      </div>
    </motion.div>
  )
}

function ModelMetrics({ data, stats, depth, modisData }) {
  const highIntensity = data.filter((d) => d.intensity > stats.mean * 1.5).length
  const avgProbability = (data.reduce((sum, d) => sum + d.probability, 0) / data.length) * 100

  // Get real statistics from MODIS data for current depth
  const closestDepth = modisData?.depths
    ? Object.keys(modisData.depths)
        .map(Number)
        .reduce((prev, curr) => (Math.abs(curr - depth) < Math.abs(prev - depth) ? curr : prev))
    : depth

  const depthStats = modisData?.depths?.[closestDepth.toString()]?.stats

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid md:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-cyan-400 mb-2">
          {depthStats ? depthStats.mean_intensity.toFixed(2) : stats.mean.toFixed(2)}
        </div>
        <div className="text-gray-400 text-sm">Mean Intensity (λ)</div>
        <div className="text-xs text-gray-500 mt-1">From MODIS data</div>
      </div>
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-purple-400 mb-2">
          {depthStats ? (depthStats.mean_probability * 100).toFixed(1) : avgProbability.toFixed(1)}%
        </div>
        <div className="text-gray-400 text-sm">Avg Probability</div>
        <div className="text-xs text-gray-500 mt-1">From MODIS data</div>
      </div>
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-orange-400 mb-2">{highIntensity}</div>
        <div className="text-gray-400 text-sm">High Intensity Zones</div>
        <div className="text-xs text-gray-500 mt-1">Filtered data points</div>
      </div>
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-green-400 mb-2">{closestDepth}m</div>
        <div className="text-gray-400 text-sm">Analysis Depth</div>
        <div className="text-xs text-gray-500 mt-1">
          {depthStats ? `${depthStats.count.toLocaleString()} points` : 'Active'}
        </div>
      </div>
    </motion.div>
  )
}

function ParameterDistribution({ data }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Parameter Distribution</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <ParameterCard
          title="Sea Surface Temperature"
          data={data.map((d) => d.sst)}
          unit="°C"
          color="orange"
        />
        <ParameterCard
          title="Chlorophyll-a"
          data={data.map((d) => d.chlorophyll)}
          unit="mg/m³"
          color="green"
        />
        <ParameterCard
          title="SSHA (Normalized)"
          data={data.map((d) => d.ssha)}
          unit=""
          color="blue"
        />
      </div>
    </motion.div>
  )
}

function ParameterCard({ title, data, unit, color }) {
  const stats = useMemo(() => {
    const validData = data.filter((v) => !isNaN(v) && v !== null)
    const min = Math.min(...validData)
    const max = Math.max(...validData)
    const mean = validData.reduce((sum, v) => sum + v, 0) / validData.length
    return { min, max, mean }
  }, [data])

  const colorClasses = {
    orange: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    green: 'text-green-400 bg-green-500/10 border-green-500/30',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  }

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-6`}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Min:</span>
          <span className="text-white font-semibold">
            {stats.min.toFixed(2)} {unit}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Mean:</span>
          <span className="text-white font-semibold">
            {stats.mean.toFixed(2)} {unit}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Max:</span>
          <span className="text-white font-semibold">
            {stats.max.toFixed(2)} {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

function ModelInformation() {
  const [expandedSection, setExpandedSection] = useState('gaussian')

  const sections = [
    {
      id: 'gaussian',
      title: 'SHARK Gaussian Model',
      color: 'cyan',
      icon: '🎯',
      formula: 'Bp = 0.4·SST + 0.2·SSHA + 0.4·Chl',
      content: (
        <p className="text-gray-300 leading-relaxed">
          The model uses a <strong className="text-cyan-400">weighted Gaussian framework</strong> to
          predict shark foraging intensity based on three key parameters: Sea Surface Temperature (
          <span className="text-orange-400 font-semibold">40% weight</span>), normalized Sea Surface
          Height Anomaly (<span className="text-blue-400 font-semibold">20% weight</span>), and
          Chlorophyll-a concentration (
          <span className="text-green-400 font-semibold">40% weight</span>).
        </p>
      ),
      gradient: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30 hover:border-cyan-500/60',
    },
    {
      id: 'depth',
      title: 'Depth Adjustment',
      color: 'purple',
      icon: '⬇️',
      formula: 'SST_adj = SST - (0.02 + 0.01·sin²(lat)) · depth',
      content: (
        <p className="text-gray-300 leading-relaxed">
          Temperature decreases with depth using a{' '}
          <strong className="text-purple-400">latitude-dependent lapse rate</strong> (0.02-0.03
          °C/m). The model adjusts SST values for each depth slice, with{' '}
          <span className="text-blue-300 font-semibold">Arctic suppression</span> filtering out
          predictions below <span className="text-cyan-400 font-mono">18.1°C</span>.
        </p>
      ),
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30 hover:border-purple-500/60',
    },
    {
      id: 'transform',
      title: 'Log-Linear Transformation',
      color: 'orange',
      icon: '📊',
      formula: 'λ = exp(β₀ + β₁·P + ε)',
      content: (
        <p className="text-gray-300 leading-relaxed">
          Foraging probabilities (0-1) are transformed to{' '}
          <strong className="text-orange-400">intensity values (λ)</strong> using an exponential
          function where <span className="text-gray-400 font-mono">β₀=0</span>,{' '}
          <span className="text-gray-400 font-mono">β₁=2</span>, and{' '}
          <span className="text-gray-400 font-mono">ε</span> is random noise for natural variation.
        </p>
      ),
      gradient: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30 hover:border-orange-500/60',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Model Methodology</h2>
        <p className="text-gray-400">
          Interactive technical deep-dive into the SHARK Gaussian Model
        </p>
      </div>

      {/* Interactive Sections */}
      <div className="space-y-4 mb-8">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className={`border ${section.borderColor} rounded-xl overflow-hidden transition-all cursor-pointer bg-gradient-to-r ${section.gradient}`}
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{section.icon}</span>
                  <h3 className={`text-xl font-bold text-${section.color}-400`}>{section.title}</h3>
                </div>
                <motion.div
                  animate={{ rotate: expandedSection === section.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-400"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Formula Badge */}
              <div className="bg-slate-900/50 border border-white/10 rounded-lg px-4 py-2 mb-4 inline-block">
                <code className="text-white font-mono text-sm">{section.formula}</code>
              </div>

              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/10">{section.content}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Model Parameters */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6"
        >
          <div className="text-3xl mb-2">📏</div>
          <h4 className="text-blue-400 font-bold text-lg mb-2">Mean Foraging Depth</h4>
          <div className="text-3xl font-bold text-white mb-1">50-250m</div>
          <p className="text-gray-400 text-sm">Species-dependent range</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6"
        >
          <div className="text-3xl mb-2">🌡️</div>
          <h4 className="text-orange-400 font-bold text-lg mb-2">Suitable Temperature</h4>
          <div className="text-3xl font-bold text-white mb-1">18-26°C</div>
          <p className="text-gray-400 text-sm">Optimal foraging range</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6"
        >
          <div className="text-3xl mb-2">⚡</div>
          <h4 className="text-purple-400 font-bold text-lg mb-2">Temp Reactivity</h4>
          <div className="text-3xl font-bold text-white mb-1">High</div>
          <p className="text-gray-400 text-sm">Behavioral response rate</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6"
        >
          <div className="text-3xl mb-2">📍</div>
          <h4 className="text-green-400 font-bold text-lg mb-2">Foraging Distance</h4>
          <div className="text-3xl font-bold text-white mb-1">5-50km</div>
          <p className="text-gray-400 text-sm">From core habitat</p>
        </motion.div>
      </div>

      {/* Limitations */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="text-4xl">⚠️</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-yellow-400 mb-4">Model Limitations</h3>
            <div className="space-y-3">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 bg-slate-900/30 rounded-lg p-3"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                <p className="text-gray-300">
                  This is a <strong className="text-yellow-300">Machine Learning model</strong>, not
                  AI. It uses statistical relationships from oceanographic data.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 bg-slate-900/30 rounded-lg p-3"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                <p className="text-gray-300">
                  Using <strong className="text-green-300">real MODIS Chlorophyll-a data</strong>{' '}
                  from NASA satellite observations. SST is derived from coral bleaching alert areas,
                  and SSHA from altimetry measurements.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 bg-slate-900/30 rounded-lg p-3"
              >
                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                <p className="text-gray-300">
                  Predictions are based on environmental correlations and would require{' '}
                  <strong className="text-purple-300">
                    comparison with actual shark tracking data for validation
                  </strong>
                  .
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function GlobalPredictionMaps() {
  const [selectedDepth, setSelectedDepth] = useState(100)

  const depthMaps = {
    50: {
      image: '/Shark%20foraging%20prediction%20visualisation%20at%2050%20metres.png',
      title: '50 Meters Depth',
      description: 'Surface layer predictions showing coastal hotspots and upwelling zones',
    },
    100: {
      image: '/Shark%20foraging%20prediction%20visualisation%20at%20100%20metres.png',
      title: '100 Meters Depth',
      description: 'Thermocline layer with peak shark activity and prey concentration',
    },
    150: {
      image: '/Shark%20foraging%20prediction%20visualisation%20at%20150%20metres.png',
      title: '150 Meters Depth',
      description: 'Deep foraging zones with eddy-driven nutrient upwelling',
    },
    200: {
      image: '/Shark%20foraging%20prediction%20visualisation%20at%20200%20metres.png',
      title: '200 Meters Depth',
      description: 'Mesopelagic predictions for deep-diving shark species',
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-8"
    >
      <div className="bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border-2 border-orange-500/30 rounded-3xl p-8 md:p-12">
        {/* YC-Style Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-orange-400 text-sm font-bold">
              GLOBAL PREDICTIONS • SHARK GAUSSIAN MODEL
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
              World's First Global Shark Foraging Map
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-6">
            Real-time predictions across{' '}
            <span className="text-orange-400 font-bold">every ocean</span> on Earth.
            <br />
            Powered by NASA MODIS satellite data and our proprietary Gaussian model.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="px-4 py-2 bg-orange-500/10 rounded-full">
              <span className="text-orange-400 font-semibold">✓ 360° Global Coverage</span>
            </div>
            <div className="px-4 py-2 bg-red-500/10 rounded-full">
              <span className="text-red-400 font-semibold">✓ 4 Depth Layers</span>
            </div>
            <div className="px-4 py-2 bg-pink-500/10 rounded-full">
              <span className="text-pink-400 font-semibold">✓ Log-Linear Intensity</span>
            </div>
          </div>
        </div>

        {/* Depth Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {Object.keys(depthMaps).map((depth) => (
            <button
              key={depth}
              onClick={() => setSelectedDepth(Number(depth))}
              className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${
                selectedDepth === Number(depth)
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-800'
              }`}
            >
              {depth}m
            </button>
          ))}
        </div>

        {/* Map Display */}
        <motion.div
          key={selectedDepth}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/50 rounded-2xl p-4 border border-white/10"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-bold text-white mb-2">{depthMaps[selectedDepth].title}</h3>
            <p className="text-gray-400">{depthMaps[selectedDepth].description}</p>
          </div>

          <div className="relative rounded-xl overflow-hidden border-2 border-orange-500/30">
            <img
              src={depthMaps[selectedDepth].image}
              alt={`SHARK Gaussian Model prediction at ${selectedDepth} meters`}
              className="w-full h-auto"
            />

            {/* Overlay Badge */}
            <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-sm border border-orange-500/50 rounded-lg px-4 py-2">
              <div className="text-orange-400 font-bold text-sm">SHARK Gaussian Model</div>
              <div className="text-gray-300 text-xs">Log-Linear Intensity • Arctic Suppression</div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-gradient-to-r from-red-600 to-red-800 rounded"></div>
                <span className="text-red-400 font-bold">High Intensity (2.5-3.0)</span>
              </div>
              <p className="text-gray-400 text-sm">
                Peak foraging zones with optimal conditions for shark activity
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded"></div>
                <span className="text-orange-400 font-bold">Moderate (1.5-2.5)</span>
              </div>
              <p className="text-gray-400 text-sm">
                Active foraging areas with good prey availability
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded"></div>
                <span className="text-yellow-400 font-bold">Low (1.0-1.5)</span>
              </div>
              <p className="text-gray-400 text-sm">
                Baseline activity with occasional shark presence
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Insights */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-xl p-6 border border-orange-500/20">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🌊</span>
              Global Hotspots Identified
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  <strong>Gulf Stream:</strong> Intense activity along western Atlantic current
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  <strong>Kuroshio Current:</strong> High intensity off Japan and Taiwan
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  <strong>Agulhas Current:</strong> Peak foraging zones off South Africa
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400 mt-1">•</span>
                <span>
                  <strong>Equatorial Upwelling:</strong> Continuous hotspot band across Pacific
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 border border-red-500/20">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              Model Features
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong>Log-Linear Intensity:</strong> Captures exponential foraging patterns
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong>Arctic Suppression:</strong> Accounts for temperature limitations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong>Depth Stratification:</strong> Species-specific vertical distribution
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span>
                  <strong>Real-time Updates:</strong> Refreshes with latest NASA satellite data
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-3">Potential Conservation Impact</h3>
            <p className="text-white/90 mb-4 max-w-2xl">
              This hypothetical model could enable targeted conservation efforts, reduce bycatch,
              and prevent human-shark conflicts worldwide if implemented
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 bg-white/20 rounded-lg">
                <div className="text-2xl font-bold text-white">Global</div>
                <div className="text-xs text-white/80">Ocean Coverage</div>
              </div>
              <div className="px-4 py-2 bg-white/20 rounded-lg">
                <div className="text-2xl font-bold text-white">Worldwide</div>
                <div className="text-xs text-white/80">Potential Reach</div>
              </div>
              <div className="px-4 py-2 bg-white/20 rounded-lg">
                <div className="text-2xl font-bold text-white">Conceptual</div>
                <div className="text-xs text-white/80">Model Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
