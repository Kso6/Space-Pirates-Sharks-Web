import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { useState } from 'react'

export default function MathematicalModel() {
  const [selectedIngredient, setSelectedIngredient] = useState('prey')

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span className="text-blue-400 text-sm font-semibold">⚡ How It Works</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            The Shark Prediction Recipe
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            We combine 3 simple ingredients from NASA satellites to predict where sharks will hunt.
            <br />
            <span className="text-blue-400">
              Think of it like a weather forecast, but for sharks.
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-blue-500/10 rounded-full">
              <span className="text-blue-400 font-semibold">Real-Time Data</span>
            </div>
            <div className="px-4 py-2 bg-purple-500/10 rounded-full">
              <span className="text-purple-400 font-semibold">3D Predictions</span>
            </div>
            <div className="px-4 py-2 bg-green-500/10 rounded-full">
              <span className="text-green-400 font-semibold">Tunable Model</span>
            </div>
          </div>
        </motion.div>

        {/* The Simple Equation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 border border-blue-500/30 rounded-3xl p-12 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            The Shark Foraging Index (SFI)
          </h2>
          <p className="text-gray-300 text-center mb-8 text-lg max-w-3xl mx-auto">
            We give every location in the ocean a "shark score" from 0 to 100. Higher score = more
            likely sharks are hunting there.
          </p>

          <div className="bg-slate-900/50 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-gray-400 mb-4">The Simple Formula:</div>
              <div className="text-2xl md:text-3xl font-bold text-white font-mono">
                <span className="text-green-400">Prey</span> × 45% +{' '}
                <span className="text-red-400">Temperature</span> × 30% +{' '}
                <span className="text-blue-400">Eddies</span> × 25% = SFI Score
              </div>
            </div>
            <p className="text-gray-400 text-center text-sm">
              Each ingredient contributes based on how important it is for shark hunting
            </p>
          </div>

          {/* Visual breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            <IngredientCard
              emoji="🐟"
              title="Prey Availability"
              weight="45%"
              description="Where's the food? Measured by chlorophyll (green algae) from NASA MODIS satellite."
              color="green"
              isSelected={selectedIngredient === 'prey'}
              onClick={() => setSelectedIngredient('prey')}
            />
            <IngredientCard
              emoji="🌡️"
              title="Temperature"
              weight="30%"
              description="Is the water comfortable? Sharks prefer 18-24°C for hunting."
              color="red"
              isSelected={selectedIngredient === 'temp'}
              onClick={() => setSelectedIngredient('temp')}
            />
            <IngredientCard
              emoji="🌀"
              title="Eddy Energy"
              weight="25%"
              description="Are there swirling currents? Measured by sea surface height from NASA SWOT."
              color="blue"
              isSelected={selectedIngredient === 'eddy'}
              onClick={() => setSelectedIngredient('eddy')}
            />
          </div>
        </motion.div>

        {/* Interactive Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Try It Yourself: Calculate SFI
          </h2>
          <CalculatorCard />
        </motion.div>

        {/* Why These Ingredients? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Why These 3 Ingredients?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ReasonCard
              step="1"
              title="Prey = Energy"
              description="Sharks are always hunting for food. They follow the food chain: algae → small fish → big fish → sharks!"
              example="If you see lots of green (chlorophyll) in satellite images, there's probably prey nearby."
              gradient="from-green-500 to-emerald-600"
            />
            <ReasonCard
              step="2"
              title="Temperature = Comfort"
              description="Sharks are cold-blooded. If water is too hot or too cold, they won't hunt efficiently there."
              example="Great white sharks prefer water around 18-20°C. Outside this range? They'll swim somewhere else."
              gradient="from-red-500 to-orange-600"
            />
            <ReasonCard
              step="3"
              title="Eddies = Opportunity"
              description="Ocean eddies are like underwater tornadoes that trap fish. Sharks hunt at the edges of these swirls!"
              example="When satellites detect a 'bump' in the ocean surface, there's often an eddy below with concentrated prey."
              gradient="from-blue-500 to-cyan-600"
            />
          </div>
        </motion.div>

        {/* How Accurate Is It? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            How Accurate Is Our Model?
          </h2>
          <ValidationShowcase />
        </motion.div>

        {/* From 2D to 4D */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl p-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            We Predict in 4 Dimensions
          </h2>
          <p className="text-gray-300 text-center mb-12 text-lg max-w-3xl mx-auto">
            Not just a flat map - we track sharks through space AND time
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <DimensionCard
              icon="🗺️"
              title="Latitude & Longitude"
              description="Where exactly? (X, Y coordinates)"
              example="25°N, 80°W = off Miami coast"
            />
            <DimensionCard
              icon="⬇️"
              title="Depth"
              description="How deep underwater? (Z coordinate)"
              example="0-500m = typical shark foraging depth"
            />
            <DimensionCard
              icon="⏰"
              title="Time"
              description="When? (t coordinate)"
              example="Updated every 3 hours with new satellite data"
            />
            <DimensionCard
              icon="🎯"
              title="Probability"
              description="How likely? (SFI Score)"
              example="0.75 = 75% chance sharks are foraging"
            />
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Want to See It in Action?</h3>
          <p className="text-gray-400 mb-8">
            Try the interactive forecasting tool with real NASA satellite data
          </p>
          <button
            onClick={() => (window.location.hash = '#visualization')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105"
          >
            Launch Forecast Tool →
          </button>
        </motion.div>
      </div>
    </div>
  )
}

// Helper Components
function IngredientCard({ emoji, title, weight, description, color, isSelected, onClick }) {
  const colorMap = {
    green: 'from-green-500/20 to-emerald-500/20 border-green-500/40',
    red: 'from-red-500/20 to-orange-500/20 border-red-500/40',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/40',
  }

  const selectedColorMap = {
    green: 'from-green-500/40 to-emerald-500/40 border-green-500 shadow-green-500/50',
    red: 'from-red-500/40 to-orange-500/40 border-red-500 shadow-red-500/50',
    blue: 'from-blue-500/40 to-cyan-500/40 border-blue-500 shadow-cyan-500/50',
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-gradient-to-br ${
        isSelected ? selectedColorMap[color] : colorMap[color]
      } border-2 rounded-2xl p-6 text-left transition-all ${isSelected ? 'shadow-2xl' : ''}`}
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <div className="text-2xl font-bold text-white mb-2">{weight}</div>
      <div className="text-lg font-semibold text-white mb-2">{title}</div>
      <p className="text-gray-300 text-sm">{description}</p>
    </motion.button>
  )
}

function CalculatorCard() {
  const [prey, setPrey] = useState(0.8)
  const [temp, setTemp] = useState(0.9)
  const [eddy, setEddy] = useState(0.6)

  // Calculate SFI with error handling
  const calculateSFI = () => {
    try {
      const sfiValue = (prey * 0.45 + temp * 0.3 + eddy * 0.25).toFixed(2)
      return sfiValue
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Error calculating SFI:', err)
      }
      return '0.00'
    }
  }

  const sfi = calculateSFI()
  const percentage = (parseFloat(sfi) * 100).toFixed(0)

  const getColor = () => {
    if (sfi >= 0.7) return 'text-green-400'
    if (sfi >= 0.4) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getMessage = () => {
    if (sfi >= 0.7) return '✓ High foraging probability! Sharks likely hunting here.'
    if (sfi >= 0.4) return '~ Moderate probability. Sharks might be present.'
    return '✗ Low probability. Sharks unlikely to be foraging here.'
  }

  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-3xl mx-auto">
      <div className="space-y-6 mb-8">
        <SliderInput label="🐟 Prey Availability" value={prey} onChange={setPrey} color="green" />
        <SliderInput
          label="🌡️ Temperature Suitability"
          value={temp}
          onChange={setTemp}
          color="red"
        />
        <SliderInput label="🌀 Eddy Energy" value={eddy} onChange={setEddy} color="blue" />
      </div>

      <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6">
        <div className="text-center">
          <div className="text-gray-400 mb-2">Shark Foraging Index (SFI)</div>
          <div className={`text-6xl font-bold ${getColor()} mb-2`}>{percentage}%</div>
          <div className="text-sm text-gray-300 font-mono mb-4">
            ({prey} × 0.45) + ({temp} × 0.30) + ({eddy} × 0.25) = {sfi}
          </div>
          <div className={`text-lg ${getColor()}`}>{getMessage()}</div>
        </div>
      </div>
    </div>
  )
}

function SliderInput({ label, value, onChange, color }) {
  const colorMap = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-white font-medium">{label}</label>
        <span className="text-gray-400">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  )
}

function ReasonCard({ step, title, description, example, gradient }) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div
        className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center text-white font-bold text-xl mb-4`}
      >
        {step}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="bg-slate-700/50 rounded-lg p-4">
        <p className="text-sm text-gray-400">
          <strong className="text-white">Example:</strong> {example}
        </p>
      </div>
    </div>
  )
}

