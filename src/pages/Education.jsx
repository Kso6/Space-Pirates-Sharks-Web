import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Education() {
  const [activeLesson, setActiveLesson] = useState(null)

  return (
    <div className="min-h-screen px-4 py-28">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
            <span className="text-purple-400 text-sm font-semibold">
              🎓 Free Education Resources
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Learn Shark Science
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Interactive curriculum for high school students and educators to understand ocean
            ecosystems, satellite technology, and marine conservation
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 bg-blue-500/10 rounded-full">
              <span className="text-blue-400 font-semibold">Ages 14+</span>
            </div>
            <div className="px-4 py-2 bg-green-500/10 rounded-full">
              <span className="text-green-400 font-semibold">NGSS Aligned</span>
            </div>
            <div className="px-4 py-2 bg-cyan-500/10 rounded-full">
              <span className="text-cyan-400 font-semibold">Open Source</span>
            </div>
          </div>
        </motion.div>

        {/* Why Sharks Matter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-12 mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">Why Sharks Matter</h2>
            <p className="text-xl text-gray-300">Understanding the ocean's apex predators</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ImpactCard
              icon="🌊"
              title="Ecosystem Health"
              description="Sharks are apex predators that regulate entire food webs. Without them, ecosystems collapse, affecting fish populations humans depend on."
              stat="70%"
              statLabel="of ocean ecosystems rely on shark balance"
            />
            <ImpactCard
              icon="🌍"
              title="Climate Indicators"
              description="Shark behavior reflects ocean health and climate change impacts. Tracking them helps us understand warming oceans and changing currents."
              stat="100M"
              statLabel="years of evolutionary wisdom"
            />
            <ImpactCard
              icon="🏖️"
              title="Human Safety"
              description="Predicting shark locations reduces conflicts with humans while protecting sharks. Knowledge replaces fear with coexistence."
              stat="5"
              statLabel="average human deaths/year vs 100M sharks killed"
            />
          </div>
        </motion.div>

        {/* Interactive Lessons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">Interactive Lessons</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <LessonCard
              number="1"
              title="How Satellites Track Ocean Life"
              duration="15 min"
              difficulty="Beginner"
              topics={['NASA SWOT Mission', 'Sea Surface Height', 'Ocean Currents', 'Eddies']}
              description="Learn how satellites in space can detect underwater features that sharks use for hunting."
              isActive={activeLesson === 1}
              onClick={() => setActiveLesson(activeLesson === 1 ? null : 1)}
            />

            <LessonCard
              number="2"
              title="The Shark Foraging Index"
              duration="20 min"
              difficulty="Intermediate"
              topics={['Mathematical Models', 'Data Analysis', 'Predictions', '3D Mapping']}
              description="Discover how we combine satellite data to predict where sharks will hunt next."
              isActive={activeLesson === 2}
              onClick={() => setActiveLesson(activeLesson === 2 ? null : 2)}
            />

            <LessonCard
              number="3"
              title="Ocean Food Webs"
              duration="12 min"
              difficulty="Beginner"
              topics={['Phytoplankton', 'Food Chains', 'Chlorophyll', 'Prey Detection']}
              description="Explore how tiny organisms at the ocean's surface feed the entire food web up to sharks."
              isActive={activeLesson === 3}
              onClick={() => setActiveLesson(activeLesson === 3 ? null : 3)}
            />

            <LessonCard
              number="4"
              title="Bio-Sensor Technology"
              duration="18 min"
              difficulty="Advanced"
              topics={['Engineering', 'pH Sensors', 'Data Transmission', 'Innovation']}
              description="Design a gastric tag that tells us what sharks are eating in real-time."
              isActive={activeLesson === 4}
              onClick={() => setActiveLesson(activeLesson === 4 ? null : 4)}
            />
          </div>
        </motion.div>

        {/* Teacher Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">For Educators</h2>
              <p className="text-gray-400">Free curriculum materials and lesson plans</p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">
              Download Curriculum
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ResourceCard
              icon="📚"
              title="Lesson Plans"
              items={[
                '4 complete units',
                '45-60 min each',
                'Hands-on activities',
                'Assessment guides',
              ]}
            />
            <ResourceCard
              icon="🎯"
              title="Learning Objectives"
              items={['NGSS aligned', 'Earth science', 'Data literacy', 'Ocean conservation']}
            />
            <ResourceCard
              icon="🛠️"
              title="Materials Included"
              items={['Slide decks', 'Worksheets', 'Data sets', 'Extension activities']}
            />
          </div>
        </motion.div>

        {/* Real-World Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            How Predictions Help Humans
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <DecisionCard
              icon="🏄‍♂️"
              title="Beach Safety Managers"
              scenario="A coastal town receives a real-time alert that shark foraging activity is high near their beach."
              decision="They can temporarily close the beach or post warnings, preventing human-shark encounters while respecting sharks' natural behavior."
              outcome="Safer beaches + Protected sharks"
            />

            <DecisionCard
              icon="🎣"
              title="Fishing Communities"
              scenario="Commercial fishers see predicted hotspots on their dashboard before setting out."
              decision="They can avoid areas with high shark activity, reducing bycatch and protecting endangered species while maximizing their catch."
              outcome="Sustainable fishing + Conservation"
            />

            <DecisionCard
              icon="🏞️"
              title="Marine Protected Areas"
              scenario="Conservation scientists identify critical shark foraging zones using our forecasts."
              decision="Governments can create or expand marine protected areas in these vital habitats, ensuring shark populations thrive."
              outcome="Healthier oceans + Biodiversity"
            />

            <DecisionCard
              icon="🏫"
              title="Education & Research"
              scenario="Students and researchers access free data showing shark behavior patterns over time."
              decision="They can study climate change impacts, run their own analyses, and develop new hypotheses about ocean health."
              outcome="Next-gen scientists + Public awareness"
            />
          </div>
        </motion.div>

        {/* Hands-On Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Try It Yourself</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ActivityCard
              title="Build Your Own Foraging Index"
              description="Use real NASA data to calculate where sharks might hunt"
              tools={['Excel/Google Sheets', 'NASA SWOT data', 'Our formula']}
              time="30 min"
            />

            <ActivityCard
              title="Design a Bio-Sensor"
              description="Sketch and prototype a tag that could track shark feeding"
              tools={['Paper & pencil', 'Arduino (optional)', 'Creativity']}
              time="45 min"
            />

            <ActivityCard
              title="Create a Food Web"
              description="Map the connections from phytoplankton to sharks"
              tools={['String & paper', 'Our data viz', 'Teamwork']}
              time="20 min"
            />
          </div>
        </motion.div>

        {/* Community Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">Open Source for Everyone</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            This project is completely free and open source. Whether you're a student in Sydney or
            São Paulo, a teacher in Tokyo or Toronto, you can access all our data, code, and
            educational resources.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatBox number="100%" label="Free Forever" />
            <StatBox number="0" label="Prerequisites" />
            <StatBox number="∞" label="Students Reached" />
            <StatBox number="4" label="Complete Lessons" />
          </div>

          <div className="mt-12">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all"
            >
              Access on GitHub →
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Helper Components
function ImpactCard({ icon, title, description, stat, statLabel }) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      <div className="border-t border-white/10 pt-4">
        <div className="text-3xl font-bold text-gradient mb-1">{stat}</div>
        <div className="text-sm text-gray-400">{statLabel}</div>
      </div>
    </div>
  )
}

function LessonCard({
  number,
  title,
  duration,
  difficulty,
  topics,
  description,
  isActive,
  onClick,
}) {
  const difficultyColors = {
    Beginner: 'text-green-400 bg-green-500/10',
    Intermediate: 'text-yellow-400 bg-yellow-500/10',
    Advanced: 'text-red-400 bg-red-500/10',
  }

  return (
    <motion.div
      className={`bg-slate-800/30 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all ${
        isActive
          ? 'border-blue-500 ring-2 ring-blue-500/20'
          : 'border-white/10 hover:border-white/20'
      }`}
      onClick={onClick}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
            {number}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-400">⏱️ {duration}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic, idx) => (
          <span key={idx} className="text-xs px-3 py-1 bg-white/5 rounded-full text-gray-400">
            {topic}
          </span>
        ))}
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <button className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all">
            Start Lesson →
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

function ResourceCard({ icon, title, items }) {
  return (
    <div className="bg-slate-700/30 rounded-xl p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start text-gray-300 text-sm">
            <span className="text-blue-400 mr-2">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DecisionCard({ icon, title, scenario, decision, outcome }) {
  return (
    <div className="bg-slate-800/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-semibold text-blue-400 mb-1">Scenario</div>
          <p className="text-gray-300 text-sm">{scenario}</p>
        </div>

        <div>
          <div className="text-sm font-semibold text-purple-400 mb-1">Decision</div>
          <p className="text-gray-300 text-sm">{decision}</p>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            <span className="text-green-400 font-semibold">{outcome}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActivityCard({ title, description, tools, time }) {
  return (
    <div className="bg-slate-700/30 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>

      <div className="mb-4">
        <div className="text-xs font-semibold text-gray-400 mb-2">YOU'LL NEED:</div>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, idx) => (
            <span key={idx} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-400">
        <span>⏱️ {time}</span>
      </div>
    </div>
  )
}

function StatBox({ number, label }) {
  return (
    <div>
      <div className="text-4xl font-extrabold text-white mb-2">{number}</div>
      <div className="text-sm text-gray-300">{label}</div>
    </div>
  )
}

