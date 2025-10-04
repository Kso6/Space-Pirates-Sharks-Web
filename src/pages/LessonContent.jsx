// Lesson content components that can be imported
import { motion } from 'framer-motion'

// Lesson 1: How Satellites Track Ocean Life
export function Lesson1Content() {
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
          NASA satellites orbit 500km above Earth, but they can detect tiny changes in the ocean surface
          that reveal what's happening underwater!
        </p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            <strong>Key Concept:</strong> Satellites use radar to measure sea surface height down to the
            centimeter. Underwater eddies create "bumps" and "dips" in the ocean surface.
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
          The Surface Water and Ocean Topography (SWOT) mission launched in 2022. It can map ocean height
          with incredible detail - 10x better than previous satellites!
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

      {/* Step 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-white">Ocean Eddies = Shark Restaurants</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Eddies are swirling currents that trap nutrients and small fish. Sharks hunt at the edges of
          these eddies where prey concentrates!
        </p>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-300 text-sm">
            <strong>Try This:</strong> Think of an eddy like a whirlpool in a bathtub - it pulls things
            to its center and creates a spiral of water that sharks can detect and use for hunting.
          </p>
        </div>
      </motion.div>

      {/* Quick Quiz */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">✓ Check Your Understanding</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-gray-300 text-sm">
              Satellites can detect underwater features by measuring sea surface height
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-gray-300 text-sm">
              NASA SWOT measures ocean height with ±2cm accuracy
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-green-400">✓</span>
            <p className="text-gray-300 text-sm">
              Eddies create foraging hotspots where sharks hunt
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Lesson 2: The Shark Foraging Index
export function Lesson2Content() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-white">What is the SFI?</h3>
        </div>
        <p className="text-gray-300 mb-4">
          The Shark Foraging Index (SFI) is like a "shark probability score" for any location in the ocean.
          It combines three key factors to predict where sharks will hunt.
        </p>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 font-mono text-sm">
          <p className="text-blue-300">
            SFI = (Prey × 0.45) + (Temperature × 0.30) + (Eddies × 0.25)
          </p>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Higher SFI = Higher chance sharks are foraging there!
        </p>
      </motion.div>

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
          <h3 className="text-xl font-bold text-white">The Three Ingredients</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="text-3xl">🐟</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Prey Availability (45%)</h4>
              <p className="text-gray-300 text-sm">
                Measured by chlorophyll-a (green algae). More algae = more small fish = more sharks!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-3xl">🌡️</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Temperature (30%)</h4>
              <p className="text-gray-300 text-sm">
                Sharks prefer 18-24°C. Too cold or too hot and they won't hunt there.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-3xl">🌀</div>
            <div>
              <h4 className="text-white font-semibold mb-1">Eddy Energy (25%)</h4>
              <p className="text-gray-300 text-sm">
                Swirling currents that concentrate prey and create hunting opportunities.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-green-500/10 border border-green-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">🧮 Try It Yourself!</h3>
        <p className="text-gray-300 mb-4">Calculate SFI for a location:</p>
        <div className="bg-slate-800/50 rounded-lg p-4 space-y-2 font-mono text-sm">
          <p className="text-gray-300">Location: 25°N, 80°W</p>
          <p className="text-green-400">• Prey Score: 0.8 (lots of chlorophyll)</p>
          <p className="text-red-400">• Temperature Score: 0.9 (perfect 20°C)</p>
          <p className="text-blue-400">• Eddy Score: 0.6 (moderate eddies)</p>
          <div className="border-t border-white/10 pt-2 mt-2">
            <p className="text-white">
              SFI = (0.8 × 0.45) + (0.9 × 0.30) + (0.6 × 0.25) = <strong>0.78</strong>
            </p>
            <p className="text-cyan-400 mt-2">
              ✓ High foraging probability! Sharks likely hunting here.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Lesson 3: Ocean Food Webs
export function Lesson3Content() {
  return (
    <div className="space-y-6">
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
          The ocean food web begins with tiny organisms called phytoplankton - microscopic plants that use
          sunlight to make energy (photosynthesis), just like trees!
        </p>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <p className="text-yellow-300 text-sm">
            <strong>Fun Fact:</strong> Phytoplankton produce 50% of Earth's oxygen - more than all forests
            combined!
          </p>
        </div>
      </motion.div>

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
          <h3 className="text-xl font-bold text-white">The Food Chain Ladder</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
            <div className="text-3xl">🦈</div>
            <div className="flex-1">
              <div className="font-bold text-white">Level 4: Apex Predators</div>
              <div className="text-sm text-gray-400">Sharks, orcas, large tuna</div>
            </div>
          </div>
          <div className="flex items-center justify-center text-gray-500">↑ eats ↑</div>
          <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
            <div className="text-3xl">🐟</div>
            <div className="flex-1">
              <div className="font-bold text-white">Level 3: Large Fish</div>
              <div className="text-sm text-gray-400">Tuna, mackerel, squid</div>
            </div>
          </div>
          <div className="flex items-center justify-center text-gray-500">↑ eats ↑</div>
          <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
            <div className="text-3xl">🦐</div>
            <div className="flex-1">
              <div className="font-bold text-white">Level 2: Zooplankton</div>
              <div className="text-sm text-gray-400">Tiny animals, krill, larvae</div>
            </div>
          </div>
          <div className="flex items-center justify-center text-gray-500">↑ eats ↑</div>
          <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-4">
            <div className="text-3xl">🦠</div>
            <div className="flex-1">
              <div className="font-bold text-white">Level 1: Phytoplankton</div>
              <div className="text-sm text-gray-400">Microscopic algae using sunlight</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Why This Matters for Sharks</h3>
        <p className="text-gray-300 mb-4">
          By tracking phytoplankton (Level 1) with satellites, we can predict where Level 4 sharks will be!
        </p>
        <div className="bg-slate-800/50 rounded-lg p-4">
          <p className="text-cyan-300 text-sm">
            <strong>Satellite → Chlorophyll-a → Phytoplankton → Small Fish → Big Fish → Sharks</strong>
          </p>
          <p className="text-gray-400 text-sm mt-2">
            NASA's MODIS satellite measures chlorophyll (green color) to map phytoplankton. Where there's
            lots of green, there will eventually be sharks!
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// Lesson 4: Bio-Sensor Technology
export function Lesson4Content() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            1
          </div>
          <h3 className="text-xl font-bold text-white">The Challenge</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Current shark tags track WHERE sharks go, but not WHAT they eat. We need to validate our
          predictions by knowing when sharks actually feed!
        </p>
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-300 text-sm">
            <strong>Problem:</strong> Traditional tags can't tell if a shark is hunting, resting, or just
            swimming through an area.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            2
          </div>
          <h3 className="text-xl font-bold text-white">Our Solution: Gastric Bio-Sensor</h3>
        </div>
        <p className="text-gray-300 mb-4">
          A small capsule (like a vitamin pill) that a shark swallows. It sits in the stomach and measures:
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🔬</div>
            <h4 className="text-white font-semibold mb-1">pH Changes</h4>
            <p className="text-gray-400 text-sm">
              When a shark eats, stomach acid increases (pH drops). This signals a feeding event!
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl mb-2">🧪</div>
            <h4 className="text-white font-semibold mb-1">NH₄⁺ Levels</h4>
            <p className="text-gray-400 text-sm">
              Different prey types release different chemicals during digestion. Fish vs squid vs seal!
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-700/30 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            3
          </div>
          <h3 className="text-xl font-bold text-white">How It Works</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-2xl">1️⃣</div>
            <div>
              <p className="text-white font-semibold">Shark swallows capsule</p>
              <p className="text-gray-400 text-sm">Hidden in bait fish during tagging</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">2️⃣</div>
            <div>
              <p className="text-white font-semibold">Sensors activate</p>
              <p className="text-gray-400 text-sm">pH and NH₄⁺ sensors start collecting data</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">3️⃣</div>
            <div>
              <p className="text-white font-semibold">Feeding detected</p>
              <p className="text-gray-400 text-sm">Algorithm identifies feeding events from pH spikes</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">4️⃣</div>
            <div>
              <p className="text-white font-semibold">Data transmitted</p>
              <p className="text-gray-400 text-sm">125kHz inductive link sends data to external tag</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-green-500/10 border border-green-500/30 rounded-xl p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">🎨 Your Design Challenge</h3>
        <p className="text-gray-300 mb-4">If you were designing this bio-sensor, what would you include?</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <label className="text-gray-300">Battery life (how long should it last?)</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <label className="text-gray-300">Size (must be small enough to swallow)</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <label className="text-gray-300">Durability (survive stomach acid!)</label>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" className="w-5 h-5" />
            <label className="text-gray-300">Cost (affordable for research projects)</label>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

