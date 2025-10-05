// Enhanced interactive lesson content components
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
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
} from 'recharts'

// ============================================================================
// LESSON 1: How Satellites Track Ocean Life
// ============================================================================
export function Lesson1Content() {
  const [selectedTerm, setSelectedTerm] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [guessedZones, setGuessedZones] = useState([])

  // Interactive definitions
  const terms = {
    chlorophyll: {
      word: 'chlorophyll',
      definition:
        'A green pigment found in plants and algae that captures sunlight for photosynthesis. Satellites detect it to measure ocean productivity.',
      color: 'green',
    },
    eddies: {
      word: 'eddies',
      definition:
        'Swirling ocean currents that can be hundreds of kilometers wide. They trap nutrients and prey, creating hunting hotspots for sharks.',
      color: 'blue',
    },
    upwelling: {
      word: 'upwelling',
      definition:
        'When deep, cold, nutrient-rich water rises to the surface. This creates highly productive zones where marine life thrives.',
      color: 'cyan',
    },
    'thermal fronts': {
      word: 'thermal fronts',
      definition:
        'Boundaries between warm and cold water masses. Prey often concentrates along these fronts, attracting predators like sharks.',
      color: 'red',
    },
  }

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer })
  }

  const checkQuiz = () => {
    setShowResults(true)
  }

  const correctAnswers = {
    q1: 'B',
    q2: 'a',
  }

  const allAnswered = Object.keys(correctAnswers).every((q) => quizAnswers[q])

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-purple-500/20 border border-blue-500/30 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          🛰️ How Satellites Predict Shark Movement
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Satellites help predict shark movement by monitoring the ocean conditions that influence
          where sharks hunt and travel. By measuring factors such as sea surface temperature,{' '}
          <ClickableWord
            term="chlorophyll"
            onClick={() => setSelectedTerm('chlorophyll')}
            color="green"
          />{' '}
          concentration (which indicates plankton and therefore prey abundance, since fish prey on
          plankton), and sea surface height anomalies (which reveal ocean currents and{' '}
          <ClickableWord term="eddies" onClick={() => setSelectedTerm('eddies')} color="blue" />
          ), scientists can identify regions where food is likely to be concentrated.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mt-4">
          Sharks often follow these productive areas, especially along{' '}
          <ClickableWord
            term="thermal fronts"
            onClick={() => setSelectedTerm('thermal fronts')}
            color="red"
          />{' '}
          or{' '}
          <ClickableWord
            term="upwelling"
            onClick={() => setSelectedTerm('upwelling')}
            color="cyan"
          />{' '}
          zones, where prey gather. Combining satellite data with GPS-tagged shark tracking allows
          researchers to find patterns between environmental changes and shark movements, helping
          predict when and where sharks are likely to forage or migrate next.
        </p>
      </motion.div>

      {/* Definition popup */}
      <AnimatePresence>
        {selectedTerm && terms[selectedTerm] && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-slate-800/95 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className={`text-2xl font-bold text-${terms[selectedTerm].color}-400 capitalize`}>
                {terms[selectedTerm].word}
              </h3>
              <button
                onClick={() => setSelectedTerm(null)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-gray-300 text-lg">{terms[selectedTerm].definition}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NASA SWOT Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            1
          </div>
          <h3 className="text-2xl font-bold text-white">Meet NASA SWOT Mission</h3>
        </div>
        <p className="text-gray-300 text-lg mb-6">
          The Surface Water and Ocean Topography (SWOT) mission launched in December 2022. It
          measures sea surface height with unprecedented accuracy, detecting underwater features
          that sharks use for hunting.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">±2cm</div>
            <div className="text-sm text-gray-400">Height measurement accuracy</div>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-cyan-400 mb-2">120km</div>
            <div className="text-sm text-gray-400">Swath width coverage</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">21 days</div>
            <div className="text-sm text-gray-400">Complete Earth coverage</div>
          </div>
        </div>
      </motion.div>

      {/* Quiz Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">📝 Test Your Knowledge</h3>

        {/* Question 1 */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <p className="text-white text-lg font-semibold mb-4">
            1. What does chlorophyll concentration (detected from space) tell scientists?
          </p>
          <div className="space-y-3">
            {['A', 'B', 'C', 'D'].map((option) => {
              const labels = {
                A: 'The number of sharks in an area',
                B: 'The productivity of the water (how much plankton is present)',
                C: 'The salinity of the ocean',
                D: 'The temperature below 1000 m',
              }
              const isSelected = quizAnswers.q1 === option
              const isCorrect = option === correctAnswers.q1
              const showFeedback = showResults && isSelected

              return (
                <button
                  key={option}
                  onClick={() => handleQuizAnswer('q1', option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? showFeedback
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-red-500 bg-red-500/20'
                        : 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-slate-700/30 hover:border-white/30'
                  }`}
                >
                  <span className="text-white font-semibold">{option}.</span>{' '}
                  <span className="text-gray-300">{labels[option]}</span>
                  {showFeedback && isCorrect && (
                    <span className="ml-2 text-green-400">✓ Correct!</span>
                  )}
                  {showFeedback && !isCorrect && (
                    <span className="ml-2 text-red-400">✗ Incorrect</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Question 2 */}
        <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
          <p className="text-white text-lg font-semibold mb-4">
            2. You see a satellite map showing a patch of warm water with high chlorophyll
            concentration. Where is a shark most likely to be foraging?
          </p>
          <div className="space-y-3">
            {['a', 'b', 'c'].map((option) => {
              const labels = {
                a: 'In the patch, but generally there is a time delay',
                b: 'Far from the patch',
                c: 'At the ocean floor',
              }
              const isSelected = quizAnswers.q2 === option
              const isCorrect = option === correctAnswers.q2
              const showFeedback = showResults && isSelected

              return (
                <button
                  key={option}
                  onClick={() => handleQuizAnswer('q2', option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? showFeedback
                        ? isCorrect
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-red-500 bg-red-500/20'
                        : 'border-blue-500 bg-blue-500/10'
                      : 'border-white/10 bg-slate-700/30 hover:border-white/30'
                  }`}
                >
                  <span className="text-white font-semibold">{option})</span>{' '}
                  <span className="text-gray-300">{labels[option]}</span>
                  {showFeedback && isCorrect && (
                    <span className="ml-2 text-green-400">✓ Correct!</span>
                  )}
                  {showFeedback && !isCorrect && (
                    <span className="ml-2 text-red-400">✗ Incorrect</span>
                  )}
                </button>
              )
            })}
          </div>
          {showResults && quizAnswers.q2 === 'a' && (
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-blue-300 text-sm">
                <strong>Explanation:</strong> There's typically a time delay between when
                phytoplankton blooms appear and when sharks arrive. First, the plankton attracts
                small fish, then those fish attract larger fish, and finally sharks come to hunt the
                larger fish. This cascade can take days to weeks!
              </p>
            </div>
          )}
        </div>

        {!showResults && (
          <button
            onClick={checkQuiz}
            disabled={!allAnswered}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              allAnswered
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            {allAnswered ? 'Check Answers' : 'Answer all questions to continue'}
          </button>
        )}

        {showResults && (
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              Score:{' '}
              {
                Object.keys(correctAnswers).filter((q) => quizAnswers[q] === correctAnswers[q])
                  .length
              }
              /{Object.keys(correctAnswers).length}
            </div>
            <button
              onClick={() => {
                setQuizAnswers({})
                setShowResults(false)
              }}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </motion.div>

      {/* Interactive Map Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">🗺️ Interactive Map Activity</h3>
        <p className="text-gray-300 mb-6">
          Explore simulated satellite maps showing sea surface temperature, chlorophyll, and
          currents. Click on different ocean regions to predict where sharks might hunt!
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Eddy Map */}
          <div className="bg-slate-900/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">Ocean Eddies (Sea Surface Height)</h4>
            <div className="aspect-square bg-gradient-to-br from-blue-900 via-cyan-800 to-blue-900 rounded-lg relative overflow-hidden">
              {/* Simulated eddy visualization */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/30 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-blue-500/40 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-cyan-500/30 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/50 text-sm text-center">
                  Warm eddies (red) and cold eddies (blue)
                  <br />
                  create swirling currents
                </div>
              </div>
            </div>
          </div>

          {/* Shark Probability Map */}
          <div className="bg-slate-900/50 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-3">Shark Foraging Probability</h4>
            <div className="aspect-square bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 rounded-lg relative overflow-hidden">
              {/* Simulated shark probability */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/40 rounded-full blur-2xl"></div>
              <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-green-500/50 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-yellow-500/30 rounded-full blur-2xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/50 text-sm text-center">
                  High probability zones (green/yellow)
                  <br />
                  align with eddy edges
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <p className="text-blue-300 mb-4">
            <strong>Pattern Recognition:</strong> Notice how the high shark probability zones
            (green/yellow on the right) tend to appear near the edges of ocean eddies (swirls on the
            left)? This is because eddies concentrate prey at their boundaries, creating ideal
            hunting grounds for sharks!
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-gray-300">Warm Eddy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Cold Eddy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-gray-300">High Shark Probability</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Temperature and Sharks */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">🌡️ Temperature Preferences</h3>
        <p className="text-gray-300 mb-6">
          Different shark species prefer different water temperatures. Great white sharks, for
          example, typically hunt in waters between 12-24°C, with optimal foraging around 18-20°C.
        </p>
        <TemperatureChart />
      </motion.div>
    </div>
  )
}

// ============================================================================
// LESSON 2: The Shark Foraging Index
// ============================================================================
export function Lesson2Content() {
  const [tempOptimal, setTempOptimal] = useState(20)
  const [tempSensitivity, setTempSensitivity] = useState(5)
  const [sshaValue, setSshaValue] = useState(0.15)
  const [chlorophyllValue, setChlorophyllValue] = useState(2)
  const [timeDelay, setTimeDelay] = useState(7)
  const [lapseRate, setLapseRate] = useState(0.02)
  const [thermoclineDepth, setThermoclineDepth] = useState(100)
  const [depthVariability, setDepthVariability] = useState(50)

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          🧮 Understanding the Shark Foraging Index
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          The ocean is a complex, living system — and sharks depend on it to find food. To predict
          where sharks might be foraging, scientists look at environmental indicators — measurable
          properties of the ocean that affect where prey lives and how sharks move.
        </p>
      </motion.div>

      {/* Environmental Layers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">
          🌊 Three Main Environmental Indicators
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-xl p-6">
            <div className="text-4xl mb-3">🌡️</div>
            <h4 className="text-xl font-bold text-white mb-2">Temperature (T)</h4>
            <p className="text-gray-300 text-sm">
              Sharks prefer certain water temperatures depending on their species. Temperature
              suitability affects their hunting efficiency and metabolic rate.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
            <div className="text-4xl mb-3">🌀</div>
            <h4 className="text-xl font-bold text-white mb-2">Eddy Energy (E)</h4>
            <p className="text-gray-300 text-sm">
              Swirling ocean currents (eddies) bring nutrients upward, concentrating prey. Measured
              by sea surface height anomalies.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
            <div className="text-4xl mb-3">🌿</div>
            <h4 className="text-xl font-bold text-white mb-2">Prey Availability (Bp)</h4>
            <p className="text-gray-300 text-sm">
              Areas rich in microscopic plants (phytoplankton) usually support more fish and thus
              attract sharks. Measured by chlorophyll concentration.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Data Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">📡 From Satellites to Predictions</h3>
        <p className="text-gray-300 mb-6">
          To study the ocean, scientists don't dive in every day — they use satellites and ocean
          reanalysis models. Here's the data pipeline:
        </p>

        <div className="space-y-4">
          <DataPipelineStep
            number="1"
            title="Collect Raw Data"
            items={[
              'Sea Surface Temperature (SST) → from infrared satellite sensors',
              'Sea Surface Height Anomaly (SSHA) → from radar altimeters',
              'Chlorophyll concentration → from ocean color satellites (MODIS, PACE)',
            ]}
          />
          <DataPipelineStep
            number="2"
            title="Process into Maps"
            items={[
              'Each dataset is turned into a map of the ocean grid',
              'Latitude, longitude, and time dimensions',
              'Quality control and gap filling',
            ]}
          />
          <DataPipelineStep
            number="3"
            title="Compute Indicators"
            items={[
              'Transform raw data into habitat suitability metrics',
              'Apply physical and biological models',
              'Generate 3D predictions with depth scaling',
            ]}
          />
        </div>
      </motion.div>

      {/* Temperature Suitability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          (a) Temperature Suitability — Tₛ(x,y,t)
        </h3>
        <p className="text-gray-300 mb-6">
          Sharks tend to forage where temperatures are close to their preferred range. We use a
          Gaussian function that rewards "comfortable" temperatures and penalizes extremes.
        </p>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-lg text-gray-400 mb-2">Formula:</div>
            <div className="text-xl font-mono text-cyan-400">Tₛ = exp(-(T - T_opt)² / (2σ²))</div>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Where T_opt is the optimal temperature and σ controls sensitivity to temperature changes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-white font-semibold mb-2 block">
              Optimal Temperature (T_opt): {tempOptimal}°C
            </label>
            <input
              type="range"
              min="10"
              max="30"
              value={tempOptimal}
              onChange={(e) => setTempOptimal(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">
              Temperature Sensitivity (σ): {tempSensitivity}°C
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={tempSensitivity}
              onChange={(e) => setTempSensitivity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <TemperatureSuitabilityChart tempOptimal={tempOptimal} tempSensitivity={tempSensitivity} />
      </motion.div>

      {/* Eddy Current Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          (b) Eddy Current Indicator — E(x,y,t)
        </h3>
        <p className="text-gray-300 mb-6">
          Eddies (swirling ocean features) can trap nutrients and prey. We detect them from Sea
          Surface Height Anomalies (SSHA) — when the sea surface bulges or dips, it signals rotating
          currents.
        </p>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-lg text-gray-400 mb-2">Simplified Formula:</div>
            <div className="text-xl font-mono text-cyan-400">E ∝ |∇²SSHA|</div>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Proportional to the curvature (Laplacian) of sea surface height — high curvature means
            strong circular motion → more mixing → more prey
          </p>
        </div>

        <div className="mb-6">
          <label className="text-white font-semibold mb-2 block">
            Sea Surface Height Anomaly: {sshaValue.toFixed(2)} m
          </label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={sshaValue}
            onChange={(e) => setSshaValue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Eddy Energy Indicator</div>
            <div className="text-4xl font-bold text-blue-400 mb-2">
              {(sshaValue * 10).toFixed(2)}
            </div>
            <p className="text-gray-300 text-sm">
              {sshaValue > 0.3
                ? 'Strong eddy activity - high prey concentration expected'
                : sshaValue > 0.15
                ? 'Moderate eddy activity'
                : 'Weak eddy activity'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Prey Availability */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">(c) Prey Availability — Bₚ(x,y,t)</h3>
        <p className="text-gray-300 mb-6">
          Phytoplankton (measured via chlorophyll concentration) supports the whole marine food web.
          Higher chlorophyll = more plankton = more small fish = more prey for sharks.
        </p>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-lg text-gray-400 mb-2">Formula with time delay:</div>
            <div className="text-xl font-mono text-cyan-400">
              Bₚ(t) = C(t - Δt) × scaling_factor
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Where C is chlorophyll concentration and Δt accounts for the time it takes for the food
            chain to propagate from plankton to shark prey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-white font-semibold mb-2 block">
              Chlorophyll Concentration: {chlorophyllValue.toFixed(1)} mg/m³
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={chlorophyllValue}
              onChange={(e) => setChlorophyllValue(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-white font-semibold mb-2 block">
              Time Delay: {timeDelay} days
            </label>
            <input
              type="range"
              min="0"
              max="30"
              value={timeDelay}
              onChange={(e) => setTimeDelay(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Prey Availability Score</div>
            <div className="text-4xl font-bold text-green-400 mb-2">
              {Math.min(chlorophyllValue / 10, 1).toFixed(2)}
            </div>
            <p className="text-gray-300 text-sm">
              {chlorophyllValue > 5
                ? 'High productivity - abundant prey expected in ' + timeDelay + ' days'
                : chlorophyllValue > 2
                ? 'Moderate productivity'
                : 'Low productivity'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Combining Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">🎯 Combining the Indicators</h3>
        <p className="text-gray-300 mb-6">
          We combine these three indicators using weighted coefficients to compute the Shark
          Foraging Index (SFI):
        </p>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-2xl font-mono text-white">
              SFI(x,y,t) = w_T × Tₛ + w_E × E + w_B × Bₚ
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">30%</div>
              <div className="text-sm text-gray-400">Temperature weight (w_T)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">25%</div>
              <div className="text-sm text-gray-400">Eddy weight (w_E)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">45%</div>
              <div className="text-sm text-gray-400">Prey weight (w_B)</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <p className="text-blue-300 text-sm">
            <strong>Why these weights?</strong> Prey availability gets the highest weight (45%)
            because sharks ultimately follow food. Temperature (30%) is crucial for metabolic
            efficiency. Eddies (25%) create opportunities but aren't always necessary for foraging.
            These weights can be tuned based on species and region!
          </p>
        </div>
      </motion.div>

      {/* Depth Scaling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">📏 Scaling to 3D: Adding Depth</h3>
        <p className="text-gray-300 mb-6">
          So far, our maps are only 2D — the ocean surface. But sharks hunt in 3D, diving to
          different depths. We estimate how conditions change with depth using physical assumptions.
        </p>

        <div className="mb-8">
          <h4 className="text-xl font-bold text-white mb-4">Temperature decreases with depth</h4>
          <p className="text-gray-300 mb-4">T(z) ≈ T_surface - Γ × z</p>
          <p className="text-gray-400 text-sm mb-4">
            Where Γ is the vertical temperature gradient (lapse rate)
          </p>

          <div className="mb-6">
            <label className="text-white font-semibold mb-2 block">
              Temperature Lapse Rate (Γ): {lapseRate.toFixed(3)} °C/m
            </label>
            <input
              type="range"
              min="0.005"
              max="0.05"
              step="0.001"
              value={lapseRate}
              onChange={(e) => setLapseRate(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <DepthTemperatureChart lapseRate={lapseRate} />
        </div>

        <div>
          <h4 className="text-xl font-bold text-white mb-4">
            Prey and eddy effects fade with depth
          </h4>
          <p className="text-gray-300 mb-4">K_E(z) = exp(-(z - z_thermocline)² / (2σ_z²))</p>
          <p className="text-gray-400 text-sm mb-4">
            Centered around thermocline depth where nutrients and prey concentrate
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-white font-semibold mb-2 block">
                Thermocline Depth: {thermoclineDepth} m
              </label>
              <input
                type="range"
                min="50"
                max="300"
                value={thermoclineDepth}
                onChange={(e) => setThermoclineDepth(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-white font-semibold mb-2 block">
                Depth Variability (σ_z): {depthVariability} m
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={depthVariability}
                onChange={(e) => setDepthVariability(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          <DepthScalingChart
            thermoclineDepth={thermoclineDepth}
            depthVariability={depthVariability}
          />
        </div>

        <div className="mt-6 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
          <p className="text-cyan-300 text-sm">
            <strong>Key Insight:</strong> These assumptions allow us to predict the foraging depth —
            the most likely vertical layer where sharks will feed — even without full 3D ocean data.
            The thermocline (where temperature changes rapidly) is often where prey concentrates!
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// LESSON 3: Ocean Food Webs
// ============================================================================
export function Lesson3Content() {
  const [foodChain, setFoodChain] = useState([])
  const [availableOrganisms, setAvailableOrganisms] = useState([
    { id: 'phytoplankton', name: 'Phytoplankton', emoji: '🦠', level: 1 },
    { id: 'zooplankton', name: 'Zooplankton', emoji: '🦐', level: 2 },
    { id: 'small-fish', name: 'Small Fish', emoji: '🐟', level: 3 },
    { id: 'large-fish', name: 'Large Fish', emoji: '🐠', level: 4 },
    { id: 'shark', name: 'Shark', emoji: '🦈', level: 5 },
  ])
  const [isCorrect, setIsCorrect] = useState(null)

  const handleDragStart = (e, organism) => {
    e.dataTransfer.setData('organism', JSON.stringify(organism))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const organism = JSON.parse(e.dataTransfer.getData('organism'))
    if (!foodChain.find((o) => o.id === organism.id)) {
      setFoodChain([...foodChain, organism])
      setAvailableOrganisms(availableOrganisms.filter((o) => o.id !== organism.id))
    }
    setIsCorrect(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const removeFromChain = (organism) => {
    setFoodChain(foodChain.filter((o) => o.id !== organism.id))
    setAvailableOrganisms([...availableOrganisms, organism].sort((a, b) => a.level - b.level))
    setIsCorrect(null)
  }

  const checkAnswer = () => {
    const correctOrder = ['phytoplankton', 'zooplankton', 'small-fish', 'large-fish', 'shark']
    const userOrder = foodChain.map((o) => o.id)
    setIsCorrect(JSON.stringify(correctOrder) === JSON.stringify(userOrder))
  }

  const resetActivity = () => {
    setFoodChain([])
    setAvailableOrganisms([
      { id: 'phytoplankton', name: 'Phytoplankton', emoji: '🦠', level: 1 },
      { id: 'zooplankton', name: 'Zooplankton', emoji: '🦐', level: 2 },
      { id: 'small-fish', name: 'Small Fish', emoji: '🐟', level: 3 },
      { id: 'large-fish', name: 'Large Fish', emoji: '🐠', level: 4 },
      { id: 'shark', name: 'Shark', emoji: '🦈', level: 5 },
    ])
    setIsCorrect(null)
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20 border border-green-500/30 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">🌊 Ocean Food Webs</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          The ocean food web begins with tiny organisms called phytoplankton - microscopic plants
          that use sunlight to make energy through photosynthesis. Energy flows up the food chain
          from these primary producers all the way to apex predators like sharks!
        </p>
      </motion.div>

      {/* Sunlight and Phytoplankton */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            ☀️
          </div>
          <h3 className="text-2xl font-bold text-white">It All Starts with Sunlight</h3>
        </div>
        <p className="text-gray-300 text-lg mb-6">
          Phytoplankton are microscopic algae that float near the ocean surface. They use sunlight,
          carbon dioxide, and nutrients to create energy through photosynthesis - just like plants
          on land!
        </p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-yellow-300">
            <strong>🌟 Amazing Fact:</strong> Phytoplankton produce more than 50% of Earth's oxygen
            - more than all forests combined! Every other breath you take comes from these tiny
            ocean organisms.
          </p>
        </div>
      </motion.div>

      {/* Drag and Drop Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">🎮 Build the Food Chain</h3>
        <p className="text-gray-300 mb-6">
          Drag and drop the organisms in the correct order, from the bottom of the food chain to the
          top!
        </p>

        {/* Available organisms */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3">Available Organisms:</h4>
          <div className="flex flex-wrap gap-3">
            {availableOrganisms.map((organism) => (
              <div
                key={organism.id}
                draggable
                onDragStart={(e) => handleDragStart(e, organism)}
                className="bg-slate-700/50 border border-white/20 rounded-xl p-4 cursor-move hover:bg-slate-700 transition-all"
              >
                <div className="text-4xl mb-2 text-center">{organism.emoji}</div>
                <div className="text-white text-sm text-center">{organism.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-slate-900/50 border-2 border-dashed border-blue-500/50 rounded-xl p-6 min-h-[200px]"
        >
          <h4 className="text-white font-semibold mb-4 text-center">
            Your Food Chain (Bottom to Top):
          </h4>
          {foodChain.length === 0 ? (
            <p className="text-gray-400 text-center">Drop organisms here to build the food chain</p>
          ) : (
            <div className="space-y-3">
              {foodChain.map((organism, index) => (
                <div key={organism.id}>
                  <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{organism.emoji}</div>
                      <div>
                        <div className="text-white font-semibold">{organism.name}</div>
                        <div className="text-gray-400 text-sm">Level {organism.level}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromChain(organism)}
                      className="text-red-400 hover:text-red-300 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  {index < foodChain.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="text-gray-500 text-xl">↑ eats ↑</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Check button */}
        {foodChain.length === 5 && (
          <div className="mt-6 text-center">
            <button
              onClick={checkAnswer}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all"
            >
              Check My Answer
            </button>
          </div>
        )}

        {/* Feedback */}
        {isCorrect !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 rounded-xl border-2 ${
              isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500'
            }`}
          >
            {isCorrect ? (
              <div>
                <div className="text-2xl font-bold text-green-400 mb-2">🎉 Correct! Well done!</div>
                <p className="text-green-300">
                  You've successfully arranged the ocean food chain. Energy flows from the sun to
                  phytoplankton, then up through each level to reach apex predators like sharks!
                </p>
              </div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-red-400 mb-2">Not quite right!</div>
                <p className="text-red-300 mb-4">
                  Think about what each organism eats. Start with the smallest organisms that make
                  their own food, and work your way up to the largest predators.
                </p>
                <button
                  onClick={resetActivity}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Why This Matters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">🔬 Why This Matters for Sharks</h3>
        <p className="text-gray-300 text-lg mb-6">
          By tracking phytoplankton (Level 1) with satellites, we can predict where Level 5 sharks
          will be! Here's how:
        </p>

        <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="text-lg font-mono text-cyan-400">
              Satellite → Chlorophyll → Phytoplankton → Zooplankton → Small Fish → Large Fish →
              Sharks
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📡</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Step 1: Satellite Detection</h4>
              <p className="text-gray-300 text-sm">
                NASA's MODIS and PACE satellites measure chlorophyll-a concentration by detecting
                green light reflected from the ocean surface.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-3xl">🦠</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Step 2: Phytoplankton Blooms</h4>
              <p className="text-gray-300 text-sm">
                High chlorophyll indicates phytoplankton blooms - areas where microscopic algae are
                thriving and producing oxygen.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-3xl">🐟</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Step 3: Food Chain Cascade</h4>
              <p className="text-gray-300 text-sm">
                Zooplankton eat the phytoplankton, small fish eat the zooplankton, large fish eat
                the small fish - energy flows up the chain!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-3xl">🦈</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Step 4: Shark Prediction</h4>
              <p className="text-gray-300 text-sm">
                After a time delay (typically 1-3 weeks), sharks arrive to hunt the large fish that
                have concentrated in these productive areas.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Energy Transfer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-4">⚡ Energy Transfer Efficiency</h3>
        <p className="text-gray-300 mb-6">
          Only about 10% of energy is transferred from one level to the next. This is why it takes a
          LOT of phytoplankton to support just one shark!
        </p>

        <div className="space-y-3">
          <EnergyBar level="Phytoplankton" energy={100} color="green" />
          <EnergyBar level="Zooplankton" energy={10} color="blue" />
          <EnergyBar level="Small Fish" energy={1} color="cyan" />
          <EnergyBar level="Large Fish" energy={0.1} color="purple" />
          <EnergyBar level="Sharks" energy={0.01} color="red" />
        </div>

        <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-yellow-300">
            <strong>💡 Key Insight:</strong> It takes approximately 10,000 kg of phytoplankton to
            produce 1 kg of shark! This is why protecting the entire food web is crucial for shark
            conservation.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ============================================================================
// LESSON 4: Bio-Sensor Technology
// ============================================================================
export function Lesson4Content() {
  const [selectedComponents, setSelectedComponents] = useState({
    phProbe: false,
    ammoniaSensor: false,
    membrane: false,
    transducer: false,
    battery: false,
    casing: false,
  })

  const [designScore, setDesignScore] = useState(null)

  const components = {
    phProbe: {
      name: 'pH Probe',
      description: 'Measures stomach acidity to detect feeding events',
      required: true,
      emoji: '🔬',
    },
    ammoniaSensor: {
      name: 'Ammonia Sensor',
      description: 'Detects NH₄⁺ levels to identify prey type',
      required: true,
      emoji: '🧪',
    },
    membrane: {
      name: 'Semipermeable Membrane (ePTFE)',
      description: 'Converts ammonium ions to gas phase',
      required: true,
      emoji: '🧬',
    },
    transducer: {
      name: 'Piezoelectric Transducer',
      description: 'Sends acoustic signals to external tag',
      required: true,
      emoji: '📡',
    },
    battery: {
      name: 'Lithium Battery',
      description: 'Powers the sensor for extended periods',
      required: true,
      emoji: '🔋',
    },
    casing: {
      name: 'Biocompatible Casing',
      description: 'Delrin exterior with epoxy coating',
      required: true,
      emoji: '🛡️',
    },
  }

  const toggleComponent = (key) => {
    setSelectedComponents({ ...selectedComponents, [key]: !selectedComponents[key] })
    setDesignScore(null)
  }

  const evaluateDesign = () => {
    const requiredComponents = Object.keys(components).filter((key) => components[key].required)
    const selectedRequired = requiredComponents.filter((key) => selectedComponents[key])
    const score = (selectedRequired.length / requiredComponents.length) * 100
    setDesignScore(score)
  }

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-red-500/20 border border-purple-500/30 rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white mb-4">🔬 Bio-Sensor Technology</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          Sharks can be monitored using two complementary types of tags. The dorsal fin tag measures
          environmental and behavioral data, while the gastric tag records internal digestive
          conditions to understand feeding habits and diet.
        </p>
      </motion.div>

      {/* The Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            ❗
          </div>
          <h3 className="text-2xl font-bold text-white">The Challenge</h3>
        </div>
        <p className="text-gray-300 text-lg mb-6">
          Current shark tags track WHERE sharks go, but not WHAT they eat. We need to validate our
          predictions by knowing when sharks actually feed and what prey they consume!
        </p>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <p className="text-red-300">
            <strong>Problem:</strong> Traditional tags can't tell if a shark is hunting, resting, or
            just swimming through an area. We need real-time feeding data to improve our
            predictions.
          </p>
        </div>
      </motion.div>

      {/* Gastric Sensor Package */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">💊 Gastric Sensor Package</h3>
        <p className="text-gray-300 mb-6">
          A pill-shaped capsule that attaches to the stomach wall inside the shark, similar to how
          acoustic tags are implanted. This sensor package consists of several key components:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="text-4xl mb-3">🔬</div>
            <h4 className="text-xl font-bold text-white mb-2">pH Probe</h4>
            <p className="text-gray-300 text-sm">
              Regularly checks the ambient acidity of the stomach environment. A sustained spike in
              pH indicates a "feeding event" and activates the ammonia sensor.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="text-4xl mb-3">🧪</div>
            <h4 className="text-xl font-bold text-white mb-2">Ammonia Sensor</h4>
            <p className="text-gray-300 text-sm">
              Activated during digestion to measure NH₄⁺ levels. Protein-rich prey releases more
              ammonia, allowing us to classify different food sources (fish vs. squid vs. seal).
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="text-4xl mb-3">🧬</div>
            <h4 className="text-xl font-bold text-white mb-2">Semipermeable Membrane</h4>
            <p className="text-gray-300 text-sm">
              ePTFE membrane converts ammonium ions in the stomach to gas phase ammonia, which can
              be more easily detected by the sensor.
            </p>
          </div>

          <div className="bg-slate-900/50 rounded-xl p-6">
            <div className="text-4xl mb-3">📡</div>
            <h4 className="text-xl font-bold text-white mb-2">Piezoelectric Transducer</h4>
            <p className="text-gray-300 text-sm">
              Sends acoustic signals over short range underwater to the external dorsal tag, which
              then transmits data to satellites.
            </p>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">⚙️ How It Works</h3>

        <div className="space-y-4">
          <WorkflowStep
            number="1"
            title="Deployment"
            description="Shark swallows capsule hidden in bait fish during tagging procedure"
            color="blue"
          />
          <WorkflowStep
            number="2"
            title="Attachment"
            description="Capsule attaches to stomach wall using biocompatible adhesive"
            color="cyan"
          />
          <WorkflowStep
            number="3"
            title="Monitoring"
            description="pH sensor continuously monitors stomach acidity levels"
            color="purple"
          />
          <WorkflowStep
            number="4"
            title="Detection"
            description="Feeding event detected when pH spikes above threshold"
            color="pink"
          />
          <WorkflowStep
            number="5"
            title="Analysis"
            description="Ammonia sensor activates to analyze prey composition"
            color="green"
          />
          <WorkflowStep
            number="6"
            title="Transmission"
            description="Data sent via acoustic signal to external dorsal tag"
            color="red"
          />
        </div>
      </motion.div>

      {/* Dorsal Tag */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">🏷️ External Dorsal Tag</h3>
        <p className="text-gray-300 mb-6">
          Our dorsal tag adopts a hydrodynamic design similar to other SPOT (Smart Position or
          Temperature) tags. It collects data from both internal sensors and its own environmental
          sensors.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🎤</div>
            <h4 className="text-white font-semibold mb-2">Hydrophone</h4>
            <p className="text-gray-300 text-sm">
              Receives acoustic data from the gastric sensor package
            </p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-6">
            <div className="text-3xl mb-3">🌡️</div>
            <h4 className="text-white font-semibold mb-2">Temperature Sensor</h4>
            <p className="text-gray-300 text-sm">Measures water temperature at shark's depth</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
            <div className="text-3xl mb-3">📊</div>
            <h4 className="text-white font-semibold mb-2">Pressure Sensor</h4>
            <p className="text-gray-300 text-sm">Tracks diving depth and behavior patterns</p>
          </div>
        </div>
      </motion.div>

      {/* Materials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">🔧 Materials Selection</h3>
        <p className="text-gray-300 mb-6">
          Careful material selection ensures durability, biocompatibility, and long-term
          functionality in harsh marine environments.
        </p>

        <div className="space-y-4">
          <MaterialCard
            name="Delrin Exterior"
            properties="High durability, chemical resistance, low friction"
            use="Main casing for both gastric and dorsal tags"
          />
          <MaterialCard
            name="Epoxy Coating"
            properties="Waterproof seal, biocompatible, corrosion resistant"
            use="Protective layer over electronics"
          />
          <MaterialCard
            name="Lithium-Thionyl Chloride Cells"
            properties="High energy density, long shelf life, wide temperature range"
            use="Primary power source for extended deployments"
          />
          <MaterialCard
            name="ePTFE Membrane"
            properties="Selective permeability, chemical inert, durable"
            use="Gas conversion in ammonia sensor"
          />
          <MaterialCard
            name="Stainless Steel Alloy"
            properties="Corrosion resistant, strong, biocompatible"
            use="Fasteners and attachment points"
          />
        </div>
      </motion.div>

      {/* Design Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">🎨 Your Design Challenge</h3>
        <p className="text-gray-300 mb-6">
          Select the components you would include in your gastric tag design. Consider
          functionality, durability, and feasibility!
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {Object.entries(components).map(([key, component]) => (
            <button
              key={key}
              onClick={() => toggleComponent(key)}
              className={`p-6 rounded-xl border-2 transition-all text-left ${
                selectedComponents[key]
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-slate-800/50 border-white/10 hover:border-white/30'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{component.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-semibold">{component.name}</h4>
                    {selectedComponents[key] && <span className="text-green-400">✓</span>}
                  </div>
                  <p className="text-gray-300 text-sm">{component.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={evaluateDesign}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all"
          >
            Evaluate My Design
          </button>
        </div>

        {designScore !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`mt-6 p-6 rounded-xl border-2 ${
              designScore === 100
                ? 'bg-green-500/20 border-green-500'
                : 'bg-yellow-500/20 border-yellow-500'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{designScore}%</div>
              <p className="text-gray-300 mb-4">
                {designScore === 100
                  ? '🎉 Perfect! You included all essential components for a functional gastric tag.'
                  : `You included ${Object.values(selectedComponents).filter(Boolean).length}/${
                      Object.keys(components).length
                    } components. All components are essential for full functionality!`}
              </p>
              {designScore < 100 && (
                <p className="text-yellow-300 text-sm">
                  Hint: Each component plays a crucial role in detecting, analyzing, and
                  transmitting feeding data.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function ClickableWord({ term, onClick, color }) {
  const colorMap = {
    green: 'text-green-400 hover:text-green-300 border-green-400',
    blue: 'text-blue-400 hover:text-blue-300 border-blue-400',
    cyan: 'text-cyan-400 hover:text-cyan-300 border-cyan-400',
    red: 'text-red-400 hover:text-red-300 border-red-400',
  }

  return (
    <button
      onClick={onClick}
      className={`${colorMap[color]} border-b-2 border-dotted font-semibold cursor-help transition-colors`}
    >
      {term}
    </button>
  )
}

function TemperatureChart() {
  const data = Array.from({ length: 30 }, (_, i) => {
    const temp = i + 5
    const greatWhite = Math.exp(-Math.pow(temp - 18, 2) / (2 * 25))
    const tigerShark = Math.exp(-Math.pow(temp - 24, 2) / (2 * 16))
    return { temp, greatWhite, tigerShark }
  })

  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="temp"
            stroke="#94a3b8"
            label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#94a3b8"
            label={{ value: 'Foraging Probability', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="greatWhite"
            stroke="#3b82f6"
            name="Great White"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="tigerShark"
            stroke="#f59e0b"
            name="Tiger Shark"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-500"></div>
          <span className="text-gray-300 text-sm">Great White (optimal: 18°C)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-orange-500"></div>
          <span className="text-gray-300 text-sm">Tiger Shark (optimal: 24°C)</span>
        </div>
      </div>
    </div>
  )
}

function DataPipelineStep({ number, title, items }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="flex-1">
        <h4 className="text-white font-semibold mb-2">{title}</h4>
        <ul className="space-y-1">
          {items.map((item, idx) => (
            <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
              <span className="text-cyan-400 mt-1">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function TemperatureSuitabilityChart({ tempOptimal, tempSensitivity }) {
  const data = Array.from({ length: 40 }, (_, i) => {
    const temp = i
    const suitability = Math.exp(
      -Math.pow(temp - tempOptimal, 2) / (2 * Math.pow(tempSensitivity, 2))
    )
    return { temp, suitability }
  })

  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="suitabilityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="temp"
            stroke="#94a3b8"
            label={{ value: 'Temperature (°C)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#94a3b8"
            label={{ value: 'Suitability', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="suitability"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#suitabilityGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function DepthTemperatureChart({ lapseRate }) {
  const data = Array.from({ length: 20 }, (_, i) => {
    const depth = i * 50
    const temp1 = 25 - lapseRate * depth
    const temp2 = 25 - 0.02 * depth
    const temp3 = 25 - 0.04 * depth
    return { depth, temp1, temp2, temp3 }
  })

  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="depth"
            stroke="#94a3b8"
            label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#94a3b8"
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <Line
            type="monotone"
            dataKey="temp1"
            stroke="#3b82f6"
            name={`Current (${lapseRate.toFixed(3)})`}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="temp2"
            stroke="#6366f1"
            name="Moderate (0.02)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="temp3"
            stroke="#8b5cf6"
            name="Steep (0.04)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function DepthScalingChart({ thermoclineDepth, depthVariability }) {
  const data = Array.from({ length: 50 }, (_, i) => {
    const depth = i * 10
    const scaling = Math.exp(
      -Math.pow(depth - thermoclineDepth, 2) / (2 * Math.pow(depthVariability, 2))
    )
    return { depth, scaling }
  })

  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="scalingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="depth"
            stroke="#94a3b8"
            label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5 }}
          />
          <YAxis
            stroke="#94a3b8"
            label={{ value: 'Prey/Eddy Scaling', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
            }}
          />
          <Area
            type="monotone"
            dataKey="scaling"
            stroke="#10b981"
            fillOpacity={1}
            fill="url(#scalingGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-gray-400 text-sm text-center mt-4">
        Peak prey concentration occurs at {thermoclineDepth}m depth (thermocline)
      </p>
    </div>
  )
}

function EnergyBar({ level, energy, color }) {
  const colorMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  }

  const width = Math.log10(energy + 1) * 33.33

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-white font-semibold">{level}</span>
        <span className="text-gray-400 text-sm">{energy}% energy</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
        <div
          className={`${colorMap[color]} h-full transition-all duration-500`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  )
}

function WorkflowStep({ number, title, description, color }) {
  const colorMap = {
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    purple: 'bg-purple-500',
    pink: 'bg-pink-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
  }

  return (
    <div className="flex gap-4 items-start">
      <div
        className={`flex-shrink-0 w-10 h-10 ${colorMap[color]} rounded-full flex items-center justify-center text-white font-bold`}
      >
        {number}
      </div>
      <div className="flex-1 bg-slate-900/50 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-1">{title}</h4>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  )
}

function MaterialCard({ name, properties, use }) {
  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <h4 className="text-white font-semibold mb-2">{name}</h4>
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-400 mb-1">Properties:</div>
          <div className="text-gray-300">{properties}</div>
        </div>
        <div>
          <div className="text-gray-400 mb-1">Use:</div>
          <div className="text-gray-300">{use}</div>
        </div>
      </div>
    </div>
  )
}
