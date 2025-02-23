import React from "react";

const Plate = ({ position }) => {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.5, 0.5, 0.05, 32]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
};

export default Plate;
