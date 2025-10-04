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
              🛰️ Powered by NASA Satellite Data
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tight">
            <span className="text-gradient">Predict Shark Events</span>
            <br />
            <span className="text-white">Before They Happen</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Learn ocean science through interactive lessons. Predict shark behavior with AI. Free
            educational platform for students, teachers, and communities worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
              onClick={() => onNavigate('education')}
              className="px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-blue-500/50 hover:scale-105"
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
              <span>Free for Students & Teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>NGSS-Aligned Curriculum</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Open Source & Accessible</span>
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
            Learn, Predict, Protect
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Interactive curriculum for high school students and free tools for everyone
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              icon="🎓"
              title="Interactive Lessons"
              description="4 complete lessons teaching ocean science, satellites, and conservation. Free for educators worldwide."
              onClick={() => onNavigate('education')}
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon="📊"
              title="ML Forecasting Tool"
              description="Use real NASA satellite data to predict shark hotspots with 87% accuracy. Hands-on data science."
              onClick={() => onNavigate('visualization')}
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon="🔬"
              title="Design Challenges"
              description="Engineer bio-sensors, create food webs, and solve real conservation problems through projects."
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatCard value="3" label="NASA Missions" sublabel="SWOT · MODIS · PACE" icon="🛰️" />
              <StatCard value="87%" label="Accuracy" sublabel="Prediction Correlation" icon="🎯" />
              <StatCard value="4D" label="Spatiotemporal" sublabel="x, y, z, time" icon="🌐" />
              <StatCard value="∞" label="Impact" sublabel="Conservation · Safety" icon="🦈" />
            </div>
          </div>
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
