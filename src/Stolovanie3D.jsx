import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';

// Označenie jednotlivých predmetov podľa obrázka
const menuItems = [
  { id: 9, position: [2, 1.2, 1.5], name: "Masový nôž" },
  { id: 10, position: [-2, 1.2, 1.5], name: "Masová vidlička" },
  { id: 11, position: [2, 1.2, -1.5], name: "Polievková lyžica" },
  { id: 12, position: [2.5, 1.2, 1.5], name: "Dezertný nôž" },
  { id: 13, position: [-1.5, 1.2, 1.5], name: "Dezertná vidlička" },
  { id: 14, position: [1.5, 1.5, 2], name: "Vidlička na dezert" },
  { id: 15, position: [1.5, 1.5, 2.5], name: "Lyžička na dezert" },
  { id: 16, position: [1, 1.8, -2], name: "Pohár na biele víno" },
  { id: 17, position: [0.5, 1.8, -2.5], name: "Pohár na šumivé víno" },
  { id: 18, position: [0, 1.8, -2], name: "Pohár na červené víno" },
  { id: 19, position: [0, 1.3, 0], name: "Obrúsok" },
  { id: 20, position: [-1.5, 1.3, -1.5], name: "Malý tanier" },
  { id: 21, position: [0, 1.25, 0], name: "Hlavný tanier" },
  { id: 22, position: [0, 1.6, 2], name: "Menovka" },
  { id: 23, position: [-3, 1.5, -1], name: "Menu listok" },
];

const Robot = ({ step }) => {
  const [position, setPosition] = useState([-3, 1, -3]);

  useFrame(() => {
    if (step >= 1 && position[0] < 3) {
      setPosition([position[0] + 0.05, 1, position[2] + 0.02]);
    }
  });

  return (
    <group position={position}>
      {/* Telo robota */}
      <mesh>
        <cylinderGeometry args={[0.4, 0.4, 0.8, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Hlava */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0.7, 0.2]}>
        <boxGeometry args={[0.4, 0.2, 0.1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Nožičky */}
      <mesh position={[-0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 32]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};

const Stolovanie3D = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < menuItems.length) setStep(step + 1);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Canvas camera={{ position: [0, 8, 10], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        {/* Stôl */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[3, 3, 0.3, 32]} />
          <meshStandardMaterial color="brown" />
        </mesh>

        {/* Biele nohy stola */}
        {[[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]].map((pos, index) => (
          <mesh key={index} position={[pos[0], 0.5, pos[1]]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
            <meshStandardMaterial color="white" />
          </mesh>
        ))}

        {/* Obrus */}
        <mesh position={[0, 1.15, 0]} castShadow>
          <cylinderGeometry args={[3.1, 3.1, 0.05, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>

        {/* Dynamické pridávanie príborov, pohárov a tanierov podľa obrázka */}
        {menuItems.map((item, index) => (
          step >= index && (
            <group key={index} position={item.position}>
              <mesh castShadow>
                <boxGeometry args={[0.1, 0.5, 0.1]} />
                <meshStandardMaterial color="silver" />
              </mesh>
              <Text position={[0, 0.8, 0]} fontSize={0.3} color="black">
                {item.id}
              </Text>
            </group>
          )
        ))}

        {/* Robot */}
        <Robot step={step} />

        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>

      {/* Tlačidlo "Next" */}
      <button onClick={nextStep} style={{ marginTop: 20, padding: '10px 20px', fontSize: '16px' }}>
        Next
      </button>
    </div>
  );
};

export default Stolovanie3D;

