import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Html, useProgress } from '@react-three/drei'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
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

// ✅ Dorsal Tag Model with proper loading and centering
function DorsalTagModel() {
  const groupRef = useRef()
  const { camera, controls } = useThree()
  const [modelLoaded, setModelLoaded] = useState(false)

  // Load materials first
  const materials = useLoader(MTLLoader, '/models/Dorsal_Tag.mtl')

  // Then load OBJ with materials
  const obj = useLoader(OBJLoader, '/models/Dorsal_Tag.obj', (loader) => {
    loader.setMaterials(materials)
  })

  useEffect(() => {
    if (obj && groupRef.current && !modelLoaded) {
      // Calculate bounding box to find the center of the model
      const box = new Box3().setFromObject(obj)
      const center = box.getCenter(new Vector3())

      // Move the model so its center is at the origin
      obj.position.sub(center)

      // Update camera and controls to look at the model center
      camera.position.set(0, 0, 6)
      camera.lookAt(0, 0, 0)

      if (controls) {
        controls.target.set(0, 0, 0)
        controls.update()
      }

      setModelLoaded(true)
    }
  }, [obj, camera, controls, modelLoaded])

  return <primitive ref={groupRef} object={obj} scale={0.5} />
}

// ✅ The actual viewer component with proper centering
export default function ThreeDModelViewer() {
  return (
    <div className="w-full h-[500px] bg-white rounded-lg overflow-hidden relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        {/* Soft ambient light */}
        <ambientLight intensity={0.4} />

        {/* Directional key light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Fill light */}
        <pointLight position={[-5, -5, -5]} intensity={0.4} />

        {/* Ground plane for reference and shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        <Suspense fallback={<Loader />}>
          <DorsalTagModel />
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
