import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
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
          <h1 className="text-5xl font-bold text-gradient mb-4">Gastric Capsule Tag</h1>
          <p className="text-xl text-gray-400">
            Revolutionary Bio-Sensor for Real-Time Feeding Detection
          </p>
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
                <div className="text-6xl">💊</div>
                <div className="text-white font-bold text-xl">Gastric Capsule</div>
                <div className="text-gray-400 text-sm">Dimensions: 25mm × 10mm</div>
                <div className="text-gray-400 text-sm">Weight: ~8 grams</div>
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

      {/* Key Specifications */}
      <div className="grid md:grid-cols-4 gap-6">
        <SpecCard
          title="Battery Life"
          value="6-12"
          unit="months"
          icon="🔋"
          color="text-green-400"
        />
        <SpecCard title="Sample Rate" value="0.2-1" unit="Hz" icon="⏱️" color="text-blue-400" />
        <SpecCard title="Weight" value="8" unit="grams" icon="⚖️" color="text-purple-400" />
        <SpecCard title="Range" value="15" unit="cm" icon="📶" color="text-cyan-400" />
      </div>

      {/* Material Safety */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Biosafety & Materials</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <SafetyFeature
            icon="✓"
            title="Biocompatible"
            description="Medical-grade Delrin, Parylene-C coating, no sharp edges"
            status="Certified"
          />
          <SafetyFeature
            icon="✓"
            title="Acid Resistant"
            description="ePTFE membrane withstands pH 1-2 stomach environment"
            status="Tested"
          />
          <SafetyFeature
            icon="✓"
            title="Gastro-Retentive"
            description="Designed to remain in stomach, natural exit after mission"
            status="Validated"
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
        <div className="bg-slate-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Simulated Feeding Event</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={feedingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                label={{
                  value: 'Time (minutes)',
                  position: 'insideBottom',
                  offset: -5,
                  fill: '#94a3b8',
                }}
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Legend />
              <Line type="monotone" dataKey="pH" stroke="#ef4444" strokeWidth={2} name="pH Level" />
              <Line
                type="monotone"
                dataKey="nh4"
                stroke="#10b981"
                strokeWidth={2}
                name="NH₄⁺ Concentration"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 flex justify-around text-sm">
            <div className="text-center">
              <div className="text-gray-400">Feeding Detected</div>
              <div className="text-red-400 font-bold">t = 10 min</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Peak Response</div>
              <div className="text-green-400 font-bold">t = 18 min</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Return to Baseline</div>
              <div className="text-blue-400 font-bold">t = 35 min</div>
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
  const dataPacket = {
    t_event: '2025-10-04T14:23:15Z',
    capsule_ID: 'SC-2025-001',
    pH_peak: 3.2,
    dpH_dt: 0.65,
    NH4_peak: 6.8,
    NH4_AUC: 142.5,
    temperature: 18.3,
    QC_flags: 0x00,
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Data Flow */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Data Flow Architecture</h2>

        <div className="flex items-center justify-between mb-8">
          {['Gastric Capsule', 'Inductive Link', 'Dorsal Tag', 'Satellite', 'Cloud Platform'].map(
            (step, idx) => (
              <div key={step} className="flex items-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-3xl mb-2">
                    {idx === 0 && '💊'}
                    {idx === 1 && '📡'}
                    {idx === 2 && '🏷️'}
                    {idx === 3 && '🛰️'}
                    {idx === 4 && '☁️'}
                  </div>
                  <div className="text-white text-sm font-medium">{step}</div>
                </div>
                {idx < 4 && <div className="text-blue-400 text-2xl mx-4">→</div>}
              </div>
            )
          )}
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          <DataFlowStep
            step="1"
            title="Sensing"
            description="pH & NH₄⁺ sampled at 0.2-1 Hz"
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

      {/* Data Packet Structure */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Event Data Packet (32-48 bytes)</h2>

        <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm">
          <pre className="text-green-400">
            {`{
  "t_event": "${dataPacket.t_event}",
  "capsule_ID": "${dataPacket.capsule_ID}",
  "pH_peak": ${dataPacket.pH_peak},
  "dpH_dt": ${dataPacket.dpH_dt},        // Rate of pH change
  "NH4_peak": ${dataPacket.NH4_peak},        // mM
  "NH4_AUC": ${dataPacket.NH4_AUC},       // Area under curve
  "temperature": ${dataPacket.temperature},    // °C
  "QC_flags": ${dataPacket.QC_flags}          // Quality control
}`}
          </pre>
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">48 bytes</div>
            <div className="text-sm text-gray-400">Packet Size</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">2-4/day</div>
            <div className="text-sm text-gray-400">Typical Events</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">&lt; 1 hour</div>
            <div className="text-sm text-gray-400">Latency</div>
          </div>
        </div>
      </div>

      {/* Firmware State Machine */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Firmware Operation Modes</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-700/50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-white mb-4">Baseline Mode</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• pH sampling: 0.2 Hz (every 5s)</li>
              <li>• NH₄⁺ sampling: 0.02 Hz (every 5 min)</li>
              <li>• MCU sleep between readings</li>
              <li>• Power consumption: ~2-5 µA</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg p-6 border-2 border-blue-500">
            <h3 className="text-lg font-bold text-white mb-4">Feeding Event Mode</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Trigger: ΔpH ≥ 0.4 or pH &gt; 2.5</li>
              <li>• pH sampling: 1 Hz (high-rate)</li>
              <li>• NH₄⁺ sampling: 0.2 Hz</li>
              <li>• Duration: 30-45 minutes</li>
              <li>• Power consumption: ~40 µA</li>
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
      {/* Power Budget */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Power Budget Analysis</h2>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={powerBudget}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="mode" stroke="#94a3b8" />
            <YAxis
              stroke="#94a3b8"
              label={{
                value: 'Average Power (µW)',
                angle: -90,
                position: 'insideLeft',
                fill: '#94a3b8',
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #3b82f6' }}
              labelStyle={{ color: '#e2e8f0' }}
              formatter={(value, name) => [value, name === 'power' ? 'Power (µW)' : name]}
            />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
              name="Power"
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="mt-6 bg-slate-700/50 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{avgPower.toFixed(1)} µW</div>
              <div className="text-sm text-gray-400">Average Power</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">1200 mAh</div>
              <div className="text-sm text-gray-400">Battery Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">18+ months</div>
              <div className="text-sm text-gray-400">Theoretical Life</div>
            </div>
          </div>

          <div className="border-t border-slate-600 pt-4">
            <div className="flex justify-between text-sm text-gray-300">
              <span>Field Reality (with margin):</span>
              <span className="text-green-400 font-bold">6-12 months</span>
            </div>
          </div>
        </div>
      </div>

      {/* Battery Specifications */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Primary Battery</h3>
          <div className="space-y-3">
            <SpecRow label="Chemistry" value="Li-SOCl₂ (Lithium Thionyl Chloride)" />
            <SpecRow label="Form Factor" value="1/2 AA bobbin cell" />
            <SpecRow label="Capacity" value="1200 mAh @ 3.6V" />
            <SpecRow label="Energy Density" value="High (700 Wh/L)" />
            <SpecRow label="Self-Discharge" value="< 1% per year" />
            <SpecRow label="Operating Temp" value="-60°C to +85°C" />
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Supercapacitor</h3>
          <div className="space-y-3">
            <SpecRow label="Type" value="Hybrid capacitor" />
            <SpecRow label="Capacitance" value="47-100 mF" />
            <SpecRow label="Purpose" value="Handle TX current bursts" />
            <SpecRow label="Charge Time" value="< 1 second" />
            <SpecRow label="Lifecycle" value="> 100,000 cycles" />
            <SpecRow label="ESR" value="< 50 mΩ" />
          </div>
        </div>
      </div>

      {/* Power Management Features */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Power Management Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <PowerFeature
            icon="💤"
            title="Deep Sleep"
            description="STM32L0 ultra-low-power mode between samples"
            savings="95% duty cycle"
          />
          <PowerFeature
            icon="⚡"
            title="Burst Transmission"
            description="Inductive TX only during events, supercap buffered"
            savings="< 1% duty cycle"
          />
          <PowerFeature
            icon="🎯"
            title="Adaptive Sampling"
            description="High-rate only during feeding, baseline otherwise"
            savings="~80% power vs continuous"
          />
        </div>
      </div>
    </motion.div>
  )
}

function DeploymentSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      {/* Deployment Process */}
      <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6">Deployment Protocol</h2>

        <div className="space-y-6">
          {[
            {
              step: 1,
              title: 'Capture & Preparation',
              description:
                'Shark captured using safe handling protocols. Gastric capsule activated and calibrated.',
            },
            {
              step: 2,
              title: 'Capsule Insertion',
              description:
                'Capsule inserted into stomach via esophagus. Non-invasive procedure, no anesthesia required.',
            },
            {
              step: 3,
              title: 'Dorsal Tag Attachment',
              description:
                'External dorsal tag attached with inductive receiver coil and satellite uplink.',
            },
            {
              step: 4,
              title: 'Release & Monitoring',
              description:
                'Shark released. System begins baseline monitoring and waits for feeding events.',
            },
            {
              step: 5,
              title: 'Data Collection',
              description:
                'Feeding events transmitted to dorsal tag, uplinked to satellite on surfacing.',
            },
            {
              step: 6,
              title: 'Natural Exit',
              description:
                'Capsule designed for gastro-retention during mission, natural exit after 6-12 months.',
            },
          ].map((item) => (
            <DeploymentStep key={item.step} {...item} />
          ))}
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
        <div className="text-3xl text-green-400">{icon}</div>
        <div className="flex-1">
          <div className="text-white font-bold mb-1">{title}</div>
          <div className="text-gray-400 text-sm mb-2">{description}</div>
          <div className="inline-block bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded">
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
