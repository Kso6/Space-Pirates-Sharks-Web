import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { calculateSFI } from '../utils/dataProcessing'
import fallbackModisSample from '../data/fallback-modis-sample.json'

export default function SFIDashboard() {
  const [modisData, setModisData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDepth, setSelectedDepth] = useState(100)
  const [dataWarning, setDataWarning] = useState(null)

  // Load MODIS data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try multiple paths to ensure it works in both dev and deployed environments
        const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
        const paths = [
          `${baseUrl}/processed-data/modis-shark-model.json`,
          '/processed-data/modis-shark-model.json',
          './processed-data/modis-shark-model.json',
          'processed-data/modis-shark-model.json',
        ]

        let data = null
        let lastError = null

        for (const path of paths) {
          try {
            if (import.meta.env.DEV) {
              console.log(`Attempting to load MODIS data from ${path}`)
            }
            const response = await fetch(path)
            if (response.ok) {
              data = await response.json()
              if (import.meta.env.DEV) {
                console.log('Data loaded successfully from:', path, {
                  hasMetadata: !!data.metadata,
                  hasDepths: !!data.depths,
                  depthKeys: data.depths ? Object.keys(data.depths) : [],
                })
              }
              break
            }
          } catch (err) {
            if (import.meta.env.DEV) {
              console.warn(`Failed to load from ${path}:`, err.message)
            }
            lastError = err
          }
        }

        if (!data) {
          const fallbackMessage =
            'Showing cached sample data because the live MODIS dataset could not be loaded.'
          setModisData(fallbackModisSample)
          setDataWarning(fallbackMessage)
          if (import.meta.env.DEV) {
            console.error('Error loading MODIS data:', lastError)
            console.warn(fallbackMessage)
          }
        } else {
          setModisData(data)
          setDataWarning(null)
        }
      } catch (err) {
        if (import.meta.env.DEV) {
          console.error('Unexpected error loading MODIS data:', err)
        }
        setModisData(fallbackModisSample)
        setDataWarning(
          'Showing cached sample data because the live MODIS dataset could not be loaded.'
        )
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const depthOptions = useMemo(() => {
    if (!modisData) return []

    const metadataDepths = modisData.metadata?.depths
    if (Array.isArray(metadataDepths) && metadataDepths.length > 0) {
      return [...metadataDepths].sort((a, b) => a - b)
    }

    const depthKeys = Object.keys(modisData.depths ?? {})
    return depthKeys.map(Number).sort((a, b) => a - b)
  }, [modisData])

  useEffect(() => {
    if (depthOptions.length === 0) return
    if (!depthOptions.includes(selectedDepth)) {
      setSelectedDepth(depthOptions[0])
    }
  }, [depthOptions, selectedDepth])

  // Process SFI data from MODIS
  const sfiData = useMemo(() => {
    if (!modisData || !modisData.depths) return null

    const depthKey = String(selectedDepth)
    if (!modisData.depths[depthKey]) return null

    const depthData = modisData.depths[depthKey].data
    if (!depthData || !Array.isArray(depthData)) return null

    // Filter valid data and calculate SFI
    const validData = depthData
      .filter(
        (point) =>
          point.chlorophyll > 0 &&
          point.chlorophyll < 100 &&
          point.sst > 0 &&
          point.sst < 35 &&
          !isNaN(point.intensity)
      )
      .slice(0, 1000) // Sample for performance

    return validData.map((point) => ({
      lat: point.lat,
      lon: point.lon,
      chlorophyll: point.chlorophyll,
      sst: point.sst,
      intensity: point.intensity,
      probability: point.probability,
      // Calculate real SFI using the formula
      sfi: calculateSFI(point.intensity * 10, point.chlorophyll, point.sst),
    }))
  }, [modisData, selectedDepth])

  // Calculate global statistics
  const globalStats = useMemo(() => {
    if (!sfiData) return null

    const sfiValues = sfiData.map((d) => d.sfi)
    const intensityValues = sfiData.map((d) => d.intensity)

    return {
      avgSFI: (sfiValues.reduce((a, b) => a + b, 0) / sfiValues.length).toFixed(2),
      maxSFI: Math.max(...sfiValues).toFixed(2),
      minSFI: Math.min(...sfiValues).toFixed(2),
      hotspots: sfiData.filter((d) => d.sfi > 1.2).length,
      totalPoints: sfiData.length,
      avgIntensity: (intensityValues.reduce((a, b) => a + b, 0) / intensityValues.length).toFixed(
        3
      ),
    }
  }, [sfiData])

  const statsDisplay = globalStats ?? {
    avgSFI: '0.00',
    maxSFI: '0.00',
    minSFI: '0.00',
    hotspots: 0,
    totalPoints: 0,
    avgIntensity: '0.000',
  }

  // Regional breakdown
  const regionalData = useMemo(() => {
    if (!sfiData) return []

    const regions = [
      { name: 'Tropical', latMin: -23.5, latMax: 23.5, color: '#ef4444' },
      { name: 'Subtropical', latMin: 23.5, latMax: 40, color: '#f59e0b' },
      { name: 'Temperate', latMin: 40, latMax: 60, color: '#10b981' },
      { name: 'Polar', latMin: 60, latMax: 90, color: '#3b82f6' },
    ]

    return regions.map((region) => {
      const regionPoints = sfiData.filter(
        (d) =>
          (d.lat >= region.latMin && d.lat <= region.latMax) ||
          (d.lat <= -region.latMin && d.lat >= -region.latMax)
      )

      if (regionPoints.length === 0) {
        return { ...region, avgSFI: 0, hotspots: 0, coverage: 0 }
      }

      const avgSFI = regionPoints.reduce((sum, d) => sum + d.sfi, 0) / regionPoints.length
      const hotspots = regionPoints.filter((d) => d.sfi > 1.2).length

      return {
        ...region,
        avgSFI: avgSFI.toFixed(2),
        hotspots,
        coverage: ((regionPoints.length / sfiData.length) * 100).toFixed(1),
      }
    })
  }, [sfiData])

  // SFI distribution for histogram
  const sfiDistribution = useMemo(() => {
    if (!sfiData || sfiData.length === 0) return []

    const bins = Array.from({ length: 20 }, (_, i) => ({
      range: (i * 0.1).toFixed(1),
      count: 0,
      label: `${(i * 0.1).toFixed(1)}-${((i + 1) * 0.1).toFixed(1)}`,
    }))

    sfiData.forEach((d) => {
      if (d.sfi !== null && !isNaN(d.sfi) && d.sfi >= 0) {
        const binIndex = Math.min(Math.floor(d.sfi / 0.1), 19)
        if (binIndex >= 0 && binIndex < 20) {
          bins[binIndex].count++
        }
      }
    })

    // Filter out bins with zero count for cleaner visualization
    return bins.filter((bin) => bin.count > 0)
  }, [sfiData])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading SFI data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* YC-Style Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-blue-400 text-sm font-bold">
              DEMO • Analyzing {(globalStats?.totalPoints ?? 0).toLocaleString()}+ Data Points
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Shark Foraging Index
            </span>
          </h1>

          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            A conceptual shark behavior prediction system demonstration.
            <br />
            <span className="text-cyan-400 font-semibold">
              Using NASA MODIS satellite data for proof of concept.
            </span>
          </p>

          {/* YC-Style Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <MetricCard
              value={statsDisplay.avgSFI}
              label="Global Avg SFI"
              trend="Conceptual"
              color="cyan"
            />
            <MetricCard
              value={statsDisplay.hotspots}
              label="Potential Hotspots"
              trend="Simulated"
              color="green"
            />
            <MetricCard
              value={`${selectedDepth}m`}
              label="Analysis Depth"
              trend="Demo Model"
              color="blue"
            />
            <MetricCard value="MODIS Demo" label="Dataset" trend="Synthetic Blend" color="purple" />
          </div>
        </motion.div>

        {dataWarning && (
          <div className="mb-8">
            <div className="bg-yellow-500/10 border border-yellow-400/40 text-yellow-300 text-sm md:text-base px-4 py-3 rounded-xl text-center">
              {dataWarning}
            </div>
          </div>
        )}

        {/* Depth Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Select Analysis Depth</h3>
              <p className="text-gray-400 text-sm">
                Different depths reveal different shark behaviors
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(depthOptions.length > 0 ? depthOptions : [selectedDepth]).map((depth) => (
                <button
                  key={depth}
                  onClick={() => setSelectedDepth(depth)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedDepth === depth
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                      : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
                  }`}
                >
                  {depth}m
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* SFI Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">SFI Distribution</h2>
              <p className="text-gray-400">
                Simulated foraging intensity across{' '}
                {(globalStats?.totalPoints ?? 0).toLocaleString()} ocean data points
              </p>
            </div>

            {sfiDistribution && sfiDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={sfiDistribution}
                  margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient id="sfiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis
                    dataKey="range"
                    stroke="#94a3b8"
                    label={{
                      value: 'SFI Score',
                      position: 'insideBottom',
                      offset: -10,
                      fill: '#94a3b8',
                    }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    label={{
                      value: 'Number of Points',
                      angle: -90,
                      position: 'insideLeft',
                      fill: '#94a3b8',
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #3b82f6',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: '#fff' }}
                    formatter={(value) => [`${value} points`, 'Frequency']}
                  />
                  <Bar dataKey="count" fill="url(#sfiGradient)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center bg-slate-900/30 rounded-xl">
                <div className="text-center">
                  <p className="text-gray-400 text-lg mb-2">No SFI data available</p>
                  <p className="text-gray-500 text-sm">
                    {dataWarning
                      ? dataWarning
                      : !sfiData
                      ? 'Loading data...'
                      : sfiData.length === 0
                      ? 'No valid data points found'
                      : 'Processing data...'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-300">High Risk (&gt;1.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-gray-300">Moderate (0.8-1.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-300">Low (&lt;0.8)</span>
              </div>
            </div>
          </motion.div>

          {/* Live Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Model Statistics</h2>
              <p className="text-gray-400 text-sm">Demonstration data</p>
            </div>

            <div className="space-y-6">
              <StatItem label="Average SFI" value={statsDisplay.avgSFI} unit="" color="cyan" />
              <StatItem label="Maximum SFI" value={statsDisplay.maxSFI} unit="" color="green" />
              <StatItem label="Minimum SFI" value={statsDisplay.minSFI} unit="" color="blue" />
              <StatItem
                label="Active Hotspots"
                value={statsDisplay.hotspots}
                unit="zones"
                color="orange"
              />
              <StatItem
                label="Avg Intensity"
                value={statsDisplay.avgIntensity}
                unit=""
                color="purple"
              />
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>NASA MODIS data (demo)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Regional Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Regional SFI Analysis</h2>
            <p className="text-gray-400">Foraging intensity by ocean zone</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalData.length > 0 ? (
              regionalData.map((region, idx) => <RegionalCard key={idx} region={region} />)
            ) : (
              <div className="md:col-span-2 lg:col-span-4 bg-slate-900/40 rounded-xl p-6 text-center text-gray-400">
                No regional data available for this depth. Try selecting a different depth above.
              </div>
            )}
          </div>
        </motion.div>

        {/* SFI Formula Explainer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8 mb-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">How SFI Works</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Our proprietary algorithm combines three key oceanographic factors to predict shark
              foraging behavior
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <FormulaCard
              icon="🌊"
              title="Sea Surface Height"
              weight="40%"
              description="Detects eddies and fronts where prey concentrates"
              color="from-blue-500 to-cyan-500"
            />
            <FormulaCard
              icon="🌿"
              title="Chlorophyll-a"
              weight="30%"
              description="Measures phytoplankton blooms that fuel food chains"
              color="from-green-500 to-emerald-500"
            />
            <FormulaCard
              icon="🌡️"
              title="Sea Surface Temp"
              weight="30%"
              description="Identifies optimal temperature zones for shark species"
              color="from-orange-500 to-red-500"
            />
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6 text-center">
            <div className="text-sm text-gray-400 mb-2">The Formula</div>
            <div className="text-2xl font-mono text-white mb-2">
              SFI = (SSHA × 0.4) + (Chl-a × 0.3) + (SST × 0.3)
            </div>
            <div className="text-sm text-gray-400">
              Conceptual model using {(globalStats?.totalPoints ?? 0).toLocaleString()}+ ocean data
              points
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Helper Components
function MetricCard({ value, label, trend, color }) {
  const colorMap = {
    cyan: 'from-cyan-500 to-blue-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-indigo-500',
    purple: 'from-purple-500 to-pink-500',
    orange: 'from-orange-500 to-red-500',
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-xl p-4">
      <div
        className={`text-3xl font-bold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent mb-1`}
      >
        {value}
      </div>
      <div className="text-sm text-gray-400 mb-2">{label}</div>
      <div className="text-xs text-green-400 font-semibold">{trend}</div>
    </div>
  )
}

function StatItem({ label, value, unit, color }) {
  const colorMap = {
    cyan: 'text-cyan-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
  }

  return (
    <div>
      <div className="text-gray-400 text-sm mb-1">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className={`text-3xl font-bold ${colorMap[color]}`}>{value}</span>
        {unit && <span className="text-gray-500 text-sm">{unit}</span>}
      </div>
    </div>
  )
}

function RegionalCard({ region }) {
  return (
    <div className="bg-slate-700/30 rounded-xl p-6 border border-white/5 hover:border-white/20 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${region.color}20`, border: `2px solid ${region.color}` }}
        >
          🦈
        </div>
        <div>
          <h3 className="text-white font-bold">{region.name}</h3>
          <p className="text-gray-400 text-xs">{region.coverage}% coverage</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Avg SFI</span>
          <span className="text-white font-bold">{region.avgSFI}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Hotspots</span>
          <span className="text-cyan-400 font-bold">{region.hotspots}</span>
        </div>
      </div>
    </div>
  )
}

function FormulaCard({ icon, title, weight, description, color }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div
        className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3`}
      >
        {weight}
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}
