import { useState, lazy, Suspense, Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('App error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg"
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// Lazy load page components for better performance
const MathematicalModel = lazy(() => import('./pages/MathematicalModel'))
const DataVisualization = lazy(() => import('./pages/DataVisualization'))
const TagSensor = lazy(() => import('./pages/TagSensor'))
const About = lazy(() => import('./pages/About'))
const Education = lazy(() => import('./pages/Education'))

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    // Home page is not lazy loaded for faster initial load
    if (currentPage === 'home') {
      return <Hero onNavigate={setCurrentPage} />
    }

    // Wrap other pages in Suspense with loading state
    return (
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        }
      >
        {(() => {
          switch (currentPage) {
            case 'education':
              return <Education />
            case 'model':
              return <MathematicalModel />
            case 'visualization':
              return <DataVisualization />
            case 'tag':
              return <TagSensor />
            case 'about':
              return <About />
            default:
              return <Hero onNavigate={setCurrentPage} />
          }
        })()}
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {/* Modern gradient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Large gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/20 via-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>
    </div>
  )
}

// Wrap App with ErrorBoundary for export
export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
