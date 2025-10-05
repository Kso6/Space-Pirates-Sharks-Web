import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

export default function IntroJourney({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timeoutRef = useRef(null)

  const slides = [
    {
      id: 'welcome',
      component: WelcomeSlide,
    },
    {
      id: 'connecting',
      component: ConnectingSlide,
    },
    {
      id: 'problem',
      component: ProblemSlide,
    },
    {
      id: 'solution',
      component: SolutionSlide,
    },
    {
      id: 'mission',
      component: MissionSlide,
    },
  ]

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setIsTransitioning(true)
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide(currentSlide + 1)
        setIsTransitioning(false)
        timeoutRef.current = null
      }, 500)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentSlide > 0) {
      setIsTransitioning(true)
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide(currentSlide - 1)
        setIsTransitioning(false)
        timeoutRef.current = null
      }, 500)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  const CurrentSlideComponent = slides[currentSlide].component

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium z-50"
      >
        Skip intro →
      </button>

      {/* Progress indicator */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentSlide
                ? 'w-8 bg-white'
                : idx < currentSlide
                ? 'w-6 bg-blue-500'
                : 'w-6 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="h-screen flex flex-col items-center justify-center px-4"
          >
            <CurrentSlideComponent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 px-4">
        <button
          onClick={handleBack}
          disabled={currentSlide === 0}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            currentSlide === 0
              ? 'bg-white/5 text-gray-600 cursor-not-allowed'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          Back
        </button>

        <div className="px-4 py-2 bg-slate-800/50 rounded-lg text-sm text-gray-400 font-mono">
          {currentSlide + 1} / {slides.length}
        </div>

        <button
          onClick={handleNext}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30"
        >
          {currentSlide === slides.length - 1 ? "Let's Go →" : 'Continue'}
        </button>
      </div>
    </div>
  )
}

// Slide 1: Welcome
function WelcomeSlide() {
  return (
    <div className="text-center max-w-4xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="w-48 h-48 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl animate-pulse"></div>
          <div className="absolute inset-2 bg-slate-950 rounded-3xl flex items-center justify-center">
            <span className="text-8xl">🦈</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6">Global Sharks</h1>
        <p className="text-xl text-blue-400 font-semibold mb-4">Team Space Pirates</p>
        <p className="text-lg text-gray-400">NASA Space Apps Challenge 2025</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="space-y-4"
      >
        <p className="text-2xl text-white font-medium">
          Join us on a journey to predict shark behavior
        </p>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Using NASA satellite data and AI to protect apex predators and communities worldwide
        </p>
      </motion.div>
    </div>
  )
}

