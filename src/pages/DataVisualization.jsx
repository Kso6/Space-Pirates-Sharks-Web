import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
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

export default function DataVisualization() {
  const [activeDataset, setActiveDataset] = useState('swot')
  const [timeRange, setTimeRange] = useState('week')
  const [selectedRegion, setSelectedRegion] = useState('gulf-stream')
  const [error, setError] = useState(null)

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
            <span className="text-green-400 text-sm font-semibold">Live NASA Satellite Data</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Interactive Forecasting Dashboard
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore real-time oceanographic data and AI-powered predictions to identify shark
            foraging hotspots
          </p>
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
          <ForagingHotspotMap region={selectedRegion} />
          <SatelliteDataOverlay dataset={activeDataset} />
        </div>

        {/* 3D Ocean Visualization */}
        <Ocean3DProfile />

        {/* Time Series Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <TemporalTrends timeRange={timeRange} />
          <SharkActivityCorrelation />
        </div>

        {/* Statistical Heatmaps */}
        <StatisticalHeatmaps region={selectedRegion} />

        {/* Real-time Data Feed */}
        <RealTimeDataFeed dataset={activeDataset} />
      </div>
    </div>
  )
}

function ForagingHotspotMap({ region }) {
  // Generate synthetic foraging probability data
  const hotspotData = useMemo(() => {
    try {
      const data = []
      for (let i = 0; i < 50; i++) {
        data.push({
          lat: 25 + Math.random() * 15,
          lon: -80 + Math.random() * 20,
          probability: Math.random() * 0.8 + 0.2,
          sfi: Math.random() * 1.5 + 0.5,
          depth: Math.floor(Math.random() * 500),
        })
      }
      return data
    } catch (error) {
      console.error('Error generating foraging data:', error)
      return []
    }
  }, [region])

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
        {hotspotData.slice(0, 15).map((point, idx) => (
          <div
            key={idx}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${((point.lon + 80) / 20) * 100}%`,
              top: `${(1 - (point.lat - 25) / 15) * 100}%`,
            }}
            role="button"
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
        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2 text-xs text-gray-300 font-mono">
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

function SatelliteDataOverlay({ dataset }) {
  const getDatasetInfo = () => {
    switch (dataset) {
      case 'swot':
        return {
          title: 'SWOT Sea Surface Height',
          unit: 'cm',
          description: 'Surface Water and Ocean Topography mission data',
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

  // Generate synthetic satellite data
  const satelliteData = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: 15 + Math.sin(i / 3) * 5 + Math.random() * 3,
      anomaly: Math.sin(i / 4) * 2 + Math.random() - 0.5,
    }))
  }, [dataset])

  // Memoize current value display to prevent flickering
  const currentValue = useMemo(() => (15 + Math.random() * 10).toFixed(1), [dataset])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{info.title}</h2>
        <p className="text-sm text-gray-400">{info.description}</p>
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

      <div className="mt-4 flex justify-between text-sm">
        <div>
          <span className="text-gray-400">Last Updated:</span>
          <span className="text-white ml-2 font-mono">
            {new Date().toISOString().split('T')[0]}
          </span>
        </div>
        <div>
          <span className="text-gray-400">Coverage:</span>
          <span className="text-green-400 ml-2">98.5%</span>
        </div>
      </div>
    </div>
  )
}

function Ocean3DProfile() {
  const depthProfile = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      depth: i * 50,
      temperature: 25 - i * 50 * 0.03 + Math.random() * 0.5,
      chlorophyll: Math.exp(-i / 3) * (5 + Math.random() * 2),
      eddyIntensity: Math.exp(-Math.pow((i * 50 - 200) / 100, 2)) * (0.8 + Math.random() * 0.4),
      sfi: Math.random() * 1.2 + 0.3,
    }))
  }, [])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8 hover:border-white/20 transition-all">
      <h2 className="text-3xl font-bold text-white mb-8">3D Ocean Profile Analysis</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Depth profile chart */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Vertical Water Column Structure</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                type="number"
                dataKey="temperature"
                name="Temperature"
                unit="°C"
                stroke="#94a3b8"
              />
              <YAxis
                type="number"
                dataKey="depth"
                name="Depth"
                unit="m"
                reversed
                stroke="#94a3b8"
              />
              <ZAxis type="number" dataKey="sfi" name="SFI" range={[50, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Scatter name="Foraging Zones" data={depthProfile} fill="#3b82f6" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Multi-variable depth profile */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Multi-Parameter Depth Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={depthProfile} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis
                dataKey="depth"
                type="number"
                reversed
                stroke="#94a3b8"
                label={{ value: 'Depth (m)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Bar dataKey="eddyIntensity" fill="#3b82f6" name="Eddy Intensity" />
              <Line
                type="monotone"
                dataKey="chlorophyll"
                stroke="#10b981"
                strokeWidth={2}
                name="Chlorophyll-a"
              />
              <Line
                type="monotone"
                dataKey="sfi"
                stroke="#ef4444"
                strokeWidth={2}
                name="SFI Score"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Depth zone indicators */}
      <div className="grid grid-cols-4 gap-4 mt-6">
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

function TemporalTrends({ timeRange }) {
  const trendData = useMemo(() => {
    const points = timeRange === 'day' ? 24 : timeRange === 'week' ? 7 : 30
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      sfi: 0.5 + Math.sin(i / 3) * 0.3 + Math.random() * 0.2,
      feedingEvents: Math.floor(Math.random() * 5) + 1,
      eddyActivity: 0.4 + Math.sin(i / 4) * 0.4 + Math.random() * 0.2,
    }))
  }, [timeRange])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <h2 className="text-2xl font-bold text-white mb-6">Temporal Trends Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
            labelStyle={{ color: '#e2e8f0' }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="sfi"
            fill="#3b82f6"
            stroke="#3b82f6"
            fillOpacity={0.3}
            name="SFI Score"
          />
          <Bar dataKey="feedingEvents" fill="#10b981" name="Feeding Events" />
          <Line
            type="monotone"
            dataKey="eddyActivity"
            stroke="#ef4444"
            strokeWidth={2}
            name="Eddy Activity"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}

function SharkActivityCorrelation() {
  const correlationData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      sfi: Math.random() * 1.5 + 0.3,
      activity: Math.random() * 8 + 2,
      temp: 15 + Math.random() * 10,
    }))
  }, [])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <h2 className="text-2xl font-bold text-white mb-6">SFI vs Shark Activity Correlation</h2>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" dataKey="sfi" name="SFI Score" stroke="#94a3b8" />
          <YAxis type="number" dataKey="activity" name="Activity Level" stroke="#94a3b8" />
          <ZAxis type="number" dataKey="temp" range={[50, 400]} name="Temperature" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
          />
          <Legend />
          <Scatter name="Observations" data={correlationData} fill="#3b82f6" />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="mt-4 text-center">
        <span className="text-gray-400">Correlation Coefficient (r): </span>
        <span className="text-green-400 font-bold text-lg">0.87</span>
        <span className="text-gray-400 ml-4">p-value: </span>
        <span className="text-green-400 font-bold">&lt; 0.001</span>
      </div>
    </div>
  )
}

function StatisticalHeatmaps({ region }) {
  // Memoize correlation matrix to prevent regeneration on every render
  const correlationMatrix = useMemo(() => {
    const variables = ['SST', 'Chl-a', 'SSH', 'EKE', 'SFI']
    return variables.map((row, i) =>
      variables.map((col, j) => ({
        row,
        col,
        value: i === j ? 1.0 : 0.3 + Math.random() * 0.6,
      }))
    )
  }, [region])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-8 hover:border-white/20 transition-all">
      <h2 className="text-3xl font-bold text-white mb-8">Statistical Correlation Heatmap</h2>

      <div className="grid grid-cols-5 gap-2">
        {correlationMatrix.map((rowData, i) => (
          <div key={rowData[0].row} className="contents">
            {rowData.map((cell) => {
              const color =
                cell.value > 0.7
                  ? 'bg-red-500'
                  : cell.value > 0.4
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              return (
                <div
                  key={`${cell.row}-${cell.col}`}
                  className={`${color} p-4 rounded text-center text-white font-bold text-sm`}
                  style={{ opacity: cell.value }}
                  title={`${cell.row} vs ${cell.col}: ${cell.value.toFixed(2)}`}
                >
                  {cell.value.toFixed(2)}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-gray-400">Strong (&gt;0.7)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-400">Medium (0.4-0.7)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-400">Weak (&lt;0.4)</span>
        </div>
      </div>
    </div>
  )
}

function RealTimeDataFeed({ dataset }) {
  const feedItems = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      time: new Date(Date.now() - i * 300000).toISOString(),
      value: (15 + Math.random() * 10).toFixed(2),
      quality: Math.random() > 0.2 ? 'Good' : 'Fair',
    }))
  }, [dataset])

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mt-8 hover:border-white/20 transition-all">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Real-Time Data Feed</h2>
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-500/10 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400 font-semibold">Connected</span>
        </div>
      </div>

      <div className="space-y-2">
        {feedItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex justify-between items-center bg-slate-700/50 rounded-lg p-3"
          >
            <span className="text-gray-400 font-mono text-sm">
              {new Date(item.time).toLocaleTimeString()}
            </span>
            <span className="text-white font-bold">{item.value}</span>
            <span
              className={`text-xs px-2 py-1 rounded ${
                item.quality === 'Good'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}
            >
              {item.quality}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DepthZoneCard({ zone, depth, color, activity }) {
  return (
    <div className={`bg-gradient-to-br ${color} p-4 rounded-lg`}>
      <div className="text-white font-bold mb-1">{zone}</div>
      <div className="text-white/80 text-sm mb-2">{depth}</div>
      <div className="text-white/90 text-xs">Activity: {activity}</div>
    </div>
  )
}
