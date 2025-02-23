import React from "react";

const Glass = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.2, 0.2, 0.8, 32]} />
      <meshStandardMaterial color="blue" transparent opacity={0.6} />
    </mesh>
  );
};

export default Glass;
