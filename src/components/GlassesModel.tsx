import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 3D Glasses Component
function Glasses() {
  const groupRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const lensRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
    
    if (frameRef.current && frameRef.current.material) {
      // Gentle metallic shine effect
      const material = frameRef.current.material as THREE.MeshStandardMaterial;
      if (material.envMapIntensity !== undefined) {
        material.envMapIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      }
    }
  });

  // Glasses geometry creation
  const createGlassesGeometry = () => {
    // Frame material - metallic blue
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#4A90E2'),
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1,
    });

    // Lens material - subtle blue tint with transparency
    const lensMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#E3F2FD'),
      transmission: 0.9,
      opacity: 0.15,
      transparent: true,
      roughness: 0,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0,
      ior: 1.5,
    });

    return { frameMaterial, lensMaterial };
  };

  const { frameMaterial, lensMaterial } = createGlassesGeometry();

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Main Frame */}
      <group ref={lensRef}>
        {/* Left Lens Frame */}
        <mesh position={[-1.2, 0, 0]} ref={frameRef}>
          <torusGeometry args={[0.8, 0.08, 16, 32]} />
          <primitive object={frameMaterial} />
        </mesh>
        
        {/* Right Lens Frame */}
        <mesh position={[1.2, 0, 0]}>
          <torusGeometry args={[0.8, 0.08, 16, 32]} />
          <primitive object={frameMaterial} />
        </mesh>
        
        {/* Bridge */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
        
        {/* Left Temple */}
        <mesh position={[-1.8, 0, 1.5]} rotation={[0, 0, -0.1]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
        
        {/* Right Temple */}
        <mesh position={[1.8, 0, 1.5]} rotation={[0, 0, 0.1]}>
          <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
          <primitive object={frameMaterial} />
        </mesh>
        
        {/* Left Lens */}
        <mesh position={[-1.2, 0, -0.05]}>
          <circleGeometry args={[0.75, 32]} />
          <primitive object={lensMaterial} />
        </mesh>
        
        {/* Right Lens */}
        <mesh position={[1.2, 0, -0.05]}>
          <circleGeometry args={[0.75, 32]} />
          <primitive object={lensMaterial} />
        </mesh>
      </group>
    </group>
  );
}

// Main 3D Scene Component
export const GlassesModel = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        {/* Lighting Setup */}
        <ambientLight intensity={0.6} color="#E3F2FD" />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2} 
          color="#4A90E2"
          castShadow
        />
        <pointLight position={[-10, -10, -10]} color="#81D4FA" intensity={0.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="#E1F5FE"
        />
        
        {/* Environment for reflections */}
        <Environment preset="studio" />
        
        {/* 3D Glasses */}
        <Glasses />
        
        {/* Interactive Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};