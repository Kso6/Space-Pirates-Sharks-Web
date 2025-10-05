import { motion } from 'framer-motion'
import { useState, useMemo, useEffect, useRef } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'

export default function TagSensor() {
  const [activeView, setActiveView] = useState('architecture')

  // Synthetic feeding event data - memoized to prevent regeneration
  const feedingData = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        time: i,
        pH:
          i < 10
            ? 1.5 + Math.random() * 0.3
            : i < 25
            ? 2.5 + Math.sin((i - 10) / 3) * 0.8
            : 1.8 + Math.random() * 0.4,
        nh4:
          i < 10
            ? 0.2 + Math.random() * 0.1
            : i < 30
            ? 0.5 + Math.sin((i - 10) / 5) * 0.3
            : 0.3 + Math.random() * 0.15,
        temp: 18 + Math.random() * 2,
      })),
    []
  )

  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
            Gastric Capsule Tag
          </h1>
          <p className="text-xl text-gray-400">
            Revolutionary Bio-Sensor for Real-Time Feeding Detection
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-amber-600/20 border border-amber-500/30 rounded-lg">
            <p className="text-sm text-amber-300">⚠️ Conceptual Design - Hypothetical Project</p>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 overflow-x-auto">
          {['architecture', 'sensing', 'data', 'power', 'deployment'].map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        {activeView === 'architecture' && <ArchitectureSection />}
        {activeView === 'sensing' && <SensingSection feedingData={feedingData} />}
        {activeView === 'data' && <DataSection />}
        {activeView === 'power' && <PowerSection />}
        {activeView === 'deployment' && <DeploymentSection />}
      </div>
    </div>
  )
}

function ArchitectureSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* 3D Tag Visualization */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Tag Architecture</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Capsule Diagram */}
          <div className="relative">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl p-8 h-96 flex items-center justify-center border-4 border-blue-500/30">
              <div className="text-center space-y-4">
                {/* CAD-style representation of gastric tag */}
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer capsule shell */}
                  <ellipse cx="100" cy="100" rx="80" ry="35" fill="#3b82f6" opacity="0.2" />
                  <ellipse cx="100" cy="100" rx="80" ry="35" stroke="#60a5fa" strokeWidth="2" />

                  {/* Cross-section view */}
                  <rect
                    x="30"
                    y="85"
                    width="140"
                    height="30"
                    rx="15"
                    fill="#1e293b"
                    stroke="#60a5fa"
                    strokeWidth="2"
                  />

                  {/* Internal components */}
                  <circle cx="50" cy="100" r="8" fill="#ef4444" opacity="0.8" />
                  <text x="50" y="125" fontSize="8" fill="#94a3b8" textAnchor="middle">
                    Battery
                  </text>

                  <rect x="68" y="93" width="24" height="14" rx="2" fill="#10b981" opacity="0.8" />
                  <text x="80" y="125" fontSize="8" fill="#94a3b8" textAnchor="middle">
                    Sensors
                  </text>

                  <rect x="102" y="93" width="28" height="14" rx="2" fill="#8b5cf6" opacity="0.8" />
                  <text x="116" y="125" fontSize="8" fill="#94a3b8" textAnchor="middle">
                    MCU
                  </text>

                  <circle cx="150" cy="100" r="8" fill="#f59e0b" opacity="0.8" />
                  <text x="150" y="125" fontSize="8" fill="#94a3b8" textAnchor="middle">
                    Antenna
                  </text>

                  {/* ePTFE membrane indicator */}
                  <line
                    x1="30"
                    y1="85"
                    x2="30"
                    y2="115"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    opacity="0.6"
                  />
                  <line
                    x1="170"
                    y1="85"
                    x2="170"
                    y2="115"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    opacity="0.6"
                  />
                </svg>
                <div className="text-white font-bold text-xl">Internal Gastric Capsule</div>
                <div className="text-gray-400 text-sm">Dimensions: 25mm × 10mm</div>
                <div className="text-gray-400 text-sm">Weight: ~5 grams</div>
                <div className="text-green-400 text-sm">Gastro-retentive Design</div>
              </div>
            </div>

            {/* Component callouts */}
            <div className="absolute top-8 -right-4 bg-blue-600 text-white text-xs px-3 py-2 rounded-lg">
              ePTFE Membrane
            </div>
            <div className="absolute top-32 -left-4 bg-green-600 text-white text-xs px-3 py-2 rounded-lg">
              pH Sensor (ISFET)
            </div>
            <div className="absolute bottom-32 -right-4 bg-purple-600 text-white text-xs px-3 py-2 rounded-lg">
              NH₄⁺ ISE Electrode
            </div>
            <div className="absolute bottom-8 -left-4 bg-red-600 text-white text-xs px-3 py-2 rounded-lg">
              Li-SOCl₂ Battery
            </div>
          </div>

          {/* Component Stack */}
          <div className="space-y-4">
            <ComponentLayer
              title="Outer Shield"
              description="ePTFE hydrophobic membrane + Parylene-C coating"
              color="from-blue-500 to-cyan-500"
              icon="🛡️"
            />
            <ComponentLayer
              title="Sensor Array"
              description="ISFET pH sensor + NH₄⁺ ISE micro-electrode + Thermistor"
              color="from-green-500 to-emerald-500"
              icon="📡"
            />
            <ComponentLayer
              title="Electronics"
              description="STM32L0 MCU + AFE + 125 kHz inductive transceiver"
              color="from-purple-500 to-pink-500"
              icon="⚡"
            />
            <ComponentLayer
              title="Power System"
              description="Li-SOCl₂ bobbin cell (1200 mAh) + 100 mF supercapacitor"
              color="from-red-500 to-orange-500"
              icon="🔋"
            />
            <ComponentLayer
              title="Housing"
              description="Delrin capsule with medical-grade silicone seals"
              color="from-slate-500 to-gray-500"
              icon="📦"
            />
          </div>
        </div>
      </div>

      {/* External Dorsal Fin Tag */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-cyan-500/20 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">External Dorsal Fin Tag</h2>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 text-xs font-semibold">Revolutionary Tech</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-cyan-700 to-slate-800 rounded-3xl p-6 h-full flex items-center justify-center border-4 border-cyan-500/30">
              <div className="text-center space-y-4 w-full">
                <div className="relative w-full bg-slate-900/50 rounded-lg overflow-hidden border-2 border-cyan-400/30">
                  <img
                    src="/External Dorsal Fin.png"
                    alt="External Dorsal Fin Tag"
                    className="w-full h-auto object-cover"
                    style={{
                      filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                      borderRadius: '16px',
                    }}
                  />
                  <div className="absolute top-2 left-2 bg-cyan-600/90 text-white text-xs px-2 py-1 rounded">
                    Product Visualization
                  </div>
                </div>
                <div className="text-white font-bold text-xl">External Dorsal Tag</div>
                <div className="text-gray-400 text-sm space-y-1">
                  <p>Dimensions: 80mm × 40mm × 15mm</p>
                  <p>Weight: ~45 grams (in air)</p>
                  <p className="text-cyan-400 font-semibold">Non-invasive Attachment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Specifications */}
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">🛰️</span>
                Satellite Transceiver
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Advanced Argos/Iridium uplink for real-time feeding event data transmission
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Frequency Band</div>
                  <div className="text-sm text-white font-medium">L-band</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Data Rate</div>
                  <div className="text-sm text-white font-medium">Up to 1 kbps</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">☀️</span>
                Solar Power System
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                High-efficiency polycrystalline cells for continuous battery recharging
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Panel Efficiency</div>
                  <div className="text-sm text-white font-medium">18-22%</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Daily Charge</div>
                  <div className="text-sm text-white font-medium">~50 mAh</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 border border-cyan-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">🔋</span>
                Battery & Power
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Type</span>
                  <span className="text-sm text-white font-medium">Li-ion</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Capacity</span>
                  <span className="text-sm text-white font-medium">1500 mAh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Lifespan</span>
                  <span className="text-sm text-green-400 font-medium">12-24 months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Specifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Internal Gastric Capsule Specs</h3>
          <div className="grid grid-cols-2 gap-4">
            <SpecCard
              title="Battery Life"
              value="6-12"
              unit="months"
              icon="🔋"
              color="text-green-400"
            />
            <SpecCard
              title="Sample Rate"
              value="30"
              unit="minutes"
              icon="⏱️"
              color="text-blue-400"
            />
            <SpecCard title="Weight" value="5" unit="grams" icon="⚖️" color="text-purple-400" />
            <SpecCard title="Range" value="50" unit="cm" icon="📶" color="text-cyan-400" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">External Dorsal Tag Specs</h3>
          <div className="grid grid-cols-2 gap-4">
            <SpecCard
              title="Battery Life"
              value="12-24"
              unit="months"
              icon="🔋"
              color="text-green-400"
            />
            <SpecCard
              title="Uplink Rate"
              value="Surface"
              unit="events"
              icon="🛰️"
              color="text-yellow-400"
            />
            <SpecCard title="Weight" value="45" unit="grams" icon="⚖️" color="text-purple-400" />
            <SpecCard
              title="Depth Rating"
              value="2000"
              unit="meters"
              icon="🌊"
              color="text-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Material Safety */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Biosafety & Materials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SafetyFeature
            icon="✓"
            title="Biocompatible"
            description="Medical-grade Delrin, Parylene-C coating, no sharp edges"
            status="Conceptual Design"
          />
          <SafetyFeature
            icon="✓"
            title="Acid Resistant"
            description="ePTFE membrane withstands pH 1-2 stomach environment"
            status="Proposed"
          />
          <SafetyFeature
            icon="✓"
            title="Gastro-Retentive"
            description="Designed to remain in stomach, natural exit after mission"
            status="Theoretical"
          />
        </div>
      </div>
    </motion.div>
  )
}

