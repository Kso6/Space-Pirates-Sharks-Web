import { motion } from 'framer-motion'

export default function Hero({ onNavigate }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24">
      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-blue-400 text-sm font-medium">
              🛰️ Powered by NASA SWOT, MODIS & PACE Missions
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tight">
            <span className="text-gradient">The World's First</span>
            <br />
            <span className="text-white">AI Shark Conservation Platform</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionary platform combining NASA satellite data, machine learning, and novel
            bio-sensor innovation. Active shark prediction with live data and mathematical model
            tuning with tag data to protect marine ecosystems and save lives worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
              onClick={() => onNavigate('sfi')}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-bold rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-2xl hover:shadow-orange-500/50 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 SFI Dashboard
            </motion.button>
            <motion.button
              onClick={() => onNavigate('education')}
              className="px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning →
            </motion.button>
            <motion.button
              onClick={() => onNavigate('visualization')}
              className="px-8 py-4 bg-transparent border-2 border-white/20 text-white text-lg font-semibold rounded-xl hover:bg-white/5 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try the Forecast Tool
            </motion.button>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>3 NASA Missions Integrated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>100% Free & Open Source</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Real-Time Satellite Data</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Bio-Sensor Innovation</span>
            </div>
          </div>
        </motion.div>

        {/* Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            A Groundbreaking 3-Pipeline Innovation
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            The only platform in the world that integrates NASA satellite data, mathematical
            modeling, and bio-sensor technology to revolutionize shark conservation
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon="📐"
              title="Mathematical Model (SFI)"
              description="World's first 3D spatiotemporal Shark Foraging Index. Integrates NASA SWOT eddies, MODIS chlorophyll-a, and thermal dynamics for predictive modeling."
              onClick={() => onNavigate('model')}
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon="🛰️"
              title="Real-Time NASA Data"
              description="Live satellite feeds from SWOT, MODIS, and PACE missions. Process and visualize 4D ocean data (x, y, depth, time) in real-time."
              onClick={() => onNavigate('visualization')}
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon="🔬"
              title="Revolutionary Bio-Sensor"
              description="Novel gastric capsule technology for non-invasive shark feeding detection. pH + NH₄⁺ sensors classify prey type. 6-12 month deployments."
              onClick={() => onNavigate('tag')}
              gradient="from-green-500 to-emerald-500"
            />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-32"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Platform Capabilities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard
                value="3"
                label="NASA Missions"
                sublabel="SWOT • MODIS • PACE integrated"
                icon="🛰️"
              />
              <StatCard
                value="4D"
                label="Spatiotemporal"
                sublabel="x, y, depth, time modeling"
                icon="🌐"
              />
              <StatCard
                value="Live"
                label="Data Processing"
                sublabel="Real-time satellite feeds"
                icon="📡"
              />
              <StatCard
                value="Open"
                label="Source & Free"
                sublabel="Fully accessible platform"
                icon="🔓"
              />
            </div>
          </div>

          {/* Global Impact Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-3xl p-12"
          >
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              World-Changing Applications
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              <ImpactCard
                icon="🌊"
                title="Marine Conservation"
                description="Identify critical shark foraging habitats and migration patterns globally"
                metric="Worldwide"
                metricLabel="Coverage"
              />
              <ImpactCard
                icon="🏖️"
                title="Coastal Safety"
                description="Real-time prediction system for human-shark encounter prevention"
                metric="Global"
                metricLabel="Coverage potential"
              />
              <ImpactCard
                icon="🎓"
                title="Education"
                description="Free interactive curriculum on marine conservation and satellite data"
                metric="Open"
                metricLabel="Access"
              />
              <ImpactCard
                icon="🔬"
                title="Scientific Research"
                description="Open platform enabling marine biology research and collaboration"
                metric="Open"
                metricLabel="Source Data"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, onClick, gradient }) {
  return (
    <motion.div
      className="group relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 cursor-pointer overflow-hidden"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      <div className="relative z-10">
        <div className="text-6xl mb-6">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-base leading-relaxed">{description}</p>

        <div className="mt-6 flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
          <span>Explore</span>
          <span className="ml-2">→</span>
        </div>
      </div>
    </motion.div>
  )
}

function StatCard({ value, label, sublabel, icon }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{value}</div>
      <div className="text-base font-semibold text-gray-300 mb-1">{label}</div>
      <div className="text-sm text-gray-500">{sublabel}</div>
    </div>
  )
}

function ImpactCard({ icon, title, description, metric, metricLabel }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 text-center hover:scale-105 transition-transform">
      <div className="text-5xl mb-4">{icon}</div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">{description}</p>
      <div className="border-t border-white/10 pt-4">
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-1">
          {metric}
        </div>
        <div className="text-xs text-gray-400">{metricLabel}</div>
      </div>
    </div>
  )
}
