import { motion } from 'framer-motion'

export default function Hero({ onNavigate }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient">
            Sharks from Space
          </h1>
          <p className="text-2xl md:text-3xl text-blue-300 mb-4">
            Predicting Apex Predator Behavior
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Using NASA satellite data (SWOT, MODIS, PACE) and innovative bio-sensor technology 
            to revolutionize marine conservation and ecosystem protection
          </p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <FeatureCard
            icon="📐"
            title="Mathematical Model"
            description="3D Shark Foraging Index combining eddies, prey availability, and temperature"
            onClick={() => onNavigate('model')}
          />
          <FeatureCard
            icon="🗺️"
            title="Data Visualization"
            description="Real-time oceanographic data from NASA satellites rendered in stunning 3D"
            onClick={() => onNavigate('visualization')}
          />
          <FeatureCard
            icon="🔬"
            title="Tag Sensor"
            description="Revolutionary gastric capsule measuring feeding events and prey identification"
            onClick={() => onNavigate('tag')}
          />
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <StatCard value="3" label="NASA Missions" sublabel="SWOT, MODIS, PACE" />
          <StatCard value="4D" label="Spatiotemporal" sublabel="x, y, z, time" />
          <StatCard value="12mo" label="Battery Life" sublabel="Tag Duration" />
          <StatCard value="∞" label="Conservation" sublabel="Impact" />
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <button
            onClick={() => onNavigate('visualization')}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-full hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Explore Interactive Visualization →
          </button>
        </motion.div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, onClick }) {
  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-lg border border-blue-500/20 rounded-xl p-6 cursor-pointer hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/20"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}

function StatCard({ value, label, sublabel }) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-blue-500/10 rounded-lg p-4">
      <div className="text-3xl md:text-4xl font-bold text-gradient mb-1">{value}</div>
      <div className="text-sm text-white font-medium">{label}</div>
      <div className="text-xs text-gray-500">{sublabel}</div>
    </div>
  )
}

