import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

// ✅ Loading screen while model loads
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center text-gray-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
        <p>Loading {progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}

// ✅ Load OBJ + MTL files
function DorsalTagModel() {
  const materials = useLoader(MTLLoader, '/models/Dorsal_Tag.mtl')
  materials.preload()

  const obj = useLoader(OBJLoader, '/models/Dorsal_Tag.obj', (loader) => {
    loader.setMaterials(materials)
  })

  // Adjust scale if model looks too big/small
  return <primitive object={obj} scale={0.1} />
}

// ✅ The actual viewer component
export default function ThreeDModelViewer() {
  return (
    <div className="w-full h-[500px] bg-white rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />
        <Suspense fallback={<Loader />}>
          <DorsalTagModel />
        </Suspense>
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-3 left-3 right-3 text-center">
        <div className="text-gray-700 text-xs font-mono bg-white/80 px-2 py-1 rounded">
          🖱️ Drag to rotate • 🔄 Scroll to zoom
        </div>
      </div>
    </div>
  )
}
