import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import { Box3, Vector3 } from 'three'

// ✅ Loading screen while model loads
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="text-center text-gray-700">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
        <p>Loading 3D Model {progress.toFixed(0)}%</p>
      </div>
    </Html>
  )
}

// ✅ 3D Model component with proper centering
function CenteredDorsalTag() {
  const groupRef = useRef()
  const { camera, controls } = useThree()
  const [modelLoaded, setModelLoaded] = useState(false)

  useEffect(() => {
    const loadModel = async () => {
      try {
        // For now, we'll use a simple geometric representation
        // In production, this would load the actual OBJ file using:
        // const { OBJLoader } = await import('three/examples/jsm/loaders/OBJLoader.js')
        // const { MTLLoader } = await import('three/examples/jsm/loaders/MTLLoader.js')

        // Simulate model loading
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Once loaded, center the model
        if (groupRef.current && !modelLoaded) {
          // Update camera and controls to look at the model center
          camera.position.set(0, 0, 6)
          camera.lookAt(0, 0, 0)

          if (controls) {
            controls.target.set(0, 0, 0)
            controls.update()
          }

          setModelLoaded(true)
        }
      } catch (error) {
        console.error('Failed to load 3D model:', error)
      }
    }

    loadModel()
  }, [camera, controls, modelLoaded])

  return (
    <group ref={groupRef}>
      {/* 3D representation of the Dorsal Tag */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1.5, 0.6]} />
        <meshStandardMaterial color="#0e7490" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Solar panel array */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <boxGeometry args={[2.5, 0.2, 0.5]} />
        <meshStandardMaterial color="#1e40af" metalness={0.1} roughness={0.2} />
      </mesh>

      {/* Satellite antenna */}
      <group position={[0, 1.2, 0]}>
        <mesh>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Antenna tip */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.15]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} />
        </mesh>
      </group>

      {/* Inductive receiver coil */}
      <mesh position={[0, -0.6, 0]}>
        <torusGeometry args={[0.8, 0.15]} />
        <meshStandardMaterial color="#ea580c" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Attachment bolts */}
      <mesh position={[-1.2, -0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <mesh position={[1.2, -0.8, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Depth sensor window */}
      <mesh position={[-1, 0, 0.31]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.7} />
      </mesh>
    </group>
  )
}

// ✅ The actual viewer component with proper centering
export default function ThreeDModelViewer() {
  return (
    <div className="w-full h-[500px] bg-white rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        {/* Ground plane for reference */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.3} />
        </mesh>

        <Suspense fallback={<Loader />}>
          <CenteredDorsalTag />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[0, 0, 0]}
          minDistance={3}
          maxDistance={15}
          autoRotate={false}
        />
      </Canvas>

      {/* Instructions overlay */}
      <div className="absolute bottom-3 left-3 right-3 text-center">
        <div className="text-gray-700 text-xs font-mono bg-white/80 px-2 py-1 rounded">
          🖱️ Drag to rotate • 🔄 Scroll to zoom • 🖱️ Right-click to pan
        </div>
      </div>
    </div>
  )
}
