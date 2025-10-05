import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

// Component to load and display the 3D model
function DorsalTagModel({ onModelLoad }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Load materials first, then the model
  const materials = useLoader(MTLLoader, '/Dorsal_Tag.mtl')
  const obj = useLoader(OBJLoader, '/Dorsal_Tag.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  // Apply materials to the loaded object
  React.useEffect(() => {
    if (obj && materials) {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Enhance the material properties for better visualization
          if (child.material) {
            child.material.metalness = 0.1
            child.material.roughness = 0.3
          }
        }
      })
      
      // Center and scale the model
      const box = new THREE.Box3().setFromObject(obj)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim
      
      obj.scale.setScalar(scale)
      obj.position.sub(center.multiplyScalar(scale))
      
      if (onModelLoad) {
        onModelLoad(obj)
      }
    }
  }, [obj, materials, onModelLoad])

  // Animation for hover effect
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      if (hovered) {
        meshRef.current.scale.setScalar(1.1)
      } else {
        meshRef.current.scale.setScalar(clicked ? 1.05 : 1.0)
      }
    }
  })

  return (
    <group ref={meshRef}>
      <primitive 
        object={obj} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setClicked(!clicked)}
      />
      
      {/* Interactive labels */}
      <Html position={[0, 1.5, 0]} center>
        <div className="bg-slate-900/90 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2 text-white text-sm font-medium">
          {hovered ? '🖱️ Click to pause rotation' : '🦈 External Dorsal Tag'}
        </div>
      </Html>
    </group>
  )
}

// Loading component
function LoadingFallback() {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
        <div className="text-sm">Loading 3D Model...</div>
      </div>
    </Html>
  )
}

// Main 3D viewer component
export default function DorsalTag3D({ className = "" }) {
  const [modelInfo, setModelInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleModelLoad = (obj) => {
    setIsLoading(false)
    setModelInfo({
      vertices: obj.children.reduce((acc, child) => acc + (child.geometry?.attributes?.position?.count || 0), 0),
      materials: obj.children.length
    })
  }

  return (
    <div className={`relative ${className}`}>
      {/* 3D Canvas */}
      <div className="w-full h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden border border-blue-500/30">
        <Canvas
          camera={{ position: [3, 2, 3], fov: 50 }}
          shadows
          gl={{ antialias: true, alpha: true }}
        >
          {/* Lighting setup */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3} />

          {/* Scene background */}
          <color attach="background" args={['#0f172a']} />

          {/* 3D Model */}
          <Suspense fallback={<LoadingFallback />}>
            <DorsalTagModel onModelLoad={handleModelLoad} />
          </Suspense>

          {/* Interactive controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={1}
            maxDistance={10}
            autoRotate={!isLoading}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Model information */}
      {modelInfo && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-blue-400 font-semibold">Model Details</div>
            <div className="text-gray-300">
              {modelInfo.vertices.toLocaleString()} vertices
            </div>
            <div className="text-gray-300">
              {modelInfo.materials} materials
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-green-400 font-semibold">Controls</div>
            <div className="text-gray-300">🖱️ Drag to rotate</div>
            <div className="text-gray-300">🔍 Scroll to zoom</div>
            <div className="text-gray-300">📱 Click to pause</div>
          </div>
        </div>
      )}

      {/* Technical specifications */}
      <div className="mt-4 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-lg font-bold text-white mb-2">🔬 Technical Specifications</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-blue-400 font-semibold mb-1">Dimensions</div>
            <div className="text-gray-300">80mm × 40mm × 15mm</div>
            <div className="text-gray-300">Weight: ~45g (in air)</div>
          </div>
          <div>
            <div className="text-green-400 font-semibold mb-1">Components</div>
            <div className="text-gray-300">Satellite transceiver</div>
            <div className="text-gray-300">Solar panel array</div>
            <div className="text-gray-300">GPS/Depth sensors</div>
          </div>
        </div>
      </div>
    </div>
  )
}
