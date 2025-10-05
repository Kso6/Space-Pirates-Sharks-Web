import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AdvancedReaders() {
  const [expandedSection, setExpandedSection] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen px-4 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full mb-6">
            <span className="text-red-400 text-sm font-semibold">
              ⚠️ Advanced Technical Content
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
              Advanced Readers
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Deep dive into the mathematical foundations, model development, and technical
            implementation of the SHARK framework
          </p>

          {/* Highly Advanced Readers CTA */}
          <motion.a
            href="https://www.overleaf.com/read/mwgdxcgtmrdc#0b0f77"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            <span className="text-2xl">📐</span>
            <div className="text-left">
              <div className="text-sm opacity-90">For Highly Advanced Readers</div>
              <div className="text-lg">View Full Technical Report on Overleaf</div>
            </div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'overview', label: 'Overview', icon: '📋' },
            { id: 'math', label: 'Mathematics', icon: '∑' },
            { id: 'implementation', label: 'Implementation', icon: '⚙️' },
            { id: 'validation', label: 'Validation', icon: '✓' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-800 border border-white/10'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Section title="Overview" delay={0}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This report documents the development of a mathematical model to showcase a map of
                  possible shark foraging environments. This approach is unique in that it doesn't
                  actually say where the sharks are, but offers a probability model of shark
                  position globally.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Understanding and predicting shark foraging behaviour is crucial for ecological
                  research, conservation planning, and marine management. The{' '}
                  <span className="text-cyan-400 font-semibold">Shark Foraging Index (SFI)</span>{' '}
                  framework provides a probabilistic representation of foraging habitat suitability.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  The model integrates three environmental drivers:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mt-4 ml-4">
                  <li>
                    <strong className="text-green-400">Prey availability (B_p)</strong> derived from
                    chlorophyll-a concentration
                  </li>
                  <li>
                    <strong className="text-orange-400">Temperature suitability (T_s)</strong>{' '}
                    estimated using SST and subsurface corrections
                  </li>
                  <li>
                    <strong className="text-blue-400">Eddy energy (E)</strong> calculated from SSHA
                    to represent mesoscale dynamics
                  </li>
                </ul>
              </Section>
            </motion.div>
          )}

          {/* Mathematics Tab */}
          {activeTab === 'math' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Section title="Mathematical Model Development" delay={0}>
                <div className="bg-slate-900/50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">
                    Shark Foraging Index (SFI)
                  </h3>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 mb-4 overflow-x-auto">
                    SFI(x,y,z,t) = w_B · B_p(x,y,z,t) + w_T · S_T(x,y,z,t) + w_E · E(x,y,z,t)
                  </div>
                  <p className="text-gray-300 mb-2">
                    Where w_B, w_T and w_E are weightings of each term, normalized such that:
                  </p>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    w_B + w_T + w_E = 1
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">
                    Stochastic Intensity Model
                  </h3>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    λ(x,y,z,t) = exp(β₀ + β₁ · SFI(x,y,z,t) + ε(x,y))
                  </div>
                  <p className="text-gray-300 mt-4">
                    This transforms the deterministic SFI into a probabilistic intensity field,
                    representing expected shark density.
                  </p>
                </div>
              </Section>

              {/* Eddy Current Indicator */}
              <Section title="Eddy Current Indicator" delay={0.3}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This component quantifies dynamic ocean regions where mesoscale eddies enhance
                  prey aggregation. The surface eddy indicator is expressed as:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 space-y-2 overflow-x-auto">
                      <div>η(x,y,t) = SSHA(x,y,t)</div>
                      <div>
                        𝓛{'{'}η{'}'}(x,y,t) = ∇²η = ∂²η/∂x² + ∂²η/∂y²
                      </div>
                      <div>
                        E_surf(x,y,t) = |𝓛{'{'}η{'}'}| / max|𝓛{'{'}η{'}'}| ∈ [0,1]
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-3">
                      Three-Dimensional Extension
                    </h4>
                    <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                      E(x,y,z,t) = E_surf(x,y,t) · exp[-(z - ẑ_th)² / (2σ_z²)]
                    </div>
                    <p className="text-gray-300 mt-4">
                      Where the adjusted thermocline depth ẑ_th accounts for eddy-induced vertical
                      displacement.
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <h4 className="text-sm font-bold text-blue-400 mb-2">Key Variables:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>
                      <code className="text-cyan-400">η(x,y,t)</code> — Sea surface height anomaly
                      (SSHA)
                    </li>
                    <li>
                      <code className="text-cyan-400">γ(x,y)</code> — Local scaling coefficient for
                      subsurface displacement
                    </li>
                    <li>
                      <code className="text-cyan-400">σ_z</code> — Vertical spread controlling depth
                      decay
                    </li>
                    <li>
                      <code className="text-cyan-400">z_th,clim</code> — Climatological mean
                      thermocline depth
                    </li>
                  </ul>
                </div>
              </Section>

              {/* Prey Availability */}
              <Section title="Prey Availability and Depth Scaling" delay={0.4}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This term represents biological productivity, incorporating surface chlorophyll
                  and its redistribution through vertical mixing. Based on the Michaelis-Menten
                  equation:
                </p>

                <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    Surface Prey Availability
                  </h4>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    B_p^surf(x,y,t) = α·C(x,y,t) / (K_c + C(x,y,t))
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">
                    Depth-Weighted Kernel
                  </h4>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    K_E(z;x,y,t) = E(x,y,z,t) / Σ_k E(x,y,z_k,t)·Δz
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Scaled Prey Field</h4>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    B_p^scaled(x,y,z,t) = B_p^surf(x,y,t) · K_E(z;x,y,t)
                  </div>
                  <p className="text-gray-300 mt-4">
                    This distributes prey availability vertically in accordance with local eddy
                    intensity and thermocline displacement.
                  </p>
                </div>
              </Section>

              {/* Temperature Suitability */}
              <Section title="Temperature Suitability" delay={0.5}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  This term models thermal preference, showing how temperature deviations from
                  optimal values influence shark presence probability:
                </p>

                <div className="bg-slate-900/50 rounded-xl p-6 mb-4">
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    T_s(x,y,z,t) = exp[-(T(x,y,z,t) - T_opt)² / (2σ_T²)]
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">
                    Linear Gradient Approximation
                  </h4>
                  <p className="text-gray-300 mb-3">
                    When subsurface data is unavailable, temperature is approximated using a
                    vertical gradient:
                  </p>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-green-400 mb-4 overflow-x-auto">
                    T(x,y,z,t) ≈ T_surface(x,y,t) - Γ(x,y)·z
                  </div>

                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-500/30">
                        <th className="text-left py-2 text-orange-400">Region</th>
                        <th className="text-right py-2 text-orange-400">Γ (°C/m)</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-slate-700">
                        <td className="py-2">Equatorial</td>
                        <td className="text-right font-mono">0.01</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-2">Subtropical gyres</td>
                        <td className="text-right font-mono">0.02</td>
                      </tr>
                      <tr className="border-b border-slate-700">
                        <td className="py-2">Temperate coastal</td>
                        <td className="text-right font-mono">0.03-0.05</td>
                      </tr>
                      <tr>
                        <td className="py-2">Polar</td>
                        <td className="text-right font-mono">0.005-0.01</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Section>
            </motion.div>
          )}

          {/* Implementation Tab */}
          {activeTab === 'implementation' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Section title="SHARK Model Implementation" delay={0}>
                <p className="text-gray-300 leading-relaxed mb-6">
                  The{' '}
                  <strong className="text-cyan-400">
                    Stochastic and Heuristic Anomaly Regression Kernel (SHARK)
                  </strong>{' '}
                  is the world's first deterministic foraging mapping algorithm.
                </p>

                <div className="space-y-4">
                  <ImplementationStep
                    number="1"
                    title="Data Acquisition"
                    items={[
                      'MODIS NetCDF files for chlorophyll concentration C(x,y,t)',
                      'SST Proxy derived from coral bleaching alert area values',
                      'SSHA from CSV, interpolated to SST grid',
                    ]}
                  />

                  <ImplementationStep
                    number="2"
                    title="Gaussian Scoring"
                    items={[
                      'Eddy indicator normalized from SSHA with Gaussian vertical decay',
                      'Prey availability from log-transformed chlorophyll',
                      'All scores clipped to [0,1] range',
                    ]}
                  />

                  <ImplementationStep
                    number="3"
                    title="SFI Computation"
                    items={[
                      'Weighted sum: SFI = w_B·B_p + w_T·S_T + w_E·E',
                      'Reflects overall favorability for shark foraging',
                    ]}
                  />

                  <ImplementationStep
                    number="4"
                    title="Stochastic Transformation"
                    items={[
                      'Log-linear: λ = exp(β₀ + β₁·SFI + ε)',
                      'Amplifies high-SFI regions, suppresses low-SFI zones',
                      'Spatial noise ε adds realistic variability',
                    ]}
                  />

                  <ImplementationStep
                    number="5"
                    title="Arctic Suppression"
                    items={[
                      'SST values below 18°C treated as invalid',
                      'Ensures biologically realistic polar exclusion',
                    ]}
                  />

                  <ImplementationStep
                    number="6"
                    title="Visualization"
                    items={[
                      'Heatmap using YlOrRd colormap',
                      'Land rendered in slate blue for contrast',
                      'Coastlines and borders added via cartopy',
                    ]}
                  />
                </div>
              </Section>
            </motion.div>
          )}

          {/* Validation Tab */}
          {activeTab === 'validation' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Section title="Model Validation and Future Development" delay={0}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-cyan-400 mb-4">Validation Metrics</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Spatial correlation with satellite tag data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Seasonal coherence with migration routes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-1">•</span>
                        <span>Sensitivity analysis of weighting coefficients</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-purple-400 mb-4">Future Development</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Machine learning for adaptive weighting</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>4D assimilation (space + time)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>Interactive web dashboard refinement</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Section>

              {/* Conclusion */}
              <Section title="Conclusion" delay={0.8}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The development of a predictive model for shark foraging suitability offers a
                  powerful alternative to direct tracking. By leveraging global satellite datasets
                  and mathematical inference, we can transform raw environmental variables into maps
                  of ecological probability.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The <strong className="text-cyan-400">Shark Foraging Index (SFI)</strong>{' '}
                  integrates multiple oceanographic drivers to produce a spatiotemporal
                  representation of foraging likelihood. This work represents an initial step toward
                  autonomous ecological prediction, where satellite data streams feed into adaptive
                  models to infer animal behaviour.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This forms the basis of a scalable, global predictor of shark foraging dynamics —
                  connecting physical ocean processes to biological activity through mathematical
                  structure and real-world data.
                </p>
              </Section>

              <Section title="Conclusion" delay={0.1}>
                <p className="text-gray-300 leading-relaxed mb-4">
                  The <strong className="text-cyan-400">Shark Foraging Index (SFI)</strong>{' '}
                  integrates multiple oceanographic drivers to produce a spatiotemporal
                  representation of foraging likelihood. This work represents an initial step toward
                  autonomous ecological prediction, where satellite data streams feed into adaptive
                  models to infer animal behaviour.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  This forms the basis of a scalable, global predictor of shark foraging dynamics —
                  connecting physical ocean processes to biological activity through mathematical
                  structure and real-world data.
                </p>
              </Section>
            </motion.div>
          )}
        </div>

        {/* References - Always Visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-gray-500/10 to-slate-500/10 border border-gray-500/30 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">References & Data Sources</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Argo float climatologies (EN4 dataset)</li>
            <li>
              • Emery and Thomson, Data Analysis Methods in Physical Oceanography, 2nd Edition
            </li>
            <li>• Talley et al, Descriptive Physical Oceanography</li>
            <li>• NASA MODIS Ocean Color Data</li>
            <li>• NOAA Sea Surface Height Anomaly (SWOT Mission)</li>
            <li>• Coral Reef Watch Bleaching Alert Area (SST Proxy)</li>
          </ul>
        </motion.div>

        {/* Highly Advanced Readers Section - Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-red-600/20 border-2 border-purple-500/40 rounded-3xl p-10 text-center"
        >
          <div className="text-6xl mb-4">📐</div>
          <h2 className="text-3xl font-extrabold text-white mb-4">For Highly Advanced Readers</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Access the complete technical report with full LaTeX formatting, detailed derivations,
            figures, and appendices on Overleaf. Includes comprehensive mathematical proofs and
            implementation details.
          </p>
          <motion.a
            href="https://www.overleaf.com/read/mwgdxcgtmrdc#0b0f77"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            <span>View Full Technical Report on Overleaf</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}

function Section({ title, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-3">{title}</h2>
      {children}
    </motion.div>
  )
}

function ImplementationStep({ number, title, items }) {
  return (
    <div className="bg-slate-900/50 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-cyan-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center">
          <span className="text-cyan-400 font-bold">{number}</span>
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white mb-3">{title}</h4>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                <span className="text-cyan-400 mt-1">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
