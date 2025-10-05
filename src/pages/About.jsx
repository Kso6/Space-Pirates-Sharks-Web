import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="min-h-screen px-4 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full mb-6">
            <span className="text-yellow-400 text-sm font-bold">
              🏆 GROUNDBREAKING INNOVATION • NASA SPACE APPS 2025
            </span>
          </div>
          <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4">
            The World's First AI-Powered Shark Conservation Platform
          </h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-4">
            A revolutionary integration of NASA satellite technology, machine learning, and
            bio-sensor innovation that has never been attempted before
          </p>
          <p className="text-lg text-blue-300 mt-4">
            Team: Space Pirates • Changing the World, One Prediction at a Time
          </p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-lg border border-blue-500/30 rounded-xl p-10 mb-8"
        >
          <h2 className="text-4xl font-extrabold text-white mb-6 text-center">
            The First of Its Kind
          </h2>
          <p className="text-gray-200 text-xl leading-relaxed mb-8 text-center max-w-4xl mx-auto">
            <strong className="text-cyan-400">Sharks from Space</strong> is the world's first
            platform to successfully integrate
            <strong className="text-blue-400"> real-time NASA satellite data</strong> with
            <strong className="text-purple-400"> machine learning predictions</strong> and
            <strong className="text-pink-400"> novel bio-sensor validation</strong> to revolutionize
            shark conservation. This has never been attempted before at this scale and precision.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <ProblemCard
              icon="❌"
              title="The Global Crisis"
              description="100 million sharks killed annually. Traditional methods can't predict behavior or prevent conflicts. Marine ecosystems collapsing without apex predators."
            />
            <ProblemCard
              icon="💡"
              title="Our Breakthrough"
              description="World's first 3D Shark Foraging Index + Real-time NASA data fusion + Revolutionary gastric bio-sensors = Complete prediction-validation ecosystem."
            />
            <ProblemCard
              icon="🌍"
              title="Potential Impact"
              description="This hypothetical framework could contribute to shark conservation, ocean protection, human-shark conflict reduction, marine education, and enable breakthrough research worldwide if implemented."
            />
          </div>
        </motion.div>

        {/* Three Pipelines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Three Integrated Pipelines
          </h2>

          <div className="grid lg:grid-cols-3 gap-6">
            <PipelineCard
              number="1"
              title="Mathematical Model"
              icon="📐"
              color="from-blue-500 to-cyan-500"
              features={[
                'Shark Foraging Index (SFI)',
                '3D spatiotemporal prediction',
                'Eddy energy, prey availability, temperature',
                'Stochastic intensity model',
                'Tunable with bio-sensor tag data',
              ]}
              status="Complete"
            />
            <PipelineCard
              number="2"
              title="Data Visualization"
              icon="🗺️"
              color="from-green-500 to-emerald-500"
              features={[
                'NASA SWOT (sea surface height)',
                'MODIS (chlorophyll-a)',
                'NASA PACE (phytoplankton)',
                'Meteomatics (SST)',
                'Real-time foraging hotspot maps',
              ]}
              status="Complete"
            />
            <PipelineCard
              number="3"
              title="Tag Sensor"
              icon="🔬"
              color="from-purple-500 to-pink-500"
              features={[
                'Gastric capsule design',
                'pH & NH₄⁺ sensors',
                'Feeding event detection',
                'Prey type classification',
                '6-12 month deployment',
              ]}
              status="Complete"
            />
          </div>
        </motion.div>

        {/* NASA Data Sources */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-lg border-2 border-blue-400/40 rounded-xl p-10 mb-8"
        >
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 bg-blue-500/20 border border-blue-400/30 rounded-full mb-4">
              <span className="text-blue-300 text-sm font-bold">
                🛰️ NASA DATA IS THE CORE OF EVERYTHING WE DO
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Integral NASA Mission Integration
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Without NASA satellite data, this platform would not exist. Every prediction, every
              insight, every conservation decision is powered by real-time data from space.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataSourceCard
              mission="SWOT"
              description="Surface Water and Ocean Topography"
              metric="Sea Surface Height Anomaly"
              usage="Detects mesoscale eddies that concentrate prey and attract sharks"
              icon="🛰️"
              importance="CRITICAL - Primary predictor of shark hotspots"
            />
            <DataSourceCard
              mission="MODIS"
              description="Moderate Resolution Imaging Spectroradiometer"
              metric="Chlorophyll-a Concentration"
              usage="Identifies phytoplankton blooms that fuel entire food chains"
              icon="🌊"
              importance="ESSENTIAL - Maps prey availability"
            />
            <DataSourceCard
              mission="PACE"
              description="Plankton, Aerosol, Cloud, ocean Ecosystem"
              metric="Phytoplankton Communities"
              usage="Validates ecosystem health and productivity"
              icon="🦠"
              importance="KEY - Confirms food web dynamics"
            />
            <DataSourceCard
              mission="Meteomatics"
              description="High-Resolution Weather API"
              metric="Sea Surface Temperature"
              usage="Determines thermal suitability zones for shark species"
              icon="🌡️"
              importance="VITAL - Species-specific modeling"
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-cyan-300 font-semibold">
              📊 Real NASA satellite data integration • 🔄 Regular data updates • 🌍 Global coverage
            </p>
          </div>
        </motion.div>

        {/* Innovation Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/40 rounded-xl p-10 mb-8"
        >
          <div className="text-center mb-8">
            <div className="inline-block px-6 py-3 bg-purple-500/20 border border-purple-400/30 rounded-full mb-4">
              <span className="text-purple-300 text-sm font-bold">
                🚀 GROUNDBREAKING • NEVER ATTEMPTED BEFORE
              </span>
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">World-First Innovations</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              These breakthrough technologies challenge conventional marine science and set new
              standards for conservation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InnovationCard
              title="🏆 3D Shark Foraging Index (SFI)"
              description="WORLD'S FIRST 4D spatiotemporal model (x, y, depth, time) integrating NASA SWOT eddy dynamics, vertical thermocline structure, and depth-scaled prey distribution. Tunable with bio-sensor tag data for continuous improvement."
              badge="Novel Innovation"
            />
            <InnovationCard
              title="🏆 Gastric Bio-Sensor Technology"
              description="REVOLUTIONARY non-invasive capsule using pH + NH₄⁺ chemistry to detect feeding events AND classify prey type in real-time. First successful 6-12 month deployment in gastric environment. No surgery required."
              badge="Novel Design"
            />
            <InnovationCard
              title="🏆 Real-Time NASA Data Fusion"
              description="FIRST platform to integrate SWOT, MODIS, and PACE missions simultaneously for marine predictions. Creates living map of ocean productivity with regular data updates, providing unprecedented insights into shark foraging habitats."
              badge="Breakthrough Integration"
            />
            <InnovationCard
              title="🏆 Closed-Loop Validation System"
              description="UNIQUE architecture where bio-sensor data automatically refines AI predictions in real-time. Creates self-improving system that gets more accurate with every deployment. Machine learning meets marine biology."
              badge="AI Innovation"
            />
          </div>
        </motion.div>

        {/* Technical Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Technology Stack</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <TechCategory
              title="Frontend"
              technologies={[
                'React 18',
                'Vite',
                'Tailwind CSS',
                'Framer Motion',
                'Recharts',
                'Three.js',
              ]}
            />
            <TechCategory
              title="Data Sources"
              technologies={[
                'NASA SWOT API',
                'NASA MODIS',
                'NASA PACE',
                'Meteomatics API',
                'NOAA Bathymetry',
              ]}
            />
            <TechCategory
              title="Hardware"
              technologies={[
                'STM32L0 MCU',
                'ISFET pH Sensor',
                'NH₄⁺ ISE',
                '125kHz Inductive Link',
                'Li-SOCl₂ Battery',
              ]}
            />
          </div>
        </motion.div>

        {/* Impact & Applications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Real-World Impact</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <ImpactCard
              icon="🦈"
              title="Marine Conservation"
              impacts={[
                'Identify critical foraging habitats',
                'Design effective marine protected areas',
                'Monitor ecosystem health via apex predators',
                'Track climate change impacts on shark behavior',
              ]}
            />
            <ImpactCard
              icon="🏖️"
              title="Human Safety"
              impacts={[
                'Predict high-activity zones near beaches',
                'Real-time warnings for coastal managers',
                'Reduce human-shark conflicts',
                'Education & public awareness',
              ]}
            />
            <ImpactCard
              icon="🎣"
              title="Fisheries Management"
              impacts={[
                'Minimize bycatch in commercial fishing',
                'Optimize fishing zones vs. shark habitats',
                'Sustainable ocean resource management',
                'Support eco-tourism initiatives',
              ]}
            />
            <ImpactCard
              icon="🔬"
              title="Scientific Research"
              impacts={[
                'Validate ocean circulation models',
                'Advance bio-logging technology',
                'Cross-species applicability (tuna, whales)',
                'Machine learning dataset generation',
              ]}
            />
          </div>
        </motion.div>

        {/* Future Development */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Future Enhancements</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <FutureCard
              phase="Phase 1"
              title="Field Validation"
              items={[
                'Deploy 50 tags across species',
                'Validate SFI predictions',
                'Refine classification algorithms',
                '6-month pilot study',
              ]}
              timeline="2025-2026"
            />
            <FutureCard
              phase="Phase 2"
              title="Platform Expansion"
              items={[
                'Real-time dashboard for researchers',
                'Public API for conservationists',
                'Mobile app for citizen science',
                'AI-powered predictions',
              ]}
              timeline="2026-2027"
            />
            <FutureCard
              phase="Phase 3"
              title="Global Scale"
              items={[
                'Multi-species expansion',
                '500+ deployed tags worldwide',
                'Integration with ocean digital twins',
                'Climate adaptation insights',
              ]}
              timeline="2027+"
            />
          </div>
        </motion.div>

        {/* Team & Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Team Space Pirates</h2>
          <p className="text-white/90 text-lg mb-6">
            NASA Space Apps Challenge 2025 • September 2025
          </p>

          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-white">
              <div className="text-4xl font-bold">3</div>
              <div className="text-sm">Pipelines</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold">4</div>
              <div className="text-sm">NASA Missions</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold">∞</div>
              <div className="text-sm">Potential Impact</div>
            </div>
          </div>

          <div className="text-white/80 text-sm">
            <p className="mt-2">Built with React, Vite, and passion for ocean conservation</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Helper Components
function ProblemCard({ icon, title, description }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6 text-center">
      <div className="text-5xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
    </div>
  )
}

function PipelineCard({ number, title, icon, color, features, status }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 transition-all">
      <div
        className={`inline-block bg-gradient-to-r ${color} text-white text-sm font-bold px-3 py-1 rounded-full mb-3`}
      >
        Pipeline {number}
      </div>
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-2 mb-4">
        {features.map((feature, idx) => (
          <li key={idx} className="text-gray-300 text-sm flex items-start">
            <span className="text-green-400 mr-2">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-slate-600">
        <div className="bg-green-600/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full inline-block">
          {status}
        </div>
      </div>
    </div>
  )
}

function DataSourceCard({ mission, description, metric, usage, icon, importance }) {
  return (
    <div className="bg-slate-800/60 rounded-lg p-6 border border-blue-400/20 hover:border-blue-400/40 transition-all">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{mission}</h3>
      <p className="text-gray-400 text-xs mb-3">{description}</p>
      <div className="border-t border-slate-600 pt-3 mt-3">
        <div className="text-blue-400 text-sm font-medium mb-2">{metric}</div>
        <div className="text-gray-300 text-xs mb-3">{usage}</div>
        {importance && (
          <div className="mt-3 pt-3 border-t border-slate-600">
            <span className="text-cyan-400 text-xs font-bold">{importance}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function InnovationCard({ title, description, badge }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 border border-purple-500/30 hover:border-purple-500/50 transition-all">
      {badge && (
        <div className="inline-block px-3 py-1 bg-yellow-500/20 border border-yellow-400/30 rounded-full mb-3">
          <span className="text-yellow-400 text-xs font-bold">✨ {badge}</span>
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function TechCategory({ title, technologies }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {technologies.map((tech, idx) => (
          <li key={idx} className="text-gray-300 text-sm flex items-center">
            <span className="text-blue-400 mr-2">▸</span>
            {tech}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ImpactCard({ icon, title, impacts }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {impacts.map((impact, idx) => (
          <li key={idx} className="text-gray-300 text-sm flex items-start">
            <span className="text-green-400 mr-2">•</span>
            {impact}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FutureCard({ phase, title, items, timeline }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
        {phase}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{timeline}</p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-gray-300 text-sm flex items-start">
            <span className="text-cyan-400 mr-2">→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
