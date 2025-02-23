import React from "react";

const SmallPlate = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default SmallPlate;
