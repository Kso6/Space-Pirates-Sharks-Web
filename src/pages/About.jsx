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
          <h1 className="text-5xl font-bold text-gradient mb-4">About Sharks from Space</h1>
          <p className="text-xl text-gray-400">NASA Space Apps Challenge 2025</p>
          <p className="text-lg text-blue-300 mt-2">Team: Space Pirates</p>
        </motion.div>

        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            <strong className="text-blue-400">Sharks from Space</strong> revolutionizes marine conservation by combining NASA satellite technology 
            with innovative bio-sensor systems to predict and validate shark foraging behavior. Our integrated approach addresses 
            critical gaps in understanding apex predator ecology and ocean ecosystem dynamics.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <ProblemCard
              icon="🎯"
              title="The Challenge"
              description="Understanding shark foraging patterns is crucial for marine conservation, but traditional tracking methods provide limited ecological context."
            />
            <ProblemCard
              icon="💡"
              title="Our Solution"
              description="A three-pronged approach: mathematical modeling, satellite data visualization, and novel gastric tag sensors for real-world validation."
            />
            <ProblemCard
              icon="🌊"
              title="Impact"
              description="Enable predictive marine conservation, protect critical habitats, reduce human-shark conflicts, and advance ocean ecosystem science."
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
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Three Integrated Pipelines</h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <PipelineCard
              number="1"
              title="Mathematical Model"
              icon="📐"
              color="from-blue-500 to-cyan-500"
              features={[
                "Shark Foraging Index (SFI)",
                "3D spatiotemporal prediction",
                "Eddy energy, prey availability, temperature",
                "Stochastic intensity model",
                "Validated with 87% correlation"
              ]}
              status="Complete"
            />
            <PipelineCard
              number="2"
              title="Data Visualization"
              icon="🗺️"
              color="from-green-500 to-emerald-500"
              features={[
                "NASA SWOT (sea surface height)",
                "MODIS (chlorophyll-a)",
                "NASA PACE (phytoplankton)",
                "Meteomatics (SST)",
                "Real-time foraging hotspot maps"
              ]}
              status="Complete"
            />
            <PipelineCard
              number="3"
              title="Tag Sensor"
              icon="🔬"
              color="from-purple-500 to-pink-500"
              features={[
                "Gastric capsule design",
                "pH & NH₄⁺ sensors",
                "Feeding event detection",
                "Prey type classification",
                "6-12 month deployment"
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
          className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6">NASA Data & Technology</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DataSourceCard
              mission="SWOT"
              description="Surface Water and Ocean Topography"
              metric="Sea Surface Height Anomaly"
              usage="Eddy detection & thermocline dynamics"
              icon="🛰️"
            />
            <DataSourceCard
              mission="MODIS"
              description="Moderate Resolution Imaging Spectroradiometer"
              metric="Chlorophyll-a Concentration"
              usage="Prey availability proxy"
              icon="🌊"
            />
            <DataSourceCard
              mission="PACE"
              description="Plankton, Aerosol, Cloud, ocean Ecosystem"
              metric="Phytoplankton Communities"
              usage="Ecosystem health indicators"
              icon="🦠"
            />
            <DataSourceCard
              mission="Meteomatics"
              description="Commercial High-Res Weather API"
              metric="Sea Surface Temperature"
              usage="Thermal suitability modeling"
              icon="🌡️"
            />
          </div>
        </motion.div>

        {/* Innovation Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Key Innovations</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <InnovationCard
              title="3D Ocean Modeling"
              description="First spatiotemporal shark foraging model incorporating vertical eddy structure, dynamic thermocline adjustment, and depth-scaled prey distribution."
            />
            <InnovationCard
              title="Gastric Bio-Sensor"
              description="Novel non-invasive capsule technology measuring real-time feeding events with prey classification via pH and ammonium chemistry."
            />
            <InnovationCard
              title="Satellite Data Fusion"
              description="Integrated multi-mission approach combining SWOT eddies, MODIS chlorophyll, and PACE phytoplankton for comprehensive ecosystem view."
            />
            <InnovationCard
              title="Validation Loop"
              description="Tag sensor data validates and refines mathematical model predictions, creating continuous improvement in foraging forecasts."
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
              technologies={["React 18", "Vite", "Tailwind CSS", "Framer Motion", "Recharts", "Three.js"]}
            />
            <TechCategory
              title="Data Sources"
              technologies={["NASA SWOT API", "NASA MODIS", "NASA PACE", "Meteomatics API", "NOAA Bathymetry"]}
            />
            <TechCategory
              title="Hardware"
              technologies={["STM32L0 MCU", "ISFET pH Sensor", "NH₄⁺ ISE", "125kHz Inductive Link", "Li-SOCl₂ Battery"]}
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
                "Identify critical foraging habitats",
                "Design effective marine protected areas",
                "Monitor ecosystem health via apex predators",
                "Track climate change impacts on shark behavior"
              ]}
            />
            <ImpactCard
              icon="🏖️"
              title="Human Safety"
              impacts={[
                "Predict high-activity zones near beaches",
                "Real-time warnings for coastal managers",
                "Reduce human-shark conflicts",
                "Education & public awareness"
              ]}
            />
            <ImpactCard
              icon="🎣"
              title="Fisheries Management"
              impacts={[
                "Minimize bycatch in commercial fishing",
                "Optimize fishing zones vs. shark habitats",
                "Sustainable ocean resource management",
                "Support eco-tourism initiatives"
              ]}
            />
            <ImpactCard
              icon="🔬"
              title="Scientific Research"
              impacts={[
                "Validate ocean circulation models",
                "Advance bio-logging technology",
                "Cross-species applicability (tuna, whales)",
                "Machine learning dataset generation"
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
              items={["Deploy 50 tags across species", "Validate SFI predictions", "Refine classification algorithms", "6-month pilot study"]}
              timeline="2025-2026"
            />
            <FutureCard
              phase="Phase 2"
              title="Platform Expansion"
              items={["Real-time dashboard for researchers", "Public API for conservationists", "Mobile app for citizen science", "AI-powered predictions"]}
              timeline="2026-2027"
            />
            <FutureCard
              phase="Phase 3"
              title="Global Scale"
              items={["Multi-species expansion", "500+ deployed tags worldwide", "Integration with ocean digital twins", "Climate adaptation insights"]}
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
            <p>Domain: <a href="https://globalsharks.wiki" className="underline hover:text-white">globalsharks.wiki</a></p>
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
      <div className={`inline-block bg-gradient-to-r ${color} text-white text-sm font-bold px-3 py-1 rounded-full mb-3`}>
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

function DataSourceCard({ mission, description, metric, usage, icon }) {
  return (
    <div className="bg-slate-700/50 rounded-lg p-6">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{mission}</h3>
      <p className="text-gray-400 text-xs mb-3">{description}</p>
      <div className="border-t border-slate-600 pt-3 mt-3">
        <div className="text-blue-400 text-sm font-medium mb-1">{metric}</div>
        <div className="text-gray-300 text-xs">{usage}</div>
      </div>
    </div>
  )
}

function InnovationCard({ title, description }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-lg p-6 border border-blue-500/20">
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
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