function ValidationShowcase() {
  const metrics = [
    {
      label: 'Data Sources',
      value: '3',
      description: 'NASA missions integrated (SWOT, MODIS, PACE)',
      color: 'green',
    },
    {
      label: 'Model Type',
      value: '4D',
      description: 'Spatiotemporal prediction (x, y, depth, time)',
      color: 'blue',
    },
    {
      label: 'Coverage',
      value: '24/7',
      description: 'Continuous monitoring with NASA satellites',
      color: 'purple',
    },
  ]

  // Helper function to get the correct border class based on color
  const getBorderClass = (color) => {
    switch (color) {
      case 'green':
        return 'border-green-500/20'
      case 'blue':
        return 'border-blue-500/20'
      case 'purple':
        return 'border-purple-500/20'
      default:
        return 'border-white/10'
    }
  }

  // Helper function to get the correct gradient class based on color
  const getGradientClass = (color) => {
    switch (color) {
      case 'green':
        return 'from-green-400 to-green-600'
      case 'blue':
        return 'from-blue-400 to-blue-600'
      case 'purple':
        return 'from-purple-400 to-purple-600'
      default:
        return 'from-blue-400 to-blue-600'
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {metrics.map((metric) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-slate-800/30 backdrop-blur-xl border ${getBorderClass(
            metric.color
          )} rounded-2xl p-8 text-center`}
        >
          <div
            className={`text-5xl font-bold bg-gradient-to-r ${getGradientClass(
              metric.color
            )} bg-clip-text text-transparent mb-3`}
          >
            {metric.value}
          </div>
          <div className="text-xl font-semibold text-white mb-2">{metric.label}</div>
          <p className="text-gray-400 text-sm">{metric.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

function DimensionCard({ icon, title, description, example }) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-3">{description}</p>
      <div className="bg-slate-700/50 rounded-lg p-3">
        <p className="text-sm text-cyan-400">{example}</p>
      </div>
    </div>
  )
}
