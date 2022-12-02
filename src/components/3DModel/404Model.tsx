import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Environment, OrbitControls } from '@react-three/drei';

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/cat/scene.gltf');

  return (
    <>
      <primitive object={gltf.scene} scale={5} />
    </>
  );
};

export default function ErrorModelComponent() {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        cursor: 'grabbing',
      }}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 4, 4], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Model />
          {/* To add environment effect to the model */}
          <Environment preset="night" />
          <OrbitControls autoRotate />
        </Suspense>
      </Canvas>
    </div>
  );
}