// Slide 2: Connecting/Loading
function ConnectingSlide() {
  return (
    <div className="text-center max-w-4xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Satellite animation */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
              <span className="text-4xl">🛰️</span>
            </div>
          </motion.div>

          {/* Earth in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-9xl">🌍</span>
          </div>

          {/* Signal waves */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 border-4 border-cyan-500 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.5,
            }}
            className="absolute inset-0 border-4 border-blue-500 rounded-full"
          />
        </div>

        <motion.h2
          animate={{
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-4"
        >
          Connecting to NASA Satellites...
        </motion.h2>
        <p className="text-gray-400 text-lg">Accessing SWOT, MODIS, and PACE data streams</p>
      </motion.div>

      {/* Data stream animation */}
      <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
        {['SWOT', 'MODIS', 'PACE'].map((satellite, idx) => (
          <motion.div
            key={satellite}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.2 }}
            className="bg-slate-800/50 border border-white/10 rounded-xl p-4"
          >
            <div className="text-xs text-gray-500 mb-2">{satellite}</div>
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, delay: 0.5 + idx * 0.2 }}
              className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Slide 3: The Problem
function ProblemSlide() {
  return (
    <div className="text-center max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="text-7xl mb-6">❓</div>
        <h2 className="text-5xl font-extrabold text-white mb-8">The Challenge</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        <ProblemCard
          icon="🌊"
          title="Sharks are declining"
          stat="~100M"
          description="sharks estimated killed annually while shark encounters with humans remain rare"
          color="from-red-500 to-orange-500"
        />
        <ProblemCard
          icon="❌"
          title="Conflicts increasing"
          stat="Rising"
          description="Human-shark encounters due to lack of predictive tools for beach managers"
          color="from-yellow-500 to-orange-500"
        />
        <ProblemCard
          icon="📚"
          title="Education gap"
          stat="Missing"
          description="Students lack access to real ocean data and shark science curriculum"
          color="from-purple-500 to-pink-500"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 p-6 bg-slate-800/30 border border-white/10 rounded-2xl"
      >
        <p className="text-xl text-gray-300">
          <span className="text-white font-semibold">The problem:</span> We lack the tools to
          predict shark behavior and the educational resources to teach ocean conservation to the
          next generation.
        </p>
      </motion.div>
    </div>
  )
}

// Slide 4: Our Solution
function SolutionSlide() {
  return (
    <div className="text-center max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="text-7xl mb-6">💡</div>
        <h2 className="text-5xl font-extrabold text-white mb-4">Our Solution</h2>
        <p className="text-xl text-gray-400">
          A free, open-source platform combining education with ML forecasting
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <SolutionCard
          icon="🎓"
          number="1"
          title="Interactive Lessons"
          description="4 complete NGSS-aligned lessons teaching ocean science with real NASA data"
          gradient="from-purple-500 to-pink-500"
        />
        <SolutionCard
          icon="📊"
          number="2"
          title="ML Forecasting"
          description="Real-time predictions of shark foraging hotspots using NASA satellite data"
          gradient="from-blue-500 to-cyan-500"
        />
        <SolutionCard
          icon="🔬"
          number="3"
          title="Bio-Sensor Design"
          description="Student-led engineering challenges to validate predictions with real tags"
          gradient="from-green-500 to-emerald-500"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 mt-8"
      >
        <Badge text="100% Free" icon="✨" />
        <Badge text="Open Source" icon="🌐" />
        <Badge text="NGSS Aligned" icon="🎯" />
        <Badge text="For Students" icon="🎓" />
      </motion.div>
    </div>
  )
}

// Slide 5: Mission
function MissionSlide() {
  return (
    <div className="text-center max-w-4xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="text-8xl mb-8">🎯</div>
        <h2 className="text-6xl font-extrabold text-white mb-6">Our Mission</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-8"
      >
        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
          Learn • Predict • Protect
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-6">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-white mb-2">Learn</h3>
            <p className="text-gray-400">
              Empower 10,000+ students worldwide with ocean science education
            </p>
          </div>

          <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Predict</h3>
            <p className="text-gray-400">
              Use NASA satellite data to forecast shark behavior in real-time
            </p>
          </div>

          <div className="bg-slate-800/30 border border-white/10 rounded-2xl p-6">
            <div className="text-4xl mb-4">🦈</div>
            <h3 className="text-xl font-bold text-white mb-2">Protect</h3>
            <p className="text-gray-400">
              Enable coexistence between humans and apex predators through knowledge
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="p-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 rounded-2xl"
        >
          <p className="text-2xl text-white font-semibold mb-4">Ready to dive in?</p>
          <p className="text-lg text-gray-300">
            Explore interactive forecasting tools, learn ocean science, and join a global community
            protecting our oceans using NASA's eyes in space.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Helper Components
function ProblemCard({ icon, title, stat, description, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-800/50 border border-white/10 rounded-2xl p-6"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <div
        className={`text-4xl font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}
      >
        {stat}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}

function SolutionCard({ icon, number, title, description, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * parseInt(number) }}
      className="relative bg-slate-800/50 border border-white/10 rounded-2xl p-6 overflow-hidden group hover:border-white/30 transition-all"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}
      ></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="text-5xl">{icon}</div>
          <div
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold`}
          >
            {number}
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  )
}

function Badge({ text, icon }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full">
      <span>{icon}</span>
      <span className="text-white font-semibold text-sm">{text}</span>
    </div>
  )
}
