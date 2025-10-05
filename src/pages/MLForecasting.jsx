import { motion } from 'framer-motion'
import { useState, useMemo, useEffect } from 'react'
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, CartesianGrid } from 'recharts'
import {
  sharkGaussianModel,
  processGridData,
  getIntensityColor,
  calculateIntensityStats,
  normalizeSSHA,
} from '../utils/mlForecasting'
import { parseSSHAData, calculateStats } from '../utils/dataProcessing'

export default function MLForecasting() {
  const [depth, setDepth] = useState(80)
  const [sshaData, setSSHAData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState('intensity')

  // Load SSHA data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/SSHA-2025-data.csv')
        if (!response.ok) throw new Error('Failed to load data')
        const text = await response.text()
        const parsed = parseSSHAData(text)
        setSSHAData(parsed)
      } catch (err) {
        console.error('Error loading data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Process data with current depth
  const forecastData = useMemo(() => {
    if (!sshaData || sshaData.length === 0) return null

    // Sample data for performance (take every 10th point)
    const sampled = sshaData.filter((_, i) => i % 10 === 0).slice(0, 500)

    // Normalize SSHA
    const sshaValues = sampled.map((d) => d.value)
    const { normalized } = normalizeSSHA(sshaValues)

    // Generate synthetic SST and Chlorophyll for demonstration
    // In production, these would come from real data files
    const processed = sampled.map((point, i) => {
      // Synthetic SST (18-30°C based on latitude)
      const sst = 26 - Math.abs(point.lat) * 0.15 + (Math.random() - 0.5) * 2

      // Synthetic Chlorophyll (0.01-5 mg/m³, higher near coasts)
      const chlorophyll = 0.1 + Math.random() * 2

      const probability = sharkGaussianModel({
        sst,
        ssha: normalized[i],
        chlorophyll,
        lat: point.lat,
        depth,
      })

      const intensity = Math.exp(2.0 * probability + (Math.random() - 0.5) * 0.1)

      return {
        lat: point.lat,
        lon: point.lon,
        sst,
        chlorophyll,
        ssha: normalized[i],
        probability,
        intensity,
        depth,
      }
    })

    return processed
  }, [sshaData, depth])

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-400 text-sm font-semibold">ML-Powered Forecasting</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            SHARK Gaussian Model
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
            Machine Learning forecasting using multi-parameter Gaussian models to predict shark
            foraging intensity across ocean depths
          </p>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 max-w-4xl mx-auto">
            <p className="text-gray-300 text-base leading-relaxed">
              <span className="text-purple-400 font-bold">ML Model Integration:</span> Combines{' '}
              <span className="text-cyan-400 font-semibold">MODIS Chlorophyll-a</span>,{' '}
              <span className="text-orange-400 font-semibold">SST Proxy</span>, and{' '}
              <span className="text-blue-400 font-semibold">SSHA data</span> through a
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
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Depth Adjustment</h3>
              <p className="text-gray-400">
                Adjust depth to see how temperature lapse rate affects predictions
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-cyan-400">{depth}m</div>
              <div className="text-sm text-gray-400">Current Depth</div>
            </div>
          </div>

          <div className="relative">
            <input
              type="range"
              min="50"
              max="300"
              step="50"
              value={depth}
              onChange={(e) => setDepth(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer range-slider"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${
                  ((depth - 50) / 250) * 100
                }%, #334155 ${((depth - 50) / 250) * 100}%, #334155 100%)`,
              }}
            />
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>50m</span>
              <span>100m</span>
              <span>150m</span>
              <span>200m</span>
              <span>250m</span>
              <span>300m</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <button
              onClick={() => setDepth(80)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                depth === 80
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
              }`}
            >
              Shallow (80m)
            </button>
            <button
              onClick={() => setDepth(150)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                depth === 150
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
              }`}
            >
              Mid-depth (150m)
            </button>
            <button
              onClick={() => setDepth(250)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                depth === 250
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-700'
              }`}
            >
              Deep (250m)
            </button>
          </div>
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
            <ForecastMap data={forecastData} stats={stats} depth={depth} />
            <ModelMetrics data={forecastData} stats={stats} depth={depth} />
            <ParameterDistribution data={forecastData} />
          </>
        ) : (
          <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <p className="text-gray-400">No data available. Please ensure data files are loaded.</p>
          </div>
        )}

        {/* Model Information */}
        <ModelInformation />
      </div>
    </div>
  )
}

function ForecastMap({ data, stats, depth }) {
  return (
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
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
            label={{ value: 'Longitude (°)', position: 'insideBottom', offset: -10, fill: '#94a3b8' }}
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
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload[0]) {
                const d = payload[0].payload
                return (
                  <div className="bg-slate-900 border border-cyan-500/30 rounded-lg px-4 py-3 text-sm">
                    <div className="text-white font-semibold mb-2">Forecast Details</div>
                    <div className="text-gray-300">Lat: {d.lat.toFixed(2)}°</div>
                    <div className="text-gray-300">Lon: {d.lon.toFixed(2)}°</div>
                    <div className="text-cyan-400 font-semibold">
                      Intensity: {d.intensity.toFixed(2)}
                    </div>
                    <div className="text-purple-400">Probability: {(d.probability * 100).toFixed(1)}%</div>
                    <div className="text-gray-400 text-xs mt-2">Depth: {depth}m</div>
                  </div>
                )
              }
              return null
            }}
          />
          <Scatter
            name="Shark Intensity"
            data={data}
            fill="#06b6d4"
            fillOpacity={0.6}
            shape={(props) => {
              const { cx, cy, payload } = props
              const color = getIntensityColor(payload.intensity, stats.p2, stats.p98)
              return <circle cx={cx} cy={cy} r={6} fill={color} opacity={0.8} />
            }}
          />
        </ScatterChart>
      </ResponsiveContainer>

      {/* Color Legend */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <span className="text-gray-400 text-sm">Low Intensity</span>
        <div className="flex h-6 w-64 rounded-full overflow-hidden">
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
  )
}

function ModelMetrics({ data, stats, depth }) {
  const highIntensity = data.filter((d) => d.intensity > stats.mean * 1.5).length
  const avgProbability = (data.reduce((sum, d) => sum + d.probability, 0) / data.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid md:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-cyan-400 mb-2">{stats.mean.toFixed(2)}</div>
        <div className="text-gray-400 text-sm">Mean Intensity (λ)</div>
      </div>
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-purple-400 mb-2">{avgProbability.toFixed(1)}%</div>
        <div className="text-gray-400 text-sm">Avg Probability</div>
      </div>
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-orange-400 mb-2">{highIntensity}</div>
        <div className="text-gray-400 text-sm">High Intensity Zones</div>
      </div>
      <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="text-4xl font-bold text-green-400 mb-2">{depth}m</div>
        <div className="text-gray-400 text-sm">Analysis Depth</div>
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
        <ParameterCard title="SSHA (Normalized)" data={data.map((d) => d.ssha)} unit="" color="blue" />
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Model Methodology</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">SHARK Gaussian Model</h3>
          <p className="text-gray-300 leading-relaxed">
            The model uses a weighted Gaussian framework to predict shark foraging intensity based on
            three key parameters: Sea Surface Temperature (40% weight), normalized Sea Surface Height
            Anomaly (20% weight), and Chlorophyll-a concentration (40% weight).
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-purple-400 mb-3">Depth Adjustment</h3>
          <p className="text-gray-300 leading-relaxed">
            Temperature decreases with depth using a latitude-dependent lapse rate (0.02-0.03 °C/m).
            The model adjusts SST values for each depth slice, with Arctic suppression filtering out
            predictions below 18.1°C.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Log-Linear Transformation</h3>
          <p className="text-gray-300 leading-relaxed">
            Foraging probabilities (0-1) are transformed to intensity values (λ) using: λ = exp(β₀ +
            β₁·P + ε), where β₀=0, β₁=2, and ε is random noise for natural variation.
          </p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">⚠️ Model Limitations</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>
                This is a <strong>Machine Learning model</strong>, not AI. It uses statistical
                relationships from oceanographic data.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>
                Currently using synthetic SST and Chlorophyll data for demonstration. Full
                implementation requires complete MODIS datasets.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-400 mt-1">•</span>
              <span>
                Predictions are based on environmental correlations and should be validated with
                actual shark tracking data.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