function SensingSection({ feedingData }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Sensing Principle */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Sensing Principle</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-400 mb-3">pH Detection</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                🔬 <strong>Baseline:</strong> Shark stomach pH ≈ 1.0-2.0 (highly acidic)
              </p>
              <p>
                🍽️ <strong>Feeding Event:</strong> pH rises rapidly to 2.5-3.5 as food buffers acid
              </p>
              <p>
                ⏱️ <strong>Recovery:</strong> pH returns to baseline over 30-45 minutes
              </p>
              <p>
                📊 <strong>Threshold:</strong> ΔpH ≥ 0.4 within 120s triggers event logging
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-green-400 mb-3">NH₄⁺ Detection</h3>
            <div className="space-y-3 text-gray-300">
              <p>
                🧬 <strong>Source:</strong> Protein digestion produces ammonium ions
              </p>
              <p>
                🐟 <strong>Fish/Squid:</strong> High NH₄⁺ concentration (protein-rich)
              </p>
              <p>
                🦐 <strong>Crustaceans:</strong> Medium NH₄⁺ levels
              </p>
              <p>
                📈 <strong>Analysis:</strong> NH₄⁺ AUC (area under curve) classifies prey type
              </p>
            </div>
          </div>
        </div>

        {/* Feeding Event Simulation */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-white mb-2">
            Simulated Feeding Event Response
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Real-time pH and NH₄⁺ concentration changes during prey ingestion
          </p>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={feedingData} margin={{ top: 5, right: 30, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="pHGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="nh4Gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                label={{
                  value: 'Time (minutes)',
                  position: 'insideBottom',
                  offset: -10,
                  fill: '#94a3b8',
                  fontSize: 13,
                }}
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                label={{
                  value: 'Concentration',
                  angle: -90,
                  position: 'insideLeft',
                  fill: '#94a3b8',
                  fontSize: 13,
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #3b82f6',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                labelStyle={{ color: '#e2e8f0', fontWeight: 'bold', marginBottom: '4px' }}
                itemStyle={{ padding: '2px 0' }}
              />
              <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="line" />
              <Area
                type="monotone"
                dataKey="pH"
                stroke="#ef4444"
                fill="url(#pHGradient)"
                strokeWidth={3}
                name="pH Level"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="nh4"
                stroke="#10b981"
                fill="url(#nh4Gradient)"
                strokeWidth={3}
                name="NH₄⁺ (mM)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-lg p-4 text-center">
              <div className="text-xs text-red-300 uppercase tracking-wide mb-1">
                Feeding Detected
              </div>
              <div className="text-red-400 font-bold text-lg">t = 10 min</div>
              <div className="text-xs text-gray-400 mt-1">ΔpH ≥ 0.4 threshold</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-lg p-4 text-center">
              <div className="text-xs text-green-300 uppercase tracking-wide mb-1">
                Peak Response
              </div>
              <div className="text-green-400 font-bold text-lg">t = 18 min</div>
              <div className="text-xs text-gray-400 mt-1">Maximum NH₄⁺ signal</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-lg p-4 text-center">
              <div className="text-xs text-cyan-300 uppercase tracking-wide mb-1">
                Return to Baseline
              </div>
              <div className="text-cyan-400 font-bold text-lg">t = 35 min</div>
              <div className="text-xs text-gray-400 mt-1">Digestion stabilized</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sensor Specifications */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">pH Sensor (ISFET)</h3>
          <div className="space-y-3">
            <SpecRow label="Type" value="Ion-Sensitive Field Effect Transistor" />
            <SpecRow label="Range" value="pH 1.0 - 4.0" />
            <SpecRow label="Resolution" value="±0.01 pH units" />
            <SpecRow label="Response Time" value="< 1 second" />
            <SpecRow label="Drift" value="< 0.02 pH/month" />
            <SpecRow label="Calibration" value="2-point (pH 2.0, 4.0)" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">NH₄⁺ Sensor (ISE)</h3>
          <div className="space-y-3">
            <SpecRow label="Type" value="Ion-Selective Electrode" />
            <SpecRow label="Range" value="0.01 - 10 mM" />
            <SpecRow label="Selectivity" value="NH₄⁺ over K⁺ (100:1)" />
            <SpecRow label="Response Time" value="< 5 seconds" />
            <SpecRow label="Interference" value="ISA gel mitigation" />
            <SpecRow label="Temp Compensation" value="Thermistor feedback" />
          </div>
        </div>
      </div>

      {/* Event Classification */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Prey Classification Algorithm</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <PreyTypeCard
            type="Fish/Squid"
            icon="🐟"
            characteristics={['High NH₄⁺ (> 5 mM)', 'pH rise > 1.0', 'Fast response']}
            confidence="85%"
            color="from-blue-500 to-cyan-500"
          />
          <PreyTypeCard
            type="Crustaceans"
            icon="🦐"
            characteristics={['Medium NH₄⁺ (2-5 mM)', 'pH rise 0.5-1.0', 'Moderate response']}
            confidence="78%"
            color="from-orange-500 to-red-500"
          />
          <PreyTypeCard
            type="Other/Mixed"
            icon="🦑"
            characteristics={['Variable NH₄⁺', 'pH rise < 0.5', 'Slow response']}
            confidence="65%"
            color="from-purple-500 to-pink-500"
          />
        </div>
      </div>
    </motion.div>
  )
}

function DataSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Data Flow */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Data Flow Architecture</h2>

        <div className="flex items-center justify-between mb-8">
          {[
            { name: 'Gastric Capsule', icon: 'capsule' },
            { name: 'Inductive Link', icon: 'wave' },
            { name: 'Dorsal Tag', icon: 'tag' },
            { name: 'Satellite', icon: 'satellite' },
            { name: 'Cloud Platform', icon: 'cloud' },
          ].map((step, idx) => (
            <div key={step.name} className="flex items-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center mb-2 relative overflow-hidden">
                  {step.icon === 'capsule' && (
                    <div className="w-16 h-6 bg-blue-400 rounded-full border-2 border-blue-200"></div>
                  )}
                  {step.icon === 'wave' && (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M2 12 Q 6 8, 10 12 T 18 12 T 26 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M2 16 Q 6 12, 10 16 T 18 16 T 26 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )}
                  {step.icon === 'tag' && (
                    <div className="w-10 h-14 bg-cyan-400 rounded border-2 border-cyan-200"></div>
                  )}
                  {step.icon === 'satellite' && (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none">
                      <rect x="8" y="10" width="8" height="4" fill="currentColor" />
                      <line x1="6" y1="12" x2="8" y2="12" stroke="currentColor" strokeWidth="2" />
                      <line x1="16" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                  {step.icon === 'cloud' && (
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 14.5A5.5 5.5 0 0013.5 20H6a4 4 0 01-.85-7.93A5 5 0 0114.5 6a5.5 5.5 0 014.5 8.5z" />
                    </svg>
                  )}
                </div>
                <div className="text-white text-sm font-medium">{step.name}</div>
              </div>
              {idx < 4 && <div className="text-blue-400 text-2xl mx-4">→</div>}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <DataFlowStep
            step="1"
            title="Sensing"
            description="pH & NH₄⁺ sampled every 30 min"
            latency="< 1s"
          />
          <DataFlowStep
            step="2"
            title="Processing"
            description="MCU detects event, extracts features"
            latency="< 5s"
          />
          <DataFlowStep
            step="3"
            title="Transmission"
            description="Inductive burst to dorsal tag"
            latency="< 1s"
          />
          <DataFlowStep
            step="4"
            title="Uplink"
            description="Satellite relay on surfacing"
            latency="< 1 hour"
          />
          <DataFlowStep
            step="5"
            title="Analysis"
            description="Cloud fusion with NASA data"
            latency="Real-time"
          />
        </div>
      </div>

      {/* Firmware State Machine */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Firmware Operation Modes</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Baseline Mode</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• pH sampling: Every 30 min</li>
              <li>• NH₄⁺ sampling: Every 30 min</li>
              <li>• MCU deep sleep between readings</li>
              <li>• Power consumption: ~2-5 µA (avg)</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-6 border-2 border-blue-500">
            <h3 className="text-lg font-bold text-white mb-4">Feeding Event Mode (Hypothetical)</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Trigger: ΔpH ≥ 0.4 or pH &gt; 2.5</li>
              <li>• pH sampling: Every 1 min (high-rate)</li>
              <li>• NH₄⁺ sampling: Every 5 min</li>
              <li>• Duration: 30-45 minutes</li>
              <li>• Power consumption: ~40 µA (avg)</li>
              <li>• Data transmission via inductive link</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function PowerSection() {
  const powerBudget = [
    { mode: 'Sleep', current: 2, duty: 95, power: 1.9 },
    { mode: 'Sensing', current: 15, duty: 4, power: 0.6 },
    { mode: 'TX Burst', current: 5, duty: 1, power: 0.05 },
  ]

  const avgPower = powerBudget.reduce((sum, item) => sum + item.power, 0)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Hero Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/10 border border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl font-bold text-green-400 mb-2">6-12</div>
          <div className="text-xl text-white font-semibold mb-1">Months</div>
          <div className="text-sm text-gray-400">Operational Lifespan</div>
        </div>
        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl font-bold text-blue-400 mb-2">{avgPower.toFixed(1)}</div>
          <div className="text-xl text-white font-semibold mb-1">µW</div>
          <div className="text-sm text-gray-400">Average Power Draw</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/10 border border-purple-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl font-bold text-purple-400 mb-2">95%</div>
          <div className="text-xl text-white font-semibold mb-1">Sleep</div>
          <div className="text-sm text-gray-400">Ultra-Low Power Mode</div>
        </div>
      </div>

      {/* Power Architecture */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Power Architecture</h2>
          <div className="px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-semibold">
            Ultra-Efficient Design
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Power Management Cards */}
          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">⚡</span>
                Power Management
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Intelligent power management system for extended deployment
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Sleep Mode</div>
                  <div className="text-sm text-green-400 font-medium">95%</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Active Mode</div>
                  <div className="text-sm text-white font-medium">5%</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">🔋</span>
                Battery System
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Ultra-compact lithium battery with extended deployment capability
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Battery Type</div>
                  <div className="text-sm text-white font-medium">Li-SOCl₂</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Deployment</div>
                  <div className="text-sm text-green-400 font-medium">6-12 months</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-700/50 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">📡</span>
                Communication
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Link Type</span>
                  <span className="text-sm text-white font-medium">125 kHz Inductive</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Range</span>
                  <span className="text-sm text-white font-medium">~10 cm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Data Rate</span>
                  <span className="text-sm text-cyan-400 font-medium">Low Power</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700/50 rounded-xl p-6 border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-3 text-2xl">🔧</span>
                Architecture
              </h3>
              <p className="text-gray-300 text-sm mb-3">
                Modular design enables easy maintenance and upgrades
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">MCU</div>
                  <div className="text-sm text-cyan-400 font-medium">STM32L0</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Memory</div>
                  <div className="text-sm text-white font-medium">32KB Flash</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Power Management Strategy */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Intelligent Power Management</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border-l-4 border-blue-500">
            <div className="text-4xl mb-4">💤</div>
            <h3 className="text-lg font-bold text-white mb-2">Deep Sleep Mode</h3>
            <p className="text-sm text-gray-400 mb-4">
              STM32L0 microcontroller enters ultra-low-power state between samples
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Duty Cycle</span>
              <span className="text-sm font-bold text-blue-400">95%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border-l-4 border-purple-500">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-white mb-2">Adaptive Sampling</h3>
            <p className="text-sm text-gray-400 mb-4">
              High-frequency sensing only during feeding events, baseline mode otherwise
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Power Savings</span>
              <span className="text-sm font-bold text-purple-400">~80%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border-l-4 border-green-500">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-lg font-bold text-white mb-2">Burst Transmission</h3>
            <p className="text-sm text-gray-400 mb-4">
              Supercapacitor buffers inductive transmission, minimizing battery stress
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">TX Duty</span>
              <span className="text-sm font-bold text-green-400">&lt; 1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Power Budget Breakdown */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Power Budget Breakdown</h2>

        <div className="space-y-4 mb-6">
          {powerBudget.map((item, idx) => (
            <div key={idx} className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{item.mode}</span>
                <span className="text-blue-400 font-bold">{item.power.toFixed(2)} µW</span>
              </div>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span>Current: {item.current} µA</span>
                <span>•</span>
                <span>Duty: {item.duty}%</span>
              </div>
              <div className="mt-2 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full"
                  style={{ width: `${item.duty}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/10 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-400">Total Average Power Consumption</div>
              <div className="text-xs text-gray-500 mt-1">Across all operation modes</div>
            </div>
            <div className="text-3xl font-bold text-green-400">{avgPower.toFixed(2)} µW</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function DeploymentSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Visual Deployment Overview */}
      <div className="bg-gradient-to-br from-blue-900/30 via-slate-800/50 to-cyan-900/30 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Deployment Protocol</h2>

        {/* Visual Flow */}
        <div className="mb-8">
          <svg
            className="w-full h-32"
            viewBox="0 0 1200 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Flow line */}
            <path d="M 60 60 L 1140 60" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />

            {/* Step circles */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={`translate(${60 + i * 216}, 60)`}>
                <circle r="30" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
                <circle r="25" fill="#3b82f6" opacity="0.2" />
                <text y="8" textAnchor="middle" fill="#60a5fa" fontSize="24" fontWeight="bold">
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: 1,
              title: 'Capture & Preparation',
              description:
                'Shark captured using safe handling protocols. Gastric capsule activated and calibrated.',
              icon: '🎣',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              step: 2,
              title: 'Capsule Insertion',
              description:
                'Capsule inserted into stomach via esophagus. Non-invasive procedure, no anesthesia required.',
              icon: '💊',
              color: 'from-purple-500 to-pink-500',
            },
            {
              step: 3,
              title: 'Dorsal Tag Attachment',
              description:
                'External dorsal tag attached with inductive receiver coil and satellite uplink.',
              icon: '🏷️',
              color: 'from-cyan-500 to-blue-500',
            },
            {
              step: 4,
              title: 'Release & Monitoring',
              description:
                'Shark released. System begins baseline monitoring and waits for feeding events.',
              icon: '🌊',
              color: 'from-green-500 to-emerald-500',
            },
            {
              step: 5,
              title: 'Data Collection',
              description:
                'Feeding events transmitted to dorsal tag, uplinked to satellite on surfacing.',
              icon: '📡',
              color: 'from-orange-500 to-red-500',
            },
            {
              step: 6,
              title: 'Natural Exit',
              description:
                'Capsule designed for gastro-retention during mission, natural exit after 6-12 months.',
              icon: '♻️',
              color: 'from-teal-500 to-green-500',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl flex-shrink-0`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment Illustration */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">System Architecture Diagram</h2>

        <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-xl p-8">
          <svg
            className="w-full"
            viewBox="0 0 800 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ocean background */}
            <rect width="800" height="500" fill="url(#oceanGradient)" />
            <defs>
              <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0c4a6e" />
                <stop offset="100%" stopColor="#0e1729" />
              </linearGradient>
            </defs>

            {/* Water surface */}
            <line
              x1="0"
              y1="100"
              x2="800"
              y2="100"
              stroke="#06b6d4"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
            <text x="10" y="90" fill="#06b6d4" fontSize="12">
              Surface
            </text>

            {/* Satellite */}
            <g transform="translate(650, 40)">
              <rect x="-20" y="-10" width="40" height="20" fill="#fbbf24" />
              <line x1="-30" y1="0" x2="-20" y2="0" stroke="#fbbf24" strokeWidth="2" />
              <line x1="20" y1="0" x2="30" y2="0" stroke="#fbbf24" strokeWidth="2" />
              <text x="0" y="-20" fill="#fbbf24" fontSize="12" textAnchor="middle">
                Satellite
              </text>
            </g>

            {/* Signal to satellite */}
            <path
              d="M 400 120 Q 500 80 650 50"
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="3,3"
            />

            {/* Shark outline */}
            <g transform="translate(400, 300)">
              {/* Body */}
              <ellipse cx="0" cy="0" rx="120" ry="40" fill="#334155" opacity="0.8" />

              {/* Tail */}
              <path d="M -120 0 L -160 -20 L -150 0 L -160 20 Z" fill="#334155" opacity="0.8" />

              {/* Dorsal fin */}
              <path d="M -20 -40 L 0 -80 L 20 -40 Z" fill="#334155" opacity="0.8" />

              {/* External tag on dorsal fin */}
              <rect
                x="-15"
                y="-75"
                width="30"
                height="20"
                rx="3"
                fill="#06b6d4"
                stroke="#60a5fa"
                strokeWidth="2"
              />
              <text x="0" y="-85" fill="#06b6d4" fontSize="11" textAnchor="middle">
                Dorsal Tag
              </text>
              <circle cx="0" cy="-65" r="3" fill="#fbbf24" />

              {/* Internal capsule */}
              <ellipse
                cx="30"
                cy="5"
                rx="15"
                ry="6"
                fill="#ef4444"
                stroke="#f87171"
                strokeWidth="2"
              />
              <text x="30" y="25" fill="#ef4444" fontSize="11" textAnchor="middle">
                Gastric Capsule
              </text>

              {/* Inductive link */}
              <path
                d="M 0 -40 Q 15 -20 30 5"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="2,2"
              />
              <text x="20" y="-15" fill="#10b981" fontSize="10">
                125kHz
              </text>
            </g>

            {/* Ocean floor */}
            <path
              d="M 0 480 Q 200 460 400 470 Q 600 480 800 465 L 800 500 L 0 500 Z"
              fill="#1e293b"
              opacity="0.6"
            />

            {/* Labels */}
            <g transform="translate(100, 200)">
              <rect
                x="0"
                y="0"
                width="180"
                height="110"
                rx="8"
                fill="#0f172a"
                stroke="#3b82f6"
                strokeWidth="2"
                opacity="0.9"
              />
              <text x="10" y="25" fill="#3b82f6" fontSize="14" fontWeight="bold">
                Data Flow:
              </text>
              <text x="10" y="45" fill="#94a3b8" fontSize="11">
                1. Feeding detected
              </text>
              <text x="10" y="62" fill="#94a3b8" fontSize="11">
                2. Inductive TX to tag
              </text>
              <text x="10" y="79" fill="#94a3b8" fontSize="11">
                3. Surface for uplink
              </text>
              <text x="10" y="96" fill="#94a3b8" fontSize="11">
                4. Satellite relay
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Integration with Ecosystem */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Integration with NASA Data</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Tag Data Output</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ Feeding event timestamp & location</li>
              <li>✓ Prey type classification (fish/squid/crustacean)</li>
              <li>✓ Feeding intensity (pH rise magnitude)</li>
              <li>✓ Shark depth during feeding</li>
              <li>✓ Water temperature at feeding</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-4">NASA Satellite Data</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ SWOT: Sea surface height, eddies</li>
              <li>✓ MODIS: Chlorophyll-a concentration</li>
              <li>✓ PACE: Phytoplankton communities</li>
              <li>✓ Meteomatics: SST, currents</li>
              <li>✓ Bathymetry, ocean fronts</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-green-600/20 border border-blue-500/30 rounded-lg p-6">
          <div className="text-center">
            <div className="text-xl font-bold text-white mb-2">Machine Learning Feedback Loop</div>
            <p className="text-gray-300">
              Tag feeding data validates and refines SFI model predictions → Improved foraging
              hotspot forecasts
            </p>
          </div>
        </div>
      </div>

      {/* Target Species */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Target Species & Applications</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <SpeciesCard
            species="Great White Shark"
            icon="🦈"
            size="4-6m"
            habitat="Coastal, pelagic"
            foraging="Deep diving, eddies"
          />
          <SpeciesCard
            species="Tiger Shark"
            icon="🐯"
            size="3-5m"
            habitat="Tropical, reef"
            foraging="Opportunistic"
          />
          <SpeciesCard
            species="Mako Shark"
            icon="⚡"
            size="2-4m"
            habitat="Open ocean"
            foraging="Fast pursuit"
          />
        </div>
      </div>
    </motion.div>
  )
}

// 3D Model Viewer Component using React Three Fiber with actual OBJ loading
function ThreeDModelViewer() {
  const [model, setModel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadOBJModel = async () => {
      try {
        setLoading(true)

        // For now, create a simple 3D representation using basic Three.js shapes
        // In a production environment, you would use proper OBJ/MTL loaders

        // Simulate loading time for the actual model
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Create a simple geometric representation of the dorsal tag
        // This is a placeholder until proper OBJ loading is implemented
        setModel({
          type: 'simple_geometry',
          geometry: 'box',
          dimensions: { width: 80, height: 40, depth: 15 },
        })

        setLoading(false)
      } catch (err) {
        console.error('Failed to load 3D model:', err)
        setError('Failed to load 3D model')
        setLoading(false)
      }
    }

    loadOBJModel()
  }, [])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-900/50 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
          <div className="text-cyan-400 text-sm">Loading 3D Model...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-800/50 rounded-lg">
        <div className="text-center">
          <div className="text-red-400 text-4xl mb-2">⚠️</div>
          <div className="text-gray-400 text-sm">3D Model Unavailable</div>
          <div className="text-gray-500 text-xs mt-1">Check console for details</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl overflow-hidden relative">
      {/* YC Startup-style image display */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative max-w-full max-h-full">
          {/* Main image container with YC-style rounded corners and shadow */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
            {/* Image with rounded corners */}
            <img
              src="/External Dorsal Fin.png"
              alt="External Dorsal Fin Tag"
              className="w-auto h-auto max-w-full max-h-96 object-contain rounded-xl shadow-lg"
              style={{
                filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))',
                borderRadius: '16px',
              }}
            />

            {/* YC-style floating badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white/20">
              NEW
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 pointer-events-none"></div>
          </div>

          {/* YC-style caption below */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-cyan-400/30">
              <p className="text-cyan-300 text-sm font-medium text-center">
                External Dorsal Fin Tag • Revolutionary Marine Technology
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Minimalist overlay elements */}
      <div className="absolute top-4 left-4">
        <div className="bg-cyan-600/90 text-white text-sm font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          Product Image
        </div>
      </div>

      <div className="absolute bottom-4 right-4">
        <div className="bg-slate-800/80 text-cyan-300 text-xs px-2 py-1 rounded backdrop-blur-sm">
          YC Startup Style
        </div>
      </div>
    </div>
  )
}

// Helper Components
function ComponentLayer({ title, description, color, icon }) {
  return (
    <div className={`bg-gradient-to-r ${color} rounded-lg p-4 flex items-center space-x-4`}>
      <div className="text-4xl">{icon}</div>
      <div className="flex-1">
        <div className="text-white font-bold">{title}</div>
        <div className="text-white/80 text-sm">{description}</div>
      </div>
    </div>
  )
}

function SpecCard({ title, value, unit, icon, color }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6 text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className={`text-3xl font-bold ${color} mb-1`}>{value}</div>
      <div className="text-gray-400 text-sm">{unit}</div>
      <div className="text-white font-medium mt-2">{title}</div>
    </div>
  )
}

function SafetyFeature({ icon, title, description, status }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <div className="flex items-start space-x-3">
        <div className="text-3xl text-amber-400">{icon}</div>
        <div className="flex-1">
          <div className="text-white font-bold mb-1">{title}</div>
          <div className="text-gray-400 text-sm mb-2">{description}</div>
          <div className="inline-block bg-amber-600/20 text-amber-400 text-xs px-2 py-1 rounded">
            {status}
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-600">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className="text-white font-medium text-sm">{value}</span>
    </div>
  )
}

function PreyTypeCard({ type, icon, characteristics, confidence, color }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-6`}>
      <div className="text-5xl text-center mb-3">{icon}</div>
      <div className="text-white font-bold text-center text-lg mb-3">{type}</div>
      <ul className="space-y-2 text-white/90 text-sm mb-4">
        {characteristics.map((char, idx) => (
          <li key={idx}>• {char}</li>
        ))}
      </ul>
      <div className="text-center">
        <div className="text-white/80 text-xs">Classification Confidence</div>
        <div className="text-white font-bold text-xl">{confidence}</div>
      </div>
    </div>
  )
}

function DataFlowStep({ step, title, description, latency }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-4">
      <div className="text-blue-400 font-bold text-sm mb-1">Step {step}</div>
      <div className="text-white font-semibold mb-2">{title}</div>
      <div className="text-gray-400 text-xs mb-2">{description}</div>
      <div className="text-green-400 text-xs">⏱️ {latency}</div>
    </div>
  )
}

function PowerFeature({ icon, title, description, savings }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-white font-bold mb-2">{title}</div>
      <div className="text-gray-400 text-sm mb-3">{description}</div>
      <div className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full inline-block">
        {savings}
      </div>
    </div>
  )
}

function DeploymentStep({ step, title, description }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
        {step}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  )
}

function SpeciesCard({ species, icon, size, habitat, foraging }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6 text-center">
      <div className="text-5xl mb-3">{icon}</div>
      <div className="text-white font-bold text-lg mb-4">{species}</div>
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-400">Size:</span> <span className="text-white">{size}</span>
        </div>
        <div>
          <span className="text-gray-400">Habitat:</span>{' '}
          <span className="text-white">{habitat}</span>
        </div>
        <div>
          <span className="text-gray-400">Foraging:</span>{' '}
          <span className="text-white">{foraging}</span>
        </div>
      </div>
    </div>
  )
}
