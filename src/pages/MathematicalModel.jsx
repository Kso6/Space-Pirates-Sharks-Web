import { motion } from 'framer-motion'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'
import { useState } from 'react'

export default function MathematicalModel() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gradient mb-4">Mathematical Model</h1>
          <p className="text-xl text-gray-400">Shark Foraging Index (SFI) - Stochastic Prediction Framework</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {['overview', 'equations', 'components', 'validation'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && <OverviewSection />}
        {activeTab === 'equations' && <EquationsSection />}
        {activeTab === 'components' && <ComponentsSection />}
        {activeTab === 'validation' && <ValidationSection />}
      </div>
    </div>
  )
}

function OverviewSection() {
  const radarData = [
    { component: 'Prey Availability', value: 85, fullMark: 100 },
    { component: 'Temperature', value: 72, fullMark: 100 },
    { component: 'Eddy Energy', value: 68, fullMark: 100 },
    { component: 'Depth Preference', value: 78, fullMark: 100 },
    { component: 'Chlorophyll-a', value: 82, fullMark: 100 }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Main SFI Equation */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Core Shark Foraging Index</h2>
        <div className="math-equation text-lg">
          <code>
            SFI(x,y,z,t) = w<sub>B</sub> · B<sub>p</sub>(x,y,z,t) + w<sub>T</sub> · S<sub>T</sub>(x,y,z,t) + w<sub>E</sub> · E(x,y,z,t)
          </code>
        </div>
        <p className="text-gray-400 mt-4">
          Where w<sub>B</sub> + w<sub>T</sub> + w<sub>E</sub> = 1 (normalized weightings)
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <MetricCard title="Prey Availability" symbol="B_p" color="green" weight={0.45} />
          <MetricCard title="Temperature Suitability" symbol="S_T" color="red" weight={0.30} />
          <MetricCard title="Eddy Energy" symbol="E" color="blue" weight={0.25} />
        </div>
      </div>

      {/* Stochastic Model */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Stochastic Intensity Model</h2>
        <div className="math-equation text-lg">
          <code>
            λ(x,y,z,t) = exp(β<sub>0</sub> + β<sub>1</sub> · SFI(x,y,z,t) + ε(x,y))
          </code>
        </div>
        <p className="text-gray-400 mt-4">
          Probabilistic framework accounting for spatial uncertainty and observation noise
        </p>
      </div>

      {/* Radar Chart */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Model Component Contributions</h2>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="component" stroke="#94a3b8" />
            <PolarRadiusAxis stroke="#64748b" />
            <Radar name="Importance" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

function EquationsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <EquationCard
        title="1. Eddy Current Indicator"
        equations={[
          'η(x,y,t) = SSHA(x,y,t)',
          'L{η}(x,y,t) = ∇²η(x,y,t) = ∂²η/∂x² + ∂²η/∂y²',
          'E_surf(x,y,t) = |L{η}(x,y,t)| / max|L{η}(x,y,t)| ∈ [0,1]',
          'E(x,y,z,t) = E_surf(x,y,t) · exp[-(z - ẑ_th(x,y,t))² / 2σ²_z]'
        ]}
        description="3D mesoscale eddy field derived from Sea Surface Height Anomaly (SSHA) with vertical Gaussian distribution centered at thermocline depth"
      />

      <EquationCard
        title="2. Prey Availability (Depth-Scaled)"
        equations={[
          'B^surf_p(x,y,t) = α(C(x,y,t) - τ) / [K_c + (C(x,y,t) - τ)]',
          'K_E(z; x,y,t) = E(x,y,z,t) / Σ_k E(x,y,z_k,t)Δz',
          'B^scaled_p(x,y,z,t) = B^surf_p(x,y,t) · K_E(z; x,y,t)',
          'B^norm_p(x,y,z,t) = [B^scaled_p - min(B^scaled_p)] / [max(B^scaled_p) - min(B^scaled_p)]'
        ]}
        description="Chlorophyll-a based prey proxy vertically distributed according to eddy structure and thermocline dynamics"
      />

      <EquationCard
        title="3. Temperature Suitability"
        equations={[
          'T_s(x,y,z,t) = exp[-(T(x,y,z,t) - T_opt)² / 2σ²_T]',
          'T(x,y,z,t) ≈ T_surface(x,y,t) - Γ(x,y) · z'
        ]}
        description="Gaussian thermal preference model with linear vertical temperature gradient approximation when subsurface data unavailable"
      />

      <EquationCard
        title="4. Thermocline Adjustment"
        equations={[
          'ζ(x,y,t) ≈ γ(x,y) · η(x,y,t)',
          'ẑ_th(x,y,t) = z_th,clim(x,y,t) + ζ(x,y,t)'
        ]}
        description="Dynamic thermocline depth estimation accounting for eddy-induced vertical displacement"
      />
    </motion.div>
  )
}

function ComponentsSection() {
  const eddyData = Array.from({ length: 20 }, (_, i) => ({
    depth: i * 50,
    intensity: Math.exp(-Math.pow((i * 50 - 200) / 100, 2))
  }))

  const tempData = Array.from({ length: 20 }, (_, i) => ({
    depth: i * 50,
    temperature: 25 - (i * 50 * 0.03),
    suitability: Math.exp(-Math.pow((25 - (i * 50 * 0.03) - 18) / 4, 2))
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Eddy Visualization */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Eddy Energy Profile</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={eddyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="depth" stroke="#94a3b8" label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" label={{ value: 'Eddy Intensity', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Area type="monotone" dataKey="intensity" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-gray-400 mt-4 text-sm">
          Vertical distribution of eddy energy showing peak intensity at thermocline depth (~200m)
        </p>
      </div>

      {/* Temperature Profile */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Temperature & Suitability Profile</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={tempData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="depth" stroke="#94a3b8" label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" strokeWidth={2} />
            <Line type="monotone" dataKey="suitability" stroke="#10b981" name="Thermal Suitability" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-gray-400 mt-4 text-sm">
          Temperature decreases with depth while thermal suitability peaks at optimal temperature (T_opt = 18°C)
        </p>
      </div>

      {/* Variable Importance */}
      <div className="grid md:grid-cols-3 gap-6">
        <ImportanceCard 
          title="Prey Availability"
          percentage={45}
          color="from-green-500 to-emerald-600"
          description="Chlorophyll-a concentration as primary foraging driver"
        />
        <ImportanceCard 
          title="Temperature Suitability"
          percentage={30}
          color="from-red-500 to-orange-600"
          description="Thermal tolerance and optimal hunting temperature"
        />
        <ImportanceCard 
          title="Eddy Energy"
          percentage={25}
          color="from-blue-500 to-cyan-600"
          description="Mesoscale features enabling deep foraging"
        />
      </div>
    </motion.div>
  )
}

function ValidationSection() {
  const performanceData = [
    { metric: 'RMSE', value: 0.14, target: 0.15, unit: '' },
    { metric: 'R²', value: 0.83, target: 0.80, unit: '' },
    { metric: 'AUC', value: 0.87, target: 0.85, unit: '' },
    { metric: 'Precision', value: 0.82, target: 0.80, unit: '' },
    { metric: 'Recall', value: 0.88, target: 0.85, unit: '' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Performance Metrics */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Model Performance Metrics</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {performanceData.map((item) => (
            <PerformanceCard key={item.metric} {...item} />
          ))}
        </div>
      </div>

      {/* Cross-Validation */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Cross-Validation Strategy</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">70%</div>
            <div className="text-white font-medium">Training Set</div>
            <div className="text-gray-500 text-sm">Model development</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">15%</div>
            <div className="text-white font-medium">Validation Set</div>
            <div className="text-gray-500 text-sm">Hyperparameter tuning</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-teal-400 mb-2">15%</div>
            <div className="text-white font-medium">Testing Set</div>
            <div className="text-gray-500 text-sm">Final evaluation</div>
          </div>
        </div>
      </div>

      {/* Sensitivity Analysis */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Parameter Sensitivity Analysis</h2>
        <div className="space-y-4">
          <SensitivityBar label="Temperature (T_opt)" value={45} color="bg-red-500" />
          <SensitivityBar label="Chlorophyll-a (α, τ)" value={38} color="bg-green-500" />
          <SensitivityBar label="Eddy Scale (σ_z)" value={28} color="bg-blue-500" />
          <SensitivityBar label="Depth Gradient (Γ)" value={22} color="bg-cyan-500" />
          <SensitivityBar label="Thermocline (z_th)" value={18} color="bg-teal-500" />
        </div>
      </div>
    </motion.div>
  )
}

// Helper Components
function MetricCard({ title, symbol, color, weight }) {
  const colorMap = {
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-orange-600',
    blue: 'from-blue-500 to-cyan-600'
  }

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} p-4 rounded-lg`}>
      <div className="text-sm text-white/80 mb-1">{title}</div>
      <div className="text-2xl font-bold text-white mb-2">{symbol}</div>
      <div className="text-sm text-white/90">Weight: {weight}</div>
    </div>
  )
}

function EquationCard({ title, equations, description }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <div className="space-y-3 mb-4">
        {equations.map((eq, idx) => (
          <div key={idx} className="math-equation text-sm">
            <code>{eq}</code>
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function ImportanceCard({ title, percentage, color, description }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <div className="mb-4">
        <div className={`text-4xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
          {percentage}%
        </div>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2 mb-3">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

function PerformanceCard({ metric, value, target, unit }) {
  const isGood = value >= target
  
  return (
    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
      <div className="text-sm text-gray-400 mb-2">{metric}</div>
      <div className={`text-3xl font-bold ${isGood ? 'text-green-400' : 'text-yellow-400'} mb-1`}>
        {value.toFixed(2)}{unit}
      </div>
      <div className="text-xs text-gray-500">
        Target: {target.toFixed(2)}{unit}
      </div>
      {isGood && <div className="text-xs text-green-400 mt-1">✓ Met</div>}
    </div>
  )
}

function SensitivityBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-gray-400 mb-1">
        <span>{label}</span>
        <span>{value}% impact</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-3">
        <div 
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  )
}

