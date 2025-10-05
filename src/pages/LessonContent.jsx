// Lesson content components that can be imported
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

// Lesson 1: How Satellites Track Ocean Life
export function Lesson1Content() {
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showQuizResults, setShowQuizResults] = useState(false)
  const [definitionVisible, setDefinitionVisible] = useState('')

  const oceanRegions = [
    { id: 'atlantic', name: 'North Atlantic', temp: '22°C', chlorophyll: 'High', eddies: 'Strong' },
    { id: 'pacific', name: 'Pacific Gyre', temp: '25°C', chlorophyll: 'Low', eddies: 'Weak' },
    {
      id: 'southern',
      name: 'Southern Ocean',
      temp: '8°C',
      chlorophyll: 'Medium',
      eddies: 'Very Strong',
    },
    {
      id: 'coastal',
      name: 'California Coast',
      temp: '16°C',
      chlorophyll: 'Very High',
      eddies: 'Moderate',
    },
  ]

  const quizQuestions = [
    {
      question: 'What does chlorophyll concentration (detected from space) tell scientists?',
      options: [
        'A. The number of sharks in an area',
        'B. The productivity of the water (how much plankton is present)',
        'C. The salinity of the ocean',
        'D. The temperature below 1000 m',
      ],
      correct: 'B',
    },
    {
      question:
        'You see a satellite map showing a patch of warm water with high chlorophyll concentration. Where is a shark most likely to be foraging?',
      options: [
        'a) In the patch, but generally there is a time delay',
        'b) Far from the patch',
        'c) At the ocean floor',
      ],
      correct: 'a',
    },
  ]

  const definitions = {
    chlorophyll: 'A green pigment in plants and algae that absorbs sunlight for photosynthesis',
    phytoplankton: 'Microscopic marine algae that form the base of the ocean food web',
    eddies: 'Circular currents in the ocean that trap nutrients and concentrate prey',
    'sea surface height': 'The elevation of the ocean surface relative to a reference level',
    'NASA SWOT':
      'Surface Water and Ocean Topography mission - a satellite that measures ocean height with unprecedented accuracy',
  }

  const handleQuizSubmit = () => {
    setShowQuizResults(true)
  }

  return (
    <div className="space-y-6">
      {/* Step 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-white">Satellites See the Invisible</h3>
        </div>
        <p className="text-gray-300 mb-4">
          NASA satellites orbit 500km above Earth, but they can detect tiny changes in the ocean
          surface that reveal what's happening underwater!
        </p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            <strong>Key Concept:</strong> Satellites use radar to measure{' '}
            <span
              className="text-cyan-400 cursor-pointer hover:underline"
              onClick={() => setDefinitionVisible('sea surface height')}
            >
              sea surface height
            </span>{' '}
            down to the centimeter. Underwater{' '}
            <span
              className="text-cyan-400 cursor-pointer hover:underline"
              onClick={() => setDefinitionVisible('eddies')}
            >
              eddies
            </span>{' '}
            create "bumps" and "dips" in the ocean surface.
          </p>
        </div>
      </motion.div>

      {/* Step 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-white">Meet NASA SWOT</h3>
        </div>
        <p className="text-gray-300 mb-4">
          The{' '}
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => setDefinitionVisible('NASA SWOT')}
          >
            NASA SWOT mission
          </span>{' '}
          launched in 2022. It can map ocean height with incredible detail - 10x better than
          previous satellites!
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400 mb-1">±2cm</div>
            <div className="text-sm text-gray-400">Measurement accuracy</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-cyan-400 mb-1">120km</div>
            <div className="text-sm text-gray-400">Swath width</div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Map Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Interactive Ocean Explorer</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Click on different ocean regions to see environmental data, then predict where sharks
          might hunt.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-white font-semibold mb-3">Ocean Regions</h4>
            {oceanRegions.map((region) => (
              <motion.button
                key={region.id}
                onClick={() => setSelectedRegion(region)}
                className={`w-full p-3 rounded-lg border transition-all ${
                  selectedRegion?.id === region.id
                    ? 'bg-blue-500/20 border-blue-500 text-white'
                    : 'bg-slate-800/50 border-white/10 text-gray-300 hover:bg-slate-800/70'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-left">
                  <div className="font-semibold">{region.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    🌡️ {region.temp} • 🌿 {region.chlorophyll} • 🌀 {region.eddies}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Environmental Data</h4>
            {selectedRegion ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Temperature:</span>
                  <span
                    className={`font-semibold ${
                      parseFloat(selectedRegion.temp) > 20 ? 'text-yellow-400' : 'text-blue-400'
                    }`}
                  >
                    {selectedRegion.temp}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Chlorophyll:</span>
                  <span
                    className={`font-semibold ${
                      selectedRegion.chlorophyll === 'Very High'
                        ? 'text-green-400'
                        : selectedRegion.chlorophyll === 'High'
                        ? 'text-green-300'
                        : 'text-gray-400'
                    }`}
                  >
                    {selectedRegion.chlorophyll}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Eddy Activity:</span>
                  <span
                    className={`font-semibold ${
                      selectedRegion.eddies === 'Very Strong' || selectedRegion.eddies === 'Strong'
                        ? 'text-purple-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {selectedRegion.eddies}
                  </span>
                </div>
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="text-sm text-gray-400 mb-2">Shark Foraging Probability:</div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        selectedRegion.chlorophyll === 'Very High' &&
                        (selectedRegion.eddies === 'Strong' ||
                          selectedRegion.eddies === 'Very Strong')
                          ? 'bg-green-400 w-4/5'
                          : selectedRegion.chlorophyll === 'High'
                          ? 'bg-yellow-400 w-3/5'
                          : 'bg-red-400 w-1/5'
                      }`}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {selectedRegion.chlorophyll === 'Very High' &&
                    (selectedRegion.eddies === 'Strong' || selectedRegion.eddies === 'Very Strong')
                      ? 'High - Perfect hunting conditions!'
                      : selectedRegion.chlorophyll === 'High'
                      ? 'Medium - Good potential'
                      : 'Low - Poor conditions'}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-sm text-center py-8">
                Select a region to view data
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
          <h4 className="text-white font-semibold mb-2">🦈 Guess Zone</h4>
          <p className="text-gray-300 text-sm mb-3">
            Based on the environmental data, where would you expect sharks to hunt?
          </p>
          <div className="flex flex-wrap gap-2">
            {oceanRegions.map((region) => (
              <button
                key={region.id}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedRegion?.id === region.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {region.name}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Ocean Eddies Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            4
          </div>
          <h3 className="text-xl font-bold text-white">Ocean Eddies = Shark Restaurants</h3>
        </div>
        <p className="text-gray-300 mb-4">
          <span
            className="text-cyan-400 cursor-pointer hover:underline"
            onClick={() => setDefinitionVisible('eddies')}
          >
            Eddies
          </span>{' '}
          are swirling currents that trap nutrients and small fish. Sharks hunt at the edges of
          these eddies where prey concentrates!
        </p>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-300 text-sm">
            <strong>Try This:</strong> Think of an eddy like a whirlpool in a bathtub - it pulls
            things to its center and creates a spiral of water that sharks can detect and use for
            hunting.
          </p>
        </div>
      </motion.div>

      {/* Interactive Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">🧠 Knowledge Check</h3>
        <div className="space-y-6">
          {quizQuestions.map((q, index) => (
            <div key={index} className="bg-slate-800/30 rounded-lg p-4">
              <p className="text-white font-semibold mb-3">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optIndex) => (
                  <label key={optIndex} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option[0]}
                      checked={quizAnswers[`question-${index}`] === option[0]}
                      onChange={(e) =>
                        setQuizAnswers({ ...quizAnswers, [`question-${index}`]: e.target.value })
                      }
                      className="w-4 h-4 text-blue-500"
                    />
                    <span className="text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
              {showQuizResults && (
                <div
                  className={`mt-3 p-2 rounded ${
                    quizAnswers[`question-${index}`] === q.correct
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {quizAnswers[`question-${index}`] === q.correct
                    ? '✅ Correct!'
                    : `❌ Incorrect. The answer is ${q.correct}`}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleQuizSubmit}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            Check Answers
          </button>
        </div>
      </motion.div>

      {/* Definition Popups */}
      <AnimatePresence>
        {definitionVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setDefinitionVisible('')}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-xl p-6 max-w-md w-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-2 capitalize">
                {definitionVisible.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-gray-300">{definitions[definitionVisible]}</p>
              <button
                onClick={() => setDefinitionVisible('')}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Lesson 2: The Shark Foraging Index
export function Lesson2Content() {
  const [tempSlider, setTempSlider] = useState(20)
  const [eddySlider, setEddySlider] = useState(0.5)
  const [chlorophyllSlider, setChlorophyllSlider] = useState(0.7)
  const [depthSlider, setDepthSlider] = useState(50)
  const [lapseRateSlider, setLapseRateSlider] = useState(0.1)
  const [showPipeline, setShowPipeline] = useState(false)

  // Calculate indicators based on sliders
  const temperatureSuitability = Math.exp(-Math.pow((tempSlider - 22) / 5, 2))
  const eddyIndicator = eddySlider
  const preyAvailability = Math.min(chlorophyllSlider * 1.5, 1)
  const sfi = preyAvailability * 0.45 + temperatureSuitability * 0.3 + eddyIndicator * 0.25

  // Depth scaling calculations
  const surfaceTemp = tempSlider
  const depthTemp = surfaceTemp - lapseRateSlider * depthSlider
  const depthScaling = Math.exp(-Math.pow(depthSlider / 100, 2))
  const scaledPrey = preyAvailability * depthScaling
  const scaledEddy = eddyIndicator * depthScaling

  return (
    <div className="space-y-6">
      {/* Environmental Indicators Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-white">Environmental Indicators</h3>
        </div>
        <p className="text-gray-300 mb-4">
          To predict where sharks might be foraging, scientists look at environmental indicators —
          measurable properties of the ocean that affect where prey lives and how sharks move.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🌡️</div>
            <h4 className="text-white font-semibold mb-1">Temperature</h4>
            <p className="text-blue-300 text-sm">Sharks prefer specific temperature ranges</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🌀</div>
            <h4 className="text-white font-semibold mb-1">Eddy Energy</h4>
            <p className="text-purple-300 text-sm">Swirling currents concentrate prey</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
            <div className="text-3xl mb-2">🌿</div>
            <h4 className="text-white font-semibold mb-1">Prey Availability</h4>
            <p className="text-green-300 text-sm">Areas rich in phytoplankton</p>
          </div>
        </div>
      </motion.div>

      {/* Data Pipeline Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-white">From Data to Indicators</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Scientists don't dive in every day — they use satellites and ocean reanalysis models to
          study the ocean.
        </p>

        <button
          onClick={() => setShowPipeline(!showPipeline)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all mb-4"
        >
          {showPipeline ? 'Hide' : 'Show'} Data Pipeline
        </button>

        {showPipeline && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🛰️</span>
                </div>
                <h4 className="text-white font-semibold text-sm">Satellites</h4>
                <p className="text-gray-400 text-xs">Collect raw data</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl">→</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-white font-semibold text-sm">Processing</h4>
                <p className="text-gray-400 text-xs">Turn into maps</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl">→</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🧮</span>
                </div>
                <h4 className="text-white font-semibold text-sm">Indicators</h4>
                <p className="text-gray-400 text-xs">Compute suitability</p>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-2xl">→</span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🦈</span>
                </div>
                <h4 className="text-white font-semibold text-sm">SFI</h4>
                <p className="text-gray-400 text-xs">Shark predictions</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Interactive Sliders for Computing Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Computing Each Indicator</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Temperature Suitability */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">🌡️ Temperature Suitability</h4>
            <p className="text-gray-300 text-sm mb-3">
              Sharks tend to forage where temperatures are close to their preferred range (18-24°C).
            </p>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Temperature: {tempSlider}°C
              </label>
              <input
                type="range"
                min="5"
                max="35"
                value={tempSlider}
                onChange={(e) => setTempSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="bg-blue-500/10 rounded p-3">
              <div className="text-sm text-blue-300 mb-1">Formula:</div>
              <div className="font-mono text-xs text-blue-200">Tₛ = exp(-(T-Tₒₚₜ)²/(2σ²))</div>
              <div className="text-sm text-gray-400 mt-2">
                Suitability:{' '}
                <span className="text-cyan-400 font-semibold">
                  {temperatureSuitability.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          {/* Eddy Current Indicator */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">🌀 Eddy Current Indicator</h4>
            <p className="text-gray-300 text-sm mb-3">
              Eddies (swirling ocean features) trap nutrients and prey. We detect them from Sea
              Surface Height Anomalies (SSHA).
            </p>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Eddy Strength: {eddySlider.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={eddySlider}
                onChange={(e) => setEddySlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="bg-purple-500/10 rounded p-3">
              <div className="text-sm text-purple-300 mb-1">Formula:</div>
              <div className="font-mono text-xs text-purple-200">E = f(SSHA curvature)</div>
              <div className="text-sm text-gray-400 mt-2">
                Eddy Score:{' '}
                <span className="text-purple-400 font-semibold">{eddyIndicator.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* Prey Availability */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">🌿 Prey Availability</h4>
            <p className="text-gray-300 text-sm mb-3">
              Phytoplankton (measured via chlorophyll concentration) supports the marine food web.
            </p>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Chlorophyll: {chlorophyllSlider.toFixed(2)}
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={chlorophyllSlider}
                onChange={(e) => setChlorophyllSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="bg-green-500/10 rounded p-3">
              <div className="text-sm text-green-300 mb-1">Formula:</div>
              <div className="font-mono text-xs text-green-200">Bₚ = min(C × 1.5, 1.0)</div>
              <div className="text-sm text-gray-400 mt-2">
                Prey Score:{' '}
                <span className="text-green-400 font-semibold">{preyAvailability.toFixed(3)}</span>
              </div>
            </div>
          </div>

          {/* SFI Calculation */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">🦈 Shark Foraging Index (SFI)</h4>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-sm">
              <div className="text-green-300">
                Prey (45%): {preyAvailability.toFixed(3)} × 0.45 ={' '}
                {(preyAvailability * 0.45).toFixed(3)}
              </div>
              <div className="text-blue-300">
                Temp (30%): {temperatureSuitability.toFixed(3)} × 0.30 ={' '}
                {(temperatureSuitability * 0.3).toFixed(3)}
              </div>
              <div className="text-purple-300">
                Eddy (25%): {eddyIndicator.toFixed(3)} × 0.25 = {(eddyIndicator * 0.25).toFixed(3)}
              </div>
              <div className="border-t border-white/10 pt-2 mt-2">
                <div className="text-cyan-300 font-bold">
                  SFI ={' '}
                  {(
                    preyAvailability * 0.45 +
                    temperatureSuitability * 0.3 +
                    eddyIndicator * 0.25
                  ).toFixed(3)}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    sfi > 0.7 ? 'bg-green-400' : sfi > 0.5 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${Math.min(sfi * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {sfi > 0.7
                  ? 'High foraging probability!'
                  : sfi > 0.5
                  ? 'Medium potential'
                  : 'Low probability'}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Depth Scaling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
            4
          </div>
          <h3 className="text-xl font-bold text-white">Depth Scaling</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Our maps are 2D, but sharks hunt in 3D! We estimate how conditions change with depth.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Temperature vs Depth</h4>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">Depth: {depthSlider}m</label>
              <input
                type="range"
                min="0"
                max="200"
                value={depthSlider}
                onChange={(e) => setDepthSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                Lapse Rate: {lapseRateSlider}°C/m
              </label>
              <input
                type="range"
                min="0.01"
                max="0.2"
                step="0.01"
                value={lapseRateSlider}
                onChange={(e) => setLapseRateSlider(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="bg-blue-500/10 rounded p-3">
              <div className="text-sm text-blue-300 mb-1">Temperature Profile:</div>
              <div className="text-sm text-gray-400">
                Surface: <span className="text-cyan-400">{surfaceTemp.toFixed(1)}°C</span>
              </div>
              <div className="text-sm text-gray-400">
                At {depthSlider}m: <span className="text-cyan-400">{depthTemp.toFixed(1)}°C</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Depth Effects on Indicators</h4>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-400 mb-1">Prey Availability:</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 bg-green-400 rounded-full"
                      style={{ width: `${preyAvailability * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-green-400">{scaledPrey.toFixed(3)}</span>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Eddy Effects:</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 bg-purple-400 rounded-full"
                      style={{ width: `${scaledEddy * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-purple-400">{scaledEddy.toFixed(3)}</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 rounded p-3 mt-4">
              <div className="text-sm text-gray-300 mb-1">3D SFI at {depthSlider}m:</div>
              <div className="font-mono text-sm text-cyan-300">
                SFI₃D ={' '}
                {(scaledPrey * 0.45 + temperatureSuitability * 0.3 + scaledEddy * 0.25).toFixed(3)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weightings Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
            5
          </div>
          <h3 className="text-xl font-bold text-white">Combining the Indicators</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Each indicator gets a different weight based on how important it is for shark foraging
          behavior.
        </p>

        <div className="bg-slate-800/50 rounded-lg p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">45%</div>
              <h4 className="text-white font-semibold mb-2">Prey Availability</h4>
              <p className="text-gray-400 text-sm">Most important - sharks go where food is</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">30%</div>
              <h4 className="text-white font-semibold mb-2">Temperature</h4>
              <p className="text-gray-400 text-sm">Very important - affects shark metabolism</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">25%</div>
              <h4 className="text-white font-semibold mb-2">Eddy Energy</h4>
              <p className="text-gray-400 text-sm">
                Important - concentrates prey in huntable areas
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Link to Main Tool */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">🚀 Try It Yourself!</h3>
        <p className="text-gray-300 mb-4">
          Want to see how your own parameters would look on a real map? Check out our main shark
          forecasting tool!
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all">
          Explore Main Tool →
        </button>
      </motion.div>
    </div>
  )
}

// Lesson 3: Ocean Food Webs
export function Lesson3Content() {
  const [draggedItem, setDraggedItem] = useState(null)
  const [foodWebOrder, setFoodWebOrder] = useState([])
  const [showConnections, setShowConnections] = useState(false)

  const foodWebItems = [
    {
      id: 'phytoplankton',
      name: 'Phytoplankton',
      level: 1,
      icon: '🦠',
      description: 'Microscopic algae that convert sunlight into energy',
    },
    {
      id: 'zooplankton',
      name: 'Zooplankton',
      level: 2,
      icon: '🦐',
      description: 'Tiny animals that feed on phytoplankton',
    },
    {
      id: 'small_fish',
      name: 'Small Fish',
      level: 3,
      icon: '🐟',
      description: 'Small fish that eat zooplankton',
    },
    {
      id: 'large_fish',
      name: 'Large Fish',
      level: 4,
      icon: '🐠',
      description: 'Predatory fish that hunt smaller fish',
    },
    {
      id: 'shark',
      name: 'Shark',
      level: 5,
      icon: '🦈',
      description: 'Apex predator that hunts large fish',
    },
  ]

  const correctOrder = ['phytoplankton', 'zooplankton', 'small_fish', 'large_fish', 'shark']

  const handleDragStart = (e, item) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, targetIndex) => {
    e.preventDefault()
    if (draggedItem) {
      const newOrder = [...foodWebOrder]
      const draggedIndex = newOrder.indexOf(draggedItem.id)

      if (draggedIndex !== -1) {
        newOrder.splice(draggedIndex, 1)
      }

      newOrder.splice(targetIndex, 0, draggedItem.id)
      setFoodWebOrder(newOrder)
      setDraggedItem(null)
    }
  }

  const resetFoodWeb = () => {
    setFoodWebOrder([])
  }

  const isCorrectOrder = JSON.stringify(foodWebOrder) === JSON.stringify(correctOrder)

  return (
    <div className="space-y-6">
      {/* Phytoplankton Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-white">It All Starts with Sunlight</h3>
        </div>
        <p className="text-gray-300 mb-4">
          The ocean food web begins with tiny organisms called phytoplankton - microscopic plants
          that use sunlight to make energy (photosynthesis), just like trees!
        </p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-yellow-300 text-sm">
            <strong>Fun Fact:</strong> Phytoplankton produce 50% of Earth's oxygen - more than all
            forests combined!
          </p>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">🌞 What They Need</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">☀️</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Sunlight</div>
                  <div className="text-gray-400 text-xs">For photosynthesis</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">💧</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Nutrients</div>
                  <div className="text-gray-400 text-xs">Nitrogen, phosphorus</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <span className="text-sm">🌊</span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">Water</div>
                  <div className="text-gray-400 text-xs">Ocean environment</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">🔬 How We Detect Them</h4>
            <p className="text-gray-300 text-sm mb-3">
              Satellites detect phytoplankton by measuring chlorophyll concentration in the water.
            </p>
            <div className="bg-blue-500/10 rounded p-3">
              <div className="text-sm text-blue-300 mb-1">Chlorophyll makes water look green!</div>
              <div className="text-xs text-gray-400">
                More chlorophyll = More phytoplankton = More food for the food web
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Food Web Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-white">Build the Food Web</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Drag and drop the organisms to arrange them in the correct order of the ocean food chain.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Available Items */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Available Organisms</h4>
            <div className="space-y-2">
              {foodWebItems.map((item) => (
                <motion.div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  className={`p-3 rounded-lg border cursor-move transition-all ${
                    foodWebOrder.includes(item.id)
                      ? 'bg-slate-600/50 border-slate-600 opacity-50'
                      : 'bg-slate-700 border-white/10 hover:bg-slate-600 hover:border-white/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{item.name}</div>
                      <div className="text-gray-400 text-xs">{item.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Food Web Chain */}
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Food Chain (Bottom to Top)</h4>
            <div className="space-y-2 min-h-[200px]">
              {foodWebOrder.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-8 border-2 border-dashed border-gray-600 rounded-lg">
                  Drop organisms here to build the food chain
                </div>
              ) : (
                foodWebOrder.map((itemId, index) => {
                  const item = foodWebItems.find((f) => f.id === itemId)
                  return (
                    <div key={`${itemId}-${index}`} className="relative">
                      <motion.div
                        className={`p-3 rounded-lg border ${
                          isCorrectOrder && foodWebOrder[index] === correctOrder[index]
                            ? 'bg-green-500/20 border-green-500'
                            : 'bg-slate-700 border-white/10'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="text-white font-semibold text-sm">{item.name}</div>
                            <div className="text-gray-400 text-xs">Level {item.level}</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Connection Arrow */}
                      {index < foodWebOrder.length - 1 && (
                        <div className="flex justify-center my-2">
                          <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-gray-500"></div>
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={resetFoodWeb}
                className="px-3 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-all text-sm"
              >
                Reset
              </button>
              {foodWebOrder.length === 5 && (
                <div
                  className={`px-3 py-2 rounded-lg text-sm ${
                    isCorrectOrder
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-yellow-500/20 text-yellow-300'
                  }`}
                >
                  {isCorrectOrder ? '✅ Perfect!' : '❌ Try again'}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Food Web Levels Explained */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Energy Transfer</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Energy flows from one level to the next, but only about 10% is transferred each time.
        </p>

        <div className="grid md:grid-cols-5 gap-4">
          {foodWebItems.map((item, index) => (
            <div key={item.id} className="text-center">
              <div
                className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  index === 0
                    ? 'bg-green-500/20'
                    : index === 1
                    ? 'bg-blue-500/20'
                    : index === 2
                    ? 'bg-purple-500/20'
                    : index === 3
                    ? 'bg-red-500/20'
                    : 'bg-gray-500/20'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div className="text-white font-semibold text-sm mb-1">{item.name}</div>
              <div className="text-gray-400 text-xs mb-2">Level {item.level}</div>
              <div
                className={`text-xs p-2 rounded ${
                  index === 0
                    ? 'bg-green-500/20 text-green-300'
                    : index === 1
                    ? 'bg-blue-500/20 text-blue-300'
                    : index === 2
                    ? 'bg-purple-500/20 text-purple-300'
                    : index === 3
                    ? 'bg-red-500/20 text-red-300'
                    : 'bg-gray-500/20 text-gray-300'
                }`}
              >
                {index === 0
                  ? '100% Energy'
                  : index === 1
                  ? '~10% Energy'
                  : index === 2
                  ? '~1% Energy'
                  : index === 3
                  ? '~0.1% Energy'
                  : '~0.01% Energy'}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Satellite Connection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
            4
          </div>
          <h3 className="text-xl font-bold text-white">Satellite → Sharks</h3>
        </div>
        <p className="text-gray-300 mb-4">
          By tracking phytoplankton (Level 1) with satellites, we can predict where Level 5 sharks
          will be!
        </p>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🛰️</span>
              </div>
              <div className="text-white text-sm font-semibold">Satellite</div>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">→</span>
                <span className="text-cyan-400 text-sm font-semibold">Chlorophyll Data</span>
                <span className="text-2xl">→</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🦠</span>
              </div>
              <div className="text-white text-sm font-semibold">Phytoplankton</div>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">→</span>
                <span className="text-green-400 text-sm font-semibold">Food Web</span>
                <span className="text-2xl">→</span>
              </div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">🦈</span>
              </div>
              <div className="text-white text-sm font-semibold">Sharks</div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded p-3">
            <p className="text-cyan-300 text-sm mb-2">
              <strong>NASA's MODIS satellite measures chlorophyll concentration</strong>
            </p>
            <p className="text-gray-400 text-sm">
              Where there's lots of green color in the satellite data, there will eventually be
              sharks! This creates a time delay between when phytoplankton bloom and when sharks
              arrive to hunt.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Diagram Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            5
          </div>
          <h3 className="text-xl font-bold text-white">Interactive Food Web</h3>
        </div>

        <button
          onClick={() => setShowConnections(!showConnections)}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all mb-4"
        >
          {showConnections ? 'Hide' : 'Show'} Connections
        </button>

        {showConnections && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-slate-800/50 rounded-lg p-6"
          >
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {foodWebItems.map((item, index) => (
                <div key={item.id} className="relative">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        index === 0
                          ? 'bg-green-500/30'
                          : index === 1
                          ? 'bg-blue-500/30'
                          : index === 2
                          ? 'bg-purple-500/30'
                          : index === 3
                          ? 'bg-red-500/30'
                          : 'bg-gray-500/30'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="text-white font-semibold text-sm">{item.name}</div>
                  </div>

                  {/* Connection Lines */}
                  {index < foodWebItems.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-2 w-8 h-0.5 bg-gradient-to-r from-current to-transparent opacity-50">
                      <div className="absolute right-0 top-0 w-0 h-0 border-l-[6px] border-l-current border-y-[4px] border-y-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-300 text-sm">
                Click on any organism above to learn more about its role in the food web
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

// Lesson 4: Bio-Sensor Technology
export function Lesson4Content() {
  const [selectedComponents, setSelectedComponents] = useState({})
  const [selectedMaterials, setSelectedMaterials] = useState({})
  const [testScenario, setTestScenario] = useState('normal')
  const [showDesign, setShowDesign] = useState(false)

  const gastricComponents = [
    {
      id: 'ph_probe',
      name: 'pH Probe',
      description: 'Measures stomach acidity changes during feeding',
      required: true,
    },
    {
      id: 'ammonia_sensor',
      name: 'Ammonia Sensor',
      description: 'Detects protein breakdown from different prey types',
      required: true,
    },
    {
      id: 'semipermeable_membrane',
      name: 'Semipermeable Membrane',
      description: 'Allows ammonia gas to pass while blocking liquids',
      required: true,
    },
    {
      id: 'piezoelectric_transducer',
      name: 'Piezoelectric Transducer',
      description: 'Converts mechanical energy to electrical signals',
      required: true,
    },
    {
      id: 'microcontroller',
      name: 'Microcontroller',
      description: 'Processes sensor data and controls transmission',
      required: false,
    },
    {
      id: 'temperature_sensor',
      name: 'Temperature Sensor',
      description: 'Monitors stomach temperature for digestion patterns',
      required: false,
    },
    {
      id: 'accelerometer',
      name: 'Accelerometer',
      description: 'Detects shark movement and feeding behavior',
      required: false,
    },
  ]

  const dorsalComponents = [
    {
      id: 'hydrophone',
      name: 'External Hydrophone',
      description: 'Receives acoustic data from gastric sensor',
      required: true,
    },
    {
      id: 'pressure_sensor',
      name: 'Pressure Sensor',
      description: 'Measures water depth and diving behavior',
      required: true,
    },
    {
      id: 'temperature_sensor',
      name: 'Temperature Sensor',
      description: 'Records external water temperature',
      required: true,
    },
    {
      id: 'antenna',
      name: 'Satellite Antenna',
      description: 'Transmits data to satellites for global tracking',
      required: true,
    },
    {
      id: 'battery',
      name: 'Extended Battery',
      description: 'Provides power for multi-year deployments',
      required: false,
    },
    {
      id: 'solar_cell',
      name: 'Solar Cell',
      description: 'Harnesses sunlight to extend battery life',
      required: false,
    },
    {
      id: 'gps_receiver',
      name: 'GPS Receiver',
      description: 'Provides precise location data when surfaced',
      required: false,
    },
  ]

  const materials = [
    {
      id: 'delrin',
      name: 'Delrin Exterior',
      description: 'High durability and biocompatibility',
      selected: false,
    },
    {
      id: 'epoxy_coating',
      name: 'Epoxy Coating',
      description: 'Protects against corrosion and wear',
      selected: false,
    },
    {
      id: 'lithium_battery',
      name: 'Lithium-Thionyl Chloride Battery',
      description: 'Extended battery life for long deployments',
      selected: false,
    },
    {
      id: 'eptfe_membrane',
      name: 'ePTFE Membrane',
      description: 'Converts ammonium ions to gas phase',
      selected: false,
    },
    {
      id: 'stainless_steel',
      name: 'Stainless Steel Fasteners',
      description: 'Corrosion-resistant attachment points',
      selected: false,
    },
    {
      id: 'platinum',
      name: 'Platinum Sensors',
      description: 'Inert and highly accurate for chemical sensing',
      selected: false,
    },
  ]

  const testScenarios = {
    normal: { name: 'Normal Conditions', success: 95, issues: [] },
    acidic: {
      name: 'High Acidity',
      success: 78,
      issues: ['Membrane degradation', 'Sensor corrosion'],
    },
    deep: { name: 'Deep Water', success: 82, issues: ['Pressure effects', 'Signal attenuation'] },
    long_term: {
      name: 'Long Deployment',
      success: 65,
      issues: ['Battery depletion', 'Biofouling'],
    },
  }

  const calculateDesignScore = () => {
    const componentScore = Object.values(selectedComponents).filter(Boolean).length
    const materialScore = Object.values(selectedMaterials).filter(Boolean).length
    return Math.round(
      ((componentScore + materialScore) /
        (gastricComponents.length + dorsalComponents.length + materials.length)) *
        100
    )
  }

  const handleComponentToggle = (componentId, isGastric) => {
    const key = `${isGastric ? 'gastric' : 'dorsal'}_${componentId}`
    setSelectedComponents({ ...selectedComponents, [key]: !selectedComponents[key] })
  }

  const handleMaterialToggle = (materialId) => {
    setSelectedMaterials({ ...selectedMaterials, [materialId]: !selectedMaterials[materialId] })
  }

  return (
    <div className="space-y-6">
      {/* Shark Monitoring Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-white">Shark Monitoring Technologies</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Sharks can be monitored using two complementary types of tags. The dorsal fin tag measures
          environmental and behavioral data, while the gastric tag records internal digestive
          conditions.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <div className="text-3xl mb-3">🏷️</div>
            <h4 className="text-white font-semibold mb-2">Dorsal Fin Tag</h4>
            <p className="text-blue-300 text-sm mb-3">
              External tag that tracks location and environment
            </p>
            <div className="space-y-1">
              <div className="text-xs text-gray-400">• GPS Location Tracking</div>
              <div className="text-xs text-gray-400">• Water Temperature & Depth</div>
              <div className="text-xs text-gray-400">• Satellite Communication</div>
              <div className="text-xs text-gray-400">• Multi-year Battery Life</div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="text-3xl mb-3">💊</div>
            <h4 className="text-white font-semibold mb-2">Gastric Bio-Sensor</h4>
            <p className="text-red-300 text-sm mb-3">Internal tag that monitors feeding behavior</p>
            <div className="space-y-1">
              <div className="text-xs text-gray-400">• pH Stomach Monitoring</div>
              <div className="text-xs text-gray-400">• Ammonia Detection</div>
              <div className="text-xs text-gray-400">• Feeding Event Detection</div>
              <div className="text-xs text-gray-400">• Acoustic Data Transmission</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Gastric Sensor Package Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-white">Gastric Sensor Package Design</h3>
        </div>
        <p className="text-gray-300 mb-4">
          A pill-shaped capsule that attaches to the stomach wall inside the shark, similar to how
          acoustic tags are implanted.
        </p>

        <div className="bg-slate-800/50 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Core Components</h4>
              <div className="space-y-2">
                {gastricComponents.map((component) => (
                  <div key={component.id} className="flex items-start gap-3 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedComponents[`gastric_${component.id}`] || false}
                      onChange={() => handleComponentToggle(component.id, true)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{component.name}</div>
                      <div className="text-gray-400 text-xs">{component.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">How It Works</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-red-500/20 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <div className="text-white font-semibold">Feeding Detection</div>
                    <div className="text-gray-400">
                      pH probe detects sustained pH drops during meals
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <div className="text-white font-semibold">Diet Analysis</div>
                    <div className="text-gray-400">
                      Ammonia levels reveal protein vs. fat content
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <div className="text-white font-semibold">Data Transmission</div>
                    <div className="text-gray-400">
                      Acoustic signals sent to external dorsal tag
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dorsal Tag Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Dorsal Tag Design</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Our dorsal tag adopts a hydrodynamic design similar to other SPOT dorsal tags, with
          enhanced sensor capabilities.
        </p>

        <div className="bg-slate-800/50 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">External Components</h4>
              <div className="space-y-2">
                {dorsalComponents.map((component) => (
                  <div key={component.id} className="flex items-start gap-3 p-2 rounded">
                    <input
                      type="checkbox"
                      checked={selectedComponents[`dorsal_${component.id}`] || false}
                      onChange={() => handleComponentToggle(component.id, false)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-white text-sm font-semibold">{component.name}</div>
                      <div className="text-gray-400 text-xs">{component.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Design Features</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Hydrodynamic casing reduces drag</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">External hydrophone for gastric data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Onboard environmental sensors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span className="text-gray-300">Satellite antenna for data relay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Materials Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
            4
          </div>
          <h3 className="text-xl font-bold text-white">Materials & Durability</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.map((material) => (
            <motion.div
              key={material.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                selectedMaterials[material.id]
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-slate-800/50 border-white/10 hover:bg-slate-800/70'
              }`}
              onClick={() => handleMaterialToggle(material.id)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selectedMaterials[material.id] || false}
                  onChange={() => handleMaterialToggle(material.id)}
                  className="mt-1"
                />
                <div>
                  <div className="text-white font-semibold text-sm">{material.name}</div>
                  <div className="text-gray-400 text-xs">{material.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Virtual Testing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
            5
          </div>
          <h3 className="text-xl font-bold text-white">Virtual Testing</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Test your bio-sensor design in different scenarios to see how it performs.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Test Scenarios</h4>
            <div className="space-y-2">
              {Object.entries(testScenarios).map(([key, scenario]) => (
                <button
                  key={key}
                  onClick={() => setTestScenario(key)}
                  className={`w-full p-3 rounded-lg border transition-all ${
                    testScenario === key
                      ? 'bg-blue-500/20 border-blue-500 text-white'
                      : 'bg-slate-700 border-white/10 text-gray-300 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="font-semibold text-sm">{scenario.name}</div>
                  <div className="text-xs text-gray-400">Success Rate: {scenario.success}%</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-3">Test Results</h4>
            <div className="mb-4">
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    testScenarios[testScenario].success > 80
                      ? 'bg-green-400'
                      : testScenarios[testScenario].success > 60
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                  }`}
                  style={{ width: `${testScenarios[testScenario].success}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Success Rate:{' '}
                <span
                  className={`font-semibold ${
                    testScenarios[testScenario].success > 80
                      ? 'text-green-400'
                      : testScenarios[testScenario].success > 60
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }`}
                >
                  {testScenarios[testScenario].success}%
                </span>
              </div>
            </div>

            {testScenarios[testScenario].issues.length > 0 && (
              <div>
                <div className="text-red-400 text-sm font-semibold mb-2">Potential Issues:</div>
                <div className="space-y-1">
                  {testScenarios[testScenario].issues.map((issue, index) => (
                    <div key={index} className="text-xs text-gray-400">
                      • {issue}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400 mb-2">
              Design Score: {calculateDesignScore()}%
            </div>
            <div className="text-sm text-gray-400">
              Based on {Object.values(selectedComponents).filter(Boolean).length} components and{' '}
              {Object.values(selectedMaterials).filter(Boolean).length} materials selected
            </div>
          </div>
        </div>
      </motion.div>

      {/* Design Challenge Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
      >
        <div className="text-center">
          <h3 className="text-xl font-bold text-white mb-4">🎯 Your Design Challenge</h3>
          <p className="text-gray-300 mb-6">
            Design a bio-sensor tag that balances functionality, durability, and cost while
            surviving in a shark's stomach.
          </p>

          <button
            onClick={() => setShowDesign(!showDesign)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            {showDesign ? 'Hide' : 'Show'} Design Summary
          </button>
        </div>

        {showDesign && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 bg-slate-800/50 rounded-lg p-4"
          >
            <h4 className="text-white font-semibold mb-3">Your Bio-Sensor Design</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-cyan-400 font-semibold mb-2">Selected Components:</div>
                <div className="space-y-1 text-gray-300">
                  {Object.entries(selectedComponents).map(
                    ([key, selected]) =>
                      selected && (
                        <div key={key}>
                          • {key.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                      )
                  )}
                </div>
              </div>
              <div>
                <div className="text-green-400 font-semibold mb-2">Selected Materials:</div>
                <div className="space-y-1 text-gray-300">
                  {Object.entries(selectedMaterials).map(
                    ([key, selected]) =>
                      selected && <div key={key}>• {materials.find((m) => m.id === key)?.name}</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
